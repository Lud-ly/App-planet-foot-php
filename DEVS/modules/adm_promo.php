<?php
require_once "adm_promo_service.php";
require_once "input_control.php";

/**
 * Class Adm_promo | fichier adm_promo.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_promo_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_promo
 * @author @AfpaLabTeam - Perez Guy
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Adm_promo	{
	
    /**
     * @var object The service object
     */
    private $obj_service;

    /**
     * @var array $promoTypes All promo types
     */
    static $promoTypes;

    /**
     * @var array $fieldsConfig Promo fields and their config.
     */
    static $fieldsConfig;


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
        unset($this->obj_service);
    }

    /**
     * Get interface to gestion of adm_promo
     */
    function main() {
		$this->obj_service = new Adm_promo_service();
		$this->VARS_HTML = $this->obj_service->VARS_HTML;
       
        if (!isset($this->VARS_HTML['action'])) {
            return;
        }

        // get promo types
        Adm_promo::$promoTypes = $this->obj_service->getPromoTypes();

        switch ($this->VARS_HTML['action']) {
            case 'getPromoTypes':
                send_json_to_JS(Adm_promo::$promoTypes);
                break;
            case 'saveNewPromo':

                // save promo ?
                $savePromo = true;

                if ( !$savePromo ) {

                    log::f(
                        '_test_',
                        // Input_control::getPatternFromSimplifiedPattern(),
                        // Input_control::getReplacements()
                        // Input_control::checkVal('toto', ['type'=>   'integer']),
                        Input_control::getFormatResults(
                            '2022-04-01',
                            '{{YYYY}}-{{MM}}-{{DD}}',
                            false
                        )
                    );
                    return;
                    Log::f(
                        'test',
                        // Input_control::check(['nom_utilisateur' => 'Damietto'], ['nom_utilisateur' => ['type'=> 'integer']]),
                        // Input_control::check(['email' => 'toto@free.fr'], ['email' => ['email'=> true]]),
                        // // Input_control::check(['toto' => 'toto@f@ree.fr'], ['toto' => ['email'=> true, 'email_message'=> ' %{rule}  %{field}  %{value} !', ,'message'=> 'Heyy !!']]),
                        // Input_control::check(['nom_champ' => '0032993385'], ['nom_champ' => ['tel'=> true]]),
                        // Input_control::check(['nom_champ_local' => '0432993385'], ['nom_champ_local' => ['local_tel'=> true]]),
                        Input_control::check(
                            ['dt' => '2021-04-02']
                            ,
                            ['dt' =>
                                ['datetime' =>
                                    ['>=' => '2021-1-01']
                                ]
                            ]
                        ),
                        Input_control::getLastErrorMessage(),
                        'règle ' . Input_control::getLastErrorRuleName(),
                        'champ ' . Input_control::getLastErrorField()
                    );
                } else {
                    $this->saveNewPromo();
                }
        }
		
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $this->obj_service->resultat;
    }

    /**
     * Save a new promo
     */
    public function saveNewPromo() {
        // log
        log::f(
            '$matches',
            ''
        );

        // check if provided data is valid
        $aResult = Input_control::checkAll(
            $_POST['json'],
            [
                'fields' =>                     Adm_promo::getFieldsConfig(),
                'default_fields_config' =>      [
                    'required' =>                   true
                ],
                'allow_unknown_fields' =>       true,
                'convert_type_to_sqltype' =>    true
            ]
        );
        log::f(
            'config',
            Input_control::getConfig()
        );
        log::f(
            'data',
            Input_control::getData(false)
        );
        
        // if valid data :
        if ($aResult['is_valid']) {
            // secured data and save it into database
            // $this->obj_service->saveParams();
        }
        // send the result to JS
        send_json_to_JS($aResult);

    }
    
    /**
     * Returns the promo fields config
     * 
     * @return array
     */
	public static function getFieldsConfig() :array {
        return [
            'promoCode' => [
                'pattern' =>    '/^[A-Z0-9_]{5,10}$/',
                'message!' =>    '5 à 10 caractères (lettres, chiffres ou tirets) sont attendus'
            ],
            'promoDescription' => [
                'allowempty' => true,
                'minlength' =>  10,
                'type' =>       'string'
            ],
            'promoStartDate' => [
                // 'datetime' =>       true
                // 'format' =>     '{{date_yyyy}}-{{date_mm}}-{{date_dd}}',
                // 'format_message' =>  'La date ne peut être déjà passée'

                'date' =>       [
                    '>=' =>          '{{date.NOW}}',
                    '>=_message' =>  'La date ne peut être déjà passée'
                ]
            ],
            'promoStartTime' => [
                'time' =>       true
            ],
            'promoEndDate' => [
                'allowempty' => true,
                'date' =>       [
                    '>=' =>          '{{promoStartDate}}',
                    '>=_message' =>  'Doit être à partir de la date de début'
                ]
            ],
            'promoEndTime' => [
                'time' =>       true
            ],
            'promoLabel' => [
                'allowempty' => true,
                'type' =>       'string',
                'message' =>    'Libellé manquant'
            ],
            'promoQuantity' => [
                'allowempty' => true,
                'type' =>       'integer',
                '>=' =>         0,
                'message!' =>   'quantité ou \'0\' pour illimité'
            ],
            'promoStatus' => [
                'type' =>       'bool',
                'message' =>    'Un booléen est attendu'
            ],
            'promoType' => [
                'inclusion' =>  Adm_promo::$promoTypes
            ],
            'promoValue' => [
                'type' =>       'integer',
                '>=' =>         5,
                '<=' =>         100,
                'message!' =>  'Une valeur entre 5 et 100 est attendue'
            ]
        ];
    }
}

?>

