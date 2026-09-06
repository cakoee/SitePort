<!--
- Brayden Scott
- 2026-04-04
- Handles checking if entered companies already exist within the database.
-->
<?php

include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo '0';
    exit;
}

$cmpName = isset($_POST['cmpName']) ? trim(filter_input(INPUT_POST, 'cmpName', FILTER_UNSAFE_RAW)) : '';
$cmpType = isset($_POST['cmpType']) ? trim(filter_input(INPUT_POST, 'cmpType', FILTER_UNSAFE_RAW)) : '';

if ($cmpName === '' || $cmpType === '') {
    echo '0';
    exit;
}

try {
    $stmt = $dbh->prepare('SELECT 1 FROM companylogins WHERE CompanyName = ? AND CompanyType = ? LIMIT 1');
    $stmt->execute([$cmpName, $cmpType]);
    $exists = $stmt->fetchColumn();

    if ($exists) {
        echo '0';
    } else {
        echo '1';
    }
} catch (PDOException $e) {
    echo '0';
}
