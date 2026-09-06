<?php 
session_start();
$bool = isset($_SESSION["username"]);
?>

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Job Joint | Job Search</title>
    <link rel="stylesheet" href="./css/searchStyle.css" />
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
  </head>
  <body>
    <input id="hiddenInput" value="<?php echo $bool?>">
    <div id="invalid" style="display:<?php echo $bool ? "none" : "block"?>">
      <h2>Invalid Session. You are not logged in.</h2>
      <a href="./"><button id="login">Login</button></a>
    </div>
    <form action="./userSpreadsheet.php" method="POST" id="hiddenForm">
      <input name="jobID" id="jobID" />
    </form>
    <div id="outerContainer" style="display:<?php echo $bool ? "flex" : "none"?>">
      <h2 id="header">Job Joint | Job Search</h2>
      <div id="navbar">
        <a href="./userSpreadsheet.php" class="navlink"
          ><p class="innerP">Spreadsheet</p></a
        >
        <div class="vr"></div>
        <a href="./userSignUp.php" class="navlink"
          ><p class="innerP">Applicant Sign Up</p></a
        >
        <div class="vr"></div>
        <a href="./index.html" class="navlink"><p class="innerP">Log In</p></a>
        <div class="vr"></div>
        <a href="./index.html" class="navlink" id="logOut"
          ><p class="innerP">Log Out</p></a
        >
      </div>
      <div id="search">
        <div id="searchOptions">
          <h2>Search Options</h2>
          <h2>Company Type</h2>
          <div id="companyTypeOption" class="scrollableDivSelect"></div>
          <h2>Position Type</h2>
          <div id="positionTypeOption" class="scrollableDivSelect"></div>
          <h2>Salary Range</h2>
          <h3>Min</h3>
          <input id="min" type="number" min="0" />
          <h3>Max</h3>
          <input id="max" type="number" min="0" />
          <h2>Start Date Range</h2>
          <h3>Min</h3>
          <input id="minDate" type="date" />
          <h3>Max</h3>
          <input id="maxDate" type="date" />
          <h3 id="note">
            Note: leave range values unfilled to allow all values
          </h3>
          <h3 id="error"></h3>
          <button id="searchBtn">Search</button>
        </div>
        <div class="wvr"></div>
        <div id="searchResults">
          <h2 id="resText">Search results will appear here</h2>
        </div>
      </div>
    </div>
  </body>
  <script src="./js/searchScript.js"></script>
</html>
