<?php

include 'loginPHP/connect.php';
session_start();

// TODO Temporarily just hardcode details, remove during integration step
// $_SESSION["username"] = "Testing Industries LTD";
// $_SESSION["accountType"] = "company";
// $_SESSION["companyType"] = "dummy";

include 'util/verifyCompanyLogin.php';
if (!$companyLoginVerified) return -1;

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Company - Job Posting</title>

    <link rel="stylesheet" href="css/companyPages.css">
    <script src="js/companyJobPosition.js"></script>
</head>

<body>
    <div id=companyJobForm>
        <div id=top>
            <p id=companyName><?php echo $companyName ?></p>
            <p id=subtitle>New Job Posting</p>
        </div>

        <div id=bottom>
            <input id=goBackButton type=submit value="Go Back">
            <p>Job Title:</p>
            <textarea id=jobTitle maxlength=100 required></textarea>
            <p>Position Type:</p>
            <textarea id=positionType maxlength=100 required></textarea>
            <p>Annual Salary:</p>
            <input id=positionPay min=0 type=number required>
            <p>Job Description:</p>
            <textarea id=jobDescription required></textarea>
            <p>Start Date:</p>
            <input id=startDate type=date required>
            <p>End Date:</p>
            <input id=endDate type=date required>
            <input id=submitButton type=submit>
            <div id="response"></div>
        </div>
    </div>
</body>

</html>