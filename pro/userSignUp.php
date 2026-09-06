<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel = "stylesheet" href = "css/login.css">
    <script src="js/userChecker.js"></script>
    <title>Document</title>
</head>
<body>
    <div class = "bigSections">
        <div class = "descContainer">
            <div>
                <h1>Join Job Joint as a User</h1>
                <p>Discover your dream job and connect with top employers on Job Joint. Our platform is designed to help you find the perfect opportunity that matches your skills and aspirations. Sign up today to create your profile, browse job listings, and apply to positions that excite you. Join Job Joint and take the next step in your career journey!</p>
            </div>
            </div>
            <div class = "formContainer">
            <form action = "userProcessor.php" method = "post" id="signupForm">
                <span>Username: </span>
                <input type = "text" name = "usrName" id = "usrName" required>
                <span>Password: </span>
                <input type = "password" id = "pwd1" name = "usrPass" required>
                <span>Confirm Password: </span>
                <input type = "password" id = "pwd2" name = "cUsrPass" required>
                <input type = "submit" value = "Sign Up" id = "submitBtn">
                <span id = "errorMsg"></span>
            </form>
    </div>
    <div class = "footerMobile">
            <a href = "index.html">Return to Sign-In</a>
        </div>
    </div>
    <div class = "footerNormal">
        <a href = "index.html">Return to Sign-In</a>
    </div>
    <?php
        
    ?>
</body>
</html>