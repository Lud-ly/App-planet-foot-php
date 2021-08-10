<?php
require_once "adm_faq_service.php";
/**
 * Class Adm_faq | fichier adm_faq.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_faq_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_faq
 * @author @AfpaLabTeam - Mouly Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 * @version v1.0
 */

Class Adm_faq_delete	{
	
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
     * Get interface to gestion of adm_notice
     */
    function main() {
		$objet_service = new Adm_faq_service();
        $this->VARS_HTML = $objet_service->VARS_HTML;
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
        $result = $objet_service->delete_faq_server();
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		send_json_to_JS($result);
		
        // unset($objet_service);
    }
	
}
