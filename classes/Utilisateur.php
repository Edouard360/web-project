<?php

class Utilisateur implements JsonSerializable{
    public $idu;
    public $nom;
    public $prenom;
    public $identifiant;
    public $mdp;
    public $admin;
            
    public function __toString() {       
        return "L'Utilisateur d'identifiant :".$this->identifiant." !";
    }

    public function jsonSerialize() {
        return ['idu'=> $this->idu,'nom' => $this->nom,'prenom' => $this->prenom,'identifiant' => $this->identifiant,'admin' => $this->admin];
    }

    public static function getUtilisateur($idu){
        $dbh = Database::connect();
        $query = "SELECT * FROM Utilisateur WHERE idu=?";
        $sth = $dbh->prepare($query);
        $sth->setFetchMode(PDO::FETCH_CLASS,'Utilisateur');
        try{
            $sth->execute(array($idu));
        }catch(PDOException $e){
            
        }
        $reponse = $sth->fetch();
        $dbh = NULL;
        return $reponse;
    }

    public static function seConnecter($identifiant, $mdp){
        $dbh = Database::connect();
        $query = "SELECT * FROM Utilisateur WHERE identifiant=? AND mdp=?";
        $sth = $dbh->prepare($query);
        $sth->setFetchMode(PDO::FETCH_CLASS,'Utilisateur');
        $sth->execute(array($identifiant,sha1($mdp."seldeprotection")));
        if ($sth->rowCount()>0){
            $reponse = $sth->fetch();
            self::initialiserLaSession($reponse);
        }
        else{
            $reponse = "Identifiant ou mot de passe incorrect !";
        }
        $dbh = NULL;
        return $reponse;
    }

    public static function creerUnNouvelUtilisateur($nom,$prenom,$identifiant,$mdp,$admin,$boolean){
        if(is_array($u=self::verifierLesParametres($nom,$prenom,$identifiant,$mdp))){
            return(array("error"=>$u));
        } 
        $dbh = Database::connect();
        $query = "INSERT INTO Utilisateur (nom,prenom,identifiant,mdp,admin) VALUES (?,?,?,?,?)";
        $sth = $dbh->prepare($query);
        try{
            $sth->execute(array($nom,$prenom,$identifiant,sha1($mdp."seldeprotection"),$admin));
        }catch(PDOException $e){
            $dbh=NULL;
            throw $e;
        }
        $dbh=NULL;
        if($boolean)
            return self::seConnecter($identifiant,sha1($mdp."seldeprotection"));
    }

    public static function verifierLesParametres($nom,$prenom,$identifiant,$mdp){
        if(strlen($nom) < 3){
            $array=array("nomErr" => "Nom trop court !");
        }
        if(strlen($prenom) < 3){
            $tmp=array("prenomErr" => "Prenom trop court !");
            $array=$array?array_merge($tmp,$array):$tmp;
        }
        if(strlen($identifiant) < 3){
            $tmp=array("identifiantErr" => "Identifiant trop court !");
            $array=$array?array_merge($tmp,$array):$tmp;
        }
        if(strlen($mdp) < 3){
            $tmp=array("mdpErr" => "mdp trop court !");
            $array=$array?array_merge($tmp,$array):$tmp;
        }
        if($array)
            return $array;
        else
            return true;
    }

    public static function initialiserLaSession($utilisateur){
        $_SESSION['id'] = $utilisateur->idu;
    }

    public static function seDeconnecter(){
        $_SESSION['id'] = NULL;
    }

    public static function chargerLesUtilisateurs(){
        $dbh = Database::connect();
        $query = "SELECT idu,nom,prenom,identifiant,admin FROM Utilisateur";
        $sth = $dbh->prepare($query);
        $sth->execute();
        $reponse = $sth->fetchAll(PDO::FETCH_OBJ);
        $dbh = NULL;
        return $reponse;
    }

    public function rendreAdmin($idu){
        if(!$this->admin){ return "error";}
        $dbh = Database::connect();
        $query = "UPDATE Utilisateur SET admin=1 WHERE idu=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($idu));
        $dbh = NULL;
    }

    public function detruireUtilisateur($idu){
        $dbh = Database::connect();
        $query = "DELETE FROM Utilisateur WHERE idu=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($idu));
        $dbh = NULL;
    }

    public function supprimerUnObjet($ido){
        $dbh = Database::connect();
        $query = "DELETE FROM Objet WHERE ido=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($ido));
        $dbh = NULL;
    }

    public function ajouterUnObjet($nom,$description,$lieux){
        $dbh = Database::connect();
        $query = "INSERT INTO Objet (lostBy,nom,description) VALUES (?,?,?)";
        $sth = $dbh->prepare($query);
        $sth->execute(array($this->idu,$nom,$description));
        if($lieux==null){
            $dbh = NULL;
            return;
        }
        $ido = $dbh->lastInsertId();
        $query = "INSERT INTO Enregistrementobjetlieu (ido,idl) VALUES (?,?)";
        $sth = $dbh->prepare($query);
        foreach($lieux as $idl){
            echo "RESULTAT".$sth->execute(array($ido,$idl));
        }
        $dbh = NULL;
    }

    public function declarerAvoirTrouveUnObjet($ido){
        $dbh = Database::connect();
        $query = "UPDATE Objet SET foundBy=? WHERE ido=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($this->idu,$ido));
        $dbh = NULL;
    }
    public function retirerDeclaration($ido){
        $dbh = Database::connect();
        $query = "UPDATE Objet SET foundBy=NULL WHERE ido=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($ido));
        $dbh = NULL;
    }
}
?>
