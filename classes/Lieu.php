<?php

class Lieu{
    public $ido;
    public $tag;
    public $location;

    public static function ajouterUnLieu($tag){
        $dbh = Database::connect();
        $query = "INSERT INTO Lieu (tag) VALUES (?)";
        $sth = $dbh->prepare($query);
        $sth->execute(array($tag));
        $dbh = NULL;
    }

    public static function chargerLesLieux(){
        $dbh = Database::connect();
        $query = "SELECT * FROM Lieu";
        $sth = $dbh->prepare($query);
        $sth->execute();
        $reponse = $sth->fetchAll(PDO::FETCH_OBJ);
        $dbh = NULL;
        return $reponse;
    }
}
?>