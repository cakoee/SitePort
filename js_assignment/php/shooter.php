<!--
Name: Dee Liberman
Date: March 9
Description: Organization of banners for game over and pausing menus. Also holds
positioning for user data such as score and level. 

-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Star Shooter</title>

    <link rel="stylesheet" href="../css/shooter.css">

</head>
    <body >

        <!--Header Of Page-->
        <div class = "score" id = "scoreHeader">

            <!--Show User's Level-->
            <div class = "scoreSections" >

                <p>Level:</p>

                <p id = "level">1</p>

            </div>


            <!--Interactive "Help" Button for Game Instructions-->
            <div class = "scoreSections" id = "help">

                <div id = "helpButton"></div>

            </div>

            <!--Show User's Score-->
            <div class = "scoreSections">

                <p>Score:</p>

                <p id = "score">0</p>


            </div>

        </div>

        <!--Canvas That Hold's Splash Page and Gameplay-->
        <canvas id = "canvas">
        </canvas>

        <!--Footer of Page That Hold's User's Button's to Control Character-->
        <div class = "controlCenter" id = "controlCenter"> 

            <div id = "left" class="button-wrapper"><img src = "../images/move_left.webp"></div>
            <div id = "shoot" class="button-wrapper"><img src = "../images/shoot_button.webp"></div>
            <div id = "right" class="button-wrapper"><img src = "../images/move_right.webp"></div>

        </div>

        <!--Instructions on How To Play When User Presses Help Button -->
        <div class = "banner" id = "banner">
            <img id = "bannerImg" src = "../images/banner.webp">

            <p id = "helpText">How To Play</p>

            <div id = "instructions">
                <p>Hold down the left/right arrows 
                    on the bottom section of the screen to dodge stars.
                </p>

                <p>If a star hit's you, it's game over!
                </p>

                <p>Press the middle button to shoot lasers at stars to gain points.
                </p>

                <p>Small stars: 1 point
                </p>

                <p>Big stars: 2 points
                </p>

                <p>Levels:
                </p>

                <p>Score Of 20: Level 2
                </p>

                <p>Score Of 50: Level 3
                </p>

                <p>Don't get hit!
                </p>
            </div>

            <p id = "goBack"> Resume</p>

        </div>

        <!-- Show High Score When It's Game Over (And ask to restart or return to main menu)-->
        <div class = "gameOver" id = "gameOverBanner">

            <img id = "bannerImgGameOver" src = "../images/banner.webp">

            <p id = "gameOverTitle">Game Over</p>

            <div id = "userGameData">
                <p>Level:
                </p>

                <p id = "currentLevel"> 1
                </p>

                <p>Score:
                </p>

                <p id = "highScore">0
                </p>

            </div>

            <div id = "options">

                <p id = "exit"> Exit</p>
                <p id = "restart"> Restart</p>
                <p id = "leaderboard"> Leaderboard</p>

            </div>

        </div>

    </body>
    <script src = "../js/shooter.js"> </script> 
</html>