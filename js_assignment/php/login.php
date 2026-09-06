<?php
/*
 * Name: Dee Liberman
 * Date: March 29
 * Description: Processes login and account creation. Validates the submitted email
 * and birthdate, checks the database for a matching account, and either logs the user
 * in, creates a new account, or returns an appropriate error message. Stores the
 * username in a session variable for use in subsequent pages.
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login/Signup</title>
    <link rel="stylesheet" href="../css/A4.css">
</head>
<body>

<?php
session_start();

$message = "";
$continue = 0;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Validate email input
    $email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
    if ($email === null or $email == false) {
        $message = "Invalid email.";
    } else {
        $continue++;
    }

    // Validate birthdate input
    $date = filter_input(INPUT_POST, "date", FILTER_SANITIZE_SPECIAL_CHARS);
    if ($date === null or $date == false) {
        $message = "Invalid birthdate.";
    } else {
        $continue++;
    }

    // If both inputs are valid, check the database for a matching account
    if ($continue === 2) {

        require_once 'connect.php';
        $dbh = server();
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Look up the birthdate stored for the given email
        $findDate = $dbh->prepare("SELECT `birthdate` FROM `userdata` WHERE `email` = ? ");
        $findDate->execute([$email]);
        $userDate = $findDate->fetchColumn();

        // Look up the email associated with the given birthdate
        $findEmail = $dbh->prepare("SELECT `email` FROM `userdata` WHERE `birthdate` = ?");
        $findEmail->execute([$date]);
        $userEmail = $findEmail->fetchColumn();

        // Look up whether the entered email exists in the database
        $findEmail2 = $dbh->prepare("SELECT `email` FROM `userdata` WHERE `email` = ?");
        $findEmail2->execute([$email]);
        $userEmail2 = $findEmail2->fetchColumn();

        // Reject login if the email exists but does not match the provided birthdate
        if ($date != $userDate) {
            $message = "Account exists, but email does not match birthdate.";
        }

        // Log in if both email and birthdate match an existing account
        if ($userDate == $date && $userEmail == $email) {
            $findUsername = $dbh->prepare("SELECT `username` FROM `userdata` WHERE `email` = ?");
            $findUsername->execute([$email]);
            $username = $findUsername->fetchColumn();

            $message = "Welcome back, $username!";
            $_SESSION['username'] = $username;
        }

        // Create a new account if the email does not exist in the database
        if ($userEmail2 === false) {

            // Generate a username from the part of the email before the @ symbol
            $username = "";
            for ($i = 0; $i < strlen($email); $i++) {
                if ($email[$i] != "@") {
                    $username .= "$email[$i]";
                } else {
                    break;
                }
            }

            $message = "Account Created. Welcome, $username!";

            // Insert the new user into the database
            $addUser = $dbh->prepare("INSERT INTO `userdata` (`email`, `username`, `birthdate`) VALUES (?, ?, ?) ");
            $addUser->execute([$email, $username, $date]);

            $_SESSION['username'] = $username;
        }

        $uh = json_encode($username);
        echo "<script>console.log('login page: " . $uh . "');</script>";
    }
}
?>

<div class="box">

    <div class="inputArea">

        <div id="welcome" class="welcome">

            <p id="message" data-php-value="<?php echo htmlspecialchars($message); ?>">
                <?= $message ?>
            </p>

            <button id="play">Start Game</button>
            <button id="login">Back To Login</button>

        </div>

    </div>

    <div id="MC">
    </div>

    <div class="cloudsTop">
    </div>
    <div class="cloudsBottom">
    </div>

</div>

</body>
<script src="../js/A4.js"></script>
</html>
