<?php
class Database{
    public static function connect() {
        $dsn = 'mysql:dbname=ProjetModal;host=localhost';
        $user = 'edouardm';
        $password = 'ed';
        $dbh = null;
        try {
            $dbh = new PDO($dsn, $user, $password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            $dbh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        } catch (PDOException $e) {
            echo 'Connexion échouée : ' . $e->getMessage();
            exit(0);
        }
        return $dbh;
    }
}
/*
class Database{
    public static function connect() {
        try{
            $service=mysqli_connect('localhost','edouardm','ed','bdutil'); 
        } catch (Exception $e){
            echo 'Connexion échouée : ' . $e->getMessage();
            exit(0);
        }
        return $service;
    }
}
*/
?>
