<?php

include 'loginPHP/connect.php';

// Retrieve details from table
$getCompanyJobsSql = "SELECT * FROM `companypostings` WHERE `CompanyName`='$companyName'";
$getCompanyJobsStmt = $dbh->prepare($getCompanyJobsSql);
$getCompanyJobsSucc = $getCompanyJobsStmt->execute();

// Util functions
function cycleRow($getCompanyJobsStmt)
{
    return $getCompanyJobsStmt->fetch();
}

// Proper display and retrieval
while ($row = cycleRow($getCompanyJobsStmt)) {
    // Each displayData() function should be locally defined in their own files.
    displayData($row);
}

if ($getCompanyJobsStmt->rowCount() == 0) {
    echo "
    <div class=jobBlock>
        <span id=noJobs>No job postings found.</span>
    </div>
    ";
}
