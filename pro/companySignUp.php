<!--
- Brayden Scott
- 2026-04-04
- The page that the company inputs their info into, does not allow submission unless its deemed valid
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel = "stylesheet" href = "css/login.css">
    <script src="js/companyChecker.js"></script>
    <title>Document</title>
</head>
<body>
    <div class = "bigSections">
        <div class = "descContainer">
            <div>
                <h1>Join Job Joint as a Company</h1>
                <p>Discover top talent and grow your business with Job Joint. Our platform connects you with skilled professionals actively seeking new opportunities. Sign up today to post job openings, access a vast pool of candidates, and find the perfect fit for your team. Join Job Joint and take your hiring process to the next level!</p>
            </div>
        </div>
        <div class = "formContainer">
            <form action = "companyProcessor.php" method = "post" id="signupForm">
                <div id = "specialRow">
                    <div>
                        <span>Organization Name: </span>
                        <input type = "text" id = "cmpName" name = "cmpName" required>
                    </div>
                    <div>
                        <span>Organization Type: </span>
                        <input type = "text" name = "cmpType" id = "cmpType" required>
                    </div>
                </div>
                <span>Password: </span>
                <input type = "password" id = "pwd1" name = "cmpPass" required>
                <span>Confirm Password: </span>
                <input type = "password" id = "pwd2" name = "cCmpPass" required>
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