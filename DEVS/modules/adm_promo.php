<?php
require_once "adm_promo_service.php";
require_once "input_control.php";

/**
 * Class Adm_promo  ♦  "adm_promo.php"
 *
 * Manage promotions
 *
 * This class needs :
 *   • require_once "adm_promo_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_promo
 * @author @AfpaLabTeam - Damien Grember
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */
class Adm_promo	{
    private static $dbg = false;

    // ◘ Properties
    /**
     * @property array $jData All data received from JS
     */
    private $jData;

    /**
     * @property object The service object
     */
    private $oService;

    /**
     * @property Input_control__fieldsRules $oFieldsRules 'AddPromo' fields rules
     */
    private $oFieldsRules;

    /**
     * @property array $aPromoTypes All promo types
     */
    private $aPromoTypes;

    /**
     * @property object $icAddPromo Input control object
     */
    private $icAddPromo;

    /**
     * @property object $icEditPromo Input control object
     */
    private $icEditPromo;

    // ◘ Constructor / Destructor
    /**
     * init variables resultat
     *
     * manages data entry control
     */
    public function __construct ()
    {
        // init variables resultat
        $this->resultat = [];

        $this->oService = new Adm_promo_service();
		$this->VARS_HTML = $this->oService->VARS_HTML;

        // get promo types
        $this->aPromoTypes = $this->oService->getPromoTypes();

        $this->generateFieldsRules();

        $this->generateInputControlObjects();


        if (!isset($this->VARS_HTML['action'])) {
            return;
        }
        // check the desired action
        switch ($this->VARS_HTML['action']) {
            case 'getPromoTypes':
                // sends to JS all promo types
                send_json_to_JS($this->aPromoTypes);
                break;
            case 'saveNewPromo':
                // save promo ?
                // check if provided data is valid
                $this->icAddPromo->checkData( $_POST['json'] );
                if ($this->icAddPromo->isValid()) {
                    // secured data
                    $this->jData = $this->icAddPromo->getData(true);
                    // merge date & time fields
                    $this->generateDatetime();
                    // save the new promo
                    $this->oService->saveNewPromo($this->jData);
                    // add success status
                    $jAdditionalData = [
                        'bIsDataSaved' =>   true
                    ];
                } else {
                    // add fail status
                    $jAdditionalData = [
                        'bIsDataSaved' =>   false
                    ];
                }
                // returns the response
                $this->icAddPromo->sendResponseToFrontEnd($jAdditionalData ?? []);
                break;
            case 'updatePromo':
                // update promo ?
                // check if provided data is valid
                $this->icEditPromo->checkData( $_POST['json'] );
                if ($this->icEditPromo->isValid()) {
                    // secured data
                    $this->jData = $this->icEditPromo->getData(true);
                    // merge date & time fields
                    $this->generateDatetime();
                    // update the promo
                    $this->oService->updatePromo(
                        $this->VARS_HTML['promoId'],
                        $this->jData
                    );
                    // add success status
                    $jAdditionalData = [
                        'bIsDataSaved' =>   true
                    ];
                } else {
                    // add fail status
                    $jAdditionalData = [
                        'bIsDataSaved' =>   false
                    ];
                }
                // returns the response
                $this->icEditPromo->sendResponseToFrontEnd($jAdditionalData ?? []);
        }
		
    }

    /**
     *
     * Destroy service
     *
     */
    public function __destruct ()
    {
        // destroy objet_service
        unset($this->oService);
    }


    // ◘ Instance Methods
    /**
     * Generates datetime fields (and delete date & time fields)
     */
    private function generateDatetime ()
    {
        $jData =& $this->jData;
        $jData['promoBeginDatetime'] = $jData['promoBeginDate'] . ' ' . $jData['promoBeginTime'];
        $jData['promoEndDatetime'] = $jData['promoEndDate'] . ' ' . $jData['promoEndTime'];
        unset($jData['promoBeginDate']);
        unset($jData['promoBeginTime']);
        unset($jData['promoEndDate']);
        unset($jData['promoEndTime']);
    }

    /**
     * Is the new promo valid ?
     * 
     * @return bool
     */
    private function isNewPromoValid (): bool
    {
        // check if provided data is valid
        $this->jResult = $this->icAddPromo->checkAll( $_POST['json'] );
        $jData = $this->icAddPromo->getData(true);

        // returns whether data is valid
        return $this->jResult['is_valid'];
    }
    

