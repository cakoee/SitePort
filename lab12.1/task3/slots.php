<?php
session_start();
if(!isset($_SESSION["money"])) $_SESSION["money"] = 10;
?>
<!DOCTYPE html>
<!-- A very simple PHP Template. Sam Scott, McMaster University, 2025 -->
<html>

<head>
    <title>TODO supply a title</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href ="css/styles.css">
    <script src = "js/slots.js"></script>
</head>

<body>
<h2 class = "title">Slots</h2><h2 class = "title" id = "cash">$<?= $_SESSION["money"] ?></h2>
<div class = "slotArea">
    <img id = "slot1" src ="">
    <img id = "slot2" src ="">
    <img id = "slot3" src ="">
</div>
<p class = "result", id = "result">Place your bet</p>
<br>
<div class = "folklore">
    <button id = "spin">Spin</button>
    <input id = "bet" type = "number" min = "1" step = "1" placeholder = "Input Bet">
</div>
</body>

</html>