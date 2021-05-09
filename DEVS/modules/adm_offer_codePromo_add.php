<?php
require_once "adm_offer_service.php";
/**
 * Class Adm_offer_codePromo_add | fichier adm_offer_codePromo_add.php
 *
 * Cette classe permet d'ajouter de nouveaux codes promos lors de la mise en place de nouveaux paniers.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_offer_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_offer_codePromo_add
 * @author @AfpaLabTeam - Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Adm_offer_codePromo_add	{
	
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
     * Get interface to gestion of offers
     */
    function main() {
		$objet_service = new Adm_offer_service();
        $this->VARS_HTML = $objet_service->VARS_HTML;

        $objet_service -> adm_offer_codePromo_add();
		
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $objet_service->resultat;
    }
	
}

?>

