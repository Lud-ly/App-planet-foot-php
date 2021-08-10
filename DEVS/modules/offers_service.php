<?php
require_once  "initialize.php";
/**
 * Class Offers_service | fichier offers_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage offers_service
 * @author @AfpaLabTeam - Virginie
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Offers_service extends Initialize	{

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
    // Call Parent Constructor
    parent::__construct();

    // init variables resultat
    $this->resultat = [];

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

  // list of all ingredients of all baskets
  public function getIngredients() {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_offer_basket_ingredients.sql";
		$this->resultat["offer_list_ingredients"]= $this->oBdd->getSelectDatas($spathSQL, array(
                                                                
    ));

    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_offer_basket.sql";
		$this->resultat["offer_list_basket"]= $this->oBdd->getSelectDatas($spathSQL, array(
                                                                
    ));
  }

}
  

?>

