<?php

require_once  "initialize.php";

/**
 * Class Adm_notice | fichier adm_notice.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_notice_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_notice
 * @author @AfpaLabTeam - Virginie Vigneron
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v3.0
 */

Class Upload_files_notice extends Initialize	{

    /**
	 * private $nom_fichier
	 * @var int
	 */
	private $nom_fichier;
	
    /**
     * public $resultat is used to store all datas needed for HTML Templates
    //  * @var array
     */
    // public $resultat;

    /**
     * init variables resultat
     *
     * execute main function
     */
    public function __construct() {
        // init variables resultat
        parent::__construct();
        $this->resultat = [];
        $this->uploadDocument();
        
    }

    /**
     *
     * Destroy service
     *
     */
    // public function __destruct() {
    //     // destroy objet_service
    //     unset($objet_service);
    // }



	/**
	 * private function formaterNom()
	 * 
	 * FORMATER LE NOM DU FICHIER.
	 * 
	 */
    private function formaterNom($str, $encoding='utf-8') {
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
    public function uploadDocument() {

		// Je fixe moi même le nom du fichier pour être sûr que je n'ai pas des noms à la noix
		// je dois peut-être en fabriquer avec des noms différents.
		
        log::f(
            'upload',
            $_POST,
            $this->VARS_HTML,
            $_FILES

        );

        $date = date('d m i');
        $date = strval($date);

        $this->nom_fichier = $this->formaterNom("article_" . $date);

		// $this->nom_fichier = $this->formaterNom($_FILES["new_fichier"]['name']);
        error_log("nom du fichier " . $this->nom_fichier);
			
		// taille fixée dans la CONF
        $taille_maximale = $this->GLOBALS_INI["FILE_MAX_SIZE"];
		
		// Taille réelle du fichier
        $taille_fichier = $_FILES['new_fichier']['size'];

		// Liste des extensions valides
		// Cela sera à récupérer également depuis la CONF par la suite
        $extensions_valides = array('.jpeg', '.jpg', '.png', '.gif');
		
		// je récupère l'extension du fichier
        $extension_fichier = strrchr($_FILES['new_fichier']['name'], '.');
        error_log($extension_fichier);

		
        // Vérification de la taille du fichier
        if($taille_fichier <= $taille_maximale) {
            //Vérifier l'entension du fichier
            if (in_array($extension_fichier, $extensions_valides)) {

				// PATH_TO_MON_REPERTOIRE_D_UPLOAD sera à renseigner en CONF
				// NE PAS OUBLIER DE CRER LE NOM DU REPERTOIRE 'PATH_TO_MON_REPERTOIRE_D_UPLOAD' SUR LE DISQUE DUR
                //La ou sera enregistré l'image uploadée
                $chemin= $_SERVER{'DOCUMENT_ROOT'} . "/" . $this->GLOBALS_INI["PATH_TO_MON_REPERTOIRE_D_UPLOAD"] . '/' . $this->nom_fichier . $extension_fichier; 

                if(move_uploaded_file($_FILES['new_fichier']['tmp_name'], $chemin))	{
					// UPLOAD OK
                    $this->resultat["response_upload"]= 0;
                    $this->resultat["cheminImage"]=$this->GLOBALS_INI["PATH_UPLOAD"] . $this->nom_fichier . $extension_fichier;
                    $this->resultat["nomImage"]=$this->nom_fichier . $extension_fichier;

                } else {
					// UPLOAD NO OK
                    $this->resultat["response_upload"]= 1; 
                }

            } else {
				// EXTENSION NO OK
				$this->resultat["response_upload"]= 2;
            }
        } else {
			// SIZE NO OK
			$this->resultat["response_upload"]= 3;
        }

        log::f('resultat', $this->resultat);
    }

	
}