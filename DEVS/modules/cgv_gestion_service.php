<?php
require_once  "initialize.php";
/**
 * Class Cgv_gestion_service | fichier cgv_gestion_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage cgv_gestion_service
 * @author @AfpaLabTeam - Virginie
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v3.0
 */

Class Cgv_gestion_service extends Initialize	{

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

  // List all of the purchases made by the user
  public function cgv_gestion_list() {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_cgv_gestion.sql";
    $this->resultat["cgv_gestion_list"]= $this->oBdd->getSelectDatas($spathSQL, array());
  }

  public function Cgv_gestion_update() {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "cgv_gestion_update.sql";
    $this->resultat["cgv_gestion_update"]= $this->oBdd->treatDatas($spathSQL, array(
                                                                "id_page" => $this->VARS_HTML['id_page'],
                                                                "page_title" => $this->VARS_HTML['page_title'],
                                                                "page_content_title" => $this->VARS_HTML['page_content_title'],
                                                                "page_content" => $this->VARS_HTML['page_content']
    ));
  }

 
}
  
?>

