<?php
    sleep(3);
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        header('Content-Type: application/json; charset=utf-8');

        //Connect to database
        require_once 'connect.php';
        $dbh = server();
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //uh
        $jsonData = file_get_contents('php://input');
        $data = json_decode($jsonData, true);

        //Get min/max population
        if($data && isset($data['min'], $data['max'])){
            $minJSON = $data['min'];
            $min = (int)$minJSON;
            $maxJSON = $data['max'];
            $max = (int)$maxJSON;

        } else{
            echo "no min/max :{";
            exit;
        }



        //Cities within range SELECT query
        $command = "SELECT `Name` FROM `City` WHERE `Population` >= ? AND `Population` <= ?";
        $grabCity = $dbh->prepare($command);
        $grabCity->execute([$min, $max]);

        //Make Array
        $cities = array();

        //Add each city with population in range to city array with iteration
        while ($row = $grabCity->fetch()){

           $city = [
                "Name" => $row["Name"],
           ];

           array_push($cities, $city);
        }

        if (empty($cities)) {
        echo json_encode(["debug" => "empty result", "min" => $min, "max" => $max]);
        exit;
        }

        echo (json_encode($cities));
        }
