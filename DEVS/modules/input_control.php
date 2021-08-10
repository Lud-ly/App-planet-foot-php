<?php

require_once "input_control__fieldsrules.php";
require_once "trait.easy_config.php";
require_once "response.php";
require_once "patterns.php"; // easily avoidable : see isTelValid()

/**
 * Contains methods used for input control  (front-end + back-end checks)
 * 
 * require_once :
 *    • log.php
 *    • utils.php
 *    • input_control__fieldsrules.php
 *    • trait.easy_config.php
 *    • response.php
 *    • patterns.php
 * 
 * If JS Lib use, require-once :
 *    • {{js library}}.php      // see in $defaultConfig['js_libs']
 * 
 * Works on the framework developed by Jean-Jacques Pagan #Jijou
 * 
 * @author Damien Grember <dgrember@gmail.com> <06.32.99.33.86> France, Herault 34
 * I thank my trainers as well as my colleagues :)
 * @copyright Free use for Afpanier project
 * @version 1.11
 */
class Input_control
{
    use EasyConfig;

    /**
     * Ongoing development/debug ? If true : logs will be created.
     */
    static $dbg = false;


    // ◘ PUBLIC PROPERTIES
    /**
     * @property string[] COMPARISON_OPERATORS Comparison operators
     */
    public const COMPARISON_OPERATORS = ['<', '<=', '===', '==', '!==', '!=', '>=', '>'];

    /**
     * @property mixed[] $rulesRules Rules rules
     */
    protected static $rulesRules = [
        'message' => [
            'message' => [
                'type' => [ 'type' => 'string' ]
            ]
        ],
        'message!' => [
            'message!' => [
                'type' => [ 'type' => 'string' ]
            ]
        ],
        'convert_to' => [
            'type' => [
                'type' => [ 'type' => 'string' ]
            ],
            'before_check' => [
                'type' => [ 'type' => 'boolean' ]
            ]
        ],
        'allowEmpty' => [
            'allowEmpty' => [
                'type' => [ 'type' => 'boolean' ]
            ]
        ],
        'required' => [
            'required' => true
        ],
        'type' => [
            'type' => [
                'type' => [ 'type' => ['string','array'] ]
            ]
        ],
        'numeric' => [
            'type' => [
                'type' => [ 'type' => ['boolean'] ]
            ]
        ],
        'pattern' => [
            'pattern' => [
                'type' => [ 'type' => 'string' ]
            ]
        ],
        'format' => [
            'format' => [
                'type' => [ 'type' => 'string' ]
            ]
        ],
        '<' => [
            '<' => [
                'type' => [ 'string', 'integer', 'float' ]
            ]
        ],
        '<=' => [
            '<=' => [
                'type' => [ 'string', 'integer', 'float' ]
            ]
        ],
        '===' => [
            '===' => [
                'type' => [ 'string', 'integer', 'float' ]
            ]
        ],
        '==' => [
            '==' => [
                'type' => [ 'string', 'integer', 'float' ]
            ]
        ],
        '!==' => [
            '!==' => [
                'type' => [ 'string', 'integer', 'float' ]
            ]
        ],
        '!=' => [
            '!=' => [
                'type' => [ 'string', 'integer', 'float' ]
            ]
        ],
        '>=' => [
            '>=' => [
                'type' => [ 'string', 'integer', 'float' ]
            ]
        ],
        '>' => [
            '>' => [
                'type' => [ 'string', 'integer', 'float' ]
            ]
        ],
        'minlength' => [
            'minlength' => [
                'type' => [ 'type' => 'integer' ]
            ]
        ],
        'maxlength' => [
            'maxlength' => [
                'type' => [ 'type' => 'integer' ]
            ]
        ],
        'inclusion' => [
            'inclusion' => [
                'type' => [ 'type' => 'array' ]
            ]
        ],
        'exclusion' => [
            'exclusion' => [
                'type' => [ 'type' => 'array' ]
            ]
        ],
        'email' => [
            'email' => [
                'type' => [ 'type' => 'string' ]
            ]
        ],
        'tel' => [
            'tel' => [
                'type' => [ 'type' => 'string' ]
            ]
        ],
        'date' => [
            'date' => [
                'type' => [ 'type' => 'string' ]
            ]
        ],
        'time' => [
            'time' => [
                'type' => [ 'type' => 'string' ]
            ]
        ],
        'datetime' => [
            'datetime' => [
                'type' => [ 'type' => 'string' ]
            ]
        ]
    ];

    /**
     * @property string[] 'INVALID_FIELD_RULE_MESSAGE' Invalid rules messages. Other messages in $defaultSubRules
     */
    public const INVALID_FIELD_RULE_MESSAGE = [
        'allow_unknown_fields' =>   '"{{field}}" ne fait pas partie des champs prédéfinis.',
        'min_valid_fields' =>       '{{expected}} champs valides sont nécessaires',
        'type' =>                   'Type de donnée incorrect ({{expected}} attendu)',
        'required' =>               'Champ "{{field}}" requis',
        'allowEmpty' =>             'Champ "{{field}}" ne peut être vide',
        'numeric' =>                [
            'numeric' =>                   'Doit être un nombre',
            'numeric.onlyInteger' =>       'Doit être un nombre entier',
            'numeric.>=' =>                'Doit être un nombre supérieur ou égal à {{expected}}',
            'numeric.>' =>                 'Doit être un nombre supérieur à {{expected}}',
            'numeric.<=' =>                'Doit être un nombre inférieur ou égal à {{expected}}',
            'numeric.<' =>                 'Doit être un nombre inférieur à {{expected}}',
            'numeric.!=' =>                'Doit être un nombre différent de {{expected}}',
            'numeric.!==' =>               'Doit être un nombre différent de {{expected}}'
        ],
        'format' =>                 'Format invalide',
        'pattern' =>                'Format incorrect',
        '==' =>                     'Doit être égal à {{expected}}',
        '===' =>                    'Doit être égal à {{expected}}',
        '>=' =>                     'Doit être supérieur ou égal à {{expected}}',
        '>' =>                      'Doit être supérieur à {{expected}}',
        '<=' =>                     'Doit être inférieur ou égal à {{expected}}',
        '<' =>                      'Doit être inférieur à {{expected}}',
        '>=' =>                     'Doit être supérieur ou égal à {{expected}}',
        '!=' =>                     'Doit être différent de {{expected}}',
        'minlength' =>              'La longueur doit être d\'au moins {{expected}} caractères',
        'maxlength' =>              'La longueur doit être de {{expected}} caractères maxi',
        'inclusion' =>              '"{{value}}" ne fait pas partie des valeurs possibles',
        'exclusion' =>              '"{{value}}" n\'est pas une valeur possible',
        'email' =>                  'E-mail incorrect',
        'tel' =>                    'Numéro de téléphone incorrect',
        'date' =>                   [
            'date' =>                   'Date incorrecte',
            'date.==' =>                'La date doit être le {{expected}}',
            'date.===' =>               'La date doit être le {{expected}}',
            'date.>=' =>                'La date doit être à partir du {{expected}}',
            'date.>' =>                 'La date doit être après le {{expected}}',
            'date.<=' =>                'La date doit être jusqu\'au {{expected}}',
            'date.<' =>                 'La date doit être avant le {{expected}}',
            'date.!=' =>                'La date ne doit pas être le {{expected}}',
            'date.!==' =>               'La date ne doit pas être le {{expected}}'
        ],
        'datetime' =>                   [
            'datetime' =>                   'Date / heure incorrecte',
            'datetime.>=' =>                'Doit être à partir du {{expected}}',
            'datetime.>' =>                 'Doit être après le {{expected}}',
            'datetime.<=' =>                'Doit être jusqu\'au {{expected}}',
            'datetime.<' =>                 'Doit être avant le {{expected}}',
            'datetime.!=' =>                'Ne doit pas être le {{expected}}',
            'datetime.!==' =>               'Ne doit pas être le {{expected}}'
        ],
        'time' =>                   [
            'time' =>                   'Durée incorrecte',
            'time.>=' =>                'L\'heure doit être à partir de {{expected}}',
            'time.>' =>                 'L\'heure doit être après {{expected}}',
            'time.<=' =>                'L\'heure doit être jusque {{expected}}',
            'time.<' =>                 'L\'heure doit être avant {{expected}}',
            'time.!=' =>                'L\'heure ne doit pas être {{expected}}',
            'time.!==' =>               'L\'heure ne doit pas être {{expected}}'
        ]
    ];


    // ◘ protected PROPERTIES

    /**
     * @property string[] Patterns
     */
    protected const PATTERNS = [
        'date_en' =>   '/^(?<year_4>\d{4})-(?<month_2>\d{1,2})-(?<day_2>\d{1,2})$/',
        'datetime_en' =>   '/^(?<year_4>\d{4})-(?<month_2>\d{1,2})-(?<day_2>\d{1,2}) (?<hour_2>\d{1,2}):(?<min_2>\d{1,2}):(?<sec_2>\d{1,2})$/',
        'date_fr' =>   '/^(?<day_2>\d{1,2})\/(?<month_2>\d{1,2})\/(?<year_4>\d{4})$/',
        'datetime_fr' =>   '/^(?<day_2>\d{1,2})\/(?<month_2>\d{1,2})\/(?<year_4>\d{4}) (?<hour_2>\d{1,2}):(?<min_2>\d{1,2}):(?<sec_2>\d{1,2})$/',
        'time_en' =>      '/^(?<time_hh>\d{1,2}):(?<time_mm>\d{1,2})(?::(?<time_ss>\d{1,2}))?$/',
        'time_fr' =>      '/^(?<time_hh>\d{1,2})h(?<time_mm>\d{1,2})$/'
    ];

    /**
     * @property mixed[] $defaultConfig The default config
     */
    protected static $defaultConfig = [
        'ajax_param1__name' =>                              'inputControl-action',
        'ajax_param2__name' =>                              'inputControl-formName',
        'ajax_param3__name' =>                              'inputControl-issuer',
        'ajax_param1__value__config_response' =>            'getConfig',
        'ajax_param1__value__rules_response' =>             'getRules',
        'ajax_param3__value' =>                             'validateJS',
        'allow_unknown_fields' =>                           false,
        'check_config' =>                                   true,
        'convert_type_to_phptype' =>                        true,
        'convert_type_to_sqltype' =>                        true,
        'default_fields_config' =>                          [],
        'detailed_rule_result' =>                           true,
        'groups_value_in_detailed_result' =>                true,
        'improve_data' =>                                   true,
        'js_lib' =>                                         'validateJS',
        'js_libs' =>                                        [
            'validateJS' =>     [
                'className' =>  'Input_control__validateJS',
                'file' =>       'input_control__validateJS.php'
            ]
        ],
        'json_decode' =>                                    true,
        'local_time' =>                                     'fra_fra',
        'message' =>                                        'Donnée invalide',
        'message_french_date' =>                            true,
        'message_french_time' =>                            true,
        'min_fields' =>                                     1,
        'min_valid_fields' =>                               1,
        'prioritary_message_param' =>                       'message!',
        'replacements_groups_delimiter' =>                  '.',
        'rule_message_param_suffix' =>                      '_message',
        'str_after_replacement' =>                          '}}',
        'str_before_replacement' =>                         '{{'
    ];

    /**
     * @property mixed[] $defaultRules The default rules (added on each field if not yet)
     */
    protected static $defaultRules = [
        'required' =>                   false,
    ];

    /**
     * @property array $defaultSubRules
     * Default sub-rules config.
     * 
     * @example  
     * On the "date" rule, if "format" isn't in the config array :
     * add it with the corresponding value).
     */
    protected static $defaultSubRules = [
        'numeric' =>   [
            'numeric' =>        ['numeric' => true],
            'onlyInteger' =>    ['onlyInteger' => false]
        ],
        'date' =>   [
            'format' => '^{{date_yyyy}}-{{date_mm}}-{{date_dd}}$' //'YYYY-MM-DD'
        ],
        'time' =>   [
            'format' => '^{{time_hh}}:{{time_mm}}(?::{{time_ss}})?$' //'hh:mm:ss'
        ],
        'datetime' =>   [
            'format' => '^{{date_yyyy}}-{{date_mm}}-{{date_dd}} {{time_hh}}:{{time_mm}}(?::{{time_ss}})?$' //'YYYY-MM-DD hh-mm-ss'
        ],
        'tel' => [
            'pattern' => '/^(0|((\+|00)33))([1-7])\d{8}$/',
            'pattern_message' => 'Numéro de téléphone français ou mobile attendu'
        ],
        'local_tel' => [
            'pattern' => '/^(0|((\+|00)33))(4|6|7)\d{8}$/',
            'pattern_message' => 'Numéro de téléphone "04" ou mobile attendu'
        ]
    ];

