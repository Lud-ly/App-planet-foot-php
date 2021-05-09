<?php
require_once "purchase_service.php";
/**
 * Class Purchase | fichier purchase.php
 *
 * Cette classe permet de vérifier l'integralité des données concernant les commandes transmises vers la classe Purchase_service
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "purchase_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage purchase
 * @author @AfpaLabTeam - Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Purchase	{
	
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
     * Get interface to gestion of order
     */
    function main() {
		$objet_service = new Purchase_service();
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
		$objet_service->purchase_list();
		
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $objet_service->resultat;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
}

?>

