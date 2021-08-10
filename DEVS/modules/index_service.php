<?php
require_once  "initialize.php";
/**
 * Class index_service | fichier index_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage index_service
 * @author @AfpaLabTeam - JiJou
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Index_service extends Initialize	{

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
  }

    /**
     * READ BASKET TABLE
     * 
     * GET BASKET LIST FROM DATABASE
     */
    public function index_list_basket() {
        $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "index_list_basket.sql";
        $this->resultat["index_list_basket"]= $this->oBdd->getSelectDatas($spathSQL, array());
    }

      /**
     * READ ARTICLES NEWS
     * 
     * GET NEWS ARTICLES  LIST FROM DATABASE
     */
    public function index_list_articles_news() {
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "index_list_articles_news.sql";
      $this->resultat["index_list_articles_news"]= $this->oBdd->getSelectDatas($spathSQL, array());
  }
      /**
     * READ STEP & SECTION DEV
     * 
     * GET "QUI SOMMES NOUS", SECTION DEV AND STEP LIST FROM DATABASE
     */
    public function index_list_step_news() {
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "index_list_step_news.sql";
      $this->resultat["index_list_step_news"]= $this->oBdd->getSelectDatas($spathSQL, array());
  }

  

}
  

?>

