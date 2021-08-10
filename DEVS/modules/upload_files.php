<?php

require_once  "initialize.php";

/**
 * Class upload_files_service | fichier upload_files_service.php
 *
 * This class will allow to upload image from user's computer to Afpanier server
 *
 *
 * @package Afpanier v3 Project
 * @subpackage Upload_files
 * @author @AfpaLabTeam - Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

class Upload_files extends Initialize
{
    /**
     * private $nom_fichier
     * @var int
     */
    private $nom_fichier;

    /**
     * private $copie
     * @var int
     */
    private $copie;

    /**
     * public static resultat
     * @var array
     */
    public $resultat;


    /**
     * private function formaterNom()
     * 
     * FORMATER LE NOM DU FICHIER.
     * 
     */

    function __construct()
    {

        parent::__construct();

        // init variables resultat
        $this->resultat = [];

        // execute main function
        $this->uploadDocument();
    }


    private function formaterNom($str, $encoding = 'utf-8')
    {
        // transformer les caractères accentués en entités HTML
        $str = htmlentities($str, ENT_NOQUOTES, $encoding);

        // remplacer les entités HTML pour avoir juste le premier caractère non accentué
        // Exemple : "&ecute;" => "e", "&Ecute;" => "E", "à" => "a" ...
        $str = preg_replace('#&([A-za-z])(?:acute|grave|cedil|circ|orn|ring|slash|th|tilde|uml);#', '\1', $str);

        // Remplacer les ligatures tel que : Æ ...
        // Exemple "œ" => "oe"
        $str = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $str);
        //Supprimer tout le reste
        //$str = preg_replace('#&[^;]+;#', '', $str);
        // Remplacer tout le reste par "_"
        $str = preg_replace('/([^.a-z0-9]+)/i', '_', $str);

        return $str;
    }

    /**
     * private function uploadDocument()
     * 
     * Upload les documents.
     * 
     */
    private function uploadDocument()
    {
        // Je fixe moi même le nom du fichier pour être sûr que je n'ai pas des noms à la noix
        // je dois peut-être en fabriquer avec des noms différents.

        // $this->nom_fichier = $this->formaterNom($this->VARS_HTML["nom_fichier_a_fournir"]);
        if (isset($this->VARS_HTML['copie'])) {
            $copie = $this->VARS_HTML['copie'];
        } else {
            $copie = "";
        }

        if (isset($this->VARS_HTML['RecupIndice'])) {
            $indice = $this->VARS_HTML['RecupIndice'];
        } else {
            $indice = "";
        }

        date_default_timezone_set('Europe/Paris');

        $date = date('d m H i');
        $date = strval($date);

        if ($copie == "") {
            if ($indice != "") {
                $this->nom_fichier = $this->formaterNom("Basket_" . $date . "_" . $indice);
                // je récupère l'extension du fichier
                $extension_fichier = strrchr($_FILES['new_fichierEdit']['name'], '.');
                // Taille réelle du fichier
                $taille_fichier = $_FILES['new_fichierEdit']['size'];
            } else {
                $this->nom_fichier = $this->formaterNom("mainBasket_" . $date);
                // je récupère l'extension du fichier
                $extension_fichier = strrchr($_FILES['new_fichier']['name'], '.');
                // Taille réelle du fichier
                $taille_fichier = $_FILES['new_fichier']['size'];
            }
        } else {
            $this->nom_fichier = $this->formaterNom("Basket_" . $date . "_" . $copie);
            // je récupère l'extension du fichier
            $extension_fichier = strrchr($_FILES['new_fichier' . $copie]['name'], '.');
            // Taille réelle du fichier
            $taille_fichier = $_FILES['new_fichier' . $copie]['size'];
        }

        // taille fixée dans la CONF
        $taille_maximale = $this->GLOBALS_INI["FILE_MAX_SIZE"];


        // Liste des extensions valides
        // Cela sera à récupérer également depuis la CONF par la suite
        // $extensions_valides = array('.jpeg', '.jpg', '.png', '.gif');
        $extensions_valides = explode('|', $this->GLOBALS_INI['EXTENSIONS_VALIDES']);
        error_log("extension_fichier = " . $extension_fichier);
        error_log("taille_fichier : " . $taille_fichier . " et copie : " . $copie);
        // Vérification de la taille du fichier
        if ($taille_fichier <= $taille_maximale) {

            //Vérifier l'entension du fichier
            if (in_array($extension_fichier, $extensions_valides)) {
                // PATH_TO_MON_REPERTOIRE_D_UPLOAD sera à renseigner en CONF
                // NE PAS OUBLIER DE CRER LE NOM DU REPERTOIRE 'PATH_TO_MON_REPERTOIRE_D_UPLOAD' SUR LE DISQUE DUR
                $chemin = $_SERVER['DOCUMENT_ROOT'] . "/" . $this->GLOBALS_INI["PATH_UPLOAD"] . $this->nom_fichier . $extension_fichier;

                if ($indice == "") {
                    if (move_uploaded_file($_FILES['new_fichier' . $copie]['tmp_name'], $chemin)) {
                        // UPLOAD OK
                        $this->resultat["response_upload"] = "0";
                        $this->resultat["adm_offer_ApercuImage"] = $this->GLOBALS_INI["PATH_IMAGES"] . $this->nom_fichier . $extension_fichier;
                        $this->resultat["adm_offer_ApercuImage_title"] = $this->nom_fichier;
                        $this->resultat['copie'] = $copie;
                    } else {
                        // UPLOAD NO OK
                        $this->resultat["response_upload"] = "1";
                        $this->resultat['copie'] = $copie;
                    }
                } else {
                    if (move_uploaded_file($_FILES['new_fichierEdit']['tmp_name'], $chemin)) {
                        // UPLOAD OK
                        $this->resultat["response_upload"] = "0";
                        $this->resultat["adm_offer_ApercuImage"] = $this->GLOBALS_INI["PATH_IMAGES"] . $this->nom_fichier . $extension_fichier;
                        $this->resultat["adm_offer_ApercuImage_title"] = $this->nom_fichier;
                        $this->resultat['RecupIndice'] = $indice;
                        $this->resultat['copie'] = $copie;
                    } else {
                        // UPLOAD NO OK
                        $this->resultat["response_upload"] = "1";
                        $this->resultat['RecupIndice'] = $indice;
                        $this->resultat['copie'] = $copie;
                    }
                }
            } else {
                // EXTENSION NO OK
                $this->resultat["response_upload"] = "2";
                $this->resultat['copie'] = $copie;
                $this->resultat['RecupIndice'] = $indice;
            }
        } else {
            // SIZE NO OK
            $this->resultat["response_upload"] = "3";
            $this->resultat['copie'] = $copie;
            $this->resultat['RecupIndice'] = $indice;
        }
        error_log('resultat :' . $this->resultat["response_upload"]);
        error_log('le chemin de path upload et de limg ' . $this->resultat["adm_offer_ApercuImage"]);
    }
}
