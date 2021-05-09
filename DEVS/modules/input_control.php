<?php
    require_once "trait.easy_config.php";
    require_once "patterns.php";

    /**
     * Contains methods used for input control. 
     * 
     * @requires :
     *    • trait.easy_config.php
     *    • patterns.php
     * 
     * @author Damien Grember <dgrember@gmail.com> <06.32.99.33.86> France, Herault 34
     * Trained by Learning Masters Numérique Digital :
     *    • Jean-Jacques Pagan
     *    • Thomas Gonzalez Vegas
     * Thank you to them, to my colleagues and to the afpanier project team :)
     * @copyright Free use for Afpanier project
     * @version 1.1
     * @todo
     *  - Manage messages with replacement (value, field name)
     *  - Possibility to stop at the first error
     *  - Management of case sensitivity, accents, and hyphens...
     *  - Manage negation: for example ['email' => false]
     */
    abstract class Input_control {
        use EasyConfig;

        /**
         * Ongoing development/debug ? If true : logs will be created.
         */
        static $dbg = true;

        // ◘ PRIVATE PROPERTIES

        /**
         * @property string[] Patterns
         */
        const PATTERNS = [
            'date_en' =>   '/(?<year_4>\d{4})-(?<month_2>\d{1,2})-(?<day_2>\d{1,2})/',
            'date_fr' =>   '/(?<day_2>\d{1,2})\/(?<month_2>\d{1,2})\/(?<year_4>\d{4})/',
            'time' =>      '/(?<hour_HH>\d{1,2}):(?<minute_MM>\d{1,2}):(?<second_SS>\d{1,2})/'
        ];

        /**
         * @property string[] COMPARISON_OPERATORS Comparison operators
         */
        const COMPARISON_OPERATORS = ['<', '<=', '===', '==', '!==', '!=', '>=', '>'];

        /**
         * @property string[] 'INVALID_FIELD_RULE_MESSAGE' Invalid rules messages. Other messages in $fieldsConfigReplacement
         */
        private const INVALID_FIELD_RULE_MESSAGE = [
            'allow_unknown_fields' =>   '{{field}} ne fait pas partie des champs prédéfinis.',
            'min_valid_fields' =>       '{{expected}} champs valides sont nécessaires',
            'type' =>                   'Type de donnée incorrect',
            'allowempty' =>             'Champ à compléter',
            'format' =>                 'Format invalide',
            'pattern' =>                'Format incorrect',
            '>=' =>                     'Doit être supérieur ou égal à {{expected}}',
            '>' =>                      'Doit être supérieur à {{expected}}',
            '<=' =>                     'Doit être inférieur ou égal à {{expected}}',
            '<' =>                      'Doit être inférieur à {{expected}}',
            'minlength' =>              'La longueur doit être d\'au moins {{expected}} caractères',
            'maxlength' =>              'La longueur doit être de {{expected}} caractères maxi',
            'inclusion' =>              '{{value}} ne fait pas partie des valeurs possibles',
            'exclusion' =>              '{{value}} n\'est pas une valeur possible',
            'email' =>                  'E-mail incorrect',
            'tel' =>                    'Numéro de téléphone incorrect',
            'date' =>                   [
                'date' =>                   'Date incorrecte',
                'date.>=' =>                'La date doit être à partir du {{expected}}',
                'date.>' =>                 'La date doit être après le {{expected}}',
                'date.<=' =>                'La date doit être jusqu\'au {{expected}}',
                'date.<' =>                 'La date doit être avant le {{expected}}',
                'date.!=' =>                'La date ne doit pas être le {{expected}}',
                'date.!==' =>               'La date ne doit pas être le {{expected}}'
            ],
            'datetime' =>               'Date / heure incorrectes',
            'time' =>                   'Durée incorrecte'
        ];

        /**
         * @property mixed[] $defaultConfig The default config
         */
        private static $defaultConfig = [
            'fields' =>                     [],
            'default_fields_config' =>      [],
            'min_fields' =>                 1,
            'min_valid_fields' =>           0,
            'json_decode' =>                true,
            'allow_unknown_fields' =>       false,
            'convert_type_to_phptype' =>    true,
            'convert_type_to_sqltype' =>    true,
            'message' =>                    'Donnée invalide',
            'str_before_replacement' =>     '{{',
            'str_after_replacement' =>      '}}',
            'rule_message_param_suffix' =>  '_message',
            'prioritary_message_param' =>   'message!',
            'message_french_date' =>        true
        ];

        /**
         * @property mixed[] $defaultFieldConfig The default field config
         */
        private static $defaultFieldConfig = [
            'required' =>                   false,
            // 'allowempty' =>                 false    // not recommended by default
        ];

        /**
         * @property array $defaultRulesArrayConfig
         * Default rules config (ex: on the "date" rule, if "format" isn't in the config array :
         * add it with the corresponding value).
         * 
         * All insertions are executed after replacements  (see in $fieldsConfigReplacement)
         */
        private static $defaultRulesArrayConfig = [
            'date' =>   [
                'format' => 'YYYY-MM-DD'
            ],
            'datetime' =>   [
                'format' => '{{YYYY}}-{{MM}}-{{DD}}',
                'format_message' => 'Not a datetime !'
            ]
        ];
        
        /**
         * Characteristics of capture groups (pattern, rules). Concerns 'format' rule.
         */
        private const FORMAT_GROUPS = [
            'date_yyyy' =>   [
                'rules' =>  [
                    'pattern'       =>  '\d{4}',
                    'convert_to'    =>  [
                        'type' =>   'integer',
                        'before_check' =>   true
                    ],
                    '>='            =>  1000,
                    '<='            =>  9999
                ]
            ],
            'date_mm' =>   [
                'rules' =>  [
                    'pattern'       =>  '\d{1,2}',
                    'convert_to'    =>  [
                        'type' =>   'integer',
                        'before_check' =>   true
                    ],
                    '>='            =>  1,
                    '<='            =>  12
                ]
            ],
            'date_dd' =>   [
                'rules' =>  [
                    'pattern'       =>  '\d{1,2}',
                    'convert_to'    =>  [
                        'type' =>   'integer',
                        'before_check' =>   true
                    ],
                    '>='            =>  1,
                    '<='            =>  31
                ]
            ],
            'time_hh' =>   [
                'rules' =>  [
                    'pattern'       =>  '\d{1,2}',
                    'convert_to'    =>  [
                        'type' =>   'integer',
                        'before_check' =>   true
                    ],
                    '>='            =>  0,
                    '<='            =>  23
                ]
            ],
            'time_mm' =>   [
                'rules' =>  [
                    'pattern'       =>  '\d{1,2}',
                    'convert_to'    =>  [
                        'type' =>   'integer',
                        'before_check' =>   true
                    ],
                    '>='            =>  0,
                    '<='            =>  59
                ]
            ],
            'time_ss' =>   [
                'rules' =>  [
                    'pattern'       =>  '\d{1,2}',
                    'convert_to'    =>  [
                        'type' =>   'integer',
                        'before_check' =>   true
                    ],
                    '>='            =>  0,
                    '<='            =>  59
                ]
            ]
        ];

        /**
         * Returns format rules
         * 
         * @param string $format The format (simplified pattern)
         * @param bool $includePattern If true, the pattern of the group will be included into the group rules result
         * 
         * @return array
         */
        public static function getFormatResults(string $str, string $format = '{{YYYY}}-{{MM}}-{{DD}}', $includePattern = true) {
            $aReplacements = static::getReplacements($format);
            $replacements = [];
            foreach ($aReplacements as $replacementName) {
                if ( isset(static::FORMAT_GROUPS[$replacementName]['rules']['pattern']) ) {
                    $replacements[$replacementName] = getPatternGroup(
                        static::FORMAT_GROUPS[$replacementName]['rules']['pattern'],
                        $replacementName,
                        true
                    );
                }
            }
            // log::append_f(
            //     'replacements__',
            //     $replacements,
            //     '^' . replaceFields($format, $replacements, static::getDefaultConfig('str_before_replacement'), static::getDefaultConfig('str_after_replacement')) . '$'
            // );
            $pattern = '/^' . replaceFields($format, $replacements, static::getDefaultConfig('str_before_replacement'), static::getDefaultConfig('str_after_replacement')) . '$/';
            if (!preg_match_all($pattern, $str, $matches, PREG_UNMATCHED_AS_NULL)) {
                return false;
            }
            $result = [];
            $values = [];
            $rules = [];
            foreach ($replacements as $replacementName => &$patternGroup) {
                if (isset($matches[$replacementName][0])) {
                    $replacementValue = $matches[$replacementName][0];
                    $values[$replacementName] = $replacementValue;
                    if (isset(static::FORMAT_GROUPS[$replacementName]['rules'])) {
                        $rules[$replacementName] = static::FORMAT_GROUPS[$replacementName]['rules'];
                        if (!$includePattern) {
                            unset($rules[$replacementName]['pattern']);
                        }
                    }
                }
            }
            $result['values'] = $values;
            $result['rules'] = $rules;
            log::f(
                'getFormatResults__good',
                $result
            );
            return $result;
        }


        /**
         * Returns all strings to replace
         * 
         * @param string $str The source string
         * 
         * @return array
         */
        public static function getReplacements(string $str = '{{YYYY}}-{{MM}}-{{DD}}') {
            $pattern = '/' . static::getDefaultConfig('str_before_replacement') . '(?<str_to_replace>.*?)' . static::getDefaultConfig('str_after_replacement') . '/';
            if (preg_match_all($pattern, $str, $matches, PREG_UNMATCHED_AS_NULL)) {
                return $matches['str_to_replace'];
            }
        }

        /**
         * @property array $fieldsConfigReplacement If the first rule is found with its value, delete the rule and insert the rule located just after
         */
        private static $fieldsConfigReplacement = [
            // DATE
            [
                [
                    'date' => true
                ],
                [
                    'date' => [ true ]
                ]
            ],
            // DATETIME
            [
                [
                    'datetime' => true
                ],
                [
                    'datetime' => [ true ]
                ]
            ],
            // TEL
            [
                [
                    'tel' => true
                ],
                [
                    'tel' => [
                        'pattern' => '/^(0|((\+|00)33))([1-7])\d{8}$/',
                        'pattern_message' => 'Numéro de téléphone français attendu',
                    ]
                ]
            ],
            // LOCAL_TEL
            [
                [
                    'local_tel' => true
                ],
                [
                    'tel' => [
                        'pattern' => '/^(0|((\+|00)33))(4|6|7)\d{8}$/',
                        'pattern_message' => 'Numéro de téléphone local attendu',
                    ]
                ]
            ],
            // [
            //     [
            //         'datetime' => true
            //     ],
            //     [
            //         'datetime' => [ 'dateOnly' =>   false]
            //     ]
            // ],
            // [
            //     [
            //         'time' => true
            //     ],
            //     [
            //         'datetime' => [ 'timeOnly' =>   true]
            //     ]
            // ]
        ];

        /**
         * @property array The config : which was provided from Input_control::checkAll(),
         * or config by default in the case of a developer who directly uses Input_control::check() 
         */
        private static $config;

        /**
         * @property array $data The array table. Could be changed slightly to be optimized depending on the options :
         *      • 'convert_type_to_phptype'
         */
        private static $data;
        
        /**
         * @property string $fieldName Name of the field in the current check.
         */
        private static $fieldName;

        /**
         * @property mixed $fieldValue Value of the field in the current check.
         */
        private static $fieldValue;

        /**
         * @property mixed $expectedValue Expected value of the field in the current check.
         */
        private static $expectedValue;

        /**
         * @property string $fieldRule Rule of the field in the current check. (ex : 'date')
         */
        private static $fieldRule;

        /**
         * @property string $fieldSubRule Sub-Rule of the field in the current check. (ex : '>=' if the rule is 'date')
         */
        private static $fieldSubRule;

        /**
         * @property array $fieldConfig Config of the field in the current check.
         */
        private static $fieldConfig;

        /**
         * @property array $invalidFields The array that will be included in the results of the edit control: contains invalid fields and information for each such as :
         *    - rule
         *    - message
         */
        private static $invalidFields;

        /**
         * @property array $validFields The array that will be included in the results of the edit control: contains as keys the names of valid fields
         */
        private static $validFields;

        /**
         * @property array $result The result of the input control that will be returned
         */
        private static $result;

        /**
         * @property string $lastErrorField The last error message
         */
        private static $lastErrorField;

        /**
         * @property string $lastErrorMessage The last error message
         */
        private static $lastErrorMessage;

        /**
         * @property string $lastErrorRuleName The last error rule name
         */
        private static $lastErrorRuleName;

        /**
         * @property bool $saveResult If true, the results will be saved and will be recoverable thanks to the static methods.
         */
        private static $saveResult = true;


        // ◘ PUBLIC METHODS

        /**
         * Returns if $ a compared to $ b is as defined
         * 
         * @param mixed $a The first value
         * @param mixed $comparisonOperator The comparison operator ('===' by default)
         * @param mixed $b The second value
         * 
         * @return bool
         */
        public static function aVsB($a, $comparisonOperator = '===', $b) {
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
         * Check whether A FIELD is valid and returns the result.
         * 
         * @param array $field Value of the field to check in an array like this :
         * [$fieldName => $fieldValue]
         * @param array $fieldConfig Rules that concern the field, and those of other fields if necessary.
         * Array like this :
         * [$fieldName => $fieldConfig]
         * 
         * @return bool
         */
        public static function check(array $field = [], array $fieldConfig = []) {
            $dbg =& static::$dbg;
            $errorResult = ['error' =>  'invalid field / config'];
            $backTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
            // if the method is not called from this class
            if (
                !isset($backTrace[0]['class']) ||
                ($backTrace[0]['class'] !== static::class)
              ) {
                static::clearResults();
                static::$saveResult = true;
            }
            // if provided value(s)/rule(s)
            if ( (count($field) > 0) && (count($fieldConfig) > 0) ) {
                $fieldName = array_keys($field)[0];
                $fieldValue = $field[$fieldName];
                $fieldConfig = $fieldConfig[$fieldName] ?? null;
            } else {
                $fieldName =& static::$fieldName ?? null;
                $fieldValue =& static::$fieldValue ?? null;
                $fieldConfig =& static::$fieldConfig ?? null;
            }
            if (
                !isset($fieldName) ||
                !isset($fieldValue) ||
                !isset($fieldConfig) ||
                (count($fieldConfig) === 0)
              ) {
                return $errorResult;
            }
            if (isEmpty(static::$config)) {
                // get the default config
                static::$config =& static::$defaultConfig;
            }
            // ADD DEFAULT FIELD CONFIG IF NOT PROVIDED (if $saveResult)
            if (static::$saveResult) {
                static::addMissingFieldConfig($fieldConfig);
            }
            
            // CONVERT TO (before check)
            static::updateFieldRule('convert_to');
            if ( isset($fieldConfig['convert_to']) ) {
                if ( gettype($fieldConfig['convert_to']) !== 'array' ) {
                    // error
                    error_log('Input_control,  convert_to (before check),  not array');
                    // Log::error('Input_control', 'convert_to (before check)', 'not array');
                    static::saveInvalidFieldResult('convert_to', true);
                    return false;
                } elseif (
                    ( !isset($fieldConfig['convert_to']['type']) ) ||
                    ( gettype($fieldConfig['convert_to']['type']) !== 'string' )
                ) {
                    // error
                    error_log('Input_control,  convert_to (before check),  missing/invalid type');
                    // Log::error('Input_control', 'convert_to (before check)', 'missing/invalid type');
                    static::saveInvalidFieldResult('convert_to', true);
                    return false;
                } else {
                    if (!isset($fieldConfig['convert_to']['before_check'])) {
                        $fieldConfig['convert_to']['before_check'] = false;
                    }
                    if ($fieldConfig['convert_to']['before_check']) {
                        // convert the value to the specified type
                        if ( !settype($fieldValue, $fieldConfig['convert_to']['type']) ) {
                            // error
                            error_log('Input_control,  convert_to (before check),  error during the conversion');
                            // Log::error('Input_control', 'convert_to (before check)', 'error during the conversion');
                            static::saveInvalidFieldResult('convert_to', true);
                            return false;
                        }
                    }
                }
            }
            // TYPE
            static::updateFieldRule('type');
            if ( isset($fieldConfig['type']) ) {
                $fieldType = gettype($fieldValue);
                $expectedTypes = to_arr($fieldConfig['type']);
                static::$expectedValue = $expectedTypes;
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
                                if ( static::$config['convert_type_to_sqltype'] == true ) {
                                    // converts the (bool or string) into tinyint (0|1)
                                    $fieldValue = +$newValue;
                                } else if ( static::$config['convert_type_to_phptype'] == true ) {
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
                                ( static::$config['convert_type_to_phptype'] == true ) &&
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
                    static::saveInvalidFieldResult('type');
                    return false;
                }
            }
            // ALLOW EMPTY ?
            static::updateFieldRule('allowempty');
            if ( isset($fieldConfig['allowempty']) ) {
                if ( ($fieldConfig['allowempty'] != 0) && ($fieldConfig['allowempty'] != 1) ) {
                    // error
                    Log::error('Input_control', 'allowempty', 'not boolean');
                    static::saveInvalidFieldResult('allowempty', true);
                    return ['error' =>  'allowempty config : not boolean'];
                } else {
                    static::$expectedValue = $fieldConfig['allowempty'];
                    // if allow empty value
                    if ( $fieldConfig['allowempty'] ) {
                        if ( isEmpty($fieldValue) ) {
                            // OK : VALID FIELD
                            static::saveValidFieldResult();
                            return true;
                        }
                    // if not allow empty value
                    } else {
                        if ( isEmpty($fieldValue) ) {
                            static::saveInvalidFieldResult();
                            return false;
                        }
                    }
                }
            }
            // PATTERN
            static::updateFieldRule('pattern');
            if ( isset($fieldConfig['pattern']) ) {
                if ( gettype($fieldConfig['pattern']) !== 'string' ) {
                    // error
                    Log::error('Input_control', 'pattern', 'not string');
                    static::saveInvalidFieldResult('pattern', true);
                    return false;
                } else {
                    if (substr($fieldConfig['pattern'], 0, 1) !== '/') {
                        $fieldConfig['pattern'] = '/' . $fieldConfig['pattern'] . '/';
                    }
                    static::$expectedValue = $fieldConfig['pattern'];
                    if (!preg_match($fieldConfig['pattern'], $fieldValue)) {
                        static::saveInvalidFieldResult('pattern');
                        return false;
                    }
                }
            }
            // FORMAT
            static::updateFieldRule('format');
            if ( isset($fieldConfig['format']) ) {
                if ( gettype($fieldConfig['format']) !== 'string' ) {
                    // error
                    Log::error('Input_control', 'format', 'not string');
                    static::saveInvalidFieldResult('format', true);
                    return false;
                } else {
                    static::$expectedValue = $fieldConfig['format'];
                    $formatResults = static::getFormatResults(
                        $fieldValue,
                        $fieldConfig['format'],
                        false
                    );
                    if ( !$formatResults ) {
                        static::saveInvalidFieldResult('format');
                        return false;
                    }
                    log::f(
                        'all_formatResults',
                        $formatResults
                    );
                    static::$saveResult = false;
                    foreach ($formatResults['rules'] as $groupName => &$rules) {
                        if ( !static::checkVal($formatResults['values'][$groupName], $rules) ) {
                            static::$saveResult = true;
                            static::saveInvalidFieldResult('format');
                            return false;
                        }
                    }
                    static::$saveResult = true;
                }
            }
            // {{COMPARISON_OPERATOR}}
            foreach (static::COMPARISON_OPERATORS as $comparison_operator) {
                static::updateFieldRule($comparison_operator);
                if ( isset($fieldConfig[$comparison_operator]) ) {
                    static::$expectedValue = $fieldConfig[$comparison_operator];
                    if (
                        !static::aVsB(
                            $fieldValue,
                            $comparison_operator,
                            static::$expectedValue
                        )
                    ) {
                        static::saveInvalidFieldResult($comparison_operator);
                        return false;
                    }
                }
            }
            // MIN_LENGTH ( length must be >= )
            if ( isset($fieldConfig['minlength']) ) {
                static::updateFieldRule('minlength');
                if ( gettype($fieldConfig['minlength']) !== 'integer' ) {
                    // error
                    Log::error('Input_control', 'minlength', 'not integer');
                    return ['error' =>  'minlength config : not integer'];
                } elseif ( $fieldConfig['minlength'] < 0 ) {
                    // error
                    Log::error('Input_control', 'minlength', 'negative');
                    static::saveInvalidFieldResult('minlength', true);
                    return false;
                } else {
                    static::$expectedValue = $fieldConfig['minlength'];
                    if ( strlen($fieldValue) < $fieldConfig['minlength']) {
                        static::saveInvalidFieldResult('minlength');
                        return false;
                    }
                }
            }
            // MAX_LENGTH ( length must be <= )
            if ( isset($fieldConfig['maxlength']) ) {
                static::updateFieldRule('maxlength');
                if ( gettype($fieldConfig['maxlength']) !== 'integer' ) {
                    // error
                    Log::error('Input_control', 'maxlength config', 'not integer');
                    return ['error' =>  'maxlength config : not integer'];
                } elseif ( $fieldConfig['maxlength'] < 0 ) {
                    // error
                    Log::error('Input_control', 'maxlength', 'negative');
                    static::saveInvalidFieldResult('maxlength', true);
                    return false;
                } else {
                    static::$expectedValue = $fieldConfig['maxlength'];
                    if ( strlen($fieldValue) > $fieldConfig['maxlength']) {
                        static::saveInvalidFieldResult('maxlength');
                        return false;
                    }
                }
            }
            // INCLUSION
            if ( isset($fieldConfig['inclusion']) ) {
                static::updateFieldRule('inclusion');
                $fieldConfig['inclusion'] = to_arr($fieldConfig['inclusion']);
                static::$expectedValue = $fieldConfig['inclusion'];
                if ( !in_array($fieldValue, $fieldConfig['inclusion']) ) {
                    static::saveInvalidFieldResult('inclusion');
                    return false;
                }
            }
            // EXCLUSION
            if ( isset($fieldConfig['exclusion']) ) {
                static::updateFieldRule('exclusion');
                $fieldConfig['exclusion'] = to_arr($fieldConfig['exclusion']);
                static::$expectedValue = $fieldConfig['exclusion'];
                if ( in_array($fieldValue, $fieldConfig['exclusion']) ) {
                    static::saveInvalidFieldResult('exclusion');
                    return false;
                }
            }
            // EMAIL
            if (
                ( isset($fieldConfig['email']) ) &&
                ( $fieldConfig['email'] == true )
            ) {
                static::updateFieldRule('email');
                static::$expectedValue = null;
                if ( filter_var($fieldValue, FILTER_VALIDATE_EMAIL) === false ) {
                    static::saveInvalidFieldResult('email');
                    return false;
                }
            }
            // TEL
            if (
                ( isset($fieldConfig['tel']) ) &&
                ( isset($fieldConfig['tel']['pattern']) )
            ) {
                static::updateFieldRule('tel');
                static::$expectedValue = null;
                if ( !preg_match($fieldConfig['tel']['pattern'], $fieldValue) ) {
                    static::saveInvalidFieldResult('tel');
                    return false;
                }
            }
            // DATE
            static::$expectedValue = null;
            if ( isset($fieldConfig['date']) ) {
                static::updateFieldRule('date');
                $pattern = '/' . replaceFields($fieldConfig['date']['format'], [
                    'YYYY-MM-DD' =>   '(?<year_4>\d{4})-(?<month_2>\d{2})-(?<day_2>\d{2})',
                    'YYYY' =>   '(?<year_4>\d{4})',
                    'YY' =>   '(?<year_2>\d{2})',
                    'MM' =>   '(?<month_2>\d{2})',
                    'DD' =>   '(?<day_2>\d{2})',
                ], '', '') . '/';
                if (!preg_match($pattern, $fieldValue, $matches)) {
                    static::saveInvalidFieldResult('date');
                    return false;
                }

                if ($dbg) {
                    Log::append_f(
                        'checkAll__date__pattern',
                        $pattern,
                        $matches
                    );
                }
                if (
                    ( !isset($matches['year_4']) ) ||
                    ( !isset($matches['month_2']) ) ||
                    ( !isset($matches['day_2']) ) ||
                    ( !checkdate(+$matches['month_2'], +$matches['day_2'], +$matches['year_4']) )
                ) {
                    static::saveInvalidFieldResult('date');
                    return false;
                }
                // DATE {{COMPARISON_OPERATOR}}
                foreach (static::COMPARISON_OPERATORS as $comparison_operator) {
                    if ( isset($fieldConfig['date'][$comparison_operator]) ) {
                        static::updateFieldRule('date', $comparison_operator);
                        if ( gettype($fieldConfig['date'][$comparison_operator]) !== 'string' ) {
                            // error
                            Log::error('Input_control', 'date_>=', 'not string');
                            return ['error' =>  'date_>= config : not string'];
                        }
                        $dataDate = static::formatDate3(+$matches['year_4'], +$matches['month_2'], +$matches['day_2'], false);
                        $configDate = static::replace($fieldConfig['date'][$comparison_operator]);
                        // log::append_f(
                        //     'configDate',
                        //     $fieldConfig['date'][$comparison_operator],
                        //     $configDate
                        // );
                        $configDate = static::formatDate1($configDate, false, true);
                        // log::append_f(
                        //     'configDate',
                        //     $configDate
                        // );
                        if (
                            !static::aVsB(
                                strtotime($dataDate),
                                $comparison_operator,
                                strtotime($configDate)
                            )
                        ) {
                            static::$expectedValue = static::formatDate1( $configDate, static::getConfig('message_french_date') );
                            static::updateFieldRule('date', $comparison_operator);
                            static::saveInvalidFieldResult('date');
                            return false;
                        }
                    }
                }
            }
            // ◘ OK : VALID FIELD ◘
            // CONVERT TO (after check)
            static::updateFieldRule('convert_to');
            if ( isset($fieldConfig['convert_to']['after_check']) ) {
                if ($fieldConfig['convert_to']['after_check']) {
                    // convert the value to the specified type
                    if ( !settype($fieldValue, $fieldConfig['convert_to']['type']) ) {
                        // error
                        Log::error('Input_control', 'convert_to (after check)', 'error during the conversion');
                        static::saveInvalidFieldResult('convert_to', true);
                        return false;
                    }
                }
            }
            static::saveValidFieldResult();
            return true;
        }

        /**
         * @static
         * Check if MULTIPLE fields are valid and returns the result :
         *  - is data valid ?
         *  - valid fields ?
         *  - invalid fields ?
         *  - if error : what error ?
         * 
         * @param array $data The data to check (all the fields to be checked)
         * @param array $config The config (general config including config of fields)
         * 
         * @return array
         */
        public static function checkAll($data, $config) {
            $dbg =& static::$dbg;
            if ($dbg) {
                Log::f(
                    'checkAll__$fieldConfig__before',
                    ''
                );
                Log::f(
                    'checkAll__$fieldConfig__after',
                    ''
                );
                Log::f(
                    'checkAll__date__pattern',
                    ''
                );
            }
            static::$data = [];
            static::clearResults();
            static::$expectedValue = '';
            // check the config
            if (gettype($config) !== 'array') {
                return static::setErrorResult('Mauvais format de config');
            }
            static::$config = static::getCustomizedConfig(static::$defaultConfig, $config);
            // now : $config is not provided params but default config overwritten by provided params
            $config =& static::$config;
            // check data
            // json_encoded data
            if (
                ( gettype($data) === 'string' ) &&
                ( substr($data, 0, 2) === '{"' )
            ) {
                // if json_decode option activated
                if (
                    ( isset($config['json_decode']) ) &&
                    ( $config['json_decode'] == true )
                ) {
                    // try to json_decode
                    static::$data = json_decode($data, true); 
                    if (static::$data === null) {
                        return static::setErrorResult('Erreur lors du décodage du JSON');
                    }
                } else  {
                    // else : error
                    return static::setErrorResult('Mauvais format de données. Activez l\'option json_decode.');
                }
            } else if (gettype($data) === 'array') {
                // data array : ok
                static::$data =& $data;
            } else {
                // else : error
                return static::setErrorResult('Mauvais format de données');
            }
            // $aData becomes the data array and can be modified slightly to be optimized depending on the options :
            //    • 'convert_type_to_phptype'
            $aData =& static::$data;
            $dataCount = count($aData);
            // NO DATA
            if (count($aData) === 0) {
                return static::setErrorResult('Aucune donnée');
            }
            // MIN_FIELDS
            $min_fields = ( isset($config['min_fields']) && ( gettype($config['min_fields']) === 'integer' ) ) ? $config['min_fields'] : 0;
            if ( $dataCount < $min_fields ) {
                $message = ($min_fields > 1) ? ' données sont requises' : ' donnée est requise';
                return static::setErrorResult('Au moins ' . $min_fields . $message);
            }
            // REQUIRED
            $fieldsCount = count($config['fields']);
            for ($i = 0; $i < $fieldsCount; $i++) {
                static::$fieldName = key($config['fields']);
                $fieldName =& static::$fieldName;
                if ( isset($config['fields'][$fieldName]['required']) && ($config['fields'][$fieldName]['required'] == true) && !isset($aData[$fieldName]) ) {
                    static::saveInvalidFieldResult('required');
                }
                next($config['fields']);
            }
            $fieldRule =& static::$fieldRule;
            // ◘◘ >>> iterate over EACH FIELD of $data <<< ◘◘
            foreach ($aData as $fieldName => &$fieldValue) {
                if (isset($config['fields'][$fieldName])) {
                    $fieldConfig =& $config['fields'][$fieldName];
                } else {
                    Log::error('checkAll()', $fieldName, 'no config');
                    continue;
                }
                // updates vars
                static::$fieldName =& $fieldName;
                static::$fieldValue =& $fieldValue;
                static::$fieldConfig =& $fieldConfig;
                // if UNKNOWN FIELD
                static::updateFieldRule('allow_unknown_fields');
                if (!array_key_exists ($fieldName, $config['fields'])) {
                    if ( !$config['allow_unknown_fields'] ) {
                        // returns ERROR
                        static::saveInvalidFieldResult('pattern', true);
                        return static::setErrorResult("'$fieldName' ne fait pas partie des champs prédéfinis.");
                    }
                    // iterate
                    continue;
                }
                if ($dbg) {
                    Log::append_f(
                        'checkAll__$fieldConfig__before',
                        $fieldName,
                        $fieldConfig
                    );
                }
                static::$saveResult = true;
                // ◘ check whether the field value is valid ◘
                $fieldResult = static::check([], []);
                if (
                    ( gettype($fieldResult) === 'array' ) &&
                    ( isset($fieldResult['error']) )
                ) {
                    // returns ERROR message if error
                    return static::setErrorResult($fieldResult['error']);
                }
            }
            // INSERT VALID / INVALID FIELDS
            static::$result['invalid_fields'] = static::$invalidFields;
            static::$result['valid_fields'] = static::$validFields;
            // MIN_VALID_FIELDS
            static::updateFieldRule('min_valid_fields');
            if ( isset($config['min_valid_fields']) && (gettype($config['min_valid_fields']) === 'integer') ) {
                $min_valid_fields = $config['min_valid_fields'];
                static::$expectedValue = $min_valid_fields;
            } else {
                // error
                Log::error('Input_control', 'min_valid_fields', 'not integer');
                return ['error' =>  'min_valid_fields config : not integer'];
            }
            if ( count(static::$validFields) < $min_valid_fields ) {
                $message = ($min_valid_fields > 1) ? ' données valides sont requises' : ' donnée valide est requise';
                static::setErrorResult('Au moins ' . $min_valid_fields . $message);
            }
            static::$result['is_valid'] = (
                ( count(static::$invalidFields) === 0 ) &&
                ( !isset(static::$result['error']) )
            );
            if ($dbg) {
                Log::f(
                    'checkAll__$result',
                    static::$result
                );
            }
            return static::$result;
        }

        /**
         * @static
         * Check whether A VALUE is valid and returns the result.
         * 
         * @param mixed $value The value to check
         * @param array $rules The rules that the value must respect.
         * 
         * @return bool
         */
        public static function checkVal($value, $rules) {
            return static::check(
                ['checkVal' =>  $value],
                ['checkVal' =>  $rules]
            );
        }

        /**
         * Returns a date formated in 'YYYY-MM-DD' or 'DD/MM/YYYY' format.
         * 
         * @param int $date 'YYYY-MM-DD' or 'DD/MM/YYYY' date.
         * @param bool $fr If true: will return a french date. Otherwise, an english date.
         * 
         * @return string or null if invalid date
         */
        public static function formatDate1(string $date, $fr = true) {
            $dateInfo = static::getDateInfo($date);
            return static::formatDate3(
                $dateInfo[0],
                $dateInfo[1],
                $dateInfo[2],
                $fr
            );
        }

        /**
         * Returns a date formated in 'YYYY-MM-DD' or 'DD/MM/YYYY' format.
         * 
         * @param int $year Year 'YYYY'
         * @param int $month Month 'MM'
         * @param int $day Day 'DD'
         * @param bool $fr If true: will return a french date. Otherwise, an english date.
         * 
         * @return string
         */
        public static function formatDate3($year, $month, $day, $fr = true) {
            if (strlen($month) === 1) {
                $month = '0'.$month;
            }
            if (strlen($day) === 1) {
                $day = '0'.$day;
            }
            return ($fr) ?
                ( $day.'/'.$month.'/'.$year ) :
                ( $year.'-'.$month.'-'.$day );
        }

        /**
         * @static
         * Returns the config or the requested parameter
         * 
         * @param string $paramName The expected parameter name, for example : 'allow_unknown_fields'.
         * If null : all the config is returned.
         * @param bool $defaultConfigIfMissing If true, returns the parameter from default config if missing in the config
         * 
         * @return mixed|array Array if the entire config is requested.
         */
        public static function getConfig($paramName = null, $defaultConfigIfMissing = false) {
            if ( !isset($paramName) ) {
                return static::$config;
            } elseif ( gettype($paramName) === 'string' ) {
                if (isset(static::$config[$paramName])) {
                    return static::$config[$paramName];
                } else {
                    if ($defaultConfigIfMissing && isset(static::$defaultConfig[$paramName])) {
                        return static::$defaultConfig[$paramName];
                    }
                }
            }
        }

        /**
         * Returns the config which concerns a specific field, or all fields config if '*' provided as field name
         * 
         * @param string $fieldName The field name. Possibilities :
         *  • '*' :             returns all fields config
         *  • $fieldName :      returns the config of the desired field
         *  • null :            returns the config of the current field
         */
        public static function getFieldConfig($fieldName = '*') {
            if (!isset($fieldName)) {
                $fieldName = static::$fieldName ?? null;
            }
            switch ($fieldName) {
                case '*' :
                    return static::$config['fields'] ?? null;
                default :
                    return static::$config['fields'][$fieldName] ?? null;
            }
        }

        /**
         * @static
         * Returns the value of the provided field name.
         * 
         * @param string $fieldName Name of the desired field.
         * @internal If null, the field being processed is taken into account.
         * 
         * @return mixed|null Null if missing field
         */
        public static function getValue($fieldName = null) {
            if (!isset($fieldName)) {
                return static::$fieldValue ?? null;
            } else {
                return static::$data[$fieldName] ?? null;
            }
        }

        /**
         * @static
         * Returns the data table. Could be changed slightly to be optimized depending on the options :
         *      • 'convert_type_to_phptype'
         * 
         * @param bool $secure_it If true, apply 'arr_secure()' :
         *      • Replace 'script' tags by 'em' tags
         *      • Escape html special characters with 'ENT_QUOTES' flag
         *  
         * @return array
         */
        public static function getData($secure_it = true) {
            $result = static::$data;
            if ($secure_it) {
                arr_secure($result);
            }
            return $result;
        }

        /**
         * Returns date info from 'YYYY-MM-DD' / 'DD/MM/YYYY' date (english/french format).
         * 
         * @param string $date The date concerned
         * 
         * @return array An array like this ['YYYY', 'MM', 'DD'] or null if invalid date
         */
        public static function getDateInfo(string $date) {
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
         * @static
         * Returns the default config or the requested parameter
         * 
         * @param string $paramName The expected parameter name, for example : 'allow_unknown_fields'.
         * If null : all the default config is returned.
         * 
         * @return mixed|array Array if the entire default config is requested.
         */
        public static function getDefaultConfig($paramName = null) {
            if ( !isset($paramName) ) {
                return static::$defaultConfig;
            } elseif ( gettype($paramName) === 'string' ) {
                return static::$defaultConfig[$paramName] ?? null;
            }
        }

        /**
         * Returns the last error field name.
         * To be used after check().
         * 
         * @return string|null The last error field name; NULL if no error
         */
        public static function getLastErrorField() {
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
        public static function getLastErrorMessage() {
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
        public static function getLastErrorRuleName() {
            if (
                ( isset(static::$lastErrorRuleName) )
            ) {
                return static::$lastErrorRuleName;
            }
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
        public static function isEmailValid($dataToCheck) {
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
        public static function isIntInRange($data, $min, $max, $minOrEqual = true, $maxOrEqual = true) {
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
        public static function isTelValid($dataToCheck) {
            $pattern = Patterns::get('tel', '/');
            return (preg_match($pattern, $dataToCheck) === 1);
        }
    
        /**
         * Replace strings with their expected value (to generate the message to send back to the user)
         * 
         * @param string $str The source text, in which are the strings to replace
         * 
         * @return string The text with the replacements made
         */
        public static function replace(string $str) {
            $replacementsInfo = static::getReplacementInfo($str);
            $strToReplace = $replacementsInfo['str_to_replace'];
            
            if (static::$dbg) {
                log::append_f(
                    '$getReplacementInfo',
                    $replacementsInfo,
                    $strToReplace
                );
            }

            $replacements = [];
            switch (strtolower($replacementsInfo['group1'])) {
                case 'value':
                    // value.$fieldName
                    $fieldName = $replacementsInfo['group2'];
                    $replacements[$strToReplace] = static::getValue($fieldName);
                case 'date':
                    // date.*
                    switch (strtolower($replacementsInfo['group2'])) {
                        // date.now
                        case 'now':
                            $replacements[$strToReplace] = strftime('%Y-%m-%d');
                    }
            }

            $str = replaceFields(
                $str,
                $replacements,
                static::$config['str_before_replacement'],
                static::$config['str_after_replacement'],
                false
            );

            // logs
            if (static::$dbg) {
                log::append_f(
                    'replace__$replacements',
                    $replacements
                );
    
                log::append_f(
                    'replace__$getReplacementInfo',
                    $str
                );
            }

            return $str;
        }


        // ◘ PRIVATE METHODS

        /**
         * Add missing field config parameters if not provided
         * 
         * @param array &$fieldConfig The field config (field rules)
         */
        private static function addMissingFieldConfig(&$fieldConfig) {
            // $fieldConfig =& static::$fieldConfig;
            // add default field params if not provided
            foreach (static::$defaultConfig['default_fields_config'] as $paramName => $paramValue) {
                if (!isset($fieldConfig[$paramName])) {
                    $fieldConfig[$paramName] = $paramValue;
                }
            }
            // if missing 'type'
            if ( !isset($fieldConfig['type']) ) {
                if (
                    isset($fieldConfig['pattern']) ||
                    isset($fieldConfig['date']) ||
                    isset($fieldConfig['datetime']) ||
                    isset($fieldConfig['time'])
                ) {
                    // if 'pattern' param provided :
                    // type = 'string'
                    $fieldConfig['type'] = 'string';
                }
            }
            // ◘ iterate on EACH PARAM of the default config
            $defaultConfig =& static::$defaultFieldConfig;
            foreach ( $defaultConfig as $paramName => $paramValue ) {
                // if the param is not provided :
                if ( !isset($fieldConfig[$paramName]) ) {
                    // set the default param value
                    $fieldConfig[$paramName] = $paramValue;
                }
            }

            // replace field config if necessary (parameter name and value)
            foreach (static::$fieldsConfigReplacement as &$replacement) {
                $oldParamName = array_keys($replacement[0])[0];
                $oldParamValue = $replacement[0][$oldParamName];
                $newParamName = array_keys($replacement[1])[0];
                $newParamValue = $replacement[1][$newParamName];
                if (
                    ( isset($fieldConfig[$oldParamName]) ) &&
                    ( $fieldConfig[$oldParamName] === $oldParamValue )
                ) {
                    unset($fieldConfig[$oldParamName]);
                    $fieldConfig[$newParamName] = $newParamValue;
                }
            }

            // add default rules attributes if not provided in config
            foreach ($fieldConfig as $ruleName => &$ruleValue) {
                if (
                    ( gettype($ruleValue) === 'array' ) &&
                    ( isset(static::$defaultRulesArrayConfig[$ruleName]) )
                ) {
                    foreach (static::$defaultRulesArrayConfig[$ruleName] as $ruleAttrName => &$ruleAttrValue) {
                        if ( !isset($ruleValue[$ruleAttrName]) ) {
                            $ruleValue[$ruleAttrName] = $ruleAttrValue;
                        }
                    }
                }
            }

            // log
            if (static::$dbg) {
                log::f(
                    'addMissingFieldConfig__fieldConfig_result',
                    $fieldConfig
                );
            }
        }
    
        /**
         * Clear the results properties (result, valid & invalid fields)
         */
        private static function clearResults() {
            static::$result = [];
            static::$invalidFields = [];
            static::$validFields = [];
        }

        /**
         * @static
         * Returns the message. In order if present :
         *  - fieldConfig[$ruleName . '_message']
         *  - fieldConfig['message']
         *  - config['message'][$ruleName]
         *  - config['message']
         *  - defaultConfig['message']
         * 
         * @param string $ruleName The name of the rule.
         * 
         * @return string|null Null if no message has been defined in the field config
         */
        private static function getMessage() {
            $config =& static::$config;
            $fieldConfig =& static::$fieldConfig;
            $ruleName =& static::$fieldRule;
            $subRuleName =& static::$fieldSubRule;
            $isSubRule = (isset($subRuleName));

            // note : static::getConfig('rule_message_param_suffix') will return '_message' (by default)

            // get the most appropriate message
            if (
                ( $isSubRule ) &&
                ( isset($fieldConfig[$ruleName][$subRuleName.static::getConfig('rule_message_param_suffix')]) )
              ) {
                // user subrule message
                $message = $fieldConfig[$ruleName][$subRuleName.static::getConfig('rule_message_param_suffix')];
            } elseif ( isset($fieldConfig[static::getConfig('prioritary_message_param')]) ) {
                // user prioritary rule message
                $message = $fieldConfig[static::getConfig('prioritary_message_param')];
            } elseif (
                ( $isSubRule ) &&
                ( isset(static::INVALID_FIELD_RULE_MESSAGE[$ruleName][$ruleName.'.'.$subRuleName]) )
              ) {
                // class subrule message
                $message = static::INVALID_FIELD_RULE_MESSAGE[$ruleName][$ruleName.'.'.$subRuleName];
            } elseif ( isset($fieldConfig[$ruleName.static::getConfig('rule_message_param_suffix')]) ) {
                // user rule message
                $message = $fieldConfig[$ruleName.static::getConfig('rule_message_param_suffix')];
            } elseif ( isset(static::INVALID_FIELD_RULE_MESSAGE[$ruleName][$ruleName]) ) {
                // class rule message (if subrule but not class subrule message defined)
                $message = static::INVALID_FIELD_RULE_MESSAGE[$ruleName][$ruleName];
            } elseif (
                ( isset(static::INVALID_FIELD_RULE_MESSAGE[$ruleName]) ) &&
                ( gettype(static::INVALID_FIELD_RULE_MESSAGE[$ruleName]) === 'string' )
              ) {
                // class rule message (if rule)
                $message = static::INVALID_FIELD_RULE_MESSAGE[$ruleName];
            } elseif (
                ( isset($fieldConfig['message']) ) &&
                ( gettype($fieldConfig['message']) === 'string' )
              ) {
                // user field message
                $message = $fieldConfig['message'];
            } elseif (
                ( isset($config['message']) ) &&
                ( gettype($config['message']) === 'string' )
              ) {
                // user config message
                $message = $config['message'];
            } elseif (
                ( static::getConfig('message') !== null ) &&
                ( gettype(static::getConfig('message')) === 'string' )
              ) {
                // class default config message
                $message = static::getConfig('message');
            } else {
                return 'Donnée invalide !';
            }

            // replace all fields
            $replacements = [
                'field' =>      static::$fieldName ?? null,
                'value' =>      static::$fieldValue ?? null,
                'expected' =>   static::$expectedValue ?? null,
                'rule' =>       static::$fieldRule ?? null
            ];
            // delete the replacement if missing value (it's the case with 'expected value' sometimes)
            foreach ($replacements as $key => &$value) {
                if ($value === null) {
                    unset($replacements[$key]);
                }
            }
            // returns result
            return replaceFields(
                $message,
                $replacements,
                $config['str_before_replacement'],
                $config['str_after_replacement'],
                false
            );
        }

        /**
         * Returns replacement info
         * 
         * @return string
         */
        private static function getReplacementInfo($str) {
            $possible_groups = 4;
            $pattern = '/{{(?<str_to_replace>(?:(\w+))' . str_repeat('(?:\.(\w+))?', ($possible_groups - 1)) . ')}}/';
            if (!preg_match_all($pattern, $str, $matches, PREG_UNMATCHED_AS_NULL)) {
                return;
            };
            array_splice($matches, 0, 1);

            $guessFirst = (!isset($matches[2][0]));

            $res = [];
            if (!$guessFirst) {
                foreach ($matches as $match) {
                    if (!isset($match[1])) {
                        continue;
                    }
                    $str = $match[1];
                }
            }

            $result = [];
            $result['str_to_replace'] = $matches['str_to_replace'][0];
            // if the second block is setted
            if (isset($matches[2][0])) {
                $result['group1'] = $matches[1][0];
                $result['group2'] = $matches[2][0];
            } else {
                $result['group2'] = $matches[1][0];
                // $result['group1'] ?
                // 'date' rule
                if (static::$fieldRule === 'date') {
                    if (static::isComparisonRule()) {
                        if (string_starts_with($result['group2'], 'NOW', false)) {
                            $result['group1'] = 'function';
                        } else {
                            // if group2 is a field name
                            if (static::isField($result['group2'])) {
                                $result['group1'] = 'value';
                            }
                        }
                    }
                }
            }
            return $result ?? null;
        }

        /**
         * Returns if the rule or subrule is a comparison rule (which uses operators)
         * 
         * @param string $rule The rule. If null : current rule is applied.
         * @param string $subrule The sub-rule. If null : current sub-rule is applied.
         * 
         * @return bool|null Null if invalid rule/subrule
         */
        private static function isComparisonRule($rule = null, $subrule = null) {
            $rule = $rule ?? static::$fieldRule;
            $subrule = $subrule ?? static::$fieldSubRule;
            if (isset($subrule) && (gettype($subrule) === 'string') ) {
                return in_array($subrule, static::COMPARISON_OPERATORS);
            }
            if (isset($rule) && (gettype($rule) === 'string') ) {
                return in_array($rule, static::COMPARISON_OPERATORS);
            }
        }

        /**
         * Returns whether a provided field name is setted in the field config
         * 
         * @param string $fieldName The field name to check
         * 
         * @return bool
         */
        private static function isField($fieldName) {
            return isset(static::$config['fields'][$fieldName]);
        }
        
        /**
         * Returns whether the field value is valid
         * 
         * @param string $fieldName The name of the field to check
         * 
         * @return bool
         */
        public static function isFieldValid(string $fieldName) {
            switch (true) {
                case ( isset(static::$invalidFields[$fieldName]) ) :
                    return false;
                case ( isset(static::$validFields[$fieldName]) ) :
                    return true;
                default:
                    static::$saveResult = false;
                    return static::check(
                        [
                            $fieldName =>   static::getValue($fieldName)
                        ]
                        ,
                        [
                            $fieldName =>   static::getFieldConfig($fieldName)
                        ]
                    );
            }
        }

        /**
         * @static
         * Returns the expected result in the event of an error, including the message provided
         * 
         * @param string $rule The rule that has not been respected
         * 
         * @return array
         */
        private static function saveInvalidFieldResult($rule = 'type', $internalError = false) {
            if (!static::$saveResult) {
                return;
            }
            if ( !isset(static::$invalidFields[static::$fieldName]) ) {
                static::$invalidFields[static::$fieldName] = [];
            }
            $field =& static::$invalidFields[static::$fieldName];
            $field['rule'] = $rule;
            $field['message'] = static::getMessage($rule);
            static::$lastErrorMessage = $field['message'];
            static::$lastErrorRuleName = $field['rule'];
            static::$lastErrorField = static::$fieldName;
            if ($internalError) {
                $field['message'] .= ' ERREUR INTERNE';
            }
        }

        /**
         * @static
         * Returns the expected result in the event of an error, including the message provided
         * 
         * @param string $rule The rule that has not been respected
         * 
         * @return array
         */
        private static function saveValidFieldResult() {
            if (!static::$saveResult) {
                return;
            }
            if ( !isset(static::$validFields[static::$fieldName]) ) {
                static::$validFields[static::$fieldName] = [];
            }
        }

        /**
         * @static
         * Returns the expected result in the event of an error, including the message provided
         * 
         * @param string $message The error message
         * 
         * @return array
         */
        private static function setErrorResult($message) {
            static::$result['is_valid'] = false;
            static::$result['error'] = $message;
            return static::$result;
        }

        /**
         * Update the field rule (and possibly the sub-rule)
         * 
         * @param string $ruleName The rule name to set (ex: 'date')
         * @param string $subRuleName The sub-rule name to set (ex: '>=')
         */
        private static function updateFieldRule($ruleName, $subRuleName = null) {
            if (!static::$saveResult) {
                return;
            }
            static::$fieldRule = $ruleName;
            static::$fieldSubRule = $subRuleName;
        }
    }