<!DOCTYPE html>
<!-- A very simple PHP Template. Sam Scott, McMaster University, 2025 -->
<html>

<head>
    <title>Fruit Slot Machine</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="slotMachine.css">
</head>

<body>
    <?php

    $status = "";

    $fruits = array("fruit/1.png", "fruit/2.png", "fruit/3.png", "fruit/4.png", "fruit/5.png", "fruit/6.png", "fruit/7.png");

    $cherry = $fruits[0];
    $apple = $fruits[1];
    $grape = $fruits[2];
    $lemon = $fruits[3];
    $orange = $fruits[4];
    $pear = $fruits[5];
    $watermelon = $fruits[6];

    #Three random fruits for slot image
    $slot1 = rand(0,6);
    $slot2 = rand(0,6);
    $slot3 = rand(0,6);

    if ($slot1 == $slot2 && $slot2 == $slot3){
        $status = "Jackpot!";
    }

    else if ($slot1 == $slot2 || $slot1 == $slot3 || $slot2 == $slot3){
        $status = "Win!";
    }

    $slot1Img = $fruits[$slot1];
    $slot2Img = $fruits[$slot2];
    $slot3Img = $fruits[$slot3];

    ?>

    <div id = "resultStatus">
        <p> <?= $status ?></P>
    </div>

    <div class = "machine">

        <div class = "slot">

            <div class = "slots" id = "slot1">

            <img src = <?= $slot1Img ?>>

            </div>
            <div class = "slots" id = "slot2">

            <img src = <?= $slot2Img ?>>

            </div>
            <div class = "slots" id = "slot3">

            <img src = <?= $slot3Img ?>>

            </div>

        </div>

        <button onclick="window.location.reload()" type = "button" > Roll </button>

    </div>


</body>

</html>

