<?php
/*
 * Name: Dee Liberman
 * Date: March 29
 * Description: Provides database connection functions. Contains separate
 * connection functions for the production server and the local development environment.
 */

/**
 * Creates and returns a PDO connection to the production server database.
 *
 * @returns {PDO} A PDO database connection object for the production server
 */
function server() {
    try {
        $dbh = new PDO("mysql:host=localhost;dbname=libermad_db", "libermad_local", "Ots/JvhW");
        return $dbh;
    } catch (Exception $e) {
        die("ERROR: Couldn't connect. {$e->getMessage()}");
    }
}

/**
 * Creates and returns a PDO connection to the local development database.
 *
 * @returns {PDO} A PDO database connection object for the local environment
 */
function local() {
    try {
        $dbh = new PDO("mysql:host=localhost;dbname=labWork", "root", "");
        return $dbh;
    } catch (Exception $e) {
        die("ERROR: Couldn't connect. {$e->getMessage()}");
    }
}
