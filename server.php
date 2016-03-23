<?php
session_name("ProjetModal2016HugoetEdouard");
session_start();

if (!isset($_SESSION['initiated'])) {
        session_regenerate_id();
        $_SESSION['initiated'] = true;
    }


require("./classes/Database.php");
require("./classes/Helpers/Helpers.php");
require("./classes/Objet.php");
require("./classes/Utilisateur.php");
require("./classes/Lieu.php");
require("./classes/Message.php");



/*
//Développement
error_reporting(E_ALL);  
ini_set('display_errors','On');

//filter_input_array()

//Production
error_reporting(E_ALL);  
ini_set('display_errors','Off');  
ini_set('log_errors', 'On');  
ini_set('error_log', '/error/path');

*/

//ini_set('session.use', newvalue)
//Initialisation de la session a faire
//echo (htmlspecialchars(...) sinon faille de securite )
//SEULEMENT APRES !!!
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

    if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
    // last request was more than 30 minutes ago
    session_unset();     // unset $_SESSION variable for the run-time 
    session_destroy();   // destroy session data in storage
    }
    $_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp




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
            file_get_contents('./public/scripts/Affiche/NavbarObjet.js').
            file_get_contents('./public/scripts/Filter/FilterBar.js').
            file_get_contents('./public/scripts/Affiche/ListeAffiche.js').
            file_get_contents('./public/scripts/Lieu/Lieu.js').
            file_get_contents('./public/scripts/Lieu/NavbarLieu.js').
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
                echo '<script type="text/babel">'.
                file_get_contents('./public/scripts/Connexion-Inscription/Inscription.js').
                file_get_contents('./public/scripts/App/Inscription.js').
                '</script>';                  
            } else if($_SERVER['REQUEST_METHOD'] === 'POST'){
                echo Helpers::testInscription($dbh);
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
                $u = Utilisateur::getUtilisateur($dbh, $_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{                    
                    $u = $u->ajouterUnObjet($dbh, $_POST["nom"],$_POST["description"],$_POST["lieux"]);
                    if(is_array($u) && isset($u["error"])){
                        echo json_encode($u);
                    }
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
                $u = Utilisateur::getUtilisateur($dbh,$_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    $u->declarerAvoirTrouveUnObjet($dbh,$_POST["ido"]);
                }
            }
            break;
        case '/RetirerDeclaration':
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $u = Utilisateur::getUtilisateur($dbh,$_SESSION['id']);
                if(is_null($u)){
                    header('Location: /Connexion');
                }else{
                    $u->retirerDeclaration($dbh, $_POST["ido"]);
                }
            }
            break;
        case '/AjouterUnLieu':
            if($_SERVER['REQUEST_METHOD'] === 'POST'){
                $u=Lieu::ajouterUnLieu($dbh, $_POST["tag"], $_POST["lat"], $_POST["lng"]);
                if(is_array($u) && isset($u["error"])){
                        echo json_encode($u);
                    }
                else echo json_encode(array("e" => "v"));
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
                    $u->detruireUtilisateur($dbh, $_POST["idu"]);
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
         echo file_get_contents('./public/debug.html');
            break;
        case '/Test4':
        function validate_nom($input){
            if(strlen($input)>4)
                return "OK";
            else return null;
        }
        function validate_description($input){
            if(strlen($input)>3)
                return "Nom trop court";
            else if (strlen($input)>10)
                return "Nom trop long";
            else 
                return null;
        }
        $options = array(
            'nom' => array(
                    'filter' => FILTER_CALLBACK, 
                    'options' => 'validate_nom'
            ),
            'description' => array(
                    'filter' => FILTER_CALLBACK, //Valider l'entier.
                    'options' => 'validate_description'
            )
        );
        $resultat = filter_input_array(INPUT_POST, $options);

          
         echo print_r($resultat);
         echo $resultat==null;
            break;
        default:
            return false;
    }
}
