<?php
require_once "database.php";
require_once "security.php";

/**
 * Class Initialize | file initialize.php
 *
 * In this class, we find all about initialize
 *
 * List of classes needed for this class
 * database.php
 * security.php
 *
 * @package Planet-foot Project
 * @subpackage index_service
 * @author @LudoLabTeam - Ludo
 * @copyright  1920-2080 
 * @version v1.0
 */
Class Initialize	{
	/**
	 * @var object $oBdd
	 * @var array $GLOBAL_INI
	 * @var object $oSecu
	 * @var array $VARS_HTML
	 * 
	 */
	// Database instance object
	public $oBdd;
	// All globals from INI
	public $GLOBALS_INI;
	// Form Security instance object
	private $oSecu;
	// Array of data
	public $VARS_HTML;
	

	/**
	 * 
	 * Fill GLOBAL_INI with an array of path variables
	 * Create instance of Security and Database connection 
	 * Set data in public VARS_HTML from Security Object VARS_HTML argument
	 * 
	 */
	public function __construct()	{
		// Instance of Config
		$this->GLOBALS_INI= Configuration::getGlobalsINI();

		// Instance of BDD
		$this->oBdd = new Database($this->GLOBALS_INI["DB_HOST"],
								   $this->GLOBALS_INI["DB_NAME"],
								   $this->GLOBALS_INI["DB_LOGIN"],
								   $this->GLOBALS_INI["DB_PSW"]);

		// Instance of Security to have $this->VARS_HTML
		$this->oSecu= new Security();
		$this->VARS_HTML= $this->oSecu->VARS_HTML;
	}

	/**
	 * Destroy security Object and Database initialization Object
	 */
	public function __destruct()	{
		// destroy Instance of Form
		unset($this->oSecu);
		// disconnect of BDD
		// destroy Instance of BDD
		unset($this->oBdd);
	}

//End of class
}
