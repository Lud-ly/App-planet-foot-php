<?php
require_once "adm_promo_service.php";
/**
 * Class Adm_promo | fichier adm_promo.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_promo_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_promo
 * @author @AfpaLabTeam - Perez Guy
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Adm_promo_list	{
	
    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;

    /**
     * @var object $obj_service Service object
     */
    private $obj_service;

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
     * Get interface to gestion of adm_promo
     */
    function main() {
		$this->obj_service = new Adm_promo_service();
        $this->obj_service -> adm_promo_list();

		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->VARS_HTML = $this->obj_service->VARS_HTML;
		$this->resultat = $this->obj_service->resultat;

        $this->addInfo();
    }

    /**
     * Add info to each promo (date labels, used promo count, entered promo code users...)
     */
    private function addInfo() {
        $arr =& $this->resultat["adm_promo_list"];
        $now = strftime('%Y-%m-%d %H:%M:%S');
        foreach ($arr as &$promo) {
            // get the promo state (finished / in progress / to come up)
            $finished = (
                ( $promo['promo_end_date'] != '' ) &&
                ( $now > $promo['promo_end_date'] )
            );
            if ($finished) {
                $promo['state'] = 'finished';
            } elseif ($now >= $promo['promo_begin_date']) {
                $promo['state'] = 'inProgress';
            } else {
                $promo['state'] = 'toComeUp';
            }
            // get used promo count
            $promo['alreadyUsedPromoCount'] = $this->obj_service->getAlreadyUsedPromoCount($promo['id_promo']);
            // get promo code count on purchases not yet made
            $promo['enteredPromoCodeCountOnPurchasesNotYetMade'] = $this->obj_service->getEnteredPromoCodeCountOnPurchasesNotYetMade($promo['id_promo']);
            // ..and concerned users
            $promo['enteredPromoCodeUsersOnPurchasesNotYetMade'] = ($promo['enteredPromoCodeCountOnPurchasesNotYetMade'] > 0) ?
                $this->obj_service->getEnteredPromoCodeUsersOnPurchasesNotYetMade($promo['id_promo']) :
                [];
            log::append_f('promo', $promo);
            foreach ($promo as $fieldName => $fieldValue) {
                // only for date fields :
                if ( substr($fieldName, -5) !== '_date' ) {
                    continue;
                }
                // get date info from datetime
                $date_info = getDatetimeInfos($fieldValue);
                if ($date_info !== null) {
                    // add the date label
                    $promo[$fieldName . '_label'] = ($date_info['weekday_fr_current_abbreviated'] . ' ' . $date_info['day_1'] . ' ' . $date_info['month_fr_current_abbreviated'] . ' ' . $date_info['year_4'] . ' - ' . $date_info['hour_1'] . 'h' . $date_info['min_2']);
                }
            }
        }
    }
}

?>

