<?php
session_start();
require("./classes/Database.php");
require("./classes/Objet.php");
require("./classes/Utilisateur.php");
require("./classes/Lieu.php");
require("./classes/Message.php");

//ini_set('session.use', newvalue)
//Initialisation de la session a faire
//echo (htmlspecialchars(...) sinon faille de securite )
//SHA_1 GOogle hacking
//Inserer du sel
//https crypte les communications
//captcha
//protegez l'authentification sur votre site avec HTTPS

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

    switch($uri){
        case '/':
            if(is_null($_SESSION["id"])){
                header('Location: /Connexion');
            }
            else{
                echo file_get_contents('./public/index.html');
                echo '<script type="text/babel">'.
                file_get_contents('./public/scripts/Affiche/Autobar/Autobar.js').
                file_get_contents('./public/scripts/Affiche/Autobar/LieuAutobar.js').
                file_get_contents('./public/scripts/Lieu/Lieu.js').
                file_get_contents('./public/scripts/Utilisateur/Utilisateur.js').
                file_get_contents('./public/scripts/Affiche/ObjetForm.js').
                file_get_contents('./public/scripts/Affiche/Objet.js').
                file_get_contents('./public/scripts/Filter/FilterBar.js').
                file_get_contents('./public/scripts/Affiche/ListeAffiche.js').
                '</script>';
                //echo '<script type="text/babel" src="scripts/declaration.js"></script>';
                //echo '<script type="text/babel" src="scripts/essai.js"></script>';
            }
            break;
        case '/Connexion':
            if($_SERVER['REQUEST_METHOD'] === 'GET') {
                echo file_get_contents('./public/index.html');
                echo '<script type="text/babel">'.
                file_get_contents('./public/scripts/Utilisateur/Utilisateur.js').
                file_get_contents('./public/scripts/Connexion-Inscription/Connexion.js').
                '</script>';
            } else if($_SERVER['REQUEST_METHOD'] === 'POST'){
                $u=Utilisateur::seConnecter($_POST['identifiant'],$_POST['motdepasse']);
                if(!is_null($_SESSION["id"])){
                    echo json_encode(array( "result"=>json_decode(json_encode($u)) ) );
                }else{
                    echo json_encode(array( "error"=> $u) );
                }
            } else if($_SERVER['REQUEST_METHOD'] === 'PUT'){
                if(!is_null($_SESSION["id"])){
                    $u=Utilisateur::getUtilisateur($_SESSION["id"]);
                    echo json_encode(array( "result"=>json_decode(json_encode($u)) ) );
                }   
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
                    $u=Utilisateur::creerUnNouvelUtilisateur($_POST["nom"],$_POST["prenom"],$_POST["identifiant"],$_POST["motdepasse"], 0,true);
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
                $reponse = Objet::chargerLesObjets();
                echo json_encode($reponse);
            }
            break;
        case '/AjouterUnObjet':
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $u = Utilisateur::getUtilisateur($_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    $u->ajouterUnObjet($_POST["nom"],$_POST["description"],$_POST["lieux"]);
                }
            }
            break;
        case '/SupprimerUnObjet':
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $u = Utilisateur::getUtilisateur($_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    $u->supprimerUnObjet($_POST["ido"]);
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
                    $u->retirerDeclaration($_POST["ido"]);
                }
            }
            break;
        case '/AjouterUnLieu':
            if($_SERVER['REQUEST_METHOD'] === 'POST'){
                Lieu::ajouterUnLieu($_POST["tag"],$_POST["lat"],$_POST["lng"]);   
            }
            break;
        case '/SupprimerUnLieu':
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                Lieu::supprimerUnLieu($_POST["idl"]); 
            }
            break;    
        case '/ChargerLesLieux':
            if($_SERVER['REQUEST_METHOD'] === 'GET') {
                header('Content-Type: application/json');
                $reponse = Lieu::chargerLesLieux();
                echo json_encode($reponse);
            }
            break; 
        case '/ChargerLesUtilisateurs':
            if($_SERVER['REQUEST_METHOD'] === 'GET') {
                header('Content-Type: application/json');
                $reponse = Utilisateur::chargerLesUtilisateurs();
                echo json_encode($reponse);
            }
            break;
        case '/DetruireUtilisateur':
            if($_SERVER['REQUEST_METHOD'] === 'POST'){
                $u = Utilisateur::getUtilisateur($_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    $u->detruireUtilisateur($_POST["idu"]);
                }
                
            }
            break;
        case '/RendreAdmin':
            if($_SERVER['REQUEST_METHOD'] === 'POST'){
                $u = Utilisateur::getUtilisateur($_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    echo $u->rendreAdmin($_POST["idu"]);
                }
                
            }
            break;    
        case '/ChargerLesMessagesEmetteur':
            $e=1;
        case '/ChargerLesMessagesDestinataire':       
            if($_SERVER['REQUEST_METHOD'] === 'GET') {
                $u = Utilisateur::getUtilisateur($_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    header('Content-Type: application/json');
                    $reponse = Message::chargerLesMessages($u->idu,$e);
                    echo json_encode($reponse);
                }   
            }
            break; 
        case 'EcrireUnMessage':
            # code...
            break;
        case '/Map':
            echo file_get_contents('./public/mapHugo.html');
            break;
        case '/Test':
            $u = Utilisateur::getUtilisateur($_SESSION['id']);
                if($u->admin)
                    echo "Hugo est admin";
                else
                    echo "hugo n'est pas admin";
            break;
        case '/Test2':
            echo file_get_contents('./public/index.html');
                echo '<script type="text/babel">'.
                file_get_contents('./public/scripts/Filter/FilterBar.js').
                 file_get_contents('./public/scripts/Lieu/Lieu.js').
                 file_get_contents('./public/scripts/Lieu/LieuForm.js').
                 file_get_contents('./public/scripts/Lieu/ListeLieu.js').
                 file_get_contents('./public/scripts/Lieu/LieuMap.js').
                '</script>';
                break;
         case '/Test3':
            echo file_get_contents('./public/index.html');
                echo '<script type="text/babel">'.
                file_get_contents('./public/scripts/Filter/FilterBar.js').
                 file_get_contents('./public/scripts/Lieu/Lieu.js').
                 file_get_contents('./public/scripts/Lieu/LieuForm.js').
                 file_get_contents('./public/scripts/Lieu/ListeLieu.js').
                '</script>';
                break;
        case '/Test4':
            echo file_get_contents('./public/index.html');
                echo '<script type="text/babel">'.
                file_get_contents('./public/scripts/Utilisateur/Utilisateur.js').
                 file_get_contents('./public/scripts/Utilisateur/ListeUtilisateur.js').
                '</script>';
                break;                 
        case '/Mock':
            echo file_get_contents('./public/mock.html');
            break;
        default:
            return false;
    }
}
