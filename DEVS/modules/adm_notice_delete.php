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

Class Adm_notice_delete	{
	
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
		$objet_service = new Adm_notice_service();
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
        $objet_service->Adm_notice_delete();
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $objet_service->resultat;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
}

?>

