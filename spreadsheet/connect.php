<?php

   function server(){

    try {
        $dbh = new PDO("mysql:host=localhost;dbname=libermad_db", "libermad_local", "Ots/JvhW");
        return $dbh;
    } catch (Exception $e) {
        die("ERROR: Couldn't connect. {$e->getMessage()}");
    }

   }

   function local(){

    try {
        $dbh = new PDO("mysql:host=localhost;dbname=labWork", "root", "");
        return $dbh;
    } catch (Exception $e) {
        die("ERROR: Couldn't connect. {$e->getMessage()}");
    }

   }

