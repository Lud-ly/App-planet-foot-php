<?php
require_once "account.php";
require_once "account_service.php";


/**
 * Class Account_ajax | fichier account_ajax.php
 *
 * Handles all ajax requests concerning the "Account" part
 * the json are sent to the JS with ""
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "account_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Account
 * @author @AfpaLabTeam - Perez Guy & Damien Grember
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */
class Account_ajax extends Initialize	{
    // ◘ >>  PROPERTIES  << ◘
    /**
     * public $obj_service The service object
     */
    public static $obj_service;

    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;



    // ◘ >>  METHODS  << ◘
    /**
     * Checks the requested action and processes it
     */
    public function __construct() {
        // creates the service object
        static::$obj_service = new Account_service('null');
        $this->VARS_HTML = static::$obj_service->VARS_HTML;

        // if no action exected : returns
        if (!isset($this->VARS_HTML['action'])) {
            return;
        }
        // else, checks the requested action and processes it
        switch ($this->VARS_HTML['action']) {
            case 'update':
                // check if provided data is valid
                $aResult = Account::getDataCheckResult();
                // is data valid ?
                $bIsValid = $aResult['is_valid'];
                if ($bIsValid) {
                    Account::updateUserInfos();
                }
                send_json_to_JS($aResult);
                break;
            case 'get_patterns':
                Account::sendPatternsToJs(); 
                break;
            case 'get_infos':
                $aResult = static::$obj_service->getUserInfos($_SESSION['id_user']);
                send_json_to_JS($aResult);
                break;
            case 'delete':
                $aResult = static::$obj_service->deleteAccount($_SESSION['id_user']);
                send_json_to_JS($aResult);
        }
    }

    
}

