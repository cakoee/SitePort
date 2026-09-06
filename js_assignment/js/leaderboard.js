/*
 * Name: Dee Liberman
 * Date: March 29
 * Description: Handles navigation on the leaderboard page. The menu button
 * returns the user to the game, and the logout button returns them to the login page.
 */

window.addEventListener("load", function() {

    const menu = document.getElementById("menu");
    const logout = document.getElementById("logout");

    // Navigate back to the game when the menu button is clicked
    menu.addEventListener("click", function() {
        const newUrl = "https://cs1xd3.cas.mcmaster.ca/~libermad/js_assignment/php/shooter.php";
        window.history.pushState({ path: newUrl }, '', newUrl);
        location.reload();
    });

    // Navigate to the login page when the logout button is clicked
    logout.addEventListener("click", function() {
        const newUrl2 = "https://cs1xd3.cas.mcmaster.ca/~libermad/js_assignment/php/A4.php";
        window.history.pushState({ path: newUrl2 }, '', newUrl2);
        location.reload();
    });

});
