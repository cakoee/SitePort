<?php
/*
 * Name: Dee Liberman
 * Date: March 29
 * Description: Displays the global leaderboard and the current user's personal stats.
 * Queries the database for the top 5 players by highest score, and retrieves the
 * current user's most recent level, high score, average score, and play time.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="../css/leaderboard.css">
</head>
<body>

    <?php
        require_once 'connect.php';
        $dbh = server();
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // --- User Stats ---

        // Get the most recent result entry to identify the current session
        $findResultsID = $dbh->prepare("SELECT `resultsid` FROM `results` ORDER BY `resultsid` DESC LIMIT 1");
        $findResultsID->execute();
        $resultsid = $findResultsID->fetchColumn();

        // Get the userid associated with the most recent result
        $findUserID = $dbh->prepare("SELECT `userid` FROM `results` WHERE `resultsid` = ?");
        $findUserID->execute([$resultsid]);
        $userid = $findUserID->fetchColumn();

        // Get the time from the most recent result
        $findTime = $dbh->prepare("SELECT `time` FROM `results` WHERE `resultsid` = ?");
        $findTime->execute([$resultsid]);
        $time = $findTime->fetchColumn();

        // Get the level from the most recent result
        $findLevel = $dbh->prepare("SELECT `level` FROM `results` WHERE `resultsid` = ?");
        $findLevel->execute([$resultsid]);
        $level = $findLevel->fetchColumn();

        // Get all past scores for the current user to compute stats
        $findPastScores = $dbh->prepare("SELECT `score` FROM `results` WHERE `userid` = ?");
        $findPastScores->execute([$userid]);
        $scoresArray = $findPastScores->fetchAll(PDO::FETCH_ASSOC);
        $pastScores = array_column($scoresArray, 'score');

        // Get the current user's highest score
        $findHighScore = $dbh->prepare("SELECT `score` FROM `results` WHERE `userid` = ? ORDER BY `score` DESC LIMIT 1");
        $findHighScore->execute([$userid]);
        $highScore = $findHighScore->fetchColumn();

        // Calculate the current user's average score across all sessions
        $average = ceil(array_sum($pastScores) / count($pastScores));


        // --- Global Leaderboard ---

        // Get the top 5 users by highest score, with level and time from that same game row
        $findTop5 = $dbh->prepare("
            SELECT r.userid, r.score, r.level, r.time
            FROM results r
            INNER JOIN (
                SELECT userid, MAX(score) AS top_score
                FROM results
                GROUP BY userid
            ) best ON r.userid = best.userid AND r.score = best.top_score
            ORDER BY r.score DESC
            LIMIT 5
        ");
        $findTop5->execute();
        $top5 = $findTop5->fetchAll(PDO::FETCH_ASSOC);

        $allScores = array_column($top5, 'score');
        $allLevels = array_column($top5, 'level');
        $allUsers  = array_column($top5, 'userid');
        $allTimes  = array_column($top5, 'time');
    ?>

    <div class="screen">

        <div class="darkmoon">

            <div class="leaderboard">

                <table id="table">
                    <thead>
                        <tr>
                            <th id="emptytitle" scope="col"> </th>
                            <th id="title" scope="col"> Score </th>
                            <th id="title" scope="col"> Level </th>
                            <th id="title" scope="col"> User </th>
                            <th id="title" scope="col"> Time </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td> <?= $allScores[0] ?> </td>
                            <td> <?= $allLevels[0] ?> </td>
                            <td> <?= $allUsers[0] ?> </td>
                            <td id="time"> <?= $allTimes[0] ?> </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td> <?= $allScores[1] ?> </td>
                            <td> <?= $allLevels[1] ?> </td>
                            <td> <?= $allUsers[1] ?> </td>
                            <td id="time"> <?= $allTimes[1] ?> </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td> <?= $allScores[2] ?> </td>
                            <td> <?= $allLevels[2] ?> </td>
                            <td> <?= $allUsers[2] ?> </td>
                            <td id="time"> <?= $allTimes[2] ?> </td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td> <?= $allScores[3] ?> </td>
                            <td> <?= $allLevels[3] ?> </td>
                            <td> <?= $allUsers[3] ?> </td>
                            <td id="time"> <?= $allTimes[3] ?> </td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td> <?= $allScores[4] ?> </td>
                            <td> <?= $allLevels[4] ?> </td>
                            <td> <?= $allUsers[4] ?> </td>
                            <td id="time"> <?= $allTimes[4] ?> </td>
                        </tr>
                    </tbody>
                </table>

                <table id="usertable">
                    <caption>Your Stats</caption>
                    <thead>
                        <tr>
                            <th id="title1EMPTY" scope="col"> </th>
                            <th id="title1Level" scope="col"> Level </th>
                            <th id="title1HighScore" scope="col"> High Score </th>
                            <th id="title1AvgScore" scope="col"> Average Score </th>
                            <th id="title1" scope="col"> Time </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th scope="row"></th>
                            <td> <?= $level ?> </td>
                            <td> <?= $highScore ?> </td>
                            <td> <?= $average ?> </td>
                            <td> <?= $time ?> </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>

        <div class="footer">
            <img id="menu" class="button" src="../images/menu.png">
            <img id="logout" class="button" src="../images/logout.png">
        </div>

    </div>

</body>
<script src="../js/leaderboard.js"></script>
</html>
