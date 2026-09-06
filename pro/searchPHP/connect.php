<?php
$dbh;
$error;
$username = "root";
$password = "";
$dbname = "radsuitBase";
$host = "127.0.0.1";

try {
    $dbh = new PDO ("mysql:host=$host;dbname=$dbname", $username, $password);
} catch (Exception $e) {
    $error = $e;
}

$executeSelectQuery = function ($queryString, $values) {
    global $dbh;
    $data = [];
    $command = $dbh->prepare($queryString);
    $command->execute($values);
    while ($row = $command->fetch()) array_push($data, $row);
    return $data;
};

$selectAllRowsOneProperty = function ($table, $propertyName) {
    global $dbh;
    $data = [];
    $command = $dbh->prepare("SELECT `$propertyName` from `$table` WHERE 1");
    $command->execute([]);
    while ($row = $command->fetch()) array_push($data, $row[0]);
    return $data;
};

$selectRowSQL = function($table, $propertyName, $value) {
    global $dbh;
    $command = $dbh->prepare("SELECT * from `$table` WHERE `$propertyName` = ?");
    $command->execute([$value]);
    return $command->fetch();
};
?>