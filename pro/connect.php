 <?php
    // try {
    //     $dbh = new PDO("mysql:host=localhost;dbname=scottb26_db", "scottb26_local", "umwr]b:c");
    //     $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // }catch(PDOException $e){
    //     die("Couldn't connect to db");
    // }



    try {
        $dbh = new PDO("mysql:host=localhost;dbname=scottb26_db", "root", "");
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        die("Couldn't connect to db");
    }
// ?>