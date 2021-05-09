<?php
require_once "adm_contact_service.php";
require_once "input_control.php";
/**
 * Class Adm_contact | fichier adm_contact.php
 *
 * Cette classe va permettre de gérer tout ce qui concerne le formulaire de contact du projet
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_contact_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_contact
 * @author @AfpaLabTeam - Ludovic Mouly
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 * @version v1.0
 */

Class Adm_contact	{
	
    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;

    /**
     * init variables resultat
     *
     * execute main function
     */
    public function __construct() {
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
    public function __destruct() {
        // destroy objet_service
        unset($objet_service);
    }

    /**
     * Get interface to gestion of adm_client
     */
    function main() {
		$objet_service = new Adm_contact_service();
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $objet_service->resultat;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
}

?>

