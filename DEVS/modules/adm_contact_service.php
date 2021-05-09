<?php
require_once  "initialize.php";
/**
 * Class Adm_contact_service | fichier adm_contact_service.php
 *
 * Cette classe va permettre de gérer les diférentes fonction liées au formulaire de contact du projet
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_client_list
 * @author @AfpaLabTeam - Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Adm_contact_service extends Initialize	{

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
 * Retourne la liste des producteurs
 * @return Array
 */

  public function adm_center_list(){
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_center_list.sql";
    $this->resultat["adm_contact_list"]= $this->oBdd->getSelectDatas($spathSQL, array(                                                         
  ));
  }

    /*************************************************
     * Modifie les messages contact de chaque centers
     * Methode qui récupère les modifications enregistrées par l'utilisateur et les envoie à la base de données
     * @return Array
     */
    public function adm_update_center_server(){
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_center_update.sql";
      return  $this->oBdd->treatDatas($spathSQL, array(  
                                                              "id_center" => $this->VARS_HTML['id_center'],
                                                              "center_contact_form_message" => $this->VARS_HTML['center_contact_form_message'],
                                                              "center_validate_schedule" => $this->VARS_HTML['center_validate_schedule'],
                                                              "center_phoneNumber" => $this->VARS_HTML['center_phoneNumber'],
                                                              "withdrawall_date_available" => $this->VARS_HTML['withdrawall_date_available'],
                                                              "center_place_topay" => $this->VARS_HTML['center_place_topay'],
                                                              "center_withdrawall_schedule" => $this->VARS_HTML['center_withdrawall_schedule'],
                                                              "center_contact_mail" => $this->VARS_HTML['center_contact_mail'],
                                                              "center_urlGoogleMap" => $this->VARS_HTML['center_urlGoogleMap'], 
                                                              
                                                                          
  )); 
  }

}


?>

