<?php
require_once  "initialize.php";
/**
 * Class adm_client_service | fichier adm_client_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_client_service
 * @author @AfpaLabTeam - Perez Guy
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Adm_client_service extends Initialize	{

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

  public function adm_client_list() {
		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_client_list.sql";
		$this->resultat["adm_client_list"]= $this->oBdd->getSelectDatas($spathSQL, array(
                                                  
    ));
    
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_count_canceled_purchases.sql";
		$this->resultat["count_canceled_purchases"]= $this->oBdd->getSelectDatas($spathSQL, array(
                                                  
    ));

    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_count_all_purchases.sql";
		$this->resultat["count_all_purchases"]= $this->oBdd->getSelectDatas($spathSQL, array(
                                                  
    ));
  }

  public function adm_client_update() {
		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "update_adm_client.sql";
		$this->resultat["adm_client_update"]= $this->oBdd->treatDatas($spathSQL, array(
                                                  "id_user" => $this->VARS_HTML['id_user'],
                                                  "user_mail" => $this->VARS_HTML['user_mail'],

    ));
  }

  public function adm_client_delete() {
		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "delete_adm_client.sql";
		$this->resultat["adm_client_delete"]= $this->oBdd->treatDatas($spathSQL, array(
                                                  "id_user" => $this->VARS_HTML['id_user'],

    ));
  }

}


?>

