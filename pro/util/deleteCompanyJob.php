<?php

include '../loginPHP/connect.php';
session_start();

// TODO Temporarily just hardcode details, remove during integration step
// $_SESSION["username"] = "Testing Industries LTD";
// $_SESSION["accountType"] = "company";
// $_SESSION["companyType"] = "dummy";

include 'verifyCompanyLogin.php';

// Check and load variables
$jobTitle = filter_input(INPUT_POST, "jobTitle", FILTER_SANITIZE_SPECIAL_CHARS);
$positionType = filter_input(INPUT_POST, "positionType", FILTER_SANITIZE_SPECIAL_CHARS);
$positionPay = filter_input(INPUT_POST, "positionPay", FILTER_SANITIZE_SPECIAL_CHARS);
$startDate = filter_input(INPUT_POST, "startDate", FILTER_SANITIZE_SPECIAL_CHARS);
$endDate = filter_input(INPUT_POST, "endDate", FILTER_SANITIZE_SPECIAL_CHARS);
$jobDescription = filter_input(INPUT_POST, "jobDescription", FILTER_SANITIZE_SPECIAL_CHARS);

$allVars = [$companyName, $companyType, $jobTitle, $positionType, 
            $positionPay, $startDate, $endDate, $jobDescription];
$paramsOK = true;
foreach ($allVars as $eachVar) {
    if (!isset($eachVar) || $eachVar === null) {
        $paramsOK = false;
    }
}

if ($paramsOK) {
    $sql = "DELETE FROM companypostings 
                WHERE `CompanyName`='$companyName' 
                AND `CompanyType`='$companyType' 
                AND `JobTitle`='$jobTitle' 
                AND `PositionType`='$positionType' 
                AND `PositionPay` BETWEEN $positionPay-0.1 AND $positionPay+0.1
                AND `StartDate`='$startDate' 
                AND `EndDate`='$endDate'  
                AND `JobDescription`='$jobDescription'
                LIMIT 1
            ";

    $stmt = $dbh->prepare($sql);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        header("Location: ../companyEdit.php?status=success");
        echo "wa";
    } else {
        // header("Location: ../companyEdit.php?status=error1");
        echo "$sql";
    }
} else {
    // header("Location: ../companyEdit.php?status=error2");
    echo "fuc";
    exit;
}
