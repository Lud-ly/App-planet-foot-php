<?php
require_once "cart_service.php";
/**
 * Class Cart | fichier cart.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "cart_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Cart
 * @author @AfpaLabTeam - JiJou
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Cart	{
	
    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;

    /**
     * @var $obj_service The cart service object
     */
    private $obj_service;

    /**
     * @var $promoUsedByUserCount The number of times the promo code has been used by the user
     */
    private $promoUsedByUserCount;

    /**
     * @var $promoInfo Promo info (only if usable by user)
     */
    private $promoInfo;

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
        unset($this->obj_service);
    }

    /**
     * Get interface to gestion of accueil
     */
    function main() {
		$this->obj_service = new Cart_service();
		// Ici je fais mon appel $this->obj_service->ma_methode_qui_est_dans_le_service
		
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $this->obj_service->resultat;
		$this->VARS_HTML = $this->obj_service->VARS_HTML;

        if (!isset($this->VARS_HTML['action'])) {
            return;
        }

        switch ($this->VARS_HTML['action']) {
            // the user want to apply the provided promo code
            case 'check_promo_code':
                $this->checkPromoCode();
                break;
            // the user want to cancel the provided promo code
            case 'cancel_promo_code':
                $this->cancelPromoCode();
        }
    }

    /**
     * Returns if the provided promo code is valid and usable by the user
     * 
     * @return bool
     */
    function isPromoUsableByUser(): bool {
        return (
            ( gettype($this->promoInfo) === 'array' ) &&
            ( count($this->promoInfo) === 1 )
        );
    }
	
    /**
     * Check if the promo code exists and if it can be used by the user.
     * Return the result to the JS.
     */
    private function checkPromoCode() {
        // if missing promo code
        if ( !isset($this->VARS_HTML['promo_code']) || isEmpty($this->VARS_HTML['promo_code']) ) {
            send_json_to_JS(
                [
                    'result' => 'error',
                    'message' => 'Code promo manquant'
                ]
            );
            return;
        }
        $this->promoUsedByUserCount = $this->obj_service->getUsedPromoCodeByUserCount(
            $_SESSION['id_user'],
            $this->VARS_HTML['promo_code']
        );

        // if the promo code has already been used
        if ($this->promoUsedByUserCount > 0) {
            send_json_to_JS(
                [
                    'result' => 'error',
                    'message' => 'Désolé, vous avez déjà utilisé ce code promo'
                ]
            );
            return;
        }

        // remove previous additions of this promo code on orders not yet finalized
        $this->obj_service->cancelUserPromoCodeUse(
            $_SESSION['id_user'],
            $this->VARS_HTML['promo_code']
        );

        // not already used : get info
        $this->promoInfo = $this->obj_service->getPromoFromCode($this->VARS_HTML['promo_code']);
        
        // if the promo code can be used by the user
        if ( $this->isPromoUsableByUser() ) {
            $this->obj_service->addUserPromoUnvalidatedPurchase(
                $_SESSION['id_user'],
                $this->promoInfo[0]['promoId']
            );
            send_json_to_JS( $this->promoInfo );
        } else {
            send_json_to_JS(
                // in reality, either the code does not exist, or it exists but the user is not entitled to it (ceiling exceeded ..)
                [
                    'result' => 'error',
                    'message' => 'Code inexistant ou indisponible'
                ]
            );
        }
    }

    /**
     * The user wishes to cancel the promo code he had just entered when ordering (order not yet finalized)
     * Return the result to the JS.
     */
    private function cancelPromoCode() {
        if ( isset($this->VARS_HTML['promo_code']) ) {
            $result = $this->obj_service->cancelUserPromoCodeUse(
                $_SESSION['id_user'],
                $this->VARS_HTML['promo_code']
            );
            if ( isEmpty($result['error']) ) {
                send_json_to_JS(
                    [
                        'result' => 'success',
                    ]
                );
                $this->promoInfo = [];
            } else {
                send_json_to_JS(
                    [
                        'result' => 'error',
                        'message' => $result['error']
                    ]
                );
            }
        }

    }
}

?>

