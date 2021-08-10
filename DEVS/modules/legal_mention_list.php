<?php
require_once "legal_mention_service.php";
/**
 * Class legal_mention | fichier legal_mention.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "account_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Legal_mention
 * @author @AfpaLabTeam - Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Legal_mention_list	{
	
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
     * Get interface to gestion of account
     */
    function main() {
		$objet_service = new Legal_mention_service();
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
        $objet_service -> legal_mention_list();
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $objet_service->resultat;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
}

?>


