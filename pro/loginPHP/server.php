<?php 
include "connect.php";
session_start();

$employerTable = "companylogins";
$applicantTable = "userlogins";

$data = json_decode(file_get_contents("php://input"), true);

$verifyLogin = function ($username, $password, $table) {
    global $selectRowSQL;
    $res = $selectRowSQL($table, $table === "companylogins" ? "CompanyName" : "Username", $username);
    return password_verify($password, $res["Password"]);
};

$applicantLogin = function () {
    global $data, $verifyLogin, $applicantTable;
    $success = $verifyLogin($data["username"], $data["password"], $applicantTable);
    if (!$success) {
        echo json_encode(["success"=>false]);
        return;
    }
    $_SESSION["accountType"] = "applicant";
    $_SESSION["username"] = $data["username"];
    echo json_encode(["success"=>true]);
};

$employerLogin = function () {
    global $data, $verifyLogin, $employerTable, $selectRowSQL;
    $res = $selectRowSQL($employerTable, "CompanyName", $data["username"]);
    $success = $verifyLogin($data["username"], $data["password"], $employerTable);
    if (!$success) {
        echo json_encode(["success"=>false]);
        return;
    }
    $_SESSION["accountType"] = "company";
    $_SESSION["username"] = $data["username"];
    $_SESSION["companyType"] = $res["CompanyType"];
    echo json_encode(["success"=>true]);
};

$requestHandler = function () {
    global $data, $applicantLogin, $employerLogin;
    if ($data["action"] === "applicantLogin") $applicantLogin();
    else if ($data["action"] === "employerLogin") $employerLogin();
};

$requestHandler();

?>