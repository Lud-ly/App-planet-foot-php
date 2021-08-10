<?php
require_once "adm_supplier_service.php";
/**
 * Class Adm_supplier_list| fichier adm_supplier_list.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_supplier_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_supplier_update
 * @author @AfpaLabTeam - Mouly Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 * @version v1.0
 */

Class Adm_supplier_list	{
	
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
     * Get interface to gestion of adm_supplier_list
     */
    function main() {
		$objet_service = new Adm_supplier_service();
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
		$objet_service->adm_supplier_list(); 
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $objet_service->resultat;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
}

?>


