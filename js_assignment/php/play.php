<?php
/*
 * Name: Dee Liberman
 * Date: March 29
 * Description: Receives game result data as JSON from the client after a game session ends,
 * then inserts the score, level, time, and date into the results table in the database,
 * associated with the currently logged-in user.
 */

session_start();
$userid = $_SESSION['username'];

// Read and decode the JSON body sent from the game client
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if ($data) {
    $level       = $data['level'];
    $score       = $data['score'];
    $timeSec     = $data['time'];
    $currentDate = $data['date'];

    // Convert total seconds into HH:MM:SS format
    $hours   = str_pad(floor($timeSec / 3600), 2, '0', STR_PAD_LEFT);
    $minutes = str_pad(floor(($timeSec % 3600) / 60), 2, '0', STR_PAD_LEFT);
    $seconds = str_pad($timeSec % 60, 2, '0', STR_PAD_LEFT);
    $time    = "$hours:$minutes:$seconds";

    try {
        require_once 'connect.php';
        $dbh = server();
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Insert the game result into the database
        $addData = $dbh->prepare("INSERT INTO `results` (`userid`, `score`, `level`, `time`, `date`) VALUES (?, ?, ?, ?, ?)");
        $addData->execute([$userid, $score, $level, $time, $currentDate]);

        echo "success";
    } catch (Exception $e) {
        echo "DB error: " . $e->getMessage();
    }
} else {
    echo "no data received";
}
