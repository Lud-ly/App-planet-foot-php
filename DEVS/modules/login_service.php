<?php
require_once  "initialize.php";
/**
 * Class login_service | fichier login_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage login_service
 * @author @AfpaLabTeam - Virginie
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Login_service extends Initialize	{

	/**
	 * public $resultat is used to store all datas needed for HTML Templates
	 * @var array
	 */
	public $resultat;

		/**
	 * public $resultat is used to store all datas needed for HTML Templates
	 * @var int
	 */
	private $id_user;

			/**
	 * public $resultat is used to store all datas needed for HTML Templates
	 * @var date
	 */
	private $now;

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

		// $this->id_user= $_SESSION["id_user"];

		$this->now= "";

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

	public function date_last_connexion() {
		date_default_timezone_set('Europe/Paris');
		$this->now = date("Y-m-d H:i:s");

		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "update_date_last_connection.sql";
		$this->resultat["adm_client_update"]= $this->oBdd->treatDatas($spathSQL, array(
																									"id_user" => $_SESSION['id_user'],
																									"user_date_last_connection" => $this->now,
		));
	}

	/**
	 * Returns infos about a user
	 * 
	 * @param string $userLogin The user login (email)
	 * @param string[] $exclude All non-desired infos (ex: ['user_pwd',..])
	 * 
	 * @return array|null Null if unknown user
	 */
	public function getUserInfos(string $userLogin, array $exclude = []) {
		$sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "login__get_user_infos.sql";
		$result = $this->oBdd->getSelectDatas($sqlPath, [
				'userLogin' => $userLogin
		]);
		if (isEmpty($result)) {
			return;
		}
		$result = $result[0];
		foreach ($exclude as $fieldToExclude) {
			// remove keys to exclude
			if (isset($result[$fieldToExclude])) {
				unset($result[$fieldToExclude]);
			}
		}
		return $result;
	}

}
	

?>

