<?php
    session_start();
    $guess = filter_input(INPUT_GET,'guess',FILTER_UNSAFE_RAW);
    $num = $_SESSION['num'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slot Machine</title>
</head>
<body>
    <?php
    if(isset($_SESSION['num'])){
        if($guess == $num){
            echo "<p>Correct</p>";
        }else{
            echo "<p>Incorrect, the number was $num, you guessed $guess</p>";
        }
        session_destroy();
    }else{
        echo "<p>No Game</p>";
        exit();
    }
    ?>
</body>
</html>