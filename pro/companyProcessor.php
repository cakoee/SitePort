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
            $cmpName =  filter_input(INPUT_POST, 'cmpName', FILTER_UNSAFE_RAW);
            $cmpType =  filter_input(INPUT_POST, 'cmpType', FILTER_UNSAFE_RAW);
            $cmpPass =  filter_input(INPUT_POST, 'cmpPass', FILTER_UNSAFE_RAW);
            $stmt = $dbh->prepare('SELECT 1 FROM companylogins WHERE CompanyName = ? AND CompanyType = ? LIMIT 1');
            $stmt->execute([$cmpName, $cmpType]);
            $userExists = $stmt->fetchColumn();
            if($userExists) {
                header('Location: companySignUp.php');
                exit(); //as this code is only accessible with messing with requests, no error report needed, they know what they did.
            }
            else{
                $stmt = $dbh->prepare("INSERT INTO companylogins (CompanyName, CompanyType, Password) VALUES (?, ?, ?)");
                $stmt->execute([$cmpName, $cmpType, password_hash($cmpPass, PASSWORD_DEFAULT)]);
                $_SESSION['username'] = $cmpName;
                $_SESSION["accountType"] = "company";
                $_SESSION["companyType"] = $cmpType;
                header('Location: companyHome.php');
                exit();
            }
        }
        else {
            header('Location: companySignUp.php');
            exit();
        }
    ?>
</body>
</html>