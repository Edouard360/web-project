<?php

class Lieu{
    public $ido;
    public $tag;
    public $location;

    public static function ajouterUnLieu($tag,$lat,$lng){
        $dbh = Database::connect();
        $query = ($lat==null)?"INSERT INTO Lieu (tag) VALUES (?)":"INSERT INTO Lieu (tag,lat,lng) VALUES (?,?,?)";
        $sth = $dbh->prepare($query);
        if($lat==null){
            $sth->execute(array($tag));
        }
        else{
            $sth->execute(array($tag,$lat,$lng));
        }
        $dbh = NULL;
    }

     public function supprimerUnLieu($idl){
        $dbh = Database::connect();
        $query = "DELETE FROM Lieu WHERE idl=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($idl));
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