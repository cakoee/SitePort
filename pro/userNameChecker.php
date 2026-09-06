<!--
- Brayden Scott
- 2026-04-04
- Handles checking if entered usernames already exist within the database.
-->
<?php

include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo '0';
    exit;
}

$usrName = isset($_POST['usrName']) ? trim(filter_input(INPUT_POST, 'usrName', FILTER_UNSAFE_RAW)) : '';

if ($usrName === '') {
    echo '0';
    exit;
}

try {
    $stmt = $dbh->prepare('SELECT 1 FROM userlogins WHERE Username = ? LIMIT 1');
    $stmt->execute([$usrName]);
    $exists = $stmt->fetchColumn();

    if ($exists) {
        echo '0';
    } else {
        echo '1';
    }
} catch (PDOException $e) {
    echo '0';
}
