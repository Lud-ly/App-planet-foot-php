<?php
require_once  "initialize.php";
/**
 * Class Adm_purchase_service | fichier Adm_purchase_service.php
 *
 * This class will manage the different functions in relation with the contact form
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_purchase_service
 * @author @AfpaLabTeam - Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Adm_purchase_service extends Initialize	{

  /**
   * public $resultat is used to store all datas needed for HTML Templates
   * @var array
   */
  public $resultat;

    /**
   * public $result is used to store all datas needed for HTML Templates
   * @var array
   */
  public $result;

  /**
   * init variables resultat, result
   *
   * execute main function
   */
  public function __construct() {
    // Call Parent Constructor
    parent::__construct();

    // init variables resultat
    $this->resultat = [];

        // init variables result
        $this->result = [];

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

  public function Adm_purchase_update_status() {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_purchase_update_status.sql";
    $this->resultat["adm_purchase_update_status"]= $this->oBdd->treatDatas($spathSQL, array(
                                                                // "id_user" => $this->VARS_HTML['id_user'],
                                                                "id_purchase" => $this->VARS_HTML['id_purchase'],
                                                                "purchase_status" => $this->VARS_HTML['purchase_status'] 
    ));
  }

  public function adm_purchase_list() {
		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_purchase_list.sql";
		$this->resultat["adm_purchase_list"]= $this->oBdd->getSelectDatas($spathSQL, array(
                                                  
    ));
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_purchase_ingredient.sql";
    $this->resultat["adm_purchase_list_ingredient"]= $this->oBdd->getSelectDatas($spathSQL, array(
                                                  
    ));
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_codePromo.sql";
    $this->resultat["adm_purchase_codePromo"]= $this->oBdd->getSelectDatas($spathSQL, array(
                                                  
    ));
  }

}


?>

