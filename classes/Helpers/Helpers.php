<?php

class Helpers{

    public static function verifierLesParametresInscription(){
        $erreur=0;
        function validate_nom($input){
            if($input==null){
                $erreur++;
                return "Vous n'avez pas rentré de Nom !";
            }else if(strlen($input)<3){
                $erreur++;
                return "Votre nom est trop court";
            }
            else return null;
        }
        function validate_prenom($input){
            if($input==null){
                $erreur++;
                return "Vous n'avez pas rentré de Prénom !";
            }else if(strlen($input)<3){
                $erreur++;
                return "Votre prénom est trop court";
            }
            else if (strlen($input)>10){
                $erreur++;
                return "Nom trop long";
            }
            else return null;
        }
        function validate_identifiant($input){
            if($input==null){
                $erreur++;
                return "Vous n'avez pas rentré d'Identifiant !";
            }else if(strlen($input)<3){
                $erreur++;
                return "Nom trop court";
            }
            else if (strlen($input)>10){
                $erreur++;
                return "Nom trop long";
            }
            else return null;
        }
        function validate_motdepasse($input){
            if($input==null){
                $erreur++;
                return "Vous n'avez pas rentré de Mot De Passe!";
            }if(strlen($input)<5){
                $erreur++;
                return "Mot de passe trop court";
            }
            else if (strlen($input)>10){
                $erreur++;
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
        return $resultat;
        
    }

    public static function verifierLesParametresObjet(){
        $erreur=0;
        function validate_nom($input){
            if($input==null){
                $erreur++;
                return "Pas d'Objet !";
            }else if(strlen($input)<3){
                $erreur++;
                return "Nom plus descriptif";
            }
            else return null;
        }
        function validate_description($input){
            if($input==null){
                $erreur++;
                return "Pas de description ?";
            }else if (strlen($input)<20){
                $erreur++;
                return "Description plus longue svp";
            }
            else return null;
        }
        function validate_lieu($input){
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
            ),
            'lieux' => array(
                    'filter' => FILTER_CALLBACK, 
                    'options' => 'validate_lieux'
            )
        );
        $resultat = filter_input_array(INPUT_POST, $options);
        return $resultat;
        
    }

        public static function verifierLesParametresLieu(){
        $erreur=0;
        function validate_tag($input){
            if($input==null){
                $erreur++;
                return "Pas de Tag !";
            }else if(strlen($input)<3){
                $erreur++;
                return "Tag trop court !";
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
        return $resultat;
        
    }



}

?>