    /**
     * Characteristics of capture groups (pattern, rules). Concerns 'format' rule.
     */
    protected const FORMAT_GROUPS = [
        'date_yyyy' =>   [
            'rules' =>  [
                'pattern'       =>  '\d{4}',
                'convert_to'    =>  [
                    'type' =>   'integer',
                    'before_check' =>   true
                ],
                '>='            =>  [
                    '>='            =>  1000
                ],
                '<='            =>  [
                    '<='            =>  9999
                ],
                'message!' =>    [
                    'message!'       =>  'L\'année doit être comprise entre 1000 et 9999'
                ]
            ]
        ],
        'date_mm' =>   [
            'rules' =>  [
                'pattern'       =>  '\d{1,2}',
                'convert_to'    =>  [
                    'type' =>   'integer',
                    'before_check' =>   true
                ],
                '>='            =>  [
                    '>='            =>  1
                ],
                '<='            =>  [
                    '<='            =>  12
                ],
                'message!' =>    [
                    'message!'       =>  'Le mois doit être compris entre 1 et 12'
                ]
            ]
        ],
        'date_dd' =>   [
            'rules' =>  [
                'pattern'       =>  '\d{1,2}',
                'convert_to'    =>  [
                    'type' =>   'integer',
                    'before_check' =>   true
                ],
                '>='            =>  [
                    '>='            =>  1
                ],
                '<='            =>  [
                    '<='            =>  31 // updated by the 'datetime' rule, depending on the month and year
                ],
                'message!' =>    [
                    'message!'       =>  'Le jour doit être compris entre 1 et {{rule.<=}}'
                ]
            ]
        ],
        'time_hh' =>   [
            'rules' =>  [
                'pattern'       =>  '\d{1,2}',
                'convert_to'    =>  [
                    'type' =>   'integer',
                    'before_check' =>   true
                ],
                '>='            =>  [
                    '>='            =>  0
                ],
                '<='            =>  [
                    '<='            =>  23
                ],
                'message!' =>    [
                    'message!'       =>  'L\'heure doit être comprise entre 0 et 23'
                ]
            ]
        ],
        'time_mm' =>   [
            'rules' =>  [
                'pattern'       =>  '\d{1,2}',
                'convert_to'    =>  [
                    'type' =>   'integer',
                    'before_check' =>   true
                ],
                '>='            =>  [
                    '>='            =>  0
                ],
                '<='            =>  [
                    '<='            =>  59
                ],
                'message!' =>    [
                    'message!'       =>  'Les minutes doivent être comprises entre 0 et 59'
                ]
            ]
        ],
        'time_ss' =>   [
            'rules' =>  [
                'pattern'       =>  '\d{1,2}', // here: allow null
                'convert_to'    =>  [
                    'type' =>   'integer',
                    'before_check' =>   true
                ],
                '>='            =>  [
                    '>='            =>  0
                ],
                '<='            =>  [
                    '<='            =>  59
                ],
                'message!' =>    [
                    'message!'       =>  'Les secondes doivent être comprises entre 0 et 59'
                ]
            ]
        ]
    ];

    /**
     * @property bool $fieldInternalError Did an internal error occur while processing the field ?
     */
    protected static $fieldInternalError = false;

    /**
     * @property mixed $expectedValue Expected value of the field in the current check.
     */
    protected static $expectedValue;

    /**
     * @property array $fieldConfig Config of the field in the current check.
     */
    protected static $fieldConfig;

    /**
     * @property array $info Used to store certain information very temporarily.
     * It can be :
     *  - bool  'isFormatGroup'         : If true, field names are 'format' groups (method called by an other instance)  
     *  - bool  'isFormatGroupsResult'  : If true, there is a format group result (which can be returned)
     *  - array 'formatGroupsResult'    : The 'format' groups result. It's a check() result.
     */
    protected static $info;

    /**
     * @property Input_control[] $instances All InputControl instances
     */
    protected static $instances = [];

    /**
     * @property string $lastErrorField The last error message
     */
    protected static $lastErrorField;

    /**
     * @property string $lastErrorMessage The last error message
     */
    protected static $lastErrorMessage;

    /**
     * @property string $lastErrorRuleName The last error rule name
     */
    protected static $lastErrorRuleName;

    /**
     * @property bool $isRuleMessage If true, the message provided by 'format' rule to checkVal() will be taken into account.
     */
    protected static $isRuleMessage = false;

    /**
     * @property bool $isFormatGroup If true, the message provided by 'format' rule to checkVal() will be taken into account.
     */
    protected static $isFormatGroup = false;
    
    /**
     * @property string $formatGroupRuleName If format group : the rule name which is treated by the check() internal call.
     */
    protected static $formatGroupRuleName;

    /**
     * @property string $formatGroupSubRuleName If format group : the sub-rule name which is treated by the check() internal call.
     */
    protected static $formatGroupSubRuleName;

    /**
     * @property array $fieldConfigOrFormatGroupConfig Field config provided to check(), or group config if the field config is provided by a 'format' rule call
     */
    protected static $fieldConfigOrFormatGroupConfig;

    /**
     * @property null $null Used for returns by reference in case of error
     */
    protected static $null = null;

    /**
     * Sub-rules results (valid/invalid results)
     */
    protected static $subRulesResults = [];


    // ◘ protected PROPERTIES

    /**
     * @var array $config The config which was supplied to the constructor.
     */
    protected $config = [];

    /**
     * @property array $data The array table. Could be changed slightly to be optimized depending on the options :
     *      • 'convert_type_to_phptype'
     */
    protected $data;

    /**
     * @var string $desiredResult The desired result. Used by check().
     */
    protected $desiredResult;

    /**
     * @property array $constructErrorDetail Contains details of errors that have occurred in the constructor
     */
    protected $constructErrorDetail = [];

    /**
     * @property array $fieldsGroups Groupds info for each field.
     */
    protected $fieldsGroups;

    /**
     * @property string $fieldName Name of the field in the current check.
     */
    protected $fieldName;

    /**
     * @property mixed $fieldValue Value of the field in the current check.
     */
    protected $fieldValue;

    /**
     * @property array $fieldsRules The fields rules which were supplied to the constructor.
     */
    protected $fieldsRules = [];
    
    /**
     * @property Input_control__fieldsRules $fieldsRulesObject The fields rules object.
     */
    protected $fieldsRulesObject;

    /**
     * @property array $fieldRuleArray The field rule array (which can contain message / sub-rules)
     */
    protected $fieldRuleArray;

    /**
     * @property array $fieldSubRule1Array The field sub-rule array (which can contain message / other sub-rules)
     */
    protected $fieldSubRule1Array;

    /**
     * @property array $fieldRuleDetails Rule invalidity details (concerns 'format'/'datetime' rule...)
     */
    protected $fieldRuleDetails;

    /**
     * @property string $fieldRuleName Rule name of the field in the current check. (ex : 'date')
     */
    protected $fieldRuleName;

    /**
     * @property mixed $fieldRuleValue The field rule value
     */
    protected $fieldRuleValue;

    /**
     * @property array $fieldRules Rules of the field in the current check.
     */
    protected $fieldRules;

    /**
     * @property string $fieldSubRule1 First Sub-Rule Name of the field in the current check. (ex : 'date_yyyy' if the rule is 'datetime')
     */
    protected $fieldSubRule1;

    /**
     * @property string $fieldSubRule2 Second Sub-Rule Name of the field in the current check. (ex : '>=' if the rule is 'datetime' and the first sub-rule 'date_yyyy')
     */
    protected $fieldSubRule2;

    /**
     * @property string $fieldSubRule1Value First Sub-Rule Value.
     */
    protected $fieldSubRule1Value;
    
    /**
     * @property string $fieldSubRule2Value First Sub-Rule Value.
     */
    protected $fieldSubRule2Value;

    /**
     * @property string $formName The form name.
     */
    protected $formName;

    /**
     * @property array formatGroupsInfo groups info (values / rules extracted from the 'format' rule)
     */
    protected $formatGroupsInfo = [];

    /**
     * @property array $invalidFields The array that will be included in the results of the edit control: contains invalid fields and information for each such as :
     *    - rule
     *    - message
     */
    protected $invalidFields;

    /**
     * @property array $libRules The library fields rules
     */
    protected $libRules;

    /**
     * @property array $result The result of the input control that will be returned
     */
    protected $result;

    /**
     * @property array $validFields The array that will be included in the results of the edit control: contains as keys the names of valid fields
     */
    protected $validFields;



    // ◘ CONSTRUCTOR

    /**
     * @param Input_control__fieldsRules|array $fieldsRules Rules that concern all the fields.
     * Array like this :
     * [ $fieldName => $fieldRules,... ]
     * @param string|null $formName The form name. Auto-generated if null. Default: null.
     * @param array $config The general config
     */
    function __construct (iterable $fieldsRules, ?string $formName = null, ?array $config = [], $sendToJs = 'auto')
    {
        if (empty($formName)) {
            $formName = 'myForm' . random_int(1, 10000);
        }
        if (empty($fieldsRules)) {
            $this->constructErrorDetail = ['error' => 'empty fields rules or config'];
            return;
        }
        switch (gettype($fieldsRules)) {
            case 'array':
                $this->fieldsRules =& $fieldsRules;
                $this->fieldsRulesObject = new Input_control__fieldsRules($this->fieldsRules);
                break;
            case 'object':
                $this->fieldsRulesObject =& $fieldsRules;
                $this->fieldsRules =& $this->fieldsRulesObject->arr();
                break;
            default:
                return;
        }
        $checkConfig = $config['check_config'] ?? $this->getConfig('check_config');
        if ( !$checkConfig ) {
            $this->config =& $config;
        } else {
            $this->config = static::getCustomizedConfig(static::$defaultConfig, $config, false);
            foreach ($this->fieldsRules as &$fieldRules) {
                static::optimizeConfig(
                    $fieldRules,
                    static::$rulesRules,
                    true,
                    true
                );
                // ADD MISSING FIELD CONFIG PARAMS
                static::optimizeFieldRules($fieldRules);
            }
        }
        // save the form name
        $this->formName = $formName;
        // push the current instance
        array_push(static::$instances, $this);

        // if with JS lib
        if ($this->isWithJsLib()) {
            // send to JS ?
            $ajaxParam1 = $this->getConfig('ajax_param1__name');
            switch ($sendToJs) {
                case 'auto':
                case true:
                    if ( !isset($_POST[$ajaxParam1]) ) {
                        break;
                    }
                    if (
                        isStrEqual($this->getConfig('ajax_param1__value__rules_response'), $_POST[$ajaxParam1]) && 
                        isset($_POST[$this->getConfig('ajax_param2__name')]) && isStrEqual($_POST[$this->getConfig('ajax_param2__name')], $this->formName)
                    ) {
                        // send fields rules to JS
                        Response::json( $this->getJsRules() );
                    } elseif (
                        isStrEqual($this->getConfig('ajax_param1__value__config_response'),$_POST[$ajaxParam1]) &&
                        isset($_POST[$this->getConfig('ajax_param2__name')]) && isStrEqual($_POST[$this->getConfig('ajax_param2__name')], $this->formName)
                    ) {
                        // send config to JS
                        Response::json( $this->getJsConfig() );
                    }
            }
        }
    }

    // ◘ PUBLIC METHODS

