<?php
require_once "input_control.php";
require_once "adm_setting.php";
require_once "adm_setting__service.php";

/**
 * class Adm_setting__save_params | file adm_setting__save_params.php
 *
 * Allows to save the changes made by the user on the config: updates the parameters
 * in the database after checking that they were valid.
 *
 * Needs :
 *     • require_once "input_control.php";
 *     • require_once "adm_setting.php";
 *     • require_once "adm_setting__service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_setting__save_params
 * @author @AfpaLabTeam - Damien
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */
class Adm_setting__save_params	{
	
    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;
    public $result;

    /**
     * init variables resultat
     *
     * execute main function
     */
    public function __construct() {
        // init variables resultat
        $this->resultat = [];
        // init variables resultat
        $this->result = [];

        // execute main function
        $this->main();
    }

    /**
     *
     * Destroy service
     *
     */
    public function __destruct() {
        // destroy obj_service
        unset($objet_service);
    }

    /**
     * Save params (insert them in the database if they don't already exist, or update them)
     * 
     */
    private function main() {
		$objet_service = new Adm_setting__service();
		$this->VARS_HTML = $objet_service->VARS_HTML;

        // filter the params keeping only those that can be saved from this page
        Adm_setting::$allowedParamsConfig = Adm_setting::getParamsConfig(Adm_setting::ALLOWED_PARAMS);
        
        // check if provided data is valid
        $aResult = Input_control::checkAll(
            $_POST['json'],
            [
                'fields' =>                     Adm_setting::$allowedParamsConfig,
                'allow_unknown_fields' =>       false,
                'convert_type_to_sqltype' =>    true,
                'min_valid_fields' =>           1   
            ]
        );
        // if valid data :
        if ($aResult['is_valid']) {
            // secured data and save it into database
            $objet_service->saveParams();
        }
        // send the result to JS
        send_json_to_JS($aResult);
    }
	

}



