<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise 1</title>
</head>
<body>

    <?php

        $output = "Password must be at least 6 character's long, contains uppercase letters, lowercase letters, digits, and symbols.";
        $color = "white";
        $passValue = "";

        if (isset($_GET['submit'])) {

            $pass = filter_input(INPUT_GET, "password", FILTER_SANITIZE_SPECIAL_CHARS);
            $passValue = htmlspecialchars($_GET['password']);

            if (strlen($pass) >= 6){

                $digit = 0;
                $lower = 0;
                $upper = 0;
                $special = 0;

                for ($i = 0; $i < strlen($pass); ++$i){

                    if (strpbrk($pass[$i], '0123456789')){
                        ++$digit;
                    }

                    if ( ctype_lower($pass[$i]) ){
                        ++$lower;
                    }

                    if ( ctype_upper($pass[$i]) ){
                        ++$upper;
                    }

                    if ( preg_match('/[^a-zA-Z0-9]/', $pass[$i]) ){
                        ++$special;
                    }

                }

                if ($digit > 0 && $lower > 0 && $upper > 0 && $special > 0){
                    $output = "Valid password.";
                    $color = "green";
                } else {
                    $output = "Password must be at least 6 character's long, contains uppercase letters, lowercase letters, digits, and symbols.";
                    $color = "red";
                }

            } else {
                $output = "Error. Password must be at least 6 characters.";
                $color = "red";
            }

        }

    ?>

    <form action="chpt38.php" method="get">

        <label for="password">Enter Password: </label>
        <input id="password" type="password" name="password" required
               value="<?= $passValue ?>"
               style="background-color: <?= $color ?>">

        <input id="submit" name="submit" type="Submit" value="Submit">
    </form>
    <p id="output"><?= $output ?></p>

</body>
</html>