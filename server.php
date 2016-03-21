<?php
session_start();
require("./classes/Database.php");
require("./classes/Objet.php");
require("./classes/Utilisateur.php");
require("./classes/Lieu.php");
require("./classes/Message.php");




/*
//Développement
error_reporting(E_ALL);  
ini_set('display_errors','On');



//Production
error_reporting(E_ALL);  
ini_set('display_errors','Off');  
ini_set('log_errors', 'On');  
ini_set('error_log', '/error/path');

*/

//ini_set('session.use', newvalue)
//Initialisation de la session a faire
//echo (htmlspecialchars(...) sinon faille de securite )
//SHA_1 GOogle hacking
//Inserer du sel
//https crypte les communications
//captcha
//protegez l'authentification sur votre site avec HTTPS

// echo include ".php"

$scriptInvokedFromCli =
    isset($_SERVER['argv'][0]) && $_SERVER['argv'][0] === 'server.php';

if($scriptInvokedFromCli) {
    $port = getenv('PORT');
    if (empty($port)) {
        $port = "3000";
    }

    echo 'starting server on port '. $port . PHP_EOL;
    exec('php -S localhost:'. $port . ' -t public server.php');
} else {
    return routeRequest();
}





function routeRequest()
{
    //'HTTP_REFERER'
    //Changement de mot de passe stocker l'heure en SESSION er en hidden verifiez que le delta ne depasse pas une certaine limite
    //https://www.owasp.org
    $uri = $_SERVER['REQUEST_URI'];
    $dbh = Database::connect();

    switch($uri){
        case '/':
        case '/Home':
        case '/Lieux':
            echo file_get_contents('./public/index.html');
            echo '<script type="text/babel">'.
            file_get_contents('./public/scripts/Connexion-Inscription/Connexion.js').
            file_get_contents('./public/scripts/Connexion-Inscription/Inscription.js').
            file_get_contents('./public/scripts/Affiche/Autobar/Autobar.js').
            file_get_contents('./public/scripts/Affiche/Autobar/LieuAutobar.js').
            file_get_contents('./public/scripts/Lieu/Lieu.js').
            file_get_contents('./public/scripts/Utilisateur/Utilisateur.js').
            file_get_contents('./public/scripts/Utilisateur/ListeUtilisateur.js').
            file_get_contents('./public/scripts/Affiche/ObjetForm.js').
            file_get_contents('./public/scripts/Affiche/Objet.js').
            file_get_contents('./public/scripts/Filter/FilterBar.js').
            file_get_contents('./public/scripts/Affiche/ListeAffiche.js').
            file_get_contents('./public/scripts/Lieu/Lieu.js').
            file_get_contents('./public/scripts/Lieu/LieuForm.js').
            file_get_contents('./public/scripts/Lieu/ListeLieu.js').
            file_get_contents('./public/scripts/Lieu/LieuMap.js').
            file_get_contents('./public/scripts/App/App2.js').
            '</script>';
            break;       
        case '/Connexion':
            if($_SERVER['REQUEST_METHOD'] === 'GET') {
                echo file_get_contents('./public/index.html');
                echo '<script type="text/babel">'.
                file_get_contents('./public/scripts/Utilisateur/Utilisateur.js').
                file_get_contents('./public/scripts/Connexion-Inscription/Connexion.js').
                file_get_contents('./public/scripts/App/App.js').
                file_get_contents('./public/scripts/App/Connexion.js').
                '</script>';
            } else if($_SERVER['REQUEST_METHOD'] === 'POST'){
                $u=Utilisateur::seConnecter($dbh, $_POST['identifiant'],$_POST['motdepasse']);
                if(!is_null($_SESSION["id"])){
                    echo json_encode(array( "result"=>json_decode(json_encode($u)) ) );
                }else{
                    echo json_encode(array( "error"=> $u) );
                }
            } else if($_SERVER['REQUEST_METHOD'] === 'PUT'){
                if(!is_null($_SESSION["id"])){
                    $u=Utilisateur::getUtilisateur($dbh, $_SESSION["id"]);
                    echo json_encode(array( "result"=>json_decode(json_encode($u)) ) );
                } else echo 0;   
            }
            break;
        case '/Deconnexion':
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                Utilisateur::seDeconnecter();
            }
            break;
        case '/Inscription':
            if($_SERVER['REQUEST_METHOD'] === 'GET'){
                echo file_get_contents('./public/index.html');
                echo '<script type="text/babel" src="scripts/Connexion-Inscription/Inscription.js"></script>';
            } else if($_SERVER['REQUEST_METHOD'] === 'POST'){
                try{
                    $u=Utilisateur::creerUnNouvelUtilisateur($dbh,$_POST["nom"],$_POST["prenom"],$_POST["identifiant"],$_POST["motdepasse"], 0,true);
                    if(is_array($u) && isset($u["error"])){
                        echo json_encode($u);
                    }else{
                        echo json_encode(array( "result"=>json_decode(json_encode($u)) ) );
                    }  
                }catch(PDOException $e){
                    if($e->getCode()==23000){
                        echo json_encode(array(
                        'error' => array(
                            'identifiantErr' => "Identifiant déjà pris"
                            )));
                    }else{
                        echo json_encode(array(
                        'error' => array(
                            'identifiantErr' => $e->getMessage()
                            )));
                    }
                }catch(Exception $e){
                    echo json_encode(array(
                        'error' => array(
                            'nom' => $e->getCode()
                            )));
                }
            }
            break;


        case '/ChargerLesObjets':
            if($_SERVER['REQUEST_METHOD'] === 'GET') {
                header('Content-Type: application/json');
                $reponse = Objet::chargerLesObjets($dbh);
                echo json_encode($reponse);
            }
            break;
        case '/AjouterUnObjet':
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $u = Utilisateur::getUtilisateur($_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    $u->ajouterUnObjet($dbh, $_POST["nom"],$_POST["description"],$_POST["lieux"]);
                }
            }
            break;
        case '/SupprimerUnObjet':
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $u = Utilisateur::getUtilisateur($dbh, $_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    $u->supprimerUnObjet($dbh, $_POST["ido"]);
                }
            }
            break;
        case '/DeclarerAvoirTrouveUnObjet':
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $u = Utilisateur::getUtilisateur($_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    $u->declarerAvoirTrouveUnObjet($_POST["ido"]);
                }
            }
            break;
        case '/RetirerDeclaration':
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $u = Utilisateur::getUtilisateur($_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    $u->retirerDeclaration($dbh, $_POST["ido"]);
                }
            }
            break;
        case '/AjouterUnLieu':
            if($_SERVER['REQUEST_METHOD'] === 'POST'){
                Lieu::ajouterUnLieu($dbh, $_POST["tag"], $_POST["lat"], $_POST["lng"]);   
            }
            break;
        case '/SupprimerUnLieu':
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                Lieu::supprimerUnLieu($dbh, $_POST["idl"]); 
            }
            break;    
        case '/ChargerLesLieux':
            if($_SERVER['REQUEST_METHOD'] === 'GET') {
                header('Content-Type: application/json');
                $reponse = Lieu::chargerLesLieux($dbh);
                echo json_encode($reponse);
            }
            break; 
        case '/ChargerLesUtilisateurs':
            if($_SERVER['REQUEST_METHOD'] === 'GET') {
                header('Content-Type: application/json');
                $reponse = Utilisateur::chargerLesUtilisateurs($dbh);
                echo json_encode($reponse);
            }
            break;
        case '/DetruireUtilisateur':
            if($_SERVER['REQUEST_METHOD'] === 'POST'){
                $u = Utilisateur::getUtilisateur($dbh, $_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    $u->detruireUtilisateur($_POST["idu"]);
                }             
            }
            break;
        case '/RendreAdmin':
            if($_SERVER['REQUEST_METHOD'] === 'POST'){
                $u = Utilisateur::getUtilisateur($dbh, $_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    echo $u->rendreAdmin($dbh, $_POST["idu"]);
                }
                
            }
            break;    
        case '/ChargerLesMessagesEmetteur':
            $e=1;
        case '/ChargerLesMessagesDestinataire':       
            if($_SERVER['REQUEST_METHOD'] === 'GET') {
                $u = Utilisateur::getUtilisateur($dbh,$_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    header('Content-Type: application/json');
                    $reponse = Message::chargerLesMessages($u->idu,$e);
                    echo json_encode($reponse);
                }   
            }
            break; 
         case '/Test3':
         echo file_get_contents('./public/index copy.html');
            break;
        default:
            return false;
    }
}
