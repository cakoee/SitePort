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

$selectRowSQL = function($table, $propertyName, $value) {
    global $dbh;
    $command = $dbh->prepare("SELECT * from `$table` WHERE `$propertyName` = ?");
    $command->execute([$value]);
    return $command->fetch();
};
?>