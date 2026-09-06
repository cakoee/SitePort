<?php
header('Content-Type: application/json');

include 'loginPHP/connect.php';
session_start();

// TODO Temporarily just hardcode details, remove during integration step
// $_SESSION["username"] = "Testing Industries LTD";
// $_SESSION["accountType"] = "company";
// $_SESSION["companyType"] = "dummy";

include 'util/verifyCompanyLogin.php';
if (!$companyLoginVerified) return -1;

$errors = [];

// Get form inputs using filter_input and filter them
$jobTitle = filter_input(INPUT_POST, 'jobTitle', FILTER_SANITIZE_SPECIAL_CHARS);
$positionType = filter_input(INPUT_POST, 'positionType', FILTER_SANITIZE_SPECIAL_CHARS);
$positionPay = filter_input(INPUT_POST, 'positionPay', FILTER_VALIDATE_FLOAT);
$jobDescription = filter_input(INPUT_POST, 'jobDescription', FILTER_SANITIZE_SPECIAL_CHARS);
$startDate = filter_input(INPUT_POST, 'startDate', FILTER_DEFAULT);
$endDate = filter_input(INPUT_POST, 'endDate', FILTER_DEFAULT);

// Validate variables

if (empty($jobTitle)) {
    $errors[] = 'Job Title is required.';
}

if (empty($positionType)) {
    $errors[] = 'Position Type is required.';
}

if (empty($jobDescription)) {
    $errors[] = 'Job Description is required.';
}

if ($positionPay === false || $positionPay < 0) {
    $errors[] = 'Annual Salary must be a valid positive number.';
}

// Validate startDate and endDate (Check if they are valid dates in yyyy-mm-dd format)
if (!$startDate || !preg_match('/\d{4}-\d{2}-\d{2}/', $startDate)) {
    $errors[] = 'Start Date must be in YYYY-MM-DD format.';
}

if (!$endDate || !preg_match('/\d{4}-\d{2}-\d{2}/', $endDate)) {
    $errors[] = 'End Date must be in YYYY-MM-DD format.';
}

// Ensure startDate is earlier than endDate
if ($startDate && $endDate && $startDate > $endDate) {
    $errors[] = 'Start Date must be before the End Date.';
}

// If there are no errors, insert the data into the database
if (empty($errors)) {
    try {
        // Prepare the SQL query
        $sql = "INSERT INTO companypostings 
                (CompanyName, JobTitle, CompanyType, PositionPay, PositionType, JobDescription, StartDate, EndDate) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $dbh->prepare($sql);
        
        // Bind parameters to the prepared statement
        $stmtArgs = [$companyName, $jobTitle, $companyType, $positionPay, 
                    $positionType, $jobDescription, $startDate, $endDate];
        
        // Execute the prepared statement
        $stmt->execute($stmtArgs);
        
        // Return success JSON response
        echo json_encode([
            'success' => true,
            'errors' => ''
        ]);
    } catch (PDOException $e) {
        // Catch database errors and return a failure response
        echo json_encode([
            'success' => false,
            'errors' => 'Database error: ' . $e->getMessage()
        ]);
    }
} else {
    // If there are validation errors, return them in the response
    echo json_encode([
        'success' => false,
        'errors' => implode(' ', $errors)
    ]);
}
?>