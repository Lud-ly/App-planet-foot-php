<?php
require_once  "initialize.php";
/**
 * Class Purchase_service | fichier purchase_service.php
 *
 * Cette classe permet de gerer l'ensemble des fonctions liées
 * à la partie concernant les commandes
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage purchase_service
 * @author @AfpaLabTeam - Ludovic H. & Damien
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Purchase_service extends Initialize	{

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

  /**
   * List all of the purchases made by the user
   * 
   * @return array
   */
  public function purchase_list() {
		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_purchase.sql";
		$this->resultat["purchase_list"]= $this->oBdd->getSelectDatas($spathSQL, array(
                                                                "id_user" => $_SESSION['id_user']
    ));
  }

  /**
   * Delete the purchase which the user don't want anymore (before its validation)
   * 
   */
  public function purchase_delete_basket() {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "delete_purchase.sql";
    $this->resultat["purchase_list"]= $this->oBdd->treatDatas($spathSQL, array(
                                                                "id_user" => $_SESSION['id_user'],
                                                                "id_purchase" => $this->VARS_HTML['id_purchase'], 
    ));
  }
  
  /**
   * List the informations regarding the center and the parameter (here the CRCD training status)
   * 
   * @return array
   */
  public function purchase_info() {
		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_info_purchase.sql";
		$this->resultat["purchase_info"]= $this->oBdd->getSelectDatas($spathSQL, array(
                                                                "id_user" => $_SESSION['id_user']
    ));
  }

}
  

?>

