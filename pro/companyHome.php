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
    <title>Company - Homepage</title>

    <link rel="stylesheet" href="css/companyPages.css">
</head>

<body>
    <div id=container>
        <div id=left>
            <p id=companyName><?php echo $companyName ?></p>
            <p id=companyType><?php echo $companyType ?></p>

            <form id="logoutButton" action="logout.php">
                <input type=submit value="Log Out">
            </form>

            <form id="editCompanyInfomation" action="companyEdit.php">
                <input type=submit value="Edit Company Information">
            </form>

            <form id="addCompanyPosition" action="companyJobPosition.php">
                <input type=submit value="Add Job Posting">
            </form>
        </div>

        <div id=right>
            <p id=currentJobsHeader>Current Job Postings:</p>
            <div class=dividingLine></div>
            <div id="jobs">
                <?php
                // Locally defined displayData function for retrieveCompanyPostings.php
                function displayData($row)
                {
                    echo "
                    <div class=jobBlock>
                        <div class=jobContent>
                            <span id=jobTitle>Title: $row[JobTitle] | </span>
                            <span id=positionType>Position Type: $row[PositionType] | </span>
                            <span id=positionPay>Salary: $row[PositionPay] </span>
                            <br>
                            <span id=duration>Duration: $row[StartDate] - $row[EndDate] </span>
                            <details value=Description id=jobDescription>$row[JobDescription]</details>
                    </div>
                    ";
                }

                include 'util/retrieveCompanyPostings.php'

                ?>
            </div>
        </div>
    </div>
</body>

</html>