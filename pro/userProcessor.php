<!--
- Brayden Scott
- 2026-04-04
- Upon form submission, makes sure its not adding a duplicate entry, then adds a user account to the database
-->
<?php session_start();?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        include 'connect.php';
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usrName =  filter_input(INPUT_POST, 'usrName', FILTER_UNSAFE_RAW);
            $usrPass =  filter_input(INPUT_POST, 'usrPass', FILTER_UNSAFE_RAW);
            $stmt = $dbh->prepare('SELECT 1 FROM userlogins WHERE Username = ? LIMIT 1');
            $stmt->execute([$usrName]);
            $userExists = $stmt->fetchColumn();
            if($userExists) {
                header('Location: userSignUp.php');
                exit(); //as this page is only accessible with messing with requests, no error report needed.
            }
            else{
                $stmt = $dbh->prepare("INSERT INTO userlogins (Username, Password) VALUES (?, ?)");
                $stmt->execute([$usrName, password_hash($usrPass, PASSWORD_DEFAULT)]);
                $_SESSION['username'] = $usrName;
                $_SESSION['accountType'] = "applicant";
                header('Location: userSpreadsheet.php');
                exit();
            }
        }
        else {
            header('Location: userSignUp.php');
            exit();
        }
    ?>
</body>
</html>