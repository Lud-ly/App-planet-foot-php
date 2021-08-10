<?php
require_once "adm_notice_service.php";
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

Class Adm_notice_list	{
	
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
        // je prends toutes les fonctions dans la page adm_notice_service et je les met dans $objet_service
        $objet_service = new Adm_notice_service();
        // parmi toutes les fonctions récupérées, je veux la fonction adm_notice_list();
        $objet_service -> adm_notice_list();
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
		
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $objet_service->resultat;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
}

?>

