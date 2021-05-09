<?php
require_once "crypted.php";
require_once "input_control.php";
require_once "account_service.php";


/**
 * Class Account | 'account.php' file
 *
 * Manages the "Profile" page for the user.
 *
 * Needs :
 *  - 'utils.php'
 *  - 'input_control.php'
 *  - 'account_service.php'
 *
 * @package Afpanier v3 Project
 * @subpackage Account
 * @author @AfpaLabTeam - Perez Guy & Grember Damien
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */
class Account	{
    // ◘ >>  PROPERTIES  << ◘
    /**
     * All datas needed for HTML Templates
     * 
     * @var array $resultat
     */
    public $resultat;

    /**
     * @static The services object
     */
    public static $objet_service;

    /**
     * Infos about the connected user
     * 
     * @static array $userInfos Infos about the connected user
     */
    public static $userInfos = [];


    // ◘ >>  METHODS  << ◘
    /**
     * Get interface to gestion of account
     *
     * Get user informations
     */
    public function __construct() {
        // init variables resultat
        $this->resultat = [];

        // if ( not already instantiated AND user id provided )
        if (isEmpty(static::$userInfos) && isset($_SESSION["id_user"])) {
            // instanciates account services
            static::$objet_service = new Account_service($_SESSION["id_user"]);
            // parameters that I can access in my HTML pages
            $this->VARS_HTML = self::$objet_service->VARS_HTML;

            // get user informations
            static::$userInfos = self::$objet_service->getUserInfos($_SESSION["id_user"]);
        }

    }

    /**
     * Returns the data check result
     * 
     * @return array Array containing in keys :
     *   - @var Bool 'is_valid' Indicates whether all data is valid or not
     *   - @var Array 'invalid_fields' Specifies in keys which data is invalid. For example :
     *        - @var Array 'tel'
     *        - @var Array 'email'
     *        - @var Array 'password'
     */
    public static function getDataCheckResult() {
        $aResult = [];
        $aSource = json_decode($_POST['json'], true);
        $aInvalidFields = [];
        if (isset($aSource['tel'])) {
            // check if the tel is valid
            if (!Input_control::isTelValid($aSource['tel'])) {
                // INVALID tel
                $aInvalidFields['tel'] = ['message' => "Numéro de téléphone invalide"];
            }
        }
        if (isset($aSource['email'])) {
            // check if the email is valid
            if (!Input_control::isEmailValid($aSource['email'])) {
                // INVALID email
                $aInvalidFields['email'] = ['message' => "E-mail invalide"];
            }
        }
        if (isset($aSource['password'])) {
            // check if the password is not empty
            if (!isEmpty($aSource['password'])) {
                // INVALID password
                $aInvalidFields['password'] = ['message' => "Mot de passe vide."];
            }
        }
        // prepare and return the RESULT
        if (count($aInvalidFields) === 0) {
            $aResult['is_valid'] = true;
        } else {
            $aResult['is_valid'] = false;
            $aResult['invalid_fields'] = $aInvalidFields;
        }
        return $aResult;
    }

    /**
     * Send Account patterns to JS (tel and not_empty pattern)
     */
    public static function sendPatternsToJs() {
        $aPatterns =  [
            'email' =>          Patterns::get('email'),
            'tel' =>            Patterns::get('tel'),
            'not_empty' =>      Patterns::get('not_empty')
        ];
        utils::send_json_to_JS($aPatterns);
    }

    /**
     * Update the user infos in database ('tel', 'email', or 'password' if provided)
     * 
     * @return array
     */
    public static function updateUserInfos() {
        $aResult = [];
        $aSource = json_decode($_POST['json'], true);
        // secure the array
        arr_secure($aSource);
        if (isset($aSource['tel'])) {
            // update the tel number
            $sSqlPath = Account_ajax::$obj_service->GLOBALS_INI["PATH_HOME"] . Account_ajax::$obj_service->GLOBALS_INI["PATH_MODEL"] . "account__update_tel.sql";
            $aResult["tel"] = Account_ajax::$obj_service->oBdd->treatDatas(
                    $sSqlPath,
                    [
                        "userId" => $_SESSION['id_user'],
                        "userPhoneNumber" => $aSource['tel']
                    ]
            );
        }
        if (isset($aSource['email'])) {
            // update the email
            $sSqlPath = Account_ajax::$obj_service->GLOBALS_INI["PATH_HOME"] . Account_ajax::$obj_service->GLOBALS_INI["PATH_MODEL"] . "account__update_email.sql";
            $aResult["email"] = Account_ajax::$obj_service->oBdd->treatDatas(
                    $sSqlPath,
                    [
                        "userId" => $_SESSION['id_user'],
                        "userEmail" => $aSource['email']
                    ]
            );
        }
        if (isset($aSource['password'])) {
            // hash the password with user id as key
            $sHashedPass = Crypted::crypterssl($_SESSION['id_user'], $aSource['password']);
            // update the password
            $sSqlPath = Account_ajax::$obj_service->GLOBALS_INI["PATH_HOME"] . Account_ajax::$obj_service->GLOBALS_INI["PATH_MODEL"] . "account__update_password.sql";
            $aResult["password"] = Account_ajax::$obj_service->oBdd->treatDatas(
                    $sSqlPath,
                    [
                        "userId" => $_SESSION['id_user'],
                        "userPassword" => $sHashedPass
                    ]
            );
        }
        return $aResult;
    }

    
}

