<?php
require_once "adm_offer_service.php";
require_once "utils.php";

/**
 * Class Adm_offer_update | fichier adm_offer_update.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation des classes :
 *
 * require_once "adm_offer_service.php";
 * require_once "utils.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_offer_update
 * @author @AfpaLabTeam - Perez Guy
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Adm_offer_update	{
	
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
     * Get interface to gestion of adm_offer
     */
    function main() {
		$objet_service = new Adm_offer_service();
        $this->VARS_HTML = $objet_service->VARS_HTML;
        if (!isset($this->VARS_HTML['id_basket']) || !isset($this->VARS_HTML['id_mainBasket'])) {
            $aResult['error'] = 'Id ou statut manquant';
        } else {
            $basketId = $this->VARS_HTML['id_basket'];
            $mainBasketId = $this->VARS_HTML['id_mainBasket'];
            $aResult = $objet_service->adm_offer_update($basketId, $mainBasketId);
        }
        send_json_to_JS($aResult);
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
		
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $objet_service->resultat;
    }
	
}

?>

