<?php

class Objet{
    public $ido;
    public $nom;
    public $description;
    public $belongingTo;
    public $foundBy;
    public $lieux;
    public $photos;
    public $canDelete;

    public static function chargerLesObjets($dbh){
        $query = "SELECT o.ido AS ido,o.nom AS nom, o.description AS description, DATE_FORMAT(o.date,'%h:%i %p') AS hour,DATE_FORMAT(o.date,'%b %d %Y') AS day, u1.idu AS lostByidu,u1.nom AS lostBynom, u1.prenom AS lostByprenom, u1.identifiant AS lostByidentifiant, u1.admin AS lostByadmin, u2.idu AS foundByidu,u2.nom AS foundBynom, u2.prenom AS foundByprenom, u2.identifiant AS foundByidentifiant, u2.admin AS foundByadmin, GROUP_CONCAT(l.tag) AS lieux 
        	FROM Objet o 
	        INNER JOIN Utilisateur u1 ON o.lostBy=u1.idu
	        LEFT OUTER JOIN Utilisateur u2 ON o.foundBy=u2.idu
	        LEFT OUTER JOIN Enregistrementobjetlieu e ON o.ido=e.ido
	        LEFT OUTER JOIN Lieu l ON l.idl=e.idl
	        GROUP BY ido ORDER BY o.date DESC";
        $sth = $dbh->prepare($query);
        $sth->execute();
        $reponse = $sth->fetchAll(PDO::FETCH_OBJ);
        // Il faudra juste faire un implode pour les lieux !
        return $reponse;
    }

    public static function verifierUnObjet($nom,$description){
        if($nom.length<3)
            throw new Exception("Nom");
    }
}

?>