
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise 2</title>
</head>
<body>

    <h2> Enter range of population to find cities with that range of population.</h2>

    <form action = "chpt39.php" method = "post">

    <label for = "min"> Enter Min: </label>
    <input id = "min" type = "number" name = "min" required step = "1" min = "0" >

    <label for = "max"> Enter Max: </label>
    <input id = "max" type = "number" name = "max" required step = "1" min = "0" >

    <input id = "submit" name = "submit" type="Submit" value = "Submit">

    </form>

    <p id = "output" ></p>

    <img id = "loading" style = "width: 15vw; visibility: hidden;" src="this.images/loading.gif">
</body>
<script src = "chpt39.js"></script>
</html>