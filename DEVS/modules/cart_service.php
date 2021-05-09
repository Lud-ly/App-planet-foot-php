<?php
require_once  "initialize.php";
/**
 * Class Cart_service | file 'cart_service.php'
 *
 * Manages the request for the use of a promo code by the user when composing the basket
 *
 * Needs :
 *  • require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage cart_service
 * @author @AfpaLabTeam - JiJou & Damien
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Cart_service extends Initialize	{

  /**
   * public $resultat is used to store all datas needed for HTML Templates
   * @var array
   */
  public $resultat;
  public $basket;
  public $ordered_quantity;
  public $id_purchase;
  // public $id_user;
  public $oObjet;
  /**
   * init variables resultat
   *
   * execute main function
   */
  public function __construct() {
    // Call Parent Constructor
    parent::__construct();

    // init variables resultat
    $this->resultat = [];

    $this->id_purchase= "";
    // $this->id_user= $_SESSION['id_user'];



    // execute main function
    
  }

  /**
   *
   * Destroy service
   *
   */
  public function __destruct() {
    // Call Parent destructor
    parent::__destruct();
    // destroy objet_service
    unset($objet_service);
  }

  public function cart_list() {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "offer_select_codePromo.sql";
    $this->resultat['offer_codePromo_list'] = $this->oBdd->getSelectDatas($spathSQL, array(
    ));

    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "offer_select_CRCD_training.sql";
    $this->resultat['offer_CRCD_Training'] = $this->oBdd->getSelectDatas($spathSQL, array(
    ));
  }

  // public function codePromo_list() {
  //   $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "insert_purchase.sql";
  // }
  
  // this function will add a new purchase 
  public function cart_validation() {
                
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "insert_purchase.sql";
    $this->resultat= $this->oBdd->treatDatas($spathSQL, array(
                                                              "id_user" => $_SESSION['id_user'],
                                                              "purchase_reference"=> $this->VARS_HTML["purchase_reference"],
                                                            ));
  
    $this->id_purchase= $this->oBdd->getLastInsertId();
    $this->cart_user_basket();
  }   

  // this function will add a new line of purchase to the table in the page "purchase"
  public function cart_user_basket() {

    $this->basket= $this->VARS_HTML['id_basket'];
    $this->ordered_quantity= $this->VARS_HTML['ordered_quantity'];

    // tranlation of the string "basket" received from AJAX to an array 
    $this->basket= explode(",",$this->basket);

    // tranlation of the string "ordered_quantity" received from AJAX to an array 
    $this->ordered_quantity= explode(",",$this->ordered_quantity); 
    

    // loop for the request which add (a) new line(s) of basket(s) to the new purchase 
    for ($i=0; $i<count($this->basket); $i++) {
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "insert_user_basket.sql";
      $this->resultat= $this->oBdd->treatDatas($spathSQL, array(
                                                                  'id_purchase' => $this->id_purchase,
                                                                  "id_basket"=> $this->basket[$i],
                                                                  "id_user" => $_SESSION['id_user'],
                                                                  "ordered_quantity"=> $this->ordered_quantity[$i],
                                                              ));                                                                                                               
    }
       
  }
  
  
  /**
   * Records the fact that the user has applied the promo code provided but has not yet validated the order
   * 
   * @param string|int $userId The user ID
   * @param string|int $promoId The promo ID
   * 
   * @return array|null
   */
  public function addUserPromoUnvalidatedPurchase($userId, $promoId) {
		$sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "cart__add_user_unvalidated_promo.sql";
		return $this->oBdd->treatDatas($sqlPath, [
				'userId' => $userId,
				'promoId' => $promoId
		]);
  }

  /**
   * Deletes the saving of the promo code which had been entered by the user but which had not yet finalized his purchase.
   * 
   * @param string|int $userId The user ID
   * @param string|int $promoCode The promo ID
   * 
   * @return array|null
   */
  public function cancelUserPromoCodeUse($userId, $promoCode) {
		$sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "cart__delete_user_unvalidated_promo.sql";
		return $this->oBdd->treatDatas($sqlPath, [
				'userId' => $userId,
				'promoCode' => $promoCode
		]);
  }

  /**
   * Get information about a promo from its code. Returns a result only if the counter is not exceeded.
   * 
   * @param string $promo_code The promo code to check
   * 
   * @return array|null Returns promo code details if valid, or null otherwise
   */
  public function getPromoFromCode(string $promo_code) {
		$sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "cart__get_promo_from_code.sql";
		return $this->oBdd->getSelectDatas($sqlPath, [
				'promoCode' => $promo_code
		]);
  }

  /**
   * Returns the number of times the promo code has been used by the user.
   * 
   * @param string $promo_code The promo code to check
   * 
   * @return int|null Null on error
   */
  public function getUsedPromoCodeByUserCount($userId, string $promo_code) {
		$sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "cart__get_used_promo_code_by_user_count.sql";
		return +$this->oBdd->getSelectDatas($sqlPath, array(
				'userId' => $userId,
        'promoCode' =>  $promo_code
    ))[0]['compteur'];
  }



}
  

?>

