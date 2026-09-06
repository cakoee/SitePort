<?php
    session_start();
    if(isset($_GET['min'])){
        $min = filter_input(INPUT_GET,'min', FILTER_UNSAFE_RAW);
        $max = filter_input(INPUT_GET,'max', FILTER_UNSAFE_RAW);
        $_SESSION['min'] = $min;
        $_SESSION['max'] = $max;
        $num = rand($min, $max);
        $_SESSION['num'] = $num;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="guess3.php" method="get">
        <input type="number" name="guess" placeholder="Enter a guess">
        <button type="submit">Submit</button>
</body>
</html>