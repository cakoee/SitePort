<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src = "js/verify.js"></script>
</head>
<body>
    <form action="guess2.php" method="get" id = "form">
        <input type="number" name="min" id="min" placeholder="Enter min">
        <input type="number" name="max" id="max" placeholder="Enter max">
        <button type="submit">Submit</button>
    </form>
        <p id = "status"></p>

</body>
</html>