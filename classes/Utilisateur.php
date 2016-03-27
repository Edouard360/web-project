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

    public static function getUtilisateur($dbh,$idu){
        $query = "SELECT * FROM Utilisateur WHERE idu=?";
        $sth = $dbh->prepare($query);
        $sth->setFetchMode(PDO::FETCH_CLASS,'Utilisateur');
        try{
            $sth->execute(array($idu));
        }catch(PDOException $e){
            
        }
        $reponse = $sth->fetch();
        return $reponse;
    }

    public static function seConnecter($dbh,$identifiant, $mdp){
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
        return $reponse;
    }

    public static function creerUnNouvelUtilisateur($dbh,$nom,$prenom,$identifiant,$mdp,$admin,$boolean){
       if(is_array( $u=Helpers::verifierLesParametresInscription() )){
            return(array("error"=>$u));
        } 
        $query = "INSERT INTO Utilisateur (nom,prenom,identifiant,mdp,admin) VALUES (?,?,?,?,?)";
        $sth = $dbh->prepare($query);
        try{
            $sth->execute(array($nom,$prenom,$identifiant,sha1($mdp."seldeprotection"),$admin));
        }catch(PDOException $e){
            throw $e;
        }
        if($boolean)
            return self::seConnecter($dbh,$identifiant,$mdp);
    }

    public static function updateUtilisateur($dbh,$nom,$prenom,$identifiant,$mdp){
       if(is_array( $u=Helpers::verifierLesParametresInscription() )){
            return(array("error"=>$u));
        } 
        $query = "UPDATE Utilisateur SET nom=(?),prenom=(?),identifiant=(?),mdp=(?) WHERE idu=(?)";
        $sth = $dbh->prepare($query);
        try{
            $sth->execute(array($nom,$prenom,$identifiant,sha1($mdp."seldeprotection"),$_SESSION['id']));
        }catch(PDOException $e){
            throw $e;
        }
        return self::seConnecter($dbh,$identifiant,$mdp);
    }

    

    public static function initialiserLaSession($utilisateur){
        $_SESSION['id'] = $utilisateur->idu;
    }

    public static function seDeconnecter(){
        $_SESSION['id'] = NULL;
    }

    public static function chargerLesUtilisateurs($dbh){
        $query = "SELECT idu,nom,prenom,identifiant,admin FROM Utilisateur";
        $sth = $dbh->prepare($query);
        $sth->execute();
        $reponse = $sth->fetchAll(PDO::FETCH_OBJ);
        return $reponse;
    }

    public function rendreAdmin($dbh,$idu){
        if(!$this->admin){ return "error";}
        $query = "UPDATE Utilisateur SET admin=1 WHERE idu=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($idu));
    }

    public function detruireUtilisateur($dbh,$idu){
        if($this->admin != 1){return "error";}
        $query = "DELETE FROM Utilisateur WHERE idu=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($idu));
    }

    public function supprimerUnObjet($dbh,$ido){
        if($this->admin == 1){
            //Si l'utilisateur est admin, il peut supprimer l'objet
            $query = "DELETE FROM Objet WHERE ido=?";
            $sth = $dbh->prepare($query);
            $sth->execute(array($ido));
        }
        //Sinon on effectue une requête croisée pour verifier que l'objet
        //Appartient bien à l'utilisateur
        $query = "DELETE FROM Objet WHERE ido=? AND lostBy=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($ido,$this->idu));
    }

    public function ajouterUnObjet($dbh,$nom,$description,$lieux){

        if(is_array($u=Helpers::verifierLesParametresObjet())){
            return(array("error"=>$u));
        }
        $query = "INSERT INTO Objet (lostBy,nom,description) VALUES (?,?,?)";
        $sth = $dbh->prepare($query);
        $sth->execute(array($this->idu,$nom,$description));
        if($lieux==null){
            return;
        }
        $ido = $dbh->lastInsertId();
        $query = "INSERT INTO Enregistrementobjetlieu (ido,idl) VALUES (?,?)";
        $sth = $dbh->prepare($query);
        foreach($lieux as $idl){
            $sth->execute(array($ido,$idl));
        }

        move_uploaded_file($_FILES['fichier']['tmp_name'], '../../public/img/'.basename($_FILES['fichier']['name']));
    }

    public function declarerAvoirTrouveUnObjet($dbh,$ido){
        //On effectue une requête croisée pour s'assurer 
        //qu'un utilisateur ne déclare qu'un objet non déclaré
        $query = "UPDATE Objet SET foundBy=? WHERE ido=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($this->idu,$ido));
    }
    public function retirerDeclaration($dbh,$ido){
        $query = "UPDATE Objet SET foundBy=NULL WHERE ido=?";
        $sth = $dbh->prepare($query);
        $sth->execute(array($ido));
    }
}
?>