    // ◘ Class Methods
    /**
     * Generates the promo fields rules, into $this->oFieldsRules
     */
	private function generateFieldsRules (): void
    {
        $jFieldsRules = [
            'promoReference' => [
                'required' => true,
                'pattern' =>    [
                    'pattern' => '/^[A-Z0-9_]{5,10}$/',
                    'message' =>  '5 à 10 caractères : lettres majuscules, chiffres, tirets bas'
                ]
            ],
            'promoDescription' => [
                'allowEmpty' =>     true,
                'required' =>       false,
                'minlength' =>      [
                    'minlength' =>  10
                ],
                'maxlength' =>      120, 
                'type' =>           'string',
                'message!' =>       'Doit être entre 10 et 120 caractères'
            ],
            'promoBeginDate' => [
                'allowEmpty' =>     [
                    'allowEmpty' =>    false,
                    'message' =>       'pas vide svp !'  
                ],
                'date' =>       [
                        'date' =>   true,
                        '>=' =>          [
                            '>=' => '{{NOW}}',
                            'message' => 'Le {{value}} est déjà passé'
                        ]
                ],
            ],
            'promoBeginTime' => [
                'time' =>       [
                    'time' =>     true
                ]
            ],
            'promoEndDate' => [
                'allowEmpty' =>     true,
                'date' =>       [
                    '>=' =>          [
                        '>=' => '{{value.promoBeginDate}}',
                        'message' => 'Doit être à partir de la date de début ({{expected}})'
                    ]
                ]
            ],
            'promoEndTime' => [
                'allowEmpty' => true,
                'time' =>       true
            ],
            'promoLabel' => [
                'allowEmpty' => false,
                'type' =>       'string',
                'message' =>    'Libellé manquant'
            ],
            'promoQuantity' => [
                'allowEmpty' => false,
                'numeric' =>    [
                    'onlyInteger' =>    [
                        'onlyInteger' =>    true
                    ],
                    '>=' =>    [
                        '>=' =>         0
                    ],
                    'message!' =>   'quantité ou \'0\' pour illimité'
                ]
            ],
            'promoStatus' => [
                'type' =>       'bool',
                'message' =>    'Un booléen est attendu'
            ],
            'promoType' => [
                'inclusion' =>  [
                    'inclusion' =>  $this->aPromoTypes
                ]
            ],
            'promoValue' => [
                'allowEmpty' => true,
                'numeric' =>    [
                    'onlyInteger' =>    [
                        'onlyInteger' =>    true
                    ],
                    '>=' =>    [
                        '>=' =>         5
                    ],
                    '<=' =>    [
                        '<=' =>         100
                    ]
                ]
            ]
        ];
        $this->oFieldsRules = new Input_control__fieldsRules($jFieldsRules);
    }

    private function generateInputControlObjects(): void
    {
        // 'addPromo' Input_control
        $this->icAddPromo = Input_control::newValidateJs(
            $this->oFieldsRules,
            'addPromo',
            [
                'default_fields_config' =>      [
                    'required' =>                   true
                ],
                'allow_unknown_fields' =>       true,
                'convert_type_to_sqltype' =>    true
            ]
        );
        // 'editPromo' Input_control
        // copy the rules into a new object named 'editPromo'
        // by setting required to false & allowEmpty to true for all fields
        // & deleting the '>=' date subrule for 'promoBeginDate' field
        $this->icAddPromo->fieldsRules()->clone()
            ->rule('required', false)
            ->rule('allowEmpty', true)
            ->filterByFields(['promoBeginDate'])
            ->rule('date', true)
            ->insertIntoNewInputControlWithValidateJS('editPromo');
        
        $this->icEditPromo =& Input_control::obj('editPromo');

        if (static::$dbg) {
            log::f(
                'addPromo_rules',
                Input_control::obj('addPromo')->fieldsRules()->arr()
            );
            log::f(
                'editPromo_rules',
                Input_control::obj('editPromo')->fieldsRules()->arr()
            );
            log::var_dump_f(
                'addPromo',
                Input_control::obj('addPromo')
            );
            log::var_dump_f(
                'editPromo',
                Input_control::obj('editPromo')
            );
        }

    }

}
