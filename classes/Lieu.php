<?php

class Lieu{
    public $ido;
    public $tag;
    public $location;

    public static function ajouterUnLieu($dbh,$tag,$lat,$lng){
        if(is_array($u = Helpers::verifierLesParametresLieu())){
            return(array("error"=>$u));
        } 
        $query = ($lat==null)?"INSERT INTO Lieu (tag) VALUES (?)":"INSERT INTO Lieu (tag,lat,lng) VALUES (?,?,?)";
        $sth = $dbh->prepare($query);
        if($lat==null){
            $sth->execute(array($tag));
        }
        else{
            $sth->execute(array($tag,$lat,$lng));
        }
    }

     public function supprimerUnLieu($dbh,$idl){
        $query = "DELETE FROM Lieu WHERE idl=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($idl));
    }

    public static function chargerLesLieux($dbh){
        $query = "SELECT * FROM Lieu";
        $sth = $dbh->prepare($query);
        $sth->execute();
        $reponse = $sth->fetchAll(PDO::FETCH_OBJ);
        return $reponse;
    }
}
?>