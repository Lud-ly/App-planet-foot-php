<?php
require_once "adm_purchase_service.php";
/**
 * Class Adm_purchase_list | fichier adm_purchase_list.php
 *
 * Cette classe permet d'afficher les données concernant les commandes passées par les différents utilsateurs
 * sur la page "gestion des commandes" du côté administrateur du site
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "purchase_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_purchase_list
 * @author @AfpaLabTeam - Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class adm_purchase_list	{
	
    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;
    public $result;

    /**
     * init variables resultat
     *
     * execute main function
     */
    public function __construct() {
        // init variables resultat
        $this->resultat = [];
        // init variables resultat
        $this->result = [];

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
		$objet_service = new Adm_purchase_service();
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
        $objet_service->adm_purchase_list();
        // $objet_service->adm_purchase_list_ingredient();
		
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
        $this->resultat = $objet_service->resultat;
        $this->result = $objet_service->result;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
}

?>