    /**
     * Check whether A FIELD is valid and returns the result.
     * 
     * @param array $fieldsValues Value of the field to check in an array like this :
     * [$fieldName => $fieldValue]
     * Other fields can be added if the value of one field is compared to that of another,
     * or if necessary to generate the message to return.
     * @param string $fieldToCheck Name of the field to check.
     * @param string $desiredResult The desired result, among (case insensitive):
     *  - 'bool' / 'boolean'    : a boolean result.
     *  - 'arr' / 'array'       : a detailed result in an array.
     *  - 'int' / 'integer'.    : 0|1.
     * 
     * @return mixed According to the $desiredResult argument.
     */
    public function check (array $fieldsValues = [], ?string $fieldToCheck = null, $desiredResult = 'bool')
    {
        if ($this->getErrorDetails() !== null) {
            return 'error during instanciation:  see getErrorDetails()';
        }
        static::$fieldInternalError = false;
        $this->fieldSubRule1 = null;
        $this->fieldSubRule2 = null;
        $this->fieldSubRule1Value = null;
        $this->fieldSubRule2Value = null;
        $this->fieldName = $fieldToCheck ?? $this->fieldName ?? array_key_first($fieldsValues);
        $fieldName =& $this->fieldName;
        $this->desiredResult = $desiredResult;
        if ( isset($fieldsValues[$fieldName]) ) {
            $fieldValue =& $fieldsValues[$fieldName];
        } elseif ( isset($this->data[$fieldName]) ) {
            $fieldValue =& $this->data[$fieldName];
        }
        // add default params if missing
        // $this->fieldsRules[$fieldName] = static::getCustomizedConfig($defaultRules, $this->fieldsRules[$fieldName]);
        $fieldsRules =& $this->fieldsRules;
        $this->fieldRules =& $fieldsRules[$fieldName];
        $fieldRules =& $this->fieldRules;
        if (
            !isset($fieldName) ||
            !isset($fieldValue) ||
            !isset($fieldRules) ||
            (gettype($fieldRules) !== 'array') ||
            (count($fieldRules) === 0)
            ) {
            return $this->getResultToReturn('error', 'missing data/rules/config');
        }
        // CONVERT TO (before check) // TODO
        $fieldRuleArr =& $this->getRuleArr('convert_to');
        if ($fieldRuleArr != null) {
            $fieldRuleValue = $this->getFieldRuleValue(null, 'convert_to');
            if ( $fieldRuleValue != null ) {
                $this->updateFieldRule( 'convert_to' );
                // todo
                if (!isset($fieldRuleArr['before_check'])) {
                    $fieldRuleArr['before_check'] = false;
                }
                if ($fieldRuleArr['before_check']) {
                    // convert the value to the specified type
                    if (
                        !isPhpType($fieldRuleArr['type']) ||
                        !settype($fieldValue, $fieldRuleArr['type'])
                    ) {
                        // error
                        static::logError('Input_control', 'convert_to (before check)', 'error during the conversion');
                        $this->saveInvalidFieldResult('convert_to', true);
                        return $this->getResultToReturn('error', 'convert_to (before check): missing/invalid type');
                    } else {
                        $this->updateFieldRuleValue( $fieldRuleArr['type'] );
                        $fieldType = $fieldRuleArr['type'];
                    }
                }
            }
        }
        // ALLOW EMPTY ?
        $fieldRuleArr =& $this->getRuleArr('allowEmpty');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'allowEmpty' );
            $this->updateFieldRuleValue( $fieldRuleArr['allowEmpty'] );
            // if allow empty value
            if ( $fieldRuleArr['allowEmpty'] ) {
                if ( isEmpty($fieldValue) ) {
                    if (
                        (in_array($fieldValue,[false, 0, '0'])) &&
                        isset($this->getRuleArr('type')['type']) &&
                        in_array($this->getRuleArr('type')['type'], ['bool', 'boolean']) &&
                        $this->getConfig('convert_type_to_sqltype')
                    )
                    {
                        // ◘ if ( (value === (false OR 0)) AND (convert_type_to_sqltype) ) :
                        // change the value to 0
                        $fieldValue = +false;
                        // OK : VALID FIELD
                        $this->saveValidFieldResult();
                        return $this->getResultToReturn(true);
                    } elseif ( $this->getConfig('convert_type_to_sqltype') ) {
                        // converts ([] or '' or ' ') into null
                        $fieldValue = null;
                    } elseif ( $this->getConfig('convert_type_to_phptype') ) {
                        // converts ([] or '' or ' ') into null
                        $fieldValue = null;
                    }
                    // OK : VALID FIELD
                    $this->saveValidFieldResult();
                    return $this->getResultToReturn(true);
                }
            // if not allow empty value
            } else {
                if ( isEmpty($fieldValue) ) {
                    $this->saveInvalidFieldResult();
                    return $this->getResultToReturn(false);
                }
            }
        }
        // TYPE
        $fieldRuleArr =& $this->getRuleArr('type');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'type' );
            $fieldType = gettype($fieldValue);
            $expectedTypes = to_arr($fieldRuleArr['type']);
            $this->updateFieldRuleValue( $expectedTypes );
            $expectedTypesCount = count($expectedTypes);
            $isTypeValid = false;
            // browse the different types of authorized data
            for ($i = 0; $i < $expectedTypesCount; $i++) {
                $expectedType = $expectedTypes[$i];
                switch ($expectedType) {
                    case 'bool':
                    case 'boolean':
                        $newValue = filter_var($fieldValue, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                        if ($newValue !== null) {
                            if ( $this->getConfig('convert_type_to_sqltype') ) {
                                // converts the (bool or string) into tinyint (0|1)
                                $fieldValue = +$newValue;
                            } else if ( $this->getConfig('convert_type_to_phptype') ) {
                                // converts the (bool or string) into boolean
                                $fieldValue = $newValue;
                            }
                            $isTypeValid = true;
                            break 2;
                        }
                        break;
                    case 'int':
                    case 'integer':
                        if ($fieldType === 'integer') {
                            $isTypeValid = true;
                            break 2;
                        } else if (
                            ( $fieldType === 'string' ) &&
                            ( $this->config['convert_type_to_phptype'] == true ) &&
                            ( is_numeric($fieldValue) ) &&
                            ( is_int(+$fieldValue) )
                        ) {
                            $isTypeValid = true;
                            // converts the (string int) into number int
                            $fieldValue = +$fieldValue;
                            break 2;
                        }
                        break;
                    case 'str':
                    case 'string':
                        if ($fieldType === 'string') {
                            $isTypeValid = true;
                            break 2;
                        }
                        break;
                    case 'obj':
                    case 'object':
                        if ($fieldType === 'object') {
                            $isTypeValid = true;
                            break 2;
                        }
                        break;
                    default:
                        if ($fieldType === $expectedType) {
                            $isTypeValid = true;
                            break 2;
                        }
                }
            }
            if (!$isTypeValid) {
                $this->saveInvalidFieldResult('type');
                return $this->getResultToReturn(false);
            }
        }
        // NUMERIC
        $fieldRuleArr =& $this->getRuleArr('numeric');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'numeric');
            if (
                $fieldRuleArr['numeric']['numeric'] &&
                !is_numeric($fieldValue)
            ) {
                $this->saveInvalidFieldResult('numeric');
                return $this->getResultToReturn(false);
            }
            if (
                $fieldRuleArr['onlyInteger']['onlyInteger'] &&
                !is_integer(+$fieldValue)
            ) {
                $this->updateFieldRule( 'numeric', 'onlyInteger');
                $this->saveInvalidFieldResult();
                return $this->getResultToReturn(false);
            }
            // NUMERIC {{COMPARISON_OPERATOR}}
            foreach (static::COMPARISON_OPERATORS as $comparison_operator) {
                $fieldSubRuleArr =& $fieldRuleArr[$comparison_operator] ?? null;
                if ($fieldSubRuleArr != null) {
                    $this->updateFieldRule( 'numeric', $comparison_operator );
                    $this->updateFieldRuleValue( true, $fieldSubRuleArr[$comparison_operator] );
                    if (
                        !static::aVsB(
                            +$fieldValue,
                            $comparison_operator,
                            +$this->getFieldRuleValue()
                        )
                    ) {
                        $this->saveInvalidFieldResult();
                        return $this->getResultToReturn(false);
                    }
                }
            }
        }
        // PATTERN
        $fieldRuleArr =& $this->getRuleArr('pattern');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'pattern');
            if (substr($fieldRuleArr['pattern'], 0, 1) !== '/') {
                $fieldRuleArr['pattern'] = '/' . $fieldRuleArr['pattern'] . '/';
            }
            $this->updateFieldRuleValue( $fieldRuleArr['pattern'] );
            if (!preg_match($fieldRuleArr['pattern'], $fieldValue)) {
                $this->saveInvalidFieldResult('pattern');
                return $this->getResultToReturn(false);
            }
        }
        // FORMAT
        $fieldRuleArr =& $this->getRuleArr('format');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'format' );
            $this->updateFieldRuleValue( $fieldRuleArr['format'] );
            $formatInfo = $this->getFormatInfo(
                $fieldValue,
                $fieldRuleArr['format'],
                $fieldRuleArr['rules'] ?? [],
                false
            );
            $this->formatGroupsInfo[$fieldName] = $formatInfo;
            if ( !$formatInfo ) {
                $this->saveInvalidFieldResult();
                return $this->getResultToReturn(false);
            }
            $fieldRuleArr['values'] =& $formatInfo['values'];
            $fieldRuleArr['rules'] =& $formatInfo['rules'];

            if ( $this->getConfig('groups_value_in_detailed_result') ) {
                $this->fieldsGroups[$fieldName]['format'] = $formatInfo['values'];
            }

            // static::setStaticInfo( 'isFormatGroup', true );
            // ◘ creates a new object
            $oInputControl = new Input_control(
                $fieldRuleArr['rules'],
                $this->formName,
                [
                    'min_fields' =>                 1,
                    'min_valid_fields' =>           0,
                    'convert_type_to_phptype' =>    false,
                    'convert_type_to_sqltype' =>    false
                    // 'message' =>                    'Format invalide'
                ]
            );
            // ◘ checks all format groups
            $oInputControl->checkAll(
                $fieldRuleArr['values']
            );
            $groupsResult = $oInputControl->getResult();

            // static::clearStaticInfo( 'isFormatGroup' );

            if ( !$groupsResult['is_valid'] ) {
                // static::setStaticInfo( 'isFormatGroupsResult', true );
                unset($groupsResult['is_valid']);
                // static::setStaticInfo( 'formatGroupsResult', $groupsResult );
                $this->saveInvalidFieldResult(null, false, $groupsResult);
                $result = $this->getResultToReturn(false);
                // static::clearStaticInfo( ['isFormatGroupsResult', 'formatGroupsResult'] );
                return $result;
            }
        }
        // {{COMPARISON_OPERATOR}}
        foreach (static::COMPARISON_OPERATORS as $comparison_operator) {
            $fieldRuleArr =& $this->getRuleArr( $comparison_operator );
            if ($fieldRuleArr != null) {
                $this->updateFieldRule( $comparison_operator );
                $this->updateFieldRuleValue( $fieldRuleArr[$comparison_operator] );
                if (
                    !static::aVsB(
                        $fieldValue,
                        $comparison_operator,
                        $this->getFieldRuleValue()
                    )
                ) {
                    $this->saveInvalidFieldResult($comparison_operator);
                    return $this->getResultToReturn(false);
                }
            }
        }
        // MIN_LENGTH ( length must be >= )
        $fieldRuleArr =& $this->getRuleArr('minlength');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'minlength' );
            $this->updateFieldRuleValue( $fieldRuleArr['minlength'] );
            if ( strlen($fieldValue) < $fieldRuleArr['minlength']) {
                $this->saveInvalidFieldResult('minlength');
                return $this->getResultToReturn(false);
            }
        }
        // MAX_LENGTH ( length must be <= )
        $fieldRuleArr =& $this->getRuleArr('maxlength');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'maxlength' );
            $this->updateFieldRuleValue( $fieldRuleArr['maxlength'] );
            if ( strlen($fieldValue) > $fieldRuleArr['maxlength']) {
                $this->saveInvalidFieldResult('maxlength');
                return $this->getResultToReturn(false);
            }
        }
        // INCLUSION
        $fieldRuleArr =& $this->getRuleArr('inclusion');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'inclusion' );
            $fieldRuleArr['inclusion'] = to_arr($fieldRuleArr['inclusion']);
            $this->updateFieldRuleValue( $fieldRuleArr['inclusion'] );
            if ( !in_array($fieldValue, $fieldRuleArr['inclusion']) ) {
                $this->saveInvalidFieldResult('inclusion');
                return $this->getResultToReturn(false);
            }
        }
        // EXCLUSION
        $fieldRuleArr =& $this->getRuleArr('exclusion');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'exclusion' );
            $fieldRuleArr['exclusion'] = to_arr($fieldRuleArr['exclusion']);
            $this->updateFieldRuleValue( $fieldRuleArr['exclusion'] );
            if ( in_array($fieldValue, $fieldRuleArr['exclusion']) ) {
                $this->saveInvalidFieldResult('exclusion');
                return $this->getResultToReturn(false);
            }
        }
        // EMAIL
        $fieldRuleArr =& $this->getRuleArr('email');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'email' );
            $this->updateFieldRuleValue( true );
            if ( filter_var($fieldValue, FILTER_VALIDATE_EMAIL) === false ) {
                $this->saveInvalidFieldResult('email');
                return $this->getResultToReturn(false);
            }
        }
        // TEL
        $fieldRuleArr =& $this->getRuleArr('tel');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'tel' );
            $this->updateFieldRuleValue( true );
            if ( !preg_match($fieldRuleArr['pattern'], $fieldValue) ) {
                $this->saveInvalidFieldResult('tel');
                return $this->getResultToReturn(false);
            }
        }
        // DATE
        $fieldRuleArr =& $this->getRuleArr('date');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'date' );
            $oInputControl = new Input_control(
                [
                    $fieldName => [
                        'format' =>  [
                            'format' => $fieldRuleArr['format']
                        ]
                    ]
                ],
                $this->formName,
                [
                    // 'format_groups_in_valid_result' =>  false,
                    'groups_value_in_detailed_result' =>  true
                ]
            );
            
            $oInputControl->checkAll(
                [ $fieldName => $fieldValue ]
            );
            $arrResult = $oInputControl->getResult();
            $isDate = $arrResult['is_valid'];
            
            if (
                $this->getConfig( 'groups_value_in_detailed_result' ) &&
                isset($arrResult['groups_value'][$fieldName]['format'])
                ) {
                // save groups value
                $this->saveGroupValue($arrResult['groups_value'][$fieldName]['format']);
            }

            $formatGroups =& $arrResult['groups_value'][$fieldName];

            $dataDate = static::dateFromInt(
                +$formatGroups['format']['date_yyyy'],
                +($formatGroups['format']['date_mm'] ?? 1),
                +($formatGroups['format']['date_dd'] ?? 1),
                false
            );
            $this->updateFieldRuleValue( $dataDate );

            if (!$isDate) {
                $this->saveInvalidFieldResult(
                    'date',
                    false,
                    $arrResult['invalid_fields'][$fieldName]['rule_details'] ?? null
                );
                return $this->getResultToReturn(false);
            }

            if ( $this->getConfig('improve_data') ) {
                $fieldValue = $dataDate;
            }
            // DATE {{COMPARISON_OPERATOR}}
            foreach (static::COMPARISON_OPERATORS as $comparison_operator) {
                if (
                    isset($fieldRuleArr[$comparison_operator][$comparison_operator]) ||
                    isset($fieldRuleArr[$comparison_operator])
                ) {
                    $cmpValue =& $fieldRuleArr[$comparison_operator][$comparison_operator] ?? $fieldRuleArr[$comparison_operator];
                    $this->updateFieldRule( 'date', $comparison_operator );
                    if ( gettype($cmpValue) !== 'string' ) {
                        // error
                        static::logError('Input_control', 'date_'.$comparison_operator, 'not string');
                        return $this->getResultToReturn('error', 'date_'.$comparison_operator.': must be a string');
                    }
                    $configDate = $this->replace( $cmpValue );
                    $configDate = static::formatDateFromStr( $configDate, false );
                    if (
                        !static::aVsB(
                            strtotime($dataDate),
                            $comparison_operator,
                            strtotime($configDate)
                        )
                    ) {
                        $this->updateFieldRuleValue(
                            true,
                            static::formatDateFromStr( $configDate, $this->getConfig('message_french_date') )
                        );
                        $this->saveInvalidFieldResult('date');
                        return $this->getResultToReturn(false);
                    }
                }
            }
        }
        // DATETIME
        $fieldRuleArr =& $this->getRuleArr('datetime');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'datetime' );

            $oInputControl = new Input_control(
                [
                    $fieldName => [
                        'format' =>  [
                            'format' => $fieldRuleArr['format']
                        ]
                    ]
                ],
                $this->formName,
                [
                    'groups_value_in_detailed_result' =>  true
                ]
            );
            
            $oInputControl->checkAll(
                [ $fieldName => $fieldValue ]
            );
            $arrResult = $oInputControl->getResult();

            $isDateTime = $arrResult['is_valid'];
            
            if (
                $this->getConfig( 'groups_value_in_detailed_result' ) &&
                isset($arrResult['groups_value'][$fieldName]['format'])
                ) {
                $this->saveGroupValue($arrResult['groups_value'][$fieldName]['format']);
            }

            $formatGroups =& $arrResult['groups_value'][$fieldName];

            $dataDatetime = static::datetimeFromInt(
                +$formatGroups['format']['date_yyyy'],
                +($formatGroups['format']['date_mm'] ?? 1),
                +($formatGroups['format']['date_dd'] ?? 1),
                +($formatGroups['format']['time_hh'] ?? 0),
                +($formatGroups['format']['time_mm'] ?? 0),
                +($formatGroups['format']['time_ss'] ?? 0),
                false
            );
            $this->updateFieldRuleValue( $dataDatetime );

            if (!$isDateTime) {
                $this->saveInvalidFieldResult(
                    'datetime',
                    false,
                    $arrResult['invalid_fields'][$fieldName]['rule_details'] ?? null
                );
                return $this->getResultToReturn(false);
            }

            if ( $this->getConfig('improve_data') ) {
                $fieldValue = $dataDatetime;
            }

            // DATETIME {{COMPARISON_OPERATOR}}
            foreach (static::COMPARISON_OPERATORS as $comparison_operator) {
                if (
                    isset($fieldRuleArr[$comparison_operator][$comparison_operator]) ||
                    isset($fieldRuleArr[$comparison_operator])
                ) {
                    $cmpValue =& $fieldRuleArr[$comparison_operator][$comparison_operator] ?? $fieldRuleArr[$comparison_operator];
                    $this->updateFieldRule( 'datetime', $comparison_operator );
                    if ( gettype($cmpValue) !== 'string' ) {
                        // error
                        static::logError('Input_control', 'datetime_'.$comparison_operator, 'not string');
                        return $this->getResultToReturn('error', 'datetime_'.$comparison_operator.': must be a string');
                    }
                    $configDatetime = $this->replace( $cmpValue );
                    $configDatetime = static::formatDateTimeFromStr( $configDatetime, false );
                    if (
                        !static::aVsB(
                            $dataDatetime,
                            $comparison_operator,
                            $configDatetime
                        )
                    ) {
                        $this->updateFieldRuleValue(
                            true,
                            static::formatDateTimeFromStr( $configDatetime, $this->getConfig('message_french_date') )
                        );
                        $this->saveInvalidFieldResult('datetime');
                        return $this->getResultToReturn(false);
                    }
                }
            }
        }
        // TIME
        $fieldRuleArr =& $this->getRuleArr('time');
        if ($fieldRuleArr != null) {
            $this->updateFieldRule( 'time' );
            $oInputControl = new Input_control([
                    $fieldName => [
                        'format' =>  [
                            'format' => $fieldRuleArr['format']
                        ]
                    ]
                ],
                $this->formName,
                [
                    'groups_value_in_detailed_result' =>  true
                ]
            );
            
            $oInputControl->checkAll(
                [ $fieldName => $fieldValue ]
            );
            $arrResult = $oInputControl->getResult();

            $isTime = $arrResult['is_valid'];
            
            if (
                $this->getConfig( 'groups_value_in_detailed_result' ) &&
                isset($arrResult['groups_value'][$fieldName]['format'])
                ) {
                // save groups value
                $this->saveGroupValue($arrResult['groups_value'][$fieldName]['format']);
            }

            $formatGroups =& $arrResult['groups_value'][$fieldName];

            $dataTime = static::timeFromInt(
                +($formatGroups['format']['time_hh'] ?? 0),
                +($formatGroups['format']['time_mm'] ?? 0),
                +($formatGroups['format']['time_ss'] ?? 0),
                false
            );
            $this->updateFieldRuleValue( $dataTime );

            if (!$isTime) {
                $this->saveInvalidFieldResult(
                    'time',
                    false,
                    $arrResult['invalid_fields'][$fieldName]['rule_details'] ?? null
                );
                return $this->getResultToReturn(false);
            }

            if ( $this->getConfig('improve_data') ) {
                $fieldValue = $dataTime;
            }

            // TIME {{COMPARISON_OPERATOR}}
            foreach (static::COMPARISON_OPERATORS as $comparison_operator) {
                if (
                    isset($fieldRuleArr[$comparison_operator][$comparison_operator]) ||
                    isset($fieldRuleArr[$comparison_operator])
                ) {
                    $cmpValue =& $fieldRuleArr[$comparison_operator][$comparison_operator] ?? $fieldRuleArr[$comparison_operator];
                    $this->updateFieldRule( 'time', $comparison_operator );
                    if ( gettype($cmpValue) !== 'string' ) {
                        // error
                        static::logError('Input_control', 'time_'.$comparison_operator, 'not string');
                        return $this->getResultToReturn('error', 'time_'.$comparison_operator.': must be a string');
                    }
                    $configTime = $this->replace( $cmpValue );
                    $configTime = static::formatTimeFromStr( $configTime, false );
                    if (
                        !static::aVsB(
                            static::formatTimeFromStr($dataTime, false),
                            $comparison_operator,
                            $configTime
                        )
                    ) {
                        $this->updateFieldRuleValue(
                            null,
                            static::formatTimeFromStr( $configTime, $this->getConfig('message_french_time') )
                        );
                        $this->saveInvalidFieldResult('time');
                        return $this->getResultToReturn(false);
                    }
                }
            }
        }
        // ◘ OK : VALID FIELD ◘
        // CONVERT TO (after check)
        $fieldRuleArr =& $this->getRuleArr('convert_to');
        if ($fieldRuleArr != null) {
            // todo: replace by 'after', 'convert_to'
            $fieldRuleValue = $this->getFieldRuleValue(null, 'convert_to');
            if ( $fieldRuleValue != null ) {
                $this->updateFieldRule( 'convert_to' );
                if ( !$fieldRuleArr['convert_to']['before_check'] ) {
                    // convert the value to the specified type
                    if (
                        !isPhpType($fieldRuleArr['convert_to']['type'] ?? $fieldRuleArr['type']) ||
                        !settype($fieldValue, $fieldRuleArr['convert_to']['type'])
                    ) {
                        // error
                        static::logError('Input_control', 'convert_to (before check)', 'error during the conversion');
                        $this->saveInvalidFieldResult('convert_to', true);
                        return $this->getResultToReturn('error', 'convert_to (before check): missing/invalid type');
                    } else {
                        $this->updateFieldRuleValue( $fieldRuleArr['convert_to']['type'] );
                        $fieldType = $fieldRuleArr['convert_to']['type'];
                    }
                }
            }
        }
        $this->saveValidFieldResult();
        return $this->getResultToReturn(true);
    }

    /**
     * Checks all data
     * 
     * @param array|string $data Data (stringified or not)
     */
    public function checkData($data)
    {
        $this->checkAll($data);
        $this->jResult = $this->getResult();
    }

    /**
     * Check if MULTIPLE fields are valid and returns the result :
     *  - is data valid ?
     *  - valid fields ?
     *  - invalid fields ?
     *  - if error : what error ?
     * 
     * @param array|string $fieldsValues The data to check (all the fields to be checked). Like this :
     *  [ $fieldName => $fieldValue,.. ]
     * Json_encoded data can be supplied.
     * @param array $config The config (general config including rules config of fields)
     * 
     * @return array
     */
    public function checkAll ($fieldsValues): array
    {
        if ($this->getErrorDetails() !== null) {
            return 'error during instanciation:  see getErrorDetails()';
        }
        $dbg =& static::$dbg;
        $config =& $this->config;
        $fieldsRules =& $this->fieldsRules;
        $this->data = [];
        $this->clearResults();
        // check the config
        if (gettype($config) !== 'array') {
            return $this->setErrorResult('Mauvais format de config');
        }
        // check data
        // json_encoded data
        if (
            ( gettype($fieldsValues) === 'string' ) &&
            ( substr($fieldsValues, 0, 2) === '{"' )
            ) {
            // if json_decode option activated
            if ( $this->getConfig('json_decode') == true ) {
                // try to json_decode
                $this->data = json_decode($fieldsValues, true); 
                if ($this->data === null) {
                    return $this->setErrorResult('Erreur lors du décodage du JSON');
                }
            } else  {
                // else : error
                return $this->setErrorResult('Mauvais format de données. Fournissez un tableau ou activez l\'option json_decode.');
            }
        } else if (gettype($fieldsValues) === 'array') {
            // data array : ok
            $this->data =& $fieldsValues;
        } else {
            // else : error
            return $this->setErrorResult('Mauvais format de données');
        }
        // $aData becomes the data array and can be modified slightly to be optimized depending on the options :
        //    • 'convert_type_to_phptype'
        $aData =& $this->data;
        $dataCount = count($aData);
        // NO DATA
        if ($dataCount === 0) {
            return $this->setErrorResult('Aucune donnée');
        }
        // MIN_FIELDS
        $min_fields = $this->getConfig('min_fields') ?? 0;
        if ( $dataCount < $min_fields ) {
            $message = ($min_fields > 1) ? ' données sont requises' : ' donnée est requise';
            return $this->setErrorResult('Au moins ' . $min_fields . $message);
        }
        // REQUIRED
        foreach ($fieldsRules as $fieldName => &$fieldRules) {
            if ( ($this->getFieldRuleValue($fieldName, 'required') == true) && !isset($aData[$fieldName]) ) {
                $this->saveInvalidFieldResult('required');
            }
        }
        // ◘◘ >>> iterate over EACH FIELD of $data <<< ◘◘
        foreach ($aData as $fieldName => &$fieldValue) {
            if (isset($fieldsRules[$fieldName])) {
                $fieldRules =& $fieldsRules[$fieldName];
            } else {
                static::logError('checkAll()', $fieldName, 'no config');
                continue;
            }
            // updates properties
            $this->fieldName =& $fieldName;
            $this->fieldValue =& $fieldValue;
            $this->fieldRules =& $fieldRules;
            // if UNKNOWN FIELD
            $this->updateFieldRule( 'allow_unknown_fields' );
            if (!array_key_exists($fieldName, $fieldsRules)) {
                if ( !$this->getConfig('allow_unknown_fields') ) {
                    // returns ERROR
                    $this->saveInvalidFieldResult('pattern', true);
                    return $this->setErrorResult("'$fieldName' ne fait pas partie des champs prédéfinis.");
                }
                // iterate
                continue;
            }
            // ◘ check whether the field value is valid ◘
            $fieldResult = $this->check();
            if (
                ( gettype($fieldResult) === 'array' ) &&
                ( isset($fieldResult['error']) )
                ) {
                // returns ERROR message if error
                return $this->setErrorResult($fieldResult['error']);
            }
        }
        // RESULT : VALID / INVALID FIELDS
        $invalidFields =& $this->invalidFields;
        $validFields =& $this->validFields;
        $fieldsGroups =& $this->fieldsGroups;
        $result = [];
        if ( static::getStaticInfo( 'isFormatGroup' ) ) {
            $result['invalid_groups'] =& $invalidFields;
            $result['valid_groups'] =& $validFields;
        } else {
            $result['invalid_fields'] =& $invalidFields;
            $result['valid_fields'] =& $validFields;
        }
        $invalidFieldsCount = count($invalidFields);
        // MIN_VALID_FIELDS
        if ($invalidFieldsCount === 0) {
            $min_valid_fields = $this->getConfig('min_valid_fields');
            if ( gettype($min_valid_fields) === 'integer' ) {
                $this->updateFieldRule( 'min_valid_fields' );
                $this->updateFieldRuleValue( $min_valid_fields );
            } else {
                // error
                static::logError('Input_control', 'min_valid_fields', 'not integer');
                return ['error' =>  'min_valid_fields config : not integer'];
            }
            if (
                ( $min_valid_fields > 0 ) &&
                ( count($validFields) < $min_valid_fields )
                ) {
                $message = ($min_valid_fields > 1) ? ' données valides sont requises' : ' donnée valide est requise';
                $this->setErrorResult('Au moins ' . $min_valid_fields . $message);
            }
        }
        // RESULT
        $result['is_valid'] = (
            ( $invalidFieldsCount === 0 ) &&
            ( !isset($result['error']) )
        );
        if ( $this->getConfig('groups_value_in_detailed_result') ) {
            $result['groups_value'] =& $fieldsGroups;
        }
        $this->result =& $result;
        $this->fieldName = null;
        return $result;
    }

    /**
     * Check whether A VALUE is valid and returns the result.
     * 
     * @param mixed $fieldValue The value to check.
     * @param string $fieldName The field name.
     * @param string $desiredResult The desired result, among (case insensitive):
     *  - 'bool' / 'boolean'    : a boolean result.
     *  - 'arr' / 'array'       : a detailed result in an array.
     *  - 'int' / 'integer'.    : 0|1.
     * 
     * @return bool
     */
    public function checkValue ($fieldValue, string $fieldName, $desiredResult = 'bool')
    {
        if ($this->getErrorDetails() !== null) {
            return 'error during instanciation:  see getErrorDetails()';
        }
        static::setStaticInfo( 'check_config', false );
        $oInputControl = new Input_control(
            $this->fieldsRules,
            null,
            $this->config
        );
        // array result
        if ( preg_match('/arr(ay)?/i', $desiredResult) ) {
            $oInputControl->checkAll(
                [ $fieldName => $fieldValue ]
            );
            $result = $oInputControl->getResult();
            return $result;
        }
        // bool/int result
        $result = $oInputControl->check(
            [ $fieldName => $fieldValue ],
            $fieldName,
            $desiredResult
        );
        static::clearStaticInfo( 'check_config' );
        return $result;
    }

    /**
     * Returns all fields rules
     * 
     * @return Input_control__fieldsRules
     */
    public function fieldsRules(): Input_control__fieldsRules
    {
        return $this->fieldsRulesObject;
    }

    /**
     * Returns the config or the requested parameter
     * 
     * @param string $paramName The expected parameter name, for example : 'allow_unknown_fields'.
     * If null : all the config is returned.
     * @param bool $defaultConfigIfMissing If true, returns the parameter from default config if missing in the config
     * 
     * @return mixed|array Array if the entire config is requested.
     */
    public function getConfig (?string $paramName = null, $defaultConfigIfMissing = true)
    {
        if ( !isset($paramName) ) {
            if (!isEmpty($this->config)) {
                return $this->config;
            } else {
                if ($defaultConfigIfMissing) {
                    return static::$defaultConfig;
                }
            }
        } elseif ( gettype($paramName) === 'string' ) {
            if (isset($this->config[$paramName])) {
                return $this->config[$paramName] ?? null;
            } else {
                if ($defaultConfigIfMissing) {
                    return static::getDefaultConfig($paramName) ?? null;
                }
            }
        }
    }

    /**
     * Returns the data table. Could be changed slightly to be optimized depending on the options :
     *      • 'convert_type_to_phptype'
     * 
     * @param bool $secure_it If true, apply 'arr_secure()' :
     *      • Replace 'script' tags by 'em' tags
     *      • Escape html special characters with 'ENT_QUOTES' flag
     *  
     * @return array|null Null on failure
     */
    public function getData ($secure_it = true): ?array
    {
        $result = $this->data;
        if ($secure_it) {
            arr_secure($result);
        }
        return $result;
    }

    /**
     * Returns the rules which concerns a specific field, or all fields rules if '*' is provided as field name
     * 
     * @param string $fieldName The field name. Possibilities :
     *  • '*' :             returns all fields rules
     *  • $fieldName :      returns rules of the desired field
     *  • null :            returns rules of the current field
     * 
     * @return array|null
     */
    public function getFieldsRules (?string $fieldName = '*')
    {
        if (!isset($fieldName)) {
            $fieldName = $this->fieldName ?? null;
        }
        switch ($fieldName) {
            case '*' :
                return $this->fieldsRules ?? null;
            default :
                return $this->fieldsRules[$fieldName] ?? null;
        }
    }

    /**
     * Returns the value ot the desired field rule / sub-rule.
     * If rule call : returns $fieldSubRule2Value ?? $fieldSubRule1Value ?? $fieldRuleValue.
     * 
     * @param string|null $fieldName The field name
     * @param string|null $rule The rule name
     * @param string|null $subRule1 The first sub-rule name
     * @param string|null $subRule2 The second sub-rule name
     * 
     * @return mixed|null Null on failure
     */
    public function getFieldRuleValue (?string $fieldName = null, ?string $rule = null, ?string $subRule1 = null, ?string $subRule2 = null)
    {
        $fieldName =
            $fieldName ??
            $this->fieldName ??
            null;
        $rule =
            $rule ??
            $this->fieldRuleName ??
            null;
        $subRule1 =
            $subRule1 ??
            $this->fieldSubRule1 ??
            null;
        $subRule2 =
            $subRule2 ??
            $this->fieldSubRule2 ??
            null;
        $fieldRules =& $this->fieldsRules[$fieldName];
        return
            $this->fieldSubRule2Value ??
            $this->fieldSubRule1Value ??
            $this->fieldRuleValue ??
            $this->fieldsRules[$fieldName][$rule][$rule][$subRule1][$subRule2] ??
            $this->fieldsRules[$fieldName][$rule][$subRule1][$subRule2] ??
            $this->fieldsRules[$fieldName][$rule][$rule][$subRule1] ??
            $this->fieldsRules[$fieldName][$rule][$subRule1] ??
            $this->fieldsRules[$fieldName][$rule][$rule] ??
            $this->fieldsRules[$fieldName][$rule] ??
            static::$defaultRules[$rule] ??
            null;
    }
    
    /**
     * Returns 'format' groups rules and 'format' groups values, only if the supplied string respects the format.
     * 
     * @param string $str The string.
     * @param string $format The format. Simplified pattern with groupnames.  eg: "{{date_yyyy}}-{{date_mm}}-{{date_dd}}"
     * @param array $groupsRules The groups rules. (if not provided, default groups rules will be applied).
     * @param bool $includePattern If true, the pattern of the group will be included into the group rules result.
     * 
     * @return array|false False if the string does not respect the format.
     */
    public function getFormatInfo (string $str, string $format, array $groupsRules = [], bool $includePattern = true)
    {
        $aReplacements = $this->getReplacements($format);

        if ($aReplacements == null) {
            return false;
        }
        $replacements = [];
        foreach ($aReplacements as $groupName) {
            $groupPattern =
                $groupsRules[$groupName]['pattern'] ??
                static::FORMAT_GROUPS[$groupName]['rules']['pattern'] ??
                null;
            if ( $groupPattern !== null ) {
                $replacements[$groupName] = getPatternGroup(
                    $groupPattern,
                    $groupName,
                    true
                );
            }
        }

        $pattern = '/^' . replaceFields($format, $replacements, static::getDefaultConfig('str_before_replacement'), static::getDefaultConfig('str_after_replacement')) . '$/';
        if (!preg_match_all($pattern, $str, $matches, PREG_UNMATCHED_AS_NULL)) {
            return false;
        }
        $result = [];
        $values = [];
        $rules = [];
        foreach ($replacements as $groupName => &$patternGroup) {
            if (isset($matches[$groupName][0])) {
                $replacementValue = $matches[$groupName][0];
                $values[$groupName] = $replacementValue;
                $groupRules =
                    $groupsRules[$groupName] ??
                    static::FORMAT_GROUPS[$groupName]['rules'] ??
                    null;
                $rules[$groupName] = $groupRules;
                if ( $groupRules !== null ) {
                    if (!$includePattern) {
                        unset($rules[$groupName]['pattern']);
                    }
                }
            }
        }
        // if a date : update the rule which will permite to check if the date is valid
        if (
            in_array('date_yyyy', $aReplacements) &&
            in_array('date_mm', $aReplacements) &&
            in_array('date_dd', $aReplacements)
            ) {
            // update the number of days present in the month
            $rules['date_dd']['<=']['<='] = getDaysMonth(
                +$values['date_mm'],
                +$values['date_yyyy']
            );
        }
        $result['values'] = $values;
        $result['rules'] = $rules;
        return $result;
    }

    /**
     * Returns groups info (values / rules extracted from the 'format' rule)
     * 
     * @return array|null
     */
    public function getFormatGroups (): ?array
    {
        return $this->formatGroupsInfo;
    }

    /**
     * Returns the form name
     * 
     * @return string
     */
    public function getFormName (): string
    {
        return $this->formName;
    }

    /**
     * Returns the last error details.
     * To be used after Input_control::new() if returned 'error'.
     * 
     * @return array|null Error details, or null if no error
     */
    public function getErrorDetails ()
    {
        if ( !empty($this->constructErrorDetail) ) {
            return $this->constructErrorDetail;
        }
    }

    /**
     * Sends the rules provided to this instance to the JS, making them compatible with the use of a JS input control library
     * 
     * @return array
     * 
     * @internal getRulesForJsLib() is a trait method
     */
    public function getJsRules (): array
    {
        return $this->getRulesForJsLib(true);
    }

    /**
     * Sends the default messages to the JS, making them compatible with the use of a JS input control library
     *
     * @return array
     */
    public function getJsConfig (): array
    {
        $config = $this->getConfig();
        $config['default_messages'] = static::INVALID_FIELD_RULE_MESSAGE;
        return $config;
    }
    
    /**
     * Returns the last error field name.
     * To be used after check().
     * 
     * @return string|null The last error field name; NULL if no error
     */
    public function getLastErrorField ()
    {
        if (
            ( isset(static::$lastErrorField) )
        ) {
            return static::$lastErrorField;
        }
    }

    /**
     * Returns the last error message.
     * To be used after check().
     * 
     * @return string|null The last error message; NULL if no error
     */
    public function getLastErrorMessage ()
    {
        if (
            ( isset(static::$lastErrorMessage) )
        ) {
            return static::$lastErrorMessage;
        }
    }

    /**
     * Returns the last error rule name.
     * To be used after check().
     * 
     * @return string|null The last error rule name; NULL if no error
     */
    public function getLastErrorRuleName ()
    {
        if (
            ( isset(static::$lastErrorRuleName) )
        ) {
            return static::$lastErrorRuleName;
        }
    }

    /**
     * Returns the value formated to be displayed as a message result
     * 
     * @param mixed $fieldValue The source value
     * @param string $fieldName The field name (if null, current field name is taken account)
     * 
     * @return string
     */
    public function getRenderValue ($fieldValue, ?string $fieldName = null): string
    {
        if ($fieldName == null) {
            $fieldName = $this->fieldName;
        }
        if (isset($this->fieldsRules[$fieldName]['date'])) {
            // date
            return static::formatDateFromStr(
                $fieldValue,
                $this->getConfig('message_french_date')
            );
        } elseif (isset($this->fieldsRules[$fieldName]['datetime'])) {
            // datetime
            return static::formatDateTimeFromStr(
                $fieldValue,
                $this->getConfig('message_french_date')
            );
        } elseif (isset($this->fieldsRules[$fieldName]['time'])) {
            // time
            return static::formatTimeFromStr(
                $fieldValue,
                $this->getConfig('message_french_date')
            );
        }
        return $fieldValue;
    }

    /**
     * Returns the result
     */
    public function getResult ()
    {
        return $this->result;
    }

    /**
     * Returns the result as requested, among:
     *  - bool/boolean :        a boolean
     *  - arr/array :           an array (detailed result)
     *  - int/integer :         an integer
     * 
     * @param bool|string $isFieldValid Is the field valid ?
     * if 'error' is supplied, the following error message will be returned in an array like :  ['error' => $errorMessage]
     * 
     * @return mixed
     */
    protected function getResultToReturn ($isFieldValid, $errorMessage = 'An error has occurred')
    {
        $desiredResult =& $this->desiredResult;
        $isFieldValidType = gettype($isFieldValid);
        // ERROR
        if (
            ($isFieldValidType === 'string') &&
            preg_match('/err(or)?/i', $isFieldValid)
            ) {
            return [ 'error' => $errorMessage ];
        }
        // correct $isFieldValid ?
        if ( !in_array($isFieldValidType, ['boolean', 'integer']) ) {
            return null;
        }
        // BOOL
        if ( preg_match('/bool(ean)?/i', $desiredResult) ) {
            return $isFieldValid;
        }
        // ARR
        if ( 
            preg_match('/arr(ay)?/i', $desiredResult)
            ) {
            return $this->setFieldValidity($isFieldValid);
        }
        // INT
        if ( preg_match('/int(eger)?/i', $desiredResult) ) {
            return +$isFieldValid;
        }
    }

    /**
     * Returns the rule array (which contains sub-rules)
     * 
     * @param string $ruleName The rule name
     * 
     * @return array|null Null on failure
     */
    public function &getRuleArr (string $ruleName, $updateFieldRule = true): ?array
    {
        $isset = (isset($this->fieldRules[$ruleName]));
        if (!$isset) {
            return static::$null;
        }
        if ($updateFieldRule) {
            $this->updateFieldRule($ruleName);
        }

        if (isset($this->fieldRules[$ruleName])) {
            return $this->fieldRules[$ruleName];
        } else {
            return static::$null;
        }
    }

    /**
     * Returns the value of the provided field name.
     * 
     * @param string $fieldName Name of the desired field.
     * @internal If null, the field being processed is taken into account.
     * 
     * @return mixed|null Null if missing field
     */
    public function getValue (?string $fieldName = null)
    {
        if (!isset($fieldName)) {
            return $this->fieldValue ?? null;
        } else {
            return  $this->data[$fieldName] ?? null;
        }
    }

    /**
     * Returns whether a provided field name is setted in the field config
     * 
     * @param string $fieldName The field name to check
     * 
     * @return bool
     */
    public function isField ($fieldName)
    {
        return isset($this->fieldsRules[$fieldName]);
    }

    /**
     * Returns whether the field value is valid
     * 
     * @param string $fieldName The name of the field to check
     * 
     * @return bool|null Null on failure
     */
    public function isFieldValid (string $fieldName): ?bool
    {
        switch (true) {
            case ( isset($this->invalidFields[$fieldName]) ):
                return false;
            case ( isset($this->validFields[$fieldName]) ):
                return true;
            default:
                return $this->check(
                    [
                        $fieldName =>   $this->getValue($fieldName)
                    ],
                    $fieldName,
                    'bool'
                );
        }
    }

    /**
     * Returns whether all fields are valid
     * 
     * @return bool
     */
    public function isValid()
    {
        return $this->result['is_valid'];
    }

    /**
     * Returns whether we work with a JS library
     */
    public function isWithJsLib()
    {
        return is_subclass_of($this, 'Input_control');
    }

    /**
     * Replace strings with their expected value (to generate the message to send back to the user)
     * 
     * @param string $str The source text, in which are the strings to replace
     * @param bool $isRender If true, the result will not be used to store data but to display info :
     * dates can be displayed in the user's preferred format.
     * @param bool $isForJsLib If true, the result will be adapted to the generation of the config for use by the JS library.
     * 
     * @return string The text with the replacements made
     */
    public function replace (string $str, $isRender = false, $isForJsLib = false)
    {
        if ($isForJsLib) {
            return $this->replaceForJsLib($str, $isRender, true);
        }
        $aStrToReplace = $this->getReplacements($str);

        if (empty($aStrToReplace)) {
            return $str;
        }

        $replacements = [];
        foreach ($aStrToReplace as $strToReplace) {
            $strGroups = explode(
                $this->getConfig('replacements_groups_delimiter', true),
                $strToReplace
            );
            // guess the missing first group
            if (count($strGroups) === 1) {
                $trimStr = trim($strToReplace);
                if ($this->isField($trimStr)) {
                    // if field name : 'value'
                    $strGroups = ['value', $trimStr];
                } elseif ( isStrEqual($trimStr,['val','value'], false, true) ) {
                    // if 'value' : 'value'
                    $strGroups = ['value', $this->fieldName];
                } elseif ( isStrEqual($trimStr,['field'], false, true) ) {
                    // if 'field'
                    $strGroups = ['field', $this->fieldName];
                } elseif ( isStrEqual($trimStr, 'rule', false, true) ) {
                    // if 'rule' : 'rule'
                    $strGroups = ['rule', $this->fieldRuleName];
                } elseif ( isStrEqual($trimStr, 'expected', false, true) ) {
                    // if 'expected' : 'rule'
                    $strGroups = ['expected', 'expected'];
                } else {
                    $lowerStr = strtolower($trimStr);
                    // if as below :
                    switch ($lowerStr) {
                        case 'now':
                            $firstGroup = getStrEqual( $this->fieldRuleName, ['date', 'datetime', 'time'] );
                            if ($firstGroup === null) {
                                $firstGroup = 'datetime';
                            }
                            $strGroups = [$firstGroup, 'now'];
                            break;
                        case 'date':
                            $strGroups = ['date', 'now'];
                            break;
                        case 'time':
                            $strGroups = ['time', 'now'];
                            break;
                    }
                }
            }
            // if more than 1 group
            if (count($strGroups) > 1) {
                $lowerGroup0 = strtolower($strGroups[0]);
                $lowerGroup1 = strtolower($strGroups[1] ?? '');
                // what first group ?
                switch ($lowerGroup0) {
                    case 'value':
                        $fieldName = $strGroups[1];
                        $fieldValue = $this->getValue($fieldName);
                        if ($isRender) {
                            $fieldValue = $this->getRenderValue($fieldValue, $fieldName);
                        }
                        $replacements[$strToReplace] = ($fieldValue ?? '---ERR---');
                        break;
                    case 'field':
                        $fieldName = $strGroups[1];
                        $replacements[$strToReplace] = ($fieldName ?? '---ERR---');
                        break;
                    case 'rule':
                        // todo : $strGroups[1]
                        $fieldRuleName = $strGroups[1];
                        $fieldRuleValue = $this->getFieldRuleValue(null, $fieldRuleName);
                        $replacements[$strToReplace] = ($fieldRuleName ?? '---ERR---');
                        break;
                    case 'expected':
                        // todo : $strGroups[1]
                        $replacements[$strToReplace] = ($this->getFieldRuleValue() ?? '---ERR---');
                        break;
                    case 'datetime':
                        switch ($lowerGroup1) {
                            case 'now':
                                setlocale(LC_TIME, $this->getConfig('local_time'));
                                $datetime = strftime('%Y-%m-%d %H:%M:%S');
                                if ($isRender) {
                                    $datetime = static::formatDateTimeFromStr(
                                        $datetime,
                                        $this->getConfig('message_french_date')
                                    );
                                }
                                $replacements[$strToReplace] = $datetime;
                                break 2;
                        }
                        break;
                    case 'date':
                        switch ($lowerGroup1) {
                            case 'now':
                                setlocale(LC_TIME, $this->getConfig('local_time'));
                                $date = strftime('%Y-%m-%d');
                                if ($isRender) {
                                    $date = static::formatDateFromStr(
                                        $date,
                                        $this->getConfig('message_french_date')
                                    );
                                }
                                $replacements[$strToReplace] = $date;
                                break 2;
                        }
                        break;
                    case 'time':
                        switch ($lowerGroup1) {
                            case 'now':
                                setlocale(LC_TIME, $this->getConfig('local_time'));
                                $time = strftime('%H:%M:%S');
                                if ($isRender) {
                                    $time = static::timeFromInt(
                                        strftime('%H'),
                                        strftime('%M'),
                                        strftime('%S'),
                                        $this->getConfig('message_french_date')
                                    );
                                }
                                $replacements[$strToReplace] = $time;
                                break 2;
                        }
                }
            }
        }
        $result = replaceFields(
            $str,
            $replacements,
            static::getDefaultConfig('str_before_replacement'),
            static::getDefaultConfig('str_after_replacement'),
            false
        );
        return $result;
    }

    /**
     * Update the field rule name (and possibly the sub-rules name). null to not update.
     * And reset rule/sub-rules value on rule name update.
     * 
     * @param string $ruleName The rule name to set (ex: 'datetime')
     * @param string $subRule1Name The first sub-rule name to set (ex: 'date_yyyy')
     * @param string $subRule2Name The second sub-rule name to set (ex: '>=')
     */
    protected function updateFieldRule ($ruleName = null, $subRule1Name = null, $subRule2Name = null)
    {
        if (
            !empty($ruleName) &&
            ($ruleName !== $this->fieldRuleName)
        ) {
            $this->fieldSubRule1 = null;
            $this->fieldSubRule2 = null;
            $this->fieldSubRule1Value = null;
            $this->fieldSubRule2Value = null;
        }
        if (!empty($ruleName)) {
            $this->fieldRuleName = $ruleName;
            // reset rule/sub-rules name/value
            $this->fieldRuleValue = null;
            $this->fieldSubRule1 = null;
            $this->fieldSubRule2 = null;
            $this->fieldSubRule1Value = null;
            $this->fieldSubRule2Value = null;
        }
        if (!empty($subRule1Name)) {
            $this->fieldSubRule1 = $subRule1Name;
        }
        if (!empty($subRule2Name)) {
            $this->fieldSubRule2 = $subRule2Name;
        }
        $this->fieldRuleDetails = null;
    }


    // ◘ PUBLIC STATIC METHODS

    /**
     * Returns if $ a compared to $ b is as defined
     * 
     * @param mixed $a The first value
     * @param mixed $comparisonOperator The comparison operator ('===' by default)
     * @param mixed $b The second value
     * 
     * @return bool
     */
    public static function aVsB ($a, $comparisonOperator = '===', $b)
    {
        switch ($comparisonOperator) {
            case '<':
                return $a < $b;
            case '<=':
                return $a <= $b;
            case '>':
                return $a > $b;
            case '>=':
                return $a >= $b;
            case '===':
                return $a === $b;
            case '==':
                return $a == $b;
            case '!==':
                return $a !== $b;
            case '!=':
                return $a != $b;
        }
    }

    /**
     * @static
     * Check whether A VALUE is valid and returns the result.
     * 
     * @param mixed $fieldValue The value to check
     * @param mixed $fieldRules The rules that the value must respect.
     * @param string $fieldName The field name. Used if you want to display the field name in the message.
     * @param string $desiredResult The desired result, among (case insensitive):
     *  - 'bool' / 'boolean'    : a boolean result.
     *  - 'arr' / 'array'       : a detailed result in an array.
     *  - 'int' / 'integer'.    : 0|1.
     * 
     * @example  
     * $result = Input_Control::checkVal(
     *   '2016-08-15',
     *   [
     *      date =>     [
     *          'date' =>   true,
     *          '<=' =>     '{{now}}'
     *      ]
     *   ]
     * );
     * // $result will contain :  true
     * 
     * @return bool
     */
    public static function checkVal ($fieldValue, $fieldRules, string $fieldName = 'checkVal', $desiredResult = 'bool')
    {
        $oInputControl = new Input_control(
            [ $fieldName => $fieldRules ],
            null,
            []
        );
        $result = $oInputControl->check(
            [ $fieldName => $fieldValue ],
            $fieldName,
            $desiredResult
        );
        return $result;
    }

    /**
     * Remove a specific info, or all temporary info.
     * 
     * @param string[]|string $infoNames The info names. If the names are not supplied, all temporary info will be removed.
     */
    protected static function clearStaticInfo ($infoNames = [])
    {
        if ( empty($infoName) ) {
            static::$info = [];
        } else {
            $infoNames = to_arr($infoNames);
            foreach ($infoNames as $infoName) {
                static::$info[$infoName] = null;
            }
        }
    }

    /**
     * Returns a date formated in 'YYYY-MM-DD' or 'DD/MM/YYYY' format.
     * 
     * @param int $year Year 'YYYY'
     * @param int $month Month 'MM'
     * @param int $day Day 'DD'
     * @param bool $fr If true: will return a french date. Otherwise, an english date.
     * 
     * @return string|null Null on failure
     */
    public static function dateFromInt (int $year, int $month, int $day, bool $fr = true): ?string
    {
        $twoDigits = [&$month, &$day];
        foreach ($twoDigits as &$val) {
            if (strlen($val) === 1) {
                $val = '0'.$val;
            }
        }
        return ($fr) ?
            ( $day.'/'.$month.'/'.$year ):
            ( $year.'-'.$month.'-'.$day );
    }

    /**
     * Returns a datetime formated in '{{YYYY}}-{{MM}}-{{DD}} {{hh}}:{{mm}}:{{ss}}' or '{{DD}}/{{MM}}/{{YYYY}} {{hh}}h{{mm}}' format.
     * 
     * @param int $year Year 'date_yyyy'
     * @param int $month Month 'date_mm'
     * @param int $day Day 'date_dd'
     * @param int $hour Hour 'time_hh'
     * @param int $min Min 'time_mm'
     * @param int $sec Sec 'time_ss'
     * @param bool $fr If true: will return a french date. Otherwise, an english date.
     * 
     * @return string|null Null on failure
     */
    public static function datetimeFromInt (int $year, int $month, int $day, int $hour = 0, int $min = 0, int $sec = 0, bool $fr = false): ?string
    {
        $date = static::dateFromInt($year, $month, $day, $fr);
        $time = static::timeFromInt($hour, $min, $sec, $fr);
        return $date . ' ' . $time;
    }

    /**
     * Returns a date formated in 'YYYY-MM-DD' or 'DD/MM/YYYY' format.
     * 
     * @param int $date 'YYYY-MM-DD' or 'DD/MM/YYYY' date.
     * @param bool $fr If true: will return a french date. Otherwise, an english date.
     * 
     * @return string or null if invalid date
     */
    public static function formatDateFromStr (string $date, bool $fr = true): ?string
    {
        $dateInfo = static::getDateInfo($date);
        if (!isset($dateInfo)) {
            return null;
        }
        return static::dateFromInt(
            $dateInfo[0],
            $dateInfo[1],
            $dateInfo[2],
            $fr
        );
    }

    /**
     * Returns a datetime formated in '{{YYYY}}-{{MM}}-{{DD}} {{hh}}:{{mm}}:{{ss}}' or '{{DD}}/{{MM}}/{{YYYY}} {{hh}}h{{mm}}' format.
     * 
     * @param int $datetime In 'YYYY-MM-DD hh:mm:ss' or 'DD/MM/YYYY hh:mm:ss' format.
     * @param bool $fr If true: will return a french datetime. Otherwise, an english datetime.
     * 
     * @return string or null if invalid datetime
     */
    public static function formatDateTimeFromStr (string $datetime, bool $fr = true): ?string
    {
        $dateInfo = static::getDatetimeInfo($datetime);
        if (!isset($dateInfo)) {
            return null;
        }
        return static::datetimeFromInt(
            $dateInfo[0], // YYYY
            $dateInfo[1], // MM
            $dateInfo[2], // DD
            $dateInfo[3], // hh
            $dateInfo[4], // mm
            $dateInfo[5], // ss
            $fr
        );
    }

    /**
     * Returns a time formated in '{{hh}}:{{mm}}:{{ss}}' or '{{hh}}h{{mm}}' format.
     * 
     * @param int $time In '{{hh}}:{{mm}}:{{ss}}' or '{{hh}}h{{mm}}' format.
     * @param bool $fr If true: will return a french time. Otherwise, an english time.
     * 
     * @return string or null if invalid time
     */
    public static function formatTimeFromStr (string $time, bool $fr = true): ?string
    {
        $timeInfo = static::getTimeInfo($time);
        if (!isset($timeInfo)) {
            return null;
        }
        return static::timeFromInt(
            $timeInfo[0], // hh
            $timeInfo[1], // mm
            $timeInfo[2], // ss
            $fr
        );
    }

    /**
     * Returns date info from 'YYYY-MM-DD' / 'DD/MM/YYYY' date (english/french format).
     * 
     * @param string $date The date concerned
     * 
     * @return array An array like this ['YYYY', 'MM', 'DD'] or null if invalid date
     */
    public static function getDateInfo (string $date)
    {
        if (
            (
                preg_match(static::PATTERNS['date_en'], $date, $matches) ||
                preg_match(static::PATTERNS['date_fr'], $date, $matches)
            ) && (
                checkdate(+$matches['month_2'], +$matches['day_2'], +$matches['year_4'])
            )
        ) {
            return [
                +$matches['year_4'],
                +$matches['month_2'],
                +$matches['day_2']
            ];
        }
    }

    /**
     * Returns datetime info from 'YYYY-MM-DD hh:mm:ss' / 'DD/MM/YYYY hh:mm:ss' datetime (english/french format).
     * 
     * @param string $datetime The datetime concerned
     * 
     * @return array An array like this ['YYYY', 'MM', 'DD', 'hh', 'mm', 'ss'] or null if invalid datetime
     */
    public static function getDatetimeInfo (string $datetime)
    {
        if (
            (
                preg_match(static::PATTERNS['datetime_en'], $datetime, $matches) ||
                preg_match(static::PATTERNS['datetime_fr'], $datetime, $matches)
            ) && (
                checkdate(+$matches['month_2'], +$matches['day_2'], +$matches['year_4'])
            )
        ) {
            if (
                (+$matches['hour_2'] < 0) ||
                (+$matches['min_2'] < 0) ||
                (+$matches['sec_2'] < 0) ||
                (+$matches['hour_2'] > 23) ||
                (+$matches['min_2'] > 59) ||
                (+$matches['sec_2'] > 59)
            ) {
                return null;
            }
            return [
                +$matches['year_4'],
                +$matches['month_2'],
                +$matches['day_2'],
                +$matches['hour_2'],
                +$matches['min_2'],
                +$matches['sec_2']
            ];
        }
    }

    /**
     * @static
     * Returns the default config or the requested parameter
     * 
     * @param string $paramName The expected parameter name, for example : 'allow_unknown_fields'.
     * If null : all the default config is returned.
     * 
     * @return mixed|array Array if the entire default config is requested.
     */
    public static function getDefaultConfig ($paramName = null)
    {
        if ( !isset($paramName) ) {
            return static::$defaultConfig;
        } elseif ( gettype($paramName) === 'string' ) {
            return static::$defaultConfig[$paramName] ?? null;
        }
    }

    /**
     * Returns pattern info from an entire pattern :
     *  - delimiter
     *  - pattern
     *  - flags
     * 
     * @param string $pattern The pattern (with delimiter and flags)
     * 
     * @return array
     */
    public static function getPatternInfo (string $pattern)
    {
        preg_match('/(?<delimiter>[\/~@;%`#])(?<pattern>.+)(\g{delimiter})(?<flags>\w+)?/', $pattern, $matches);
        arr_remove_numeric_keys($matches);
        return $matches;
    }

    /**
     * Returns time info from 'hh:mm:ss' / '{{hh}}:{{mm}}' datetime (english/french format).
     * 
     * @param string $time The time concerned
     * 
     * @return array An array like this ['hh', 'mm', 'ss'] or null if invalid time
     */
    public static function getTimeInfo (string $time)
    {
        $en = preg_match(static::PATTERNS['time_en'], $time, $matches);
        if ( !$en ) {
            $fr = preg_match(static::PATTERNS['time_fr'], $time, $matches);
            if ( $fr ) {
                $matches['time_mm'] = 0;
                $matches['time_ss'] = 0;
            } else {
                return;
            }
        }
        if (
            (+$matches['time_hh'] < 0) ||
            (+$matches['time_mm'] < 0) ||
            (+$matches['time_ss'] < 0) ||
            (+$matches['time_hh'] > 23) ||
            (+$matches['time_mm'] > 59) ||
            (+$matches['time_ss'] > 59)
        ) {
            return null;
        }
        return [
            +$matches['time_hh'],
            +$matches['time_mm'],
            +$matches['time_ss']
        ];
    }

    /**
     * @deprecated Prefer checkVal()
     * 
     * Returns if a email is valid or not
     * 
     * @param string $dataToCheck The e-mail to check.
     * 
     * @return bool
     */
    public static function isEmailValid ($dataToCheck)
    {
        return (filter_var($dataToCheck, FILTER_VALIDATE_EMAIL) !== false);
    }

    /**
     * Returns if a value is an integer between $min and $max
     * 
     * @param mixed $data The value to check
     * @param int $min The minimum value allowed.
     * @param int $max The maximum value allowed.
     * @param bool $minOrEqual If true, a value equal to $min is accepted
     * @param bool $maxOrEqual If true, a value equal to $max is accepted
     * 
     * @return bool
     */
    public static function isIntInRange ($data, $min, $max, $minOrEqual = true, $maxOrEqual = true)
    {
        if ( gettype($data) !== 'integer' ) {
            return false;
        }
        if ($minOrEqual) {
            if ($data < $min) {
                return false;
            }
        } else {
            if ($data <= $min) {
                return false;
            }
        }
        if ($maxOrEqual) {
            if ($data > $max) {
                return false;
            }
        } else {
            if ($data >= $max) {
                return false;
            }
        }
        return true;
    }

    /**
     * @deprecated Prefer checkVal()
     * 
     * Returns if a tel number is valid or not.
     * Accept (+33 | 0033 | 0) followed by (4|6|7) followed by 8 figures
     * 
     * @param string $dataToCheck The tel number to check.
     * @return bool
     */
    public static function isTelValid ($dataToCheck)
    {
        $pattern = Patterns::get('tel', '/');
        return (preg_match($pattern, $dataToCheck) === 1);
    }

    /**
     * @param Input_control__fieldsRules|array $fieldsRules Rules that concern all the fields.
     * Array like this :
     * [ $fieldName => $fieldRules,... ]
     * @param string|null $formName The form name. Auto-generated if null. Default: null.
     * @param array $config The general config
     * 
     * @return object|string Returns the new instance, or 'error' on fail
     */
    public static function &new (iterable $fieldsRules, $formName = null, ?array $config = [])
    {
        $oInputControl = new Input_control(
            $fieldsRules,
            $formName,
            $config
        );
        if ( empty($oInputControl->constructErrorDetail) ) {
            return $oInputControl;
        } else {
            return 'error';
        }
    }

    /**
     * @param string $jsLibName The desired JS library. Default: 'validateJS'
     * @param Input_control__fieldsRules|array $fieldsRules Rules that concern all the fields.
     * Array like this :
     * [ $fieldName => $fieldRules,... ]
     * @param string|null $formName The form name. Auto-generated if null. Default: null.
     * @param array $config The general config
     * 
     * @return object|string Returns the new instance, or 'error' on fail
     */
    private static function &newJsLib (string $jsLibName = 'validateJS', iterable $fieldsRules, $formName = null, ?array $config = null)
    {
        $jsFile = static::$defaultConfig['js_libs'][$jsLibName]['file'];
        $jsFilePath = dirname(__FILE__).DIRECTORY_SEPARATOR.$jsFile;
        $isValidJsLib = (
            in_array(
                $jsLibName,
                array_keys(static::$defaultConfig['js_libs'])
            )
            && file_exists($jsFilePath)
        );
        if ($isValidJsLib) {
            $jsLibClassName = static::$defaultConfig['js_libs'][$jsLibName]['className'];
            require_once $jsFile;
            $icValidateJs = new $jsLibClassName($fieldsRules, $formName, $config);
            return $icValidateJs;
        }
    }

    /**
     * @param Input_control__fieldsRules|array $fieldsRules Rules that concern all the fields.
     * Array like this :
     * [ $fieldName => $fieldRules,... ]
     * @param string|null $formName The form name. Auto-generated if null. Default: null.
     * @param array $config The general config
     * 
     * @return object|string Returns the new instance, or 'error' on fail
     */
    public static function &newValidateJs (iterable $fieldsRules, $formName = null, ?array $config = null)
    {
        return static::newJsLib('validateJS', ...func_get_args());
    }

    /**
     * Returns a time formated in '{{hh}}:{{mm}}:{{ss}}' or '{{hh}}h{{mm}}' format.
     * 
     * @param int $hour Hour 'time_hh'
     * @param int $min Min 'time_mm'
     * @param int $sec Sec 'time_ss'
     * @param bool $fr If true: will return a french time. Otherwise, an english date.
     * 
     * @return string|null Null on failure
     */
    public static function timeFromInt (int $hour = 0, int $min = 0, int $sec = 0, bool $fr = false): ?string
    {
        $twoDigits = [&$hour, &$min, &$sec];
        foreach ($twoDigits as &$val) {
            if (strlen($val) === 1) {
                $val = '0'.$val;
            }
        }
        if ($fr) {
            return $hour . 'h' . $min;
        } else {
            return $hour . ':' . $min . ':' . $sec;
        }
    }



    // ◘ protected STATIC METHODS

    /**
     * Add missing field config parameters if not provided
     * 
     * @param array &$fieldConfig The field config (field rules)
     */
    protected static function optimizeFieldRules (&$fieldRules, $addMissingType = true)
    {
        // add default rules attributes if not provided in config
        foreach ($fieldRules as $ruleName => $ruleValue) {
            if ( gettype($ruleValue) !== 'array' ) {
                // create an array and copy the value
                $fieldRules[$ruleName] = [];
                $fieldRules[$ruleName][$ruleName] = $ruleValue;
            }
            // add default params if missing (depending on the rule)
            if (
                isset(static::$defaultSubRules[$ruleName]) &&
                (gettype(static::$defaultSubRules[$ruleName]) === 'array')
            ) {
                foreach (static::$defaultSubRules[$ruleName] as $paramName => $paramValue) {
                    if ( !isset($fieldRules[$ruleName][$paramName]) ) {
                        $fieldRules[$ruleName][$paramName] = $paramValue;
                    }
                }
            }
            // add default params if missing (whatever the rule): rules supplied by the user
            foreach (static::$defaultConfig['default_fields_config'] as $paramName => $paramValue) {
                if (!isset($fieldRules[$ruleName][$paramName])) {
                    $fieldRules[$ruleName][$paramName] = $paramValue;
                }
            }
            // add general default params if missing (whatever the rule)
            foreach (static::$defaultRules as $paramName => $paramValue) {
                if (!isset($fieldRules[$paramName])) {
                    $fieldRules[$paramName] = $paramValue;
                }
            }
            // add a sub-key if necessary
            if (
                !isset($fieldRules[$ruleName][$ruleName])
                // || (gettype($fieldRules[$ruleName][$ruleName]) !== 'array')
            ) {
                $fieldRules[$ruleName][$ruleName] = $fieldRules[$ruleName];
            }
            // add 'type' if missing (if option is activated)
            if (
                $addMissingType &&
                !isset($fieldRules['type'])
            ) {
                $addType = false;
                $stringTypeRules = [
                    'date',
                    'time',
                    'datetime',
                    'email',
                    'tel',
                    'local_tel',
                    'pattern'
                ];
                foreach ($stringTypeRules as $rule) {
                    if (
                        isset($fieldRules[$rule])
                    ) {
                        $addType = true;
                        break;
                    }
                }
                if ($addType) {
                    // type = 'string' (depending on the rule)
                    $fieldRules['type'] = 'string';
                }
            }
        }
        // add default rules attributes if not provided in config
        foreach ($fieldRules as $ruleName => $ruleValue) {
            if ( gettype($ruleValue) !== 'array' ) {
                // create an array and copy the value
                $fieldRules[$ruleName] = [];
                $fieldRules[$ruleName][$ruleName] = $ruleValue;
            }
        }

    }

    /**
     * Returns a static info value (useful sometimes before updating field validity)
     * 
     * @param string $infoName The info name
     * 
     * @return mixed
     */
    protected static function getStaticInfo (string $infoName)
    {
        return (static::$info[$infoName] ?? null);
    }

    /**
     * Log into a file. You can provide one or many arguments.
     * Log::f() will be called.
     * 
     * Only if ($dbg)
     * 
     * @param string $fileName The file name (without extension, , name as supplied to the Log::f() method).
     * @param mixed $vars All variables you want to log, in one or more arguments.
     */
    protected static function log (string $fileName, ...$vars)
    {
        if (!static::$dbg) {
            return;
        }
        $args = func_get_args();
        unset($args[0]);
        Log::f($fileName, $args);
    }

    /**
     * Log into a file. You can provide one or many arguments.
     * Log::append_f() will be called.
     * 
     * Only if ($dbg)
     * 
     * @param string $fileName The file name (without extension, , name as supplied to the Log::append_f() method).
     * @param mixed $vars All variables you want to log, in one or more arguments.
     */
    protected static function logAppend (string $fileName, ...$vars)
    {
        if (!static::$dbg) {
            return;
        }
        $args = func_get_args();
        unset($args[0]);
        Log::append_f($fileName, $args);
    }

    /**
     * Log an error. You can provide one or many arguments. All will be json_encoded.
     */
    protected static function logError ()
    {
        Log::error( func_get_args() );
    }

    /**
     * Returns an instance from its form name.
     * 
     * @param string|null $formName The form name. If not supplied, the last instance will be returned.
     * 
     * @return Input_control|null
     */
    public static function &obj (?string $formName = null): ?Input_control
    {
        $iInstancesCount = count(static::$instances);
        if (!$iInstancesCount) {
            return static::$null;
        }
        // $formName not supplied : returns the last instance
        if ( empty($formName) ) {
            return static::$instances[$iInstancesCount - 1];
        }
        // $formName is supplied : returns the instance that matches
        foreach (static::$instances as &$instance) {
            if ($instance->getFormName() === $formName) {
                return $instance;
            }
        }
        return static::$null;
    }

    /**
     * Sets/updates an info value (useful sometimes before updating field validity)
     * 
     * @param string $infoName The info name
     * @param mixed $infoValue The info value
     * @param bool $isReference If true, the value is setted by reference
     */
    protected static function setStaticInfo (string $infoName, $infoValue, $isReference = false)
    {
        if ($isReference) {
            static::$info[$infoName] =& $infoValue;
        } else {
            static::$info[$infoName] = $infoValue;
        }
    }


    // ◘ protected METHODS

    /**
     * Clear the results properties (result, valid & invalid fields)
     */
    protected function clearResults ()
    {
        $this->result = [];
        $this->invalidFields = [];
        $this->validFields = [];
    }

    /**
     * Returns the message. In order if present :
     *  - fieldConfig[$ruleName . '_message']
     *  - fieldConfig['message']
     *  - config['message'][$ruleName]
     *  - config['message']
     *  - defaultConfig['message']
     * 
     * @return string|null Null if no message has been defined in the field config
     */
    protected function getMessage (): ?string
    {
        // $config =& $this->config;
        $fieldName =& $this->fieldName;
        $fieldRules =& $this->fieldRules;
        $ruleName =& $this->fieldRuleName;
        $fieldRuleArr =& $this->fieldRules[$ruleName];
        $subRuleName =& $this->fieldSubRule1;
        $prioMessage = $this->getConfig("prioritary_message_param"); // === 'message!'
        // get the most appropriate message
        $message =
            $fieldRuleArr[$subRuleName]['message'] ?? // user (sub-rule)
            $fieldRules[$prioMessage][$prioMessage] ?? // user (field : prioritary)
            static::INVALID_FIELD_RULE_MESSAGE[$ruleName][$ruleName.'.'.$subRuleName] ??
            $fieldRuleArr['message!'] ?? // user (rule)
            $fieldRuleArr['message'] ?? // user (rule)
            (
                (gettype(static::INVALID_FIELD_RULE_MESSAGE[$ruleName]) === 'string') ?
                static::INVALID_FIELD_RULE_MESSAGE[$ruleName] :
                null
            ) ??
            // $fieldRuleArr[$ruleName]['message'] ?? // user (rule)
            // $fieldRules[$ruleName]['message'] ?? // user (rule)
            $fieldRules['message!']['message!'] ?? // user (field)
            static::INVALID_FIELD_RULE_MESSAGE[$ruleName][$ruleName] ??
            $fieldRules['message']['message'] ?? // user (field)
            $this->getConfig('message') ??
            'Donnée invalide';

        // replace info
        $message = $this->replace($message, true);
        if (static::$fieldInternalError) {
            $message .= ' ERREUR INTERNE';
        }
        return $message;
    }

    /**
     * Returns replacement strings
     * 
     * @param string $str The string which contains values to replace (eg : "Today we are the {{date.now}} and it's {{time.now}}")
     * @param int $limit The maximum number of info you accept for each group ("." is the separator).
     * eg: "date.now" contains 2 info.
     * 
     * @return string[]|null String groups. In the example, will return : ["date.now", "time.now"]
     */
    protected function getReplacements (string $str, $limit = 4): ?array
    {
        $pattern = '/' . $this->getConfig('str_before_replacement') . '(?<str_to_replace>(?:[\w<>!=]+)' . str_repeat('(?:\.[\w<>!=]+)?', ($limit - 1)) . ')' . $this->getConfig('str_after_replacement') . '/';
        $isReplacement = preg_match_all($pattern, $str, $matches, PREG_UNMATCHED_AS_NULL);
        if (!$isReplacement) {
            return null;
        };
        return $matches['str_to_replace'] ?? null;
    }

    /**
     * Returns the sub-rule result. Format groups results for example.
     * 
     * @param string|null $fieldName The field name
     * 
     * @return array|null Null on failure
     */
    protected function getSubRulesResult (?string $fieldName = null, ?string $fieldRule = null, ?array $subRulesResults = null): ?array
    {
        $fieldName = $fieldName ?? $this->fieldName;
        $fieldRuleName = $fieldRuleName ?? $this->fieldRuleName;
        $arr =& $subRulesResults ?? static::$subRulesResults;
        if (!isset($arr[$fieldName][$fieldRule])) {
            return null;
        }
        $isValid = true;
        foreach ($arr[$fieldName][$fieldRule] as &$subRule) {
            if (isset($subRule['valid'])) {
                $subRule['valid'] = [];
            }
            if (isset($subRule['invalid'])) {
                $isValid = false;
            }
        }
        $arr[$fieldName]['is_valid'] = $isValid;
        return $arr[$fieldName];
    }

    /**
     * Returns if the rule or subrule is a comparison rule (which uses operators)
     * 
     * @param string $rule The rule. If null : current rule is applied.
     * @param string $subrule The sub-rule. If null : current sub-rule is applied.
     * 
     * @return bool|null Null if invalid rule/subrule
     */
    protected function isComparisonRule (string $rule, ?string $subrule = null): ?bool
    {
        if ( isset($subrule) ) {
            return in_array($subrule, static::COMPARISON_OPERATORS);
        }
        if ( isset($rule) ) {
            return in_array($rule, static::COMPARISON_OPERATORS);
        }
    }
    
    /**
     * Save the groups value
     * 
     * @param array $data The groups value to save
     */
    protected function saveGroupValue (array $data) {
        if (
            isset($this->fieldSubRule2) && 
            isset($this->fieldSubRule1) &&
            isset($this->fieldRule)
        ) {
            $this->fieldsGroups[$this->fieldName][$this->fieldSubRule1][$this->fieldSubRule2] = $data;
        } elseif (
            isset($this->fieldSubRule1) &&
            isset($this->fieldRule)
        ) {
            $this->fieldsGroups[$this->fieldName][$this->fieldSubRule1] = $data;
        } elseif (
            isset($this->fieldRule)
        ) {
            $this->fieldsGroups[$this->fieldName][$this->fieldRule] = $data;
        } else {
            $this->fieldsGroups[$this->fieldName] = $data;
        }
    }

    /**
     * Saves the field invalidity result and returns it, including the message.
     * 
     * @param string|null $rule The rule that has not been respected.
     * If null, $this->fieldRuleName is taken account in the case of a rule call.
     * @param bool $internalError If true, ' ERREUR INTERNE' will be prepended to the result.
     * @param array $resultDetails Result details to save.
     * @param array $groupsValue Groups value to save.
     * 
     * @return array
     */
    protected function saveInvalidFieldResult (?string $rule = null, bool $internalError = false, ?array $resultDetails = null, ?array $groupsValue = null): array
    {
        $invalidFields =& $this->invalidFields;
        if ( !isset($invalidFields[$this->fieldName]) ) {
            $invalidFields[$this->fieldName] = [];
        }
        $result =& $invalidFields[$this->fieldName];
        $fieldRuleName = ($rule ?? $this->fieldRuleName);
        $result['rule'] = $fieldRuleName;
        if (
            $this->getConfig( 'detailed_rule_result' ) &&
            isset($resultDetails)
            ) {
            // detailed groups 'format' result
            $result['rule_details'] = $resultDetails;
        }
        
        $result['message'] = $this->getMessage();
        static::$lastErrorMessage = $result['message'];
        static::$lastErrorRuleName = $result['rule'];
        static::$lastErrorField = $this->fieldName;
        if ($internalError) {
            static::$fieldInternalError = true;
        }
        return $result;
    }

    /**
     * Saves the field validity result and returns it.
     * 
     * @return array
     */
    protected function saveValidFieldResult (): array
    {
        $validFields =& $this->validFields;
        $validFields[$this->fieldName] = [];
        return $validFields[$this->fieldName];
    }

    /**
     * Sends the response to the front-end
     * 
     * @param array $jAdditionalData Data to add into the front-end response. default: []
     */
    public function sendResponseToFrontEnd ($jAdditionalData = [])
    {
        $jDataToSend = $this->jResult ?? [];
        if (
            !empty($jAdditionalData) &&
            (gettype($jAdditionalData) === 'array')
        ) {
            $jDataToSend['additional_data'] = $jAdditionalData;
        }
        echo json_encode($jDataToSend);
    }

    /**
     * Returns the expected result in the event of an error, including the supplied message.
     * 
     * @param string $message The error message
     * 
     * @return array
     */
    protected function setErrorResult (string $message): array
    {
        $this->result['is_valid'] = false;
        $this->result['error'] = $message;
        return $this->result;
    }

    /**
     * Declare a field as valid/invalid in the results.
     * 
     * @param bool $isValid Is the field valid ?
     * 
     * @return array|null Returns the valid/invalid result, or null on failure.
     */
    protected function setFieldValidity (bool $isValid = true): ?array
    {
        if ($isValid) {
            return $this->saveValidFieldResult();
        } else {
            return $this->saveInvalidFieldResult();
        }
    }

    /**
     * Update the rule value (and possibly the sub-rules). null to not update.
     * Values are reseted on rule name update with 'updateFieldRule()'.
     * 
     * @param string $ruleValue The rule value to set
     * @param string $subRule1Value The first sub-rule value to set
     * @param string $subRule2Value The second sub-rule value to set
     */
    protected function updateFieldRuleValue ($ruleValue = null, $subRule1Value = null, $subRule2Value = null)
    {
        if ($ruleValue !== null) {
            $this->fieldRuleValue = $ruleValue;
        }
        if ($subRule1Value !== null) {
            $this->fieldSubRule1Value = $subRule1Value;
        }
        if ($subRule2Value !== null) {
            $this->fieldSubRule2Value = $subRule2Value;
        }
    }

}