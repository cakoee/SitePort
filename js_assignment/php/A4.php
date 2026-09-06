<!--
    Name: Dee Liberman
    Date: March 29
    Description: Login/signup entry page. Presents the email and birthday input form
    that submits to login.php for account lookup and creation.
-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log In</title>
    <link rel="stylesheet" href="../css/A4.css">
</head>
<body>

<form class="box" action="login.php" method="post">

    <div class="inputArea">

        <div class="inputBoxes">

            <p>Enter Email</p>
            <div class="userInput">
                <input id="email" name="email" type="email" required>
            </div>

            <p>Enter Birthday</p>
            <div class="userInput">
                <input id="date" name="date" type="date" required>
            </div>

        </div>

        <input id="continue" name="continue" type="submit" value="Continue">

    </div>

    <div id="MC">
    </div>

    <div class="cloudsTop">
    </div>
    <div class="cloudsBottom">
    </div>

</form>

</body>
</html>
