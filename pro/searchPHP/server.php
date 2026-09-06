<?php
include "connect.php";
session_start();

$data = json_decode(file_get_contents("php://input"), true);

$pushUniqueValues = function ($arr, $values) {
    for ($i = 0; $i < count($values); $i++) {
        if (in_array($values[$i], $arr, true)) continue;
        array_push($arr, $values[$i]);
    }
    return $arr;
};

$getCompanyTypes = function () {
    global $selectAllRowsOneProperty, $pushUniqueValues;
    $rows = $selectAllRowsOneProperty("companypostings", "CompanyType");
    $returnData = $pushUniqueValues([], $rows);
    echo json_encode($returnData);
};

$getPositionTypes = function () {
    global $selectAllRowsOneProperty, $pushUniqueValues;
    $rows = $selectAllRowsOneProperty("companypostings", "PositionType");
    $returnData = $pushUniqueValues([], $rows);
    echo json_encode($returnData);
};

$searchJobs = function () {
    global $data, $executeSelectQuery;
    // building query string
    $queryString = "SELECT * FROM `companypostings` WHERE";
    $args = [];
    if ($data["companyType"] !== "any") { // truthy value of "any"
        $queryString .= " (";
        $max = count($data["companyType"]);
        for ($i = 0; $i < $max; $i++) {
            $queryString .= "`CompanyType` = ?";
            $queryString .= $i === $max - 1 ? "" : " OR ";
        };
        $queryString .= ")";
        $args = array_merge($args, $data["companyType"]);
    } else $queryString .= " 1 ";
    $queryString .= " AND ";
    if ($data["positionType"] !== "any") { // truthy value of "any"
        $queryString .= " (";
        $max = count($data["positionType"]);
        for ($i = 0; $i < $max; $i++) {
            $queryString .= "`PositionType` = ?";
            $queryString .= $i === $max - 1 ? "" : " OR ";
        };
        $queryString .= ")";
        $args = array_merge($args, $data["positionType"]);
    } else $queryString .= " 1 ";
    $queryString .= " AND ";
    if ($data["pay"]) { // truthy value of false
        $queryString .= "`PositionPay` >= ? AND `PositionPay` <= ?";
        $args = array_merge($args, $data["pay"]);
    }
    else $queryString .= " 1 "; // truthy value of false
    $queryString .= " AND ";
    if ($data["startDate"]) {
        $queryString .= "`StartDate` >= ? AND `StartDate` <= ?";
        $args = array_merge($args, $data["startDate"]);
    }
    else $queryString .= " 1 ";
    $queryString .= "ORDER BY `PositionPay` DESC";
    $returnData = $executeSelectQuery($queryString, $args);
    echo json_encode($returnData);
};

$logOut = function () {
    session_destroy();
    echo json_encode("logOut");
};

$requestHandler = function () {
    global $data, $searchJobs, $getCompanyTypes, $getPositionTypes, $logOut;
    if (!isset($_SESSION["username"])) {
        echo json_encode("invalid session");
        return;
    }
    if ($data["action"] === "search") $searchJobs();
    else if ($data["action"] === "getCompanyTypes") $getCompanyTypes();
    else if ($data["action"] === "getPositionTypes") $getPositionTypes();
    else if ($data["action"] === "logOut") $logOut();
};

$requestHandler();

?>