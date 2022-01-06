<?php
require_once  "initialize.php";
/**
 * Class logout_service | fichier logout_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage logout_service
 * @author @AfpaLabTeam - Virginie
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

class Login_service extends Initialize
{

  /**
   * public $resultat is used to store all datas needed for HTML Templates
   * @var array
   */
  public $resultat;

  /**
   * public $now shows the current datetime 
   * @var dateTime
   */


  /**
   * init variables resultat
   *
   * execute main function
   */
  public function __construct()
  {
    // Call Parent Constructor
    parent::__construct();

    // init variables resultat
    $this->resultat = [];
    //session_destroy();
    // execute main function

  }

  /**
   *
   * Destroy service
   *
   */
  public function __destruct()
  {
    // Call Parent destructor
    parent::__destruct();
    // destroy objet_service
    unset($objet_service);
  }

  /**
   * READ USERS
   * 
   * GET USERS LIST FROM DATABASE
   */
  public function index_list_users()
  {

    $row = 0;


    $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "index_list_user.sql";
    $this->resultat["index_list_users"] = $this->oBdd->getSelectDatas($spathSQL, array());

    $aOfUsers = $this->resultat["index_list_users"];


    if (isset($_POST["front_user_password"]) && $_POST["front_user_password"] !== "") {

      $_front_user_password = $_POST["front_user_password"];
      $_front_username = $_POST["front_username"];
      $_SESSION['front_username'] = $_front_username;
      $_SESSION['front_user_password'] = $_front_user_password;
    }

    //$_SESSION["aOfUsers"] = $aOfUsers;
    for ($i = 0; $i < count($aOfUsers); $i++) {
      if ($_SESSION['front_user_password'] == $aOfUsers[$i]['password']) {
        $row = 1;
        // header("Refresh:0; url=index");
        var_dump($aOfUsers[$i]['password'] . " " . $aOfUsers[$i]['user_name']);
      }
    }
    if ($row == 1) {
      header("Location: index");
    }
  }
}
