/*
 * Name: Dee Liberman
 * Date: March 9
 * Description: Game logic for Star Shooter. Draws all game elements on the canvas,
 * handles gameplay animations, collision detection, scoring, level progression,
 * the splash page, pause/help menu, and game over state. Navigates the user to
 * the leaderboard or back to the splash page based on interaction.
 */

window.addEventListener("load", function() {

    // Prevent iPhone default behavior that interferes with gameplay
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    }, false);

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');

    // Playable Character
    const plane = document.createElement("img");
    plane.src = "../images/plane.webp";
    const planeWidth = 90;
    const planeHeight = 25;
    let plane_x = canvas.width / 3;
    let plane_y = canvas.height;

    // Control Center Buttons
    const left_button = document.getElementById("left");
    const right_button = document.getElementById("right");
    const shoot_button = document.getElementById("shoot");

    // Movement flags
    let movingLeft = false;
    let movingRight = false;

    // Array to hold all active lasers
    let activeLasers = [];

    // Array to hold all small stars
    let activeStars = [];
    let lastSpawnTime = 0;
    let smallStarSpeed = 1;

    // Array for all big stars
    let activeFallingStars = [];
    let lastSpawnTimeBigStar = 0;
    let bigStarSpeed = 1;

    // Level spawn time intervals (milliseconds)
    let smallStarMin = 2000;
    let smallStarMax = 7000;
    let BigStarMin = 5000;
    let BigStarMax = 100000;

    // Score & Level
    let level = 1;
    let score = 0;
    let scoreOnScreen = document.getElementById("score");
    let levelOnScreen = document.getElementById("level");

    // Game running state
    let gameRunning = false;
    let isGameOver = false;
    let gameLoopId = null; // Track animation frame ID

    // Timer - only counts while game is actively running
    let gameStartTime = null;   // Wall-clock time when this play session started
    let gameElapsedSeconds = 0; // Accumulated seconds across pauses

    // Pause Banner
    const banner = document.getElementById("banner");
    const bannerImg = document.getElementById("bannerImg");
    const helpButton = document.getElementById("helpButton");
    const goBack = document.getElementById("goBack");

    // Game Over Banner
    const gameOverBanner = document.getElementById("gameOverBanner");
    const gameOverbannerImg = document.getElementById("bannerImgGameOver");
    const highestLevel = document.getElementById("currentLevel");
    const highestScore = document.getElementById("highScore");
    const exitButton = document.getElementById("exit");
    const restartButton = document.getElementById("restart");
    const leaderboardButton = document.getElementById("leaderboard");

    // Splash page state
    let isSplashPageActive = true;
    const footer = document.getElementById("controlCenter");
    const header = document.getElementById("scoreHeader");

    // Game title animation values
    let gameTitleX = canvas.width / 3.5;
    let gameTitleY = canvas.height / 2.5;
    let gameTitleDirection = 1;

    // Splash page instruction text position
    let splashInstructX = canvas.width / 4.5;
    let splashInstructY = canvas.height / 2;

    // Play Button
    const playButton = document.createElement("img");
    playButton.src = "../images/playButton.webp";
    let playX = canvas.width / 3.25;
    let playY = canvas.height / 1.8;
    let playWidth = 120;
    let playHeight = 50;

    // Moon Image
    const moon = document.createElement("img");
    moon.src = "../images/moon.webp";
    let moonX = canvas.width - canvas.width / 0.950;
    let moonY = canvas.height / 100;
    let moonDirection = 1; // 1 for down, -1 for up
    const moonWidth = 325;
    const moonHeight = 100;

    // Menu Banner
    const splashMenu = document.createElement("img");
    splashMenu.src = "../images/startBanner.webp";
    let menuX = canvas.width - canvas.width / 0.925;
    let menuY = canvas.height / 100;
    let menuDirection = 1;
    let menuWidth = 350;
    let menuHeight = 130;

    // Decorative Star in Splash Page
    const splashStar = document.createElement("img");
    splashStar.src = "../images/startStar.webp";
    let splashStarX = canvas.width / 100;
    let splashStarY = (canvas.height - canvas.height / 2.5);
    let splashStarDirection = 1;
    let splashStarWidth = 70;
    let splashStarHeight = 25;

    // Decorative Sparkle in Splash Page
    const splashSparkle = document.createElement("img");
    splashSparkle.src = "../images/startSparkle.webp";
    let splashSparkleX = canvas.width - canvas.width / 5;
    let splashSparkleY = canvas.height / 2 + canvas.height / 6;
    let splashSparkleDirection = 1;
    let splashSparkleWidth = 46;
    let splashSparkleHeight = 22;

    let highScore = 0;
    let highLevel = 1;
    let lastScore = 0;


    // ------ Game Start ------

    /**
     * Animates the player's plane entering the screen from below before gameplay starts.
     * Runs frame-by-frame until the plane reaches its starting gameplay position.
     */
    function enterScreen() {
        if (plane_y > canvas.height - (planeHeight + planeHeight / 6)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(plane, plane_x, plane_y, planeWidth, planeHeight);
            plane_y = plane_y - 1;
            requestAnimationFrame(enterScreen);
        }
    }

    /**
     * Starts the game by triggering the enter animation and then beginning the main game loop.
     * Sets gameRunning to true and records the start time for the session timer.
     */
    function startGame() {
        requestAnimationFrame(enterScreen);
        setTimeout(() => {
            gameRunning = true;
            gameStartTime = Date.now();
            gameLoop();
        }, 1000);
    }

    // Click play button on splash page to start the game
    canvas.addEventListener("click", (evt) => {
        if (isSplashPageActive) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const clickX = (evt.clientX - rect.left) * scaleX;
            const clickY = (evt.clientY - rect.top) * scaleY;

            // Only start if the play button area is clicked
            const padding = 20;
            if (
                clickX >= playX - padding &&
                clickX <= playX + playWidth + padding &&
                clickY >= playY - padding &&
                clickY <= playY + playHeight + padding
            ) {
                startNewGame();
            }
            return;
        }

        startGame();
    });

    // Show game tutorial and pause the game when help button is pressed
    helpButton.addEventListener("click", function() {
        banner.style.visibility = "visible";
        bannerImg.style.visibility = "visible";
        // Snapshot elapsed time before pausing so the timer doesn't keep counting
        if (gameStartTime !== null) {
            gameElapsedSeconds += Math.floor((Date.now() - gameStartTime) / 1000);
            gameStartTime = null;
        }
        gameRunning = false;
    });

    // Hide game instructions and resume the game when "Resume" is clicked
    goBack.addEventListener("click", function() {
        banner.style.visibility = "hidden";
        bannerImg.style.visibility = "hidden";
        movingLeft = false;
        movingRight = false;
        gameRunning = true;
        gameStartTime = Date.now();
        gameLoopId = requestAnimationFrame(gameLoop);
    });

    /**
     * Checks whether a single point lies within a rectangle's bounds.
     *
     * @param {Number} px - The x coordinate of the point
     * @param {Number} py - The y coordinate of the point
     * @param {Object} rect - An object with x, y, width, and height properties
     * @returns {Boolean} True if the point is inside the rectangle, false otherwise
     */
    function pointInRect(px, py, rect) {
        return px >= rect.x &&
            px <= rect.x + rect.width &&
            py >= rect.y &&
            py <= rect.y + rect.height;
    }

    /**
     * Checks whether two rectangles overlap (AABB collision detection).
     *
     * @param {Object} rect1 - First rectangle with x, y, width, height properties
     * @param {Object} rect2 - Second rectangle with x, y, width, height properties
     * @returns {Boolean} True if the rectangles overlap, false otherwise
     */
    function rectOverlap(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }

    /**
     * Main game loop. Runs every animation frame while the game is active.
     * Handles level progression, plane movement, laser/star drawing and movement,
     * collision detection, and spawning of obstacles.
     */
    function gameLoop() {
        if (!gameRunning) return;

        // Level 2 when score reaches 20
        if (score > 19) {
            level = 2;
            levelOnScreen.textContent = level;
            smallStarMin = 800;
            smallStarMax = 2700;
            BigStarMin = 2000;
            BigStarMax = 10000;
        }

        // Level 3 when score reaches 50
        if (score > 49) {
            level = 3;
            levelOnScreen.textContent = level;
            levelOnScreen.style.animation = "colorChange 2s ease-in-out 0s infinite alternate forwards";
            smallStarMin = 400;
            smallStarMax = 650;
            smallStarSpeed = 2;
            BigStarMin = 1000;
            BigStarMax = 2000;
            bigStarSpeed = 1;
        }

        // Current millisecond timestamp for spawn timing
        const now = performance.now();

        // Clear canvas for new frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Handle plane movement
        if (movingLeft && plane_x > 0) {
            plane_x -= 2.5;
        }
        if (movingRight && plane_x < canvas.width - planeWidth) {
            plane_x += 2.5;
        }

        ctx.drawImage(plane, plane_x, plane_y, planeWidth, planeHeight);

        // Check player collision with small stars
        const playerRect = { x: plane_x, y: plane_y, width: planeWidth, height: planeHeight };
        for (let j = activeStars.length - 1; j >= 0; j--) {
            const star = activeStars[j];
            if (rectOverlap(playerRect, star)) {
                triggerGameOver();
                break;
            }
        }

        // Check player collision with big stars
        for (let j = activeFallingStars.length - 1; j >= 0; j--) {
            const bigStar = activeFallingStars[j];
            if (rectOverlap(playerRect, bigStar)) {
                triggerGameOver();
                break;
            }
        }

        // Update and draw all active lasers
        for (let i = activeLasers.length - 1; i >= 0; i--) {
            let laser = activeLasers[i];
            laser.laser_y -= 1; // Move laser upward each frame
            ctx.drawImage(laser.img, laser.laser_x, laser.laser_y, laser.laser_width, laser.laser_height);

            // Laser tip point (top-center of the sprite)
            const tipX = laser.laser_x + laser.laser_width / 2;
            const tipY = laser.laser_y;

            // Check collision against all small stars
            let hit = false;
            for (let j = activeStars.length - 1; j >= 0; j--) {
                const star = activeStars[j];
                if (pointInRect(tipX, tipY, star)) {
                    activeStars.splice(j, 1);
                    activeLasers.splice(i, 1);
                    score += 1;
                    scoreOnScreen.textContent = score;
                    hit = true;
                    break;
                }
            }

            if (hit) continue;

            // Check collision against big stars
            for (let j = activeFallingStars.length - 1; j >= 0; j--) {
                const bigStar = activeFallingStars[j];
                if (pointInRect(tipX, tipY, bigStar)) {
                    activeFallingStars.splice(j, 1);
                    activeLasers.splice(i, 1);
                    score += 2;
                    scoreOnScreen.textContent = score;
                    hit = true;
                    break;
                }
            }

            if (hit) continue;

            // Remove laser if it has moved off-screen
            if (laser.laser_y + laser.laser_height < 0) {
                activeLasers.splice(i, 1);
            }
        }

        // -- Small Stars --

        // Update and draw all active small stars
        for (let i = activeStars.length - 1; i >= 0; i--) {
            let star = activeStars[i];
            star.y += smallStarSpeed;
            ctx.drawImage(star.img, star.x, star.y, star.width, star.height);

            // Remove star if it has moved off-screen
            if (star.y > canvas.height) {
                activeStars.splice(i, 1);
            }
        }

        // Spawn new small stars at random intervals
        if (now - lastSpawnTime > getRandomPos(smallStarMin, smallStarMax)) {
            spawnStar();
            lastSpawnTime = now;
        }

        // -- Big Stars --

        // Update and draw all active big stars
        for (let j = activeFallingStars.length - 1; j >= 0; j--) {
            let fallingStar = activeFallingStars[j];
            fallingStar.y += bigStarSpeed;
            ctx.drawImage(fallingStar.img, fallingStar.x, fallingStar.y, fallingStar.width, fallingStar.height);

            // Remove if off-screen
            if (fallingStar.y > canvas.height) {
                activeFallingStars.splice(j, 1);
            }
        }

        // Spawn new big stars at random intervals
        if (now - lastSpawnTimeBigStar > getRandomPos(BigStarMin, BigStarMax)) {
            spawnFallingStar();
            lastSpawnTimeBigStar = now;
        }

        // Update session high score and level
        if (score > highScore) highScore = score;
        if (level > highLevel) highLevel = level;

        // Continue the loop
        if (gameRunning) {
            gameLoopId = requestAnimationFrame(gameLoop);
        }
    }


    // ------ Game Over ------

    /**
     * Ends the game session. Stops the game loop and timer, saves results to the
     * database via play.php, and displays the game over banner with final stats.
     */
    function triggerGameOver() {
        gameRunning = false;
        isGameOver = true;

        // Stop the clock and finalize elapsed time
        if (gameStartTime !== null) {
            gameElapsedSeconds += Math.floor((Date.now() - gameStartTime) / 1000);
            gameStartTime = null;
        }

        // Build YYYY-MM-DD date string
        const today = new Date();
        const date = today.getFullYear() + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            String(today.getDate()).padStart(2, '0');

        // Send result to the database
        fetch('play.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                score: score,
                level: level,
                time: gameElapsedSeconds,
                date: date
            })
        }).catch(err => console.error("Failed to save game data:", err));

        gameOverBanner.style.visibility = "visible";
        gameOverbannerImg.style.visibility = "visible";
        highestLevel.textContent = highLevel;
        highestScore.textContent = highScore;
    }

    /**
     * Resets all game state variables and UI elements to their default values
     * in preparation for a new game session.
     */
    function resetGameState() {
        // Cancel any existing game loop
        if (gameLoopId) {
            cancelAnimationFrame(gameLoopId);
            gameLoopId = null;
        }

        isGameOver = false;
        isSplashPageActive = false;

        // Reset all visuals and variables
        gameOverBanner.style.visibility = "hidden";
        gameOverbannerImg.style.visibility = "hidden";
        banner.style.visibility = "hidden";
        bannerImg.style.visibility = "hidden";

        footer.style.visibility = "visible";
        header.style.visibility = "visible";

        canvas.style.border = "0";
        canvas.style.visibility = "visible";

        score = lastScore;
        level = 1;
        scoreOnScreen.textContent = score;
        levelOnScreen.textContent = level;
        levelOnScreen.style.animation = "";

        plane_x = canvas.width / 3;
        plane_y = canvas.height;

        activeLasers = [];
        activeStars = [];
        activeFallingStars = [];

        lastSpawnTime = 0;
        lastSpawnTimeBigStar = 0;
        smallStarSpeed = 1;
        bigStarSpeed = 1;
        smallStarMin = 2000;
        smallStarMax = 7000;
        BigStarMin = 5000;
        BigStarMax = 100000;

        // Reset timer for new game
        gameElapsedSeconds = 0;
        gameStartTime = null;
    }

    /**
     * Resets all game state and starts a fresh game session with the enter animation.
     */
    function startNewGame() {
        resetGameState();

        requestAnimationFrame(enterScreen);
        setTimeout(() => {
            gameRunning = true;
            gameStartTime = Date.now();
            gameLoop();
        }, 1000);
    }

    // Restart the game when the restart button is pressed on game over
    restartButton.addEventListener("click", () => {
        lastScore = 0;
        startNewGame();
    });

    // Navigate to the global leaderboard page
    leaderboardButton.addEventListener("click", () => {
        const newUrl = "https://cs1xd3.cas.mcmaster.ca/~libermad/js_assignment/php/leaderboard.php";
        window.history.pushState({ path: newUrl }, '', newUrl);
        location.reload();
    });


    // ------ Splash Page ------

    // Start splash page on page load
    showSplashPage();

    // Exit to splash page when exit button is pressed on game over
    exitButton.addEventListener("click", () => {
        if (!isGameOver) return;

        gameOverBanner.style.visibility = "hidden";
        gameOverbannerImg.style.visibility = "hidden";
        footer.style.visibility = "hidden";
        header.style.visibility = "hidden";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        showSplashPage();
    });

    /**
     * Initializes and displays the splash page. Resets element positions,
     * starts the splash animation loop, and applies the canvas border style.
     */
    function showSplashPage() {
        isSplashPageActive = true;
        isGameOver = false;

        // Reset positions for a fresh splash
        moonY = canvas.height / 100;
        menuY = canvas.height / 100;
        splashStarY = (canvas.height - canvas.height / 2.5);
        splashSparkleY = canvas.height / 2 + canvas.height / 6;
        gameTitleY = canvas.height / 2.5;

        animateSplashMenu();

        // Canvas border only visible on the splash page
        canvas.style.border = "10px dotted rgb(210, 186, 227)";
        canvas.style.borderRight = "0";
        canvas.style.borderLeft = "0";
    }

    /**
     * Animates all splash page elements on the canvas each frame.
     * Draws decorative images, title text, instructions, and the play button.
     * Floats elements up and down and reverses direction at movement bounds.
     * Loops via requestAnimationFrame until the splash page is no longer active.
     */
    function animateSplashMenu() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(moon, moonX, moonY, moonWidth, moonHeight);
        ctx.drawImage(splashMenu, menuX, menuY, menuWidth, menuHeight);
        ctx.drawImage(splashStar, splashStarX, splashStarY, splashStarWidth, splashStarHeight);
        ctx.drawImage(splashSparkle, splashSparkleX, splashSparkleY, splashSparkleWidth, splashSparkleHeight);

        // Title text
        ctx.font = "20px PixelifySans";
        ctx.fillStyle = "rgb(18, 2, 21);";
        ctx.fillText("Star Shooter", gameTitleX, gameTitleY);

        // Instruction text
        ctx.font = "12px PixelifySans";
        ctx.fillText("You are an alien on a mission,", splashInstructX, splashInstructY);
        ctx.fillText("avoid incoming stars and shoot", splashInstructX, splashInstructY + 10);
        ctx.fillText(" for points!", splashInstructX + 50, splashInstructY + 20);

        // Play button
        ctx.drawImage(playButton, playX, playY, playWidth, playHeight);

        // Move elements up or down each frame
        moonY += moonDirection * 0.02;
        menuY += menuDirection * 0.05;
        splashStarY += splashStarDirection * 0.05;
        splashSparkleY += splashSparkleDirection * 0.05;
        gameTitleY += gameTitleDirection * 0.05;

        // Reverse direction at movement bounds
        if (moonY <= canvas.height / 100 || moonY >= canvas.height / 25) moonDirection *= -1;
        if (menuY <= (canvas.height / 100) || menuY >= canvas.height / 25) menuDirection *= -1;
        if (splashStarY <= (canvas.height - canvas.height / 2.5) - 1 || splashStarY >= (canvas.height - canvas.height / 2.5) + 1) splashStarDirection *= -1;
        if (splashSparkleY <= (canvas.height / 2 + canvas.height / 6) - 1 || splashSparkleY >= (canvas.height / 2 + canvas.height / 6) + 1) splashSparkleDirection *= -1;
        if (gameTitleY <= (canvas.height / 2.51) || gameTitleY >= (canvas.height / 2.47)) gameTitleDirection *= -1;

        // Keep animating while the splash page is active
        if (isSplashPageActive) {
            requestAnimationFrame(animateSplashMenu);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }


    // ------ Control Center (Touch - Mobile) ------

    left_button.addEventListener("touchstart", (e) => { e.preventDefault; movingLeft = true; });
    left_button.addEventListener("touchend", (e) => { e.preventDefault; movingLeft = false; });
    left_button.addEventListener("touchcancel", (e) => { movingLeft = false; });

    right_button.addEventListener("touchstart", (e) => { e.preventDefault; movingRight = true; });
    right_button.addEventListener("touchend", (e) => { e.preventDefault; movingRight = false; });
    right_button.addEventListener("touchcancel", (e) => { movingRight = false; });


    // ------ Control Center (Mouse - Desktop) ------

    left_button.addEventListener("mousedown", (e) => { e.preventDefault; movingLeft = true; });
    left_button.addEventListener("mouseup", (e) => { e.preventDefault; movingLeft = false; });

    right_button.addEventListener("mousedown", (e) => { e.preventDefault; movingRight = true; });
    right_button.addEventListener("mouseup", (e) => { e.preventDefault; movingRight = false; });


    // ------ Laser ------

    /**
     * Represents a laser projectile fired by the player.
     *
     * @param {Number} startX - The x coordinate where the laser is created
     * @param {Number} startY - The y coordinate where the laser is created
     */
    class Laser {
        constructor(startX, startY) {
            this.img = new Image();
            this.img.src = "../images/laser.webp";
            this.laser_x = startX;
            this.laser_y = startY;
            this.laser_width = 50;
            this.laser_height = 20;
        }
    }

    /**
     * Creates a new laser at the plane's current position and adds it to the active lasers array.
     */
    function shoot() {
        const startX = plane_x + planeWidth / 2 - 25;
        const startY = plane_y;
        let newLaser = new Laser(startX, startY);
        activeLasers.push(newLaser);
    }

    shoot_button.addEventListener("click", shoot);


    // ------ Obstacles ------

    /**
     * Returns a random floating-point number between min and max.
     *
     * @param {Number} min - The minimum value (inclusive)
     * @param {Number} max - The maximum value (inclusive)
     * @returns {Number} A random number in the range [min, max]
     */
    function getRandomPos(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    /**
     * Represents a small star obstacle that falls from the top of the screen.
     * Spawns at a random x position above the canvas.
     */
    class SmallStar {
        constructor() {
            this.img = new Image();
            this.img.src = "../images/smallStar.webp";
            this.x = getRandomPos(0, canvas.width - 50);
            this.y = -50;
            this.width = 35;
            this.height = 12.3;
        }
    }

    /**
     * Creates a new SmallStar and adds it to the active small stars array.
     */
    function spawnStar() {
        let newStar = new SmallStar();
        activeStars.push(newStar);
    }

    /**
     * Represents a large star obstacle that falls from the top of the screen.
     * Worth more points than a small star but takes up more space.
     */
    class fallingStar {
        constructor() {
            this.img = new Image();
            this.img.src = "../images/enemy_FallingStar.webp";
            this.x = getRandomPos(0, canvas.width - 50);
            this.y = -50;
            this.width = 50;
            this.height = 25;
        }
    }

    /**
     * Creates a new fallingStar and adds it to the active big stars array.
     */
    function spawnFallingStar() {
        let newFallingStar = new fallingStar();
        activeFallingStars.push(newFallingStar);
    }

}) // END
