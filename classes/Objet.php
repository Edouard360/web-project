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


    public static function chargerLesObjets(){
        $dbh = Database::connect();
        $query = "SELECT o.ido AS ido,o.nom AS nom, o.description AS description, u1.idu AS lostByidu,u1.nom AS lostBynom, u1.prenom AS lostByprenom, u1.identifiant AS lostByidentifiant, u1.admin AS lostByadmin, u2.idu AS foundByidu,u2.nom AS foundBynom, u2.prenom AS foundByprenom, u2.identifiant AS foundByidentifiant, u2.admin AS foundByadmin, GROUP_CONCAT(l.tag) AS lieux 
        	FROM Objet o 
	        INNER JOIN Utilisateur u1 ON o.lostBy=u1.idu
	        LEFT OUTER JOIN Utilisateur u2 ON o.foundBy=u2.idu
	        LEFT OUTER JOIN Enregistrementobjetlieu e ON o.ido=e.ido
	        LEFT OUTER JOIN Lieu l ON l.idl=e.idl
	        GROUP BY ido";
        $sth = $dbh->prepare($query);
        $sth->execute();
        $reponse = $sth->fetchAll(PDO::FETCH_OBJ);
        // Il faudra juste faire un implode pour les lieux !
        $dbh = NULL;
        return $reponse;
    }

    public static function verifierUnObjet($nom,$description){
        if($nom.length<3)
            throw new Exception("Nom");
    }
}

/*
    $serialize=function($objet){
            echo is_null($objet) ;
            $foundBy=new Utilisateur;
            $foundBy->nom=$objet->foundBynom;
            $foundBy->prenom=$objet->foundByprenom;
            $foundBy->identifiant=$objet->foundByidentifiant;
            $foundBy->admin=$objet->foundByadmin;

  
            $lostBy=new Utilisateur;
            $lostBy->nom=$objet->lostBynom;
            $lostBy->prenom=$objet->lostByprenom;
            $lostBy->identifiant=$objet->lostByidentifiant;
            $lostBy->admin=$objet->lostByadmin;

            
            $objet=new Objet;
            $objet->ido=$objet->ido;
            $objet->nom=$objet->nom;
            $objet->description=$objet->description;
            $objet->belongingTo=$lostBy;
            $objet->foundBy=$foundBy;
            return json_encode($objet);
        };
*/
        ?>