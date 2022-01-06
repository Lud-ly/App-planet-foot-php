<?php
require_once "signup_service.php";
require_once "signup.php";
require_once  "initialize.php";
/**
 * Class Signup_upload | fichier signup_upload.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "Signup_upload_service.php";
 *
 * @package Planet-foot v3 Project
 * @subpackage Signup_upload
 * @author @AfpaLabTeam - Mouly Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

class Signup_upload  extends Initialize
{

	/**
	 * public $resultat is used to store all datas needed for HTML Templates
	 * @var array
	 */
	public $resultat;
	private $nom_fichier;

	/**
	 * init variables resultat
	 *
	 * execute main function
	 */
	public function __construct()
	{
		// init variables resultat
		$this->resultat = [];

		// execute main function
		$this->main();
	}

	/**
	 *
	 * Destroy service
	 *
	 */
	public function __destruct()
	{
		// destroy objet_service
		unset($objet_service);
	}

	/**
	 * Get interface to gestion of adm_supplier_upload
	 */
	function main()
	{
		$objet_service = new Signup_service();
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->VARS_HTML = $objet_service->VARS_HTML;
		$this->GLOBALS_INI = $objet_service->GLOBALS_INI;
		$this->uploadDocument();
	}


	/***********************************
	 * private function uploadDocument()
	 * 
	 * Upload les documents.
	 * 
	 **********************************/


	private function uploadDocument()
	{
		// Je fixe moi même le nom du fichier pour être sûr que je n'ai pas des noms à la noix
		// je dois peut-être en fabriquer avec des noms différents.

		/*
		$this->nom_fichier = $this->formaterNom($this->VARS_HTML["nom_fichier_a_fournir"]);
		*/
		$date = date("d-m-Y,H:i:s");
		$date = strval($date);

		$this->nom_fichier = $this->formaterNom("image_" . $date);
		$this->resultat["nom_fichier"] = "";


		// taille fixée dans la CONF
		// error_log("FILE_MAX_SIZE = " . $this->GLOBALS_INI["FILE_MAX_SIZE"]);
		$taille_maximale = $this->GLOBALS_INI["FILE_MAX_SIZE"];

		// Taille réelle du fichier
		$taille_fichier = $_FILES['nom_fichier']['size'];

		// Liste des extensions valides
		// Cela sera à récupérer également depuis la CONF par la suite
		$extensions_valides = array('.jpeg', '.jpg', '.png', '.gif');

		// je récupère l'extension du fichier
		$extension_fichier = strrchr($_FILES['nom_fichier']['name'], '.');
		// error_log("extension_fichier = " . $extension_fichier);
		// Vérification de la taille du fichier
		if ($taille_fichier <= $taille_maximale) {

			//Vérifier l'entension du fichier
			if (in_array($extension_fichier, $extensions_valides)) {

				// PATH_UPLOAD sera à renseigner en CONF
				// NE PAS OUBLIER DE CRER LE NOM DU REPERTOIRE 'PATH_UPLOAD' SUR LE DISQUE DUR
				$chemin = $_SERVER['DOCUMENT_ROOT'] . "/" . $this->GLOBALS_INI["PATH_UPLOAD"] . $this->nom_fichier . $extension_fichier;

				if (move_uploaded_file($_FILES['nom_fichier']['tmp_name'], $chemin)) {
					// UPLOAD OK
					$this->resultat["response_upload"] = 0;
					$this->resultat["path_nom_fichier"] = $this->GLOBALS_INI["PATH_UPLOAD"] . $this->nom_fichier . $extension_fichier;
					$this->resultat["nom_fichier"] = $this->nom_fichier . $extension_fichier;
				} else {
					// UPLOAD NO OK
					$this->resultat["response_upload"] = 1;
				}
			} else {
				// EXTENSION NO OK
				$this->resultat["response_upload"] = 2;
			}
		} else {
			// SIZE NO OK
			$this->resultat["response_upload"] = 3;
		}
	}


	/**
	 * private function formaterNom()
	 * 
	 * FORMATER LE NOM DU FICHIER.
	 * 
	 */
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
}
