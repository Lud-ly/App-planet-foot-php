<?php
require_once  "initialize.php";
/**
 * Class adm_notice_service | fichier adm_notice_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_notice_service
 * @author @AfpaLabTeam - Virginie Vigneron
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v3.0
 */

Class Adm_notice_service extends Initialize	{

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
   *
   * Permet l'affichage des données dans le tableau
   *
   */
    public function adm_notice_list() {
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_notice.sql";
      $this->resultat["adm_notice_list"]= $this->oBdd->getSelectDatas($spathSQL, array(
                                                                
      ));
    }


  /**
   *
   * Permet de modifier les données du tableau
   *
   */
    public function Adm_notice_update() {
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_notice_update.sql";
      $this->resultat["adm_notice_update"]= $this->oBdd->treatDatas($spathSQL, array(
                                                                  "id_article" => $this->VARS_HTML['id_article'],
                                                                  "article_title" => $this->VARS_HTML['article_title'],
                                                                  "article_subtitle" => $this->VARS_HTML['article_subtitle'],
                                                                  "article_content" => $this->VARS_HTML['article_content'],
                                                                  "article_url_img" => $this->VARS_HTML['article_url_img'],
                                                                  "article_date" => $this->VARS_HTML['article_date'],
                                                                  "article_time" => $this->VARS_HTML['article_time'],
                                                                  "article_author" => $this->VARS_HTML['article_author']
      ));
    }


  /**
   *
   * Permet de supprimer les données du tableau
   *
   */
    public function Adm_notice_delete() {
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_notice_delete.sql";
      $this->resultat["adm_notice_delete"]= $this->oBdd->treatDatas($spathSQL, array(
                                                                  "id_article" => $this->VARS_HTML['id_article'],
                                                                  "article_title" => $this->VARS_HTML['article_title'],
                                                                  "article_subtitle" => $this->VARS_HTML['article_subtitle'],
                                                                  "article_content" => $this->VARS_HTML['article_content'],
                                                                  "article_url_img" => $this->VARS_HTML['article_url_img'],
                                                                  "article_date" => $this->VARS_HTML['article_date'],
                                                                  "article_time" => $this->VARS_HTML['article_time'],
                                                                  "article_author" => $this->VARS_HTML['article_author']
      ));
    }


  /**  
   *
   * Permet d'insérer de nouvelles données dans le tableau
   *
   */
    public function Adm_notice_insert() {
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_notice_insert.sql";
      $this->resultat["adm_notice_insert"]= $this->oBdd->treatDatas($spathSQL, array(
                                                                  "article_title" => $this->VARS_HTML['article_title'],
                                                                  "article_subtitle" => $this->VARS_HTML['article_subtitle'],
                                                                  "article_content" => $this->VARS_HTML['article_content'],
                                                                  "article_url_img" => $this->VARS_HTML['article_url_img'],
                                                                  "article_date" => $this->VARS_HTML['article_date'],
                                                                  "article_time" => $this->VARS_HTML['article_time'],
                                                                  "article_author" => $this->VARS_HTML['article_author']
      ));
    }


  /**
   *
   * Permet de modifier le statut de l'actualité on/off
   *
   */
    public function Adm_notice_status()
    {
        $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_notice_status.sql";
        $this->resultat["adm_notice_status"]= $this->oBdd->treatDatas($spathSQL, array("id_article" => $this->VARS_HTML['id_article'],"article_status" => $this->VARS_HTML['article_status']
        ));
    }


    


}


?>

