<?php

class Message{
    public $idm;
    public $destinataire;
    public $emetteur;

    public static function chargerLesMessages($idu,$e){
        $dbh = Database::connect();
        if($e===1){
            $query = "SELECT * FROM Message WHERE emetteur=?";
        }else{
            $query = "SELECT * FROM Message WHERE destinataire=?";
        }
        $sth = $dbh->prepare($query);
        $sth->execute(array($idu));
        $reponse = $sth->fetchAll(PDO::FETCH_OBJ);
        $dbh = NULL;
        return $reponse;
    }
}
?>