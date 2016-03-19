<?php

class Message{
    public $idm;
    public $destinataire;
    public $emetteur;

    public static function chargerLesMessages($idu,$e){
        $dbh = Database::connect();
        if($e===1){
            $query = "SELECT u.idu AS idu,u.nom AS nom, u.prenom AS prenom, u.identifiant AS identifiant, u.admin AS admin, m.texte AS texte FROM Message m INNER JOIN Utilisateur u ON m.destinataire=u.idu WHERE emetteur=?";
        }else{
            $query = "SELECT u.idu AS idu,u.nom AS nom, u.prenom AS prenom, u.identifiant AS identifiant, u.admin AS admin, m.texte AS texte FROM Message m INNER JOIN Utilisateur u ON m.emetteur=u.idu WHERE destinataire=?";
        }
        $sth = $dbh->prepare($query);
        $sth->execute(array($idu));
        $reponse = $sth->fetchAll(PDO::FETCH_OBJ);
        $dbh = NULL;
        return $reponse;
    }
}
?>