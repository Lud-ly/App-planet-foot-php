<?php
require_once "adm_promo_service.php";
/**
 * Class Adm_promo  ♦  file "adm_promo.php"
 *
 * This class is used to prepare and return the list of promotions
 *
 * This class needs :
 *   • require_once "adm_promo_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_promo
 * @author @AfpaLabTeam - Damien Grember
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
            $promo['enteredPromoReferenceCountOnPurchasesNotYetMade'] = $this->obj_service->getEnteredPromoReferenceCountOnPurchasesNotYetMade($promo['id_promo']);
            // ..and concerned users
            $promo['enteredPromoReferenceUsersOnPurchasesNotYetMade'] = ($promo['enteredPromoReferenceCountOnPurchasesNotYetMade'] > 0) ?
                $this->obj_service->getEnteredPromoReferenceUsersOnPurchasesNotYetMade($promo['id_promo']) :
                [];
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
                    // add date + time from datetime
                    switch ($fieldName) {
                        case 'promo_begin_date':
                            $promo['promo_begin_time'] = ($date_info['hour_2'] . ':' . $date_info['min_2']);
                            $promo['promo_begin_date'] = ($date_info['year_4'] . '-' . $date_info['month_2'] . '-' . $date_info['day_2']);
                            break;
                        case 'promo_end_date':
                            $promo['promo_end_time'] = ($date_info['hour_2'] . ':' . $date_info['min_2']);
                            $promo['promo_end_date'] = ($date_info['year_4'] . '-' . $date_info['month_2'] . '-' . $date_info['day_2']);
                            break;
                    }
                }
            }
        }
    }
}

?>

