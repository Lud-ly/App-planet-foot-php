<?php
require_once  "initialize.php";
/**
 * Class Adm_dash | fichier adm_dash.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_dash
 * @author @AfpaLabTeam - Perez Guy
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Adm_dash_service extends Initialize	{

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

          /***********************************
     * Retourne la liste des statistiques
     * @return Array
     */

    public function adm_dash_list(){
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_dash.sql";
  $this->resultat["adm_dash_list"]= $this->oBdd->getSelectDatas($spathSQL, array(                                                         
  ));
  }

    public function adm_dash_basket(){
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_dash_basket.sql";
  $this->resultat["adm_dash_basket"]= $this->oBdd->getSelectDatas($spathSQL, array(                                                         
  ));
  }

  public function adm_dash_weight_basket(){
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_dash_weight_basket.sql";
  $this->resultat["adm_dash_weight_basket"]= $this->oBdd->getSelectDatas($spathSQL, array(                                                         
  ));
  }

  public function adm_dash_sort_basket(){
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_dash_sort_basket.sql";
  $this->resultat["adm_dash_sort_basket"]= $this->oBdd->getSelectDatas($spathSQL, array(                                                         
  ));
  }


}


?>

