<?php
require_once 'input_control.php';
require_once "adm_setting__service.php";

/**
 * Class Adm_setting | fichier adm_setting.php
 *
 * Contains the config necessary to check the data before interacting with the database.
 * Also contains the business services object.
 *
 * Needs :
 *     • require_once "input_control.php";
 *     • require_once "adm_setting__save_params.php";
 *     • require_once "adm_setting__service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_setting
 * @author @AfpaLabTeam - Virginie & Damien
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v3.0
 */

Class Adm_setting	{

    /**
     * @property int[] TIME_LIST The different possible values for the following parameters :
     *   - 'validationTime',
     *   - 'paymentTime',
     *   - 'recoveryTime',
     * 
     */
    const TIME_LIST = [12, 24, 36, 48, 72, 96];

    /**
     * @property string INVALID_TIME_MESSAGE Message returned when one of the following fields is invalid:
     *  - 'validationTime',
     *  - 'paymentTime',
     *  - 'recoveryTime',
     * 
     */
    const INVALID_TIME_MESSAGE = "Seule une valeur parmi 12, 24, 36, 48, 72 ou 96 est autorisée";

    /**
     * @property array ALLOWED_PARAMS_CONFIG All parameters which are allowed and their config.
     * 
     */
    const ALLOWED_PARAMS_CONFIG = [
        'crcdValidation' => [
            'type' =>       'boolean',
            'message' =>    'Un booléen est attendu',
            'required' =>   false
        ],
        'validationTime' => [
            'type' =>       'integer',
            'inclusion' =>  Adm_setting::TIME_LIST,
            'message' =>    Adm_setting::INVALID_TIME_MESSAGE,
            'required' =>   false
        ],
        'paymentTime' => [
            'type' =>       'integer',
            'inclusion' =>  Adm_setting::TIME_LIST,
            'message' =>    Adm_setting::INVALID_TIME_MESSAGE,
            'required' =>   false
        ],
        'recoveryTime' => [
            'type' =>       'integer',
            'inclusion' =>  Adm_setting::TIME_LIST,
            'message' =>    Adm_setting::INVALID_TIME_MESSAGE,
            'required' =>   false
        ],
        'other_param_fake' => [
            'type' =>       'string',
            'inclusion' =>  ['bonjour', 'au_revoir'],
            'message' =>    'Un \'bonjour\' ou un \'au_revoir\' svp',
            'required' =>   true
        ]
    ];

    /**
     * @var array ALLOWED_PARAMS All parameters which will be displayed on the 'settings' page
     * 
     */
    const ALLOWED_PARAMS = ['crcdValidation', 'validationTime', 'paymentTime', 'recoveryTime'];

    /**
     * @var array $allowedParamsConfig All parameters which will be displayed
     * on the 'settings' page and their config (filtered from ALLOWED_PARAMS)
     * 
     */
    public static $allowedParamsConfig = [];

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
        // init variables resultat
        $this->resultat = [];

        // execute main function
        $this->main();


    }

    /**
     *
     * Destroy service
     *
     */
    public function __destruct() {
        // destroy objet_service
        unset($objet_service);
    }

    /**
     * Get interface to gestion of adm_setting
     */
    function main() {
		$objet_service = new Adm_setting__service();
        $this->VARS_HTML = $objet_service->VARS_HTML;

        /**
         * @var array resultat Contains the various parameters which can be displayed on the page.
         */
        $this->resultat = array_filter(
            $objet_service->getParams(),
            function($val) {
                return in_array($val['paramName'], Adm_setting::ALLOWED_PARAMS);
            }
        );

    }

    /**
     * @static
     * Returns the config of the desired parameters. Or all the parameters if $desiredParams is not filled.
     * 
     * @param string[] $desiredParams All desired parameters
     * 
     * @return mixed[]
     */
    public static function getParamsConfig($desiredParams = []) {
        return ( isEmpty($desiredParams) ) ?
            Adm_setting::ALLOWED_PARAMS_CONFIG :
            arr_filter_keys(
                Adm_setting::ALLOWED_PARAMS_CONFIG,
                $desiredParams
            );
    }

    /**
     * Returns the value of a given parameter. Only if 'resultat' var contains results (exclusive usage for 'adm_setting.html').
     * 
     * @param string $paramName The parameter name
     * 
     * @return string|null Null if undefined parameter
     */
    function getParamValue($paramName) {
        foreach ($this->resultat as $paramInfos) {
            if ( $paramInfos['paramName'] === $paramName ) {
                return $paramInfos['paramValue'];
            }
        }
    }

}

?>

