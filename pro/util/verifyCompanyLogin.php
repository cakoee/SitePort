<?php

// Util function
function sessionError($msg)
{
    echo "Invalid session. Return to <a href=login.php>login page</a>.";
    echo "$msg";
}

// Handle logging in here
// Session check and variable loading
if (!isset($_SESSION["accountType"]) || $_SESSION["accountType"] != "company") {
    sessionError("Bad account type.");
    return -1;
}

if (!isset($_SESSION["username"]) || !isset($_SESSION["companyType"])) {
    sessionError("Company name or company type unset.");
    return -1;
}

$companyName = $_SESSION["username"];
$companyType = $_SESSION["companyType"];
// Logging in complete