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
    <title>Company - Editing</title>

    <link rel="stylesheet" href="css/companyPages.css">
</head>

<body>
    <div id=container>
        <div id=left>
            <form action='companyHome.php'>
                <input type=submit value="Back">
            </form>
            <div class=companyEditable id=editTitle>
                <p id=companyName>Company Title: <br><?php echo $companyName ?></h3>
                <p>New Title: </p>
                <input type=text maxlength=100>
                <br>
                <input type=submit value="Change Title">
            </div>
            <div class=companyEditable id=editType>
                <p id=companyType>Company Type: <br><?php echo $companyType ?></h3>
                <p>New Type: </p>
                <input type=text maxlength=100>
                <br>
                <input type=submit value="Change Type">
            </div>
        </div>
        <div class=companyEditable id=right>
            <p id=currentJobsHeader>Current Job Postings:</p>
            <div class=dividingLine></div>
            <div id="jobs">
                <?php
                // Locally defined displayData function for retrieveCompanyPostings.php
                function displayData($row)
                {
                    echo "
                    <div class=jobBlock>
                        <form class='delete' method='POST' action='util/deleteCompanyJob.php'>
                            <input type='submit' value='X'>
                            <input type='hidden' name='jobTitle' value='" . htmlspecialchars($row['JobTitle']) . "'>
                            <input type='hidden' name='positionType' value='" . htmlspecialchars($row['PositionType']) . "'>
                            <input type='hidden' name='positionPay' value='" . htmlspecialchars($row['PositionPay']) . "'>
                            <input type='hidden' name='startDate' value='" . htmlspecialchars($row['StartDate']) . "'>
                            <input type='hidden' name='endDate' value='" . htmlspecialchars($row['EndDate']) . "'>
                            <input type='hidden' name='jobDescription' value='" . htmlspecialchars($row['JobDescription']) . "'>
                        </form>
                        <div class=jobContent>
                            <span id=jobTitle>Title: $row[JobTitle] | </span>
                            <span id=positionType>Position Type: $row[PositionType] | </span>
                            <span id=positionPay>Salary: $row[PositionPay] </span>
                            <br>
                            <span id=duration>Duration: $row[StartDate] - $row[EndDate] </span>
                            <details value=Description id=jobDescription>$row[JobDescription]</details>
                        </div>
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