/*
 * Name: Dee Liberman
 * Date: March 29
 * Description: Handles login page UI interactions. Controls navigation to the game
 * and back to the login form, and blocks the start game button if the user's
 * email and birthdate do not match an existing account.
 */

window.addEventListener("load", function() {

    const message = document.getElementById("message");
    const welcomeBox = document.getElementById("welcome");
    const startGame = document.getElementById("play");
    const login = document.getElementById("login");
    let buttonStorage; // Holds the start button if it needs to be removed and restored

    // Navigate to the game page when "Start Game" is clicked
    startGame.addEventListener("click", function() {
        const newUrl = "https://cs1xd3.cas.mcmaster.ca/~libermad/js_assignment/php/shooter.php";
        window.history.pushState({ path: newUrl }, '', newUrl);
        location.reload();
    });

    // Navigate back to the login form when "Back To Login" is clicked
    login.addEventListener("click", function() {
        const newUrl2 = "https://cs1xd3.cas.mcmaster.ca/~libermad/js_assignment/php/A4.php";
        window.history.pushState({ path: newUrl2 }, '', newUrl2);
        location.reload();
    });

    // Block the start game button if the user's email does not match their birthdate
    const errorVal = message.dataset.phpValue;
    if (errorVal == "Account exists, but email does not match birthdate.") {
        buttonStorage = startGame;
        message.style.height = "60%";
        message.style.width = "80%";
        message.style.fontSize = "350%";
        startGame.remove();
    } else {
        if (buttonStorage) {
            welcomeBox.append(buttonStorage);
            buttonStorage = null;
        }
    }

});
