<?php

class Helpers{
   public static function compte($array){
        $nbrErreurs=0;
        foreach($array as $cle => $valeur) {
            if(!is_null($valeur)) 
                $nbrErreurs++;
        }
        return $nbrErreurs;
    }

    public static function verifierLesParametresInscription(){
        function validate_nom($input){
            if($input==null){
                return "Vous n'avez pas rentré de Nom !";
            }else if(strlen($input)<3){
                return "Votre nom est trop court";
            }
            else return null;
        }
        function validate_prenom($input){
            if($input==null){
                return "Vous n'avez pas rentré de Prénom !";
            }else if(strlen($input)<3){
                return "Votre prénom est trop court";
            }
            else if (strlen($input)>10){
                return "Nom trop long";
            }
            else return null;
        }
        function validate_identifiant($input){
            if($input==null){
                return "Vous n'avez pas rentré d'Identifiant !";
            }else if(strlen($input)<3){
                return "Nom trop court";
            }
            else if (strlen($input)>10){
                return "Nom trop long";
            }
            else return null;
        }
        function validate_motdepasse($input){
            if($input==null){
                return "Vous n'avez pas rentré de Mot De Passe!";
            }if(strlen($input)<5){
                return "Mot de passe trop court";
            }
            else if (strlen($input)>10){
                return "Mot de passe trop long";
            }
            else return null;
        }

        $options = array(
            'nom' => array(
                    'filter' => FILTER_CALLBACK, 
                    'options' => 'validate_nom'
            ),
            'prenom' => array(
                    'filter' => FILTER_CALLBACK, //Valider l'entier.
                    'options' => 'validate_prenom'
            ),
            'identifiant' => array(
                    'filter' => FILTER_CALLBACK, 
                    'options' => 'validate_identifiant'
            ),
            'motdepasse' => array(
                    'filter' => FILTER_CALLBACK, //Valider l'entier.
                    'options' => 'validate_motdepasse'
            )
        );
        $resultat = filter_input_array(INPUT_POST, $options);
        $erreur = self::compte($resultat);
        if($erreur>0){
            return $resultat;
        }
        else{
            return null;
        }
        
        
    }

    public static function verifierLesParametresObjet(){
        function validate_nom($input){
            if($input==null){
                return "Pas d'Objet !";
            }else if(strlen($input)<3){
                return "Nom plus descriptif";
            }else if(strlen($input)>15){
                return "Nom trop long...";
            }
            else return null;
        }
        function validate_description($input){
            if($input==null){
                return "Pas de description ?";
            }else if (strlen($input)<10){
                return "Description plus longue svp";
            }else if (strlen($input)>90){
                return "Description trop longue ";
            }
            else return null;
        }
        $options = array(
            'nom' => array(
                    'filter' => FILTER_CALLBACK, 
                    'options' => 'validate_nom'
            ),
            'description' => array(
                    'filter' => FILTER_CALLBACK, //Valider l'entier.
                    'options' => 'validate_description'
            ),
        );
        $resultat = filter_input_array(INPUT_POST, $options);
        $erreur = self::compte($resultat);
        if($erreur>0){
            return $resultat;
        }
        else{
            return null;
        }   
    }

    public static function verifierLesParametresLieu(){
        $erreur=0;
        function validate_tag($input){
            if($input==null){
                return "Pas de Tag !";
            }else if(strlen($input)<3){
                return "Tag trop court !";
            }else if(strlen($input)>25){
                return "Tag trop long !";
            }
            else return null;
        }
        $options = array(
            'tag' => array(
                    'filter' => FILTER_CALLBACK, 
                    'options' => 'validate_tag'
            )
        );
        $resultat = filter_input_array(INPUT_POST, $options);
        $erreur = self::compte($resultat);
        if($erreur>0){
            return $resultat;
        }
        else{
            return null;
        }  
    }

    public static function testInscription($dbh){
        try{
            $u=Utilisateur::creerUnNouvelUtilisateur($dbh,$_POST["nom"],$_POST["prenom"],$_POST["identifiant"],$_POST["motdepasse"], 0,true);
            if(is_array($u) && isset($u["error"])){
                return json_encode($u);
            }else{
                return json_encode(array( "result"=>json_decode(json_encode($u)) ) );
            }  
        }catch(PDOException $e){
            if($e->getCode()==23000){
                return json_encode(array(
                'error' => array(
                    'identifiant' => "Identifiant déjà pris"
                    )));
            }else{
                return json_encode(array(
                'error' => array(
                    'identifiant' => "Autre erreur BDD"
                    )));
            }
        }catch(Exception $e){
            echo json_encode(array(
                'error' => array(
                    'nom' => $e->getCode()
                    )));
        }
    }

     public static function testUpdate($dbh){
        try{
                $u=Utilisateur::updateUtilisateur($dbh,$_POST["nom"],$_POST["prenom"],$_POST["identifiant"],$_POST["motdepasse"]);
                if(is_array($u) && isset($u["error"])){
                    return json_encode($u);
                }else{
                    return json_encode(array( "result"=>json_decode(json_encode($u)) ) );
                }  
            }catch(PDOException $e){
                if($e->getCode()==23000){
                    return json_encode(array(
                    'error' => array(
                        'identifiant' => "Identifiant déjà pris"
                        )));
                }else{
                    return json_encode(array(
                    'error' => array(
                        'identifiant' => "Autre erreur BDD"
                        )));
                }
            }catch(Exception $e){
                echo json_encode(array(
                    'error' => array(
                        'nom' => $e->getCode()
                        )));
            }
    }



}

?>
