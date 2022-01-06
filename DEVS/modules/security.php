<?php
/**
 * Class Security | file security.php
 *
 * In this class, we find all about security
 *
 * List of classes needed for this class
 * no required class
 *
 * @package Planet-foot Project
 * @subpackage index_service
 * @author @LudoLabTeam - Ludo
 * @copyright  1920-2080 
 * @version v1.0
 */

class Security {
	/**
	 * Verify $_GET and $_POST
	 * Create a new public variable $VARS_HTML filtered by htmlspecialchars
	 * Contain all request data (GET OR POST) 
	 *
	 * @var array $VARS_HTML
	 */
	public $VARS_HTML;

	function __construct()	{
		// put all variables $_POST et $_GET into the array $VARS_HTML
		$this->VARS_HTML= [];

		foreach($_POST as $key => $val)	{
			if(strstr(strtolower($val), "<script")) {
				$val= str_replace("<script", "<em", strtolower($val));
				$val= str_replace("</script>", "</em>", strtolower($val));
			}
			$val= str_replace("__APOSTROPHE__", "\"", $val);
			$this->VARS_HTML[$key]= htmlspecialchars($val, ENT_QUOTES);
		}

		foreach($_GET as $key => $val)	{
			if(strstr(strtolower($val), "<script")) {
				$val= str_replace("<script", "<em", strtolower($val));
				$val= str_replace("</script>", "</em>", strtolower($val));
			}
			$val= str_replace("__APOSTROPHE__", "\"", $val);
			$this->VARS_HTML[$key]= htmlspecialchars($val, ENT_QUOTES);
		}

		if ( (!(isset($this->VARS_HTML["page"]))) || ($this->VARS_HTML["page"] == "") )	{
			$this->VARS_HTML["page"]= "index";
		}
	}
//End of class	
}
