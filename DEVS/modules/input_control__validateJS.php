<?php
require_once 'input_control__js_lib_integration.php';

/**
 * Input_Control with validate.js library
 * 
 * require_once :
 *    • input_control__js_lib_integration.php
 */
class Input_control__validateJS extends Input_control
implements Input_control__JsLibIntegration
{
    /**
     * @param Input_control__fieldsRules|array $fieldsRules Rules that concern all the fields.
     * Array like this :
     * [ $fieldName => $fieldRules,... ]
     * @param string|null $formName The form name. Auto-generated if null. Default: null.
     * @param array $config The general config
     */
    function __construct (iterable $fieldsRules, ?string $formName = null, ?array $config = [], $sendToJs = 'auto')
    {
        parent::__construct(...func_get_args());
    }

    /**
     * Add the invalid message to the JS library rules
     * 
     * @param string[] $subArrays The targeted array (array path)
     */
    public function addMessageForJsLib (array $subArrays)
    {
        $targetedArray =& $this->libRules;
        array_unshift($subArrays, $this->fieldName);
        foreach ($subArrays as $val) {
            if ( !isset($targetedArray[$val]) ) {
                $targetedArray[$val] = [];
            }
            if (gettype($targetedArray[$val]) === 'array') {
                $targetedArray =& $targetedArray[$val];
            } else {
                // here
                return;
            }
        }
        // $libRules[$fieldName]['presence']['allowEmpty']['message'] = $fieldRules['allowEmpty']['message!'] ?? $fieldRules['allowEmpty']['message'];
        $message =
            $this->fieldSubRule1Array['message!']['message!'] ??
            $this->fieldSubRule1Array['message!'] ??
            $this->fieldSubRule1Array['message']['message'] ??
            $this->fieldSubRule1Array['message'] ??

            $this->fieldRuleArray['message!']['message!'] ??
            $this->fieldRuleArray['message!'] ??
            $this->fieldRuleArray['message']['message'] ??
            $this->fieldRuleArray['message'] ??
            null;
        if ($message !== null) {
            $targetedArray['message'] = $message;
        }
    }

    /**
     * Returns the appropriate rules for use in JS with the validateJS library
     * 
     * @param bool $secureIt If true, secure each value before returning the result
     * 
     * @return array|null Null on failure
     */
    public function getRulesForJsLib ($secureIt = true): ?array
    {
        $aFieldsRules =& $this->fieldsRules;
        $this->libRules = [];
        $libRules =& $this->libRules;
        foreach ($aFieldsRules as $fieldName => &$fieldRules) {
            $this->fieldName =& $fieldName;
            $this->fieldRules =& $fieldRules;
            $libRules[$fieldName] = [];
            foreach ($fieldRules as $ruleName => &$ruleValue) {
                $this->fieldRuleName =& $ruleName;
                switch ($ruleName) {
                    case 'pattern':
                        $this->updateRuleForJsLib();
                        $patternInfo = static::getPatternInfo( $fieldRules['pattern']['pattern'] );
                        unset($patternInfo['delimiter']);
                        $libRules[$fieldName]['format'] = $patternInfo;
                        $this->addMessageForJsLib( ['format'] );
                        break;
                    case 'required':
                    case 'allowEmpty':
                        if (
                            isset($fieldRules['allowEmpty']['allowEmpty'])
                        ) {
                            $this->updateRuleForJsLib();
                            $libRules[$fieldName]['presence'] = [];
                            $libRules[$fieldName]['presence']['allowEmpty'] = $fieldRules['allowEmpty']['allowEmpty'];
                            // $this->addMessageForJsLib( ['presence', 'allowEmpty'] );
                        } elseif (
                            isset($fieldRules['required']['required']) &&
                            $fieldRules['required']['required']
                        ) {
                            $this->updateRuleForJsLib();
                            $libRules[$fieldName]['presence'] = true;
                            $this->addMessageForJsLib( ['presence', null] );
                        }
                        break;
                    case 'type':
                        if (
                            isset($fieldRules['type']['type'])
                        ) {
                            $this->updateRuleForJsLib();
                            $type  = strtolower($fieldRules['type']['type']);
                            switch ($type) {
                                case 'arr':
                                    $type = 'array';
                                    break;
                                case 'bool':
                                    $type = 'boolean';
                                    break;
                                case 'int':
                                case 'integer':
                                    $type = 'number'; // todo message
                                    $libRules[$fieldName]['numericality']['onlyInteger'] = true;
                                    break;
                                case 'str':
                                    $type = 'string';
                            }
                            $libRules[$fieldName]['type'] = $type;
                        }
                        break;
                    case 'numeric':
                        if ( isset($fieldRules['numeric']['numeric']) ) {
                            $this->updateRuleForJsLib();
                            if ( isset($fieldRules['numeric']['onlyInteger']) ) {
                                $this->updateSubRuleForJsLib( 'onlyInteger' );
                                $this->fieldSubRule1Value =& $fieldRules['numeric']['onlyInteger'];
                                $libRules[$fieldName]['numeric']['onlyInteger'] = $fieldRules['numeric']['onlyInteger']['onlyInteger'] ?? $fieldRules['numeric']['onlyInteger'];
                                $this->addMessageForJsLib( ['numeric', 'onlyInteger'] );
                            }
                            foreach (static::COMPARISON_OPERATORS as $comparison_operator) {
                                if ( isset($fieldRules['numeric'][$comparison_operator][$comparison_operator]) ) {
                                    $this->updateSubRuleForJsLib( $comparison_operator );
                                    $libRules[$fieldName]['numeric'][$comparison_operator] = $fieldRules['numeric'][$comparison_operator][$comparison_operator];
                                    $this->addMessageForJsLib( ['numeric', $comparison_operator] );
                                }
                            }
                        }
                        // if ( isset($fieldRules['numeric']['numeric']) ) {
                        //     $this->updateRuleForJsLib();
                        //     if ( isset($fieldRules['numeric']['onlyInteger']) ) {
                        //         $this->updateSubRuleForJsLib( 'onlyInteger' );
                        //         $this->fieldSubRule1Value =& $fieldRules['numeric']['onlyInteger'];
                        //         $libRules[$fieldName]['numericality']['onlyInteger'] = $fieldRules['numeric']['onlyInteger']['onlyInteger'] ?? $fieldRules['numeric']['onlyInteger'];
                        //         $this->addMessageForJsLib( ['numericality', 'onlyInteger'] );
                        //     }
                        //     if ( isset($fieldRules['numeric']['>']['>']) ) {
                        //         $this->updateSubRuleForJsLib( '>' );
                        //         $libRules[$fieldName]['numericality']['greaterThan'] = $fieldRules['numeric']['>']['>'];
                        //         $this->addMessageForJsLib( ['numericality', 'greaterThan'] );
                        //     }
                        //     if ( isset($fieldRules['numeric']['>=']['>=']) ) {
                        //         $this->updateSubRuleForJsLib( '>=' );
                        //         $libRules[$fieldName]['numericality']['greaterThanOrEqualTo'] = $fieldRules['numeric']['>=']['>='];
                        //         $this->addMessageForJsLib( ['numericality', 'greaterThanOrEqualTo'] );
                        //     }
                        //     if (
                        //         isset($fieldRules['numeric']['==']['=='])
                        //     ) {
                        //         $this->updateSubRuleForJsLib( '==' );
                        //         $libRules[$fieldName]['numericality']['equalTo'] = $fieldRules['numeric']['==']['=='];
                        //         $this->addMessageForJsLib( ['numericality', 'equalTo'] );
                        //     }
                        //     if (
                        //         isset($fieldRules['numeric']['===']['==='])
                        //     ) {
                        //         $this->updateSubRuleForJsLib( '===' );
                        //         $libRules[$fieldName]['numericality']['equalTo'] = $fieldRules['numeric']['===']['==='];
                        //         $this->addMessageForJsLib( ['numericality', 'equalTo'] );
                        //     }
                        //     if ( isset($fieldRules['numeric']['<']['<']) ) {
                        //         $this->updateSubRuleForJsLib( '<' );
                        //         $libRules[$fieldName]['numericality']['lessThan'] = $fieldRules['numeric']['<']['<'];
                        //         $this->addMessageForJsLib( ['numericality', 'lessThan'] );
                        //     }
                        //     if ( isset($fieldRules['numeric']['<=']) ) {
                        //         $this->updateSubRuleForJsLib( '<=' );
                        //         $libRules[$fieldName]['numericality']['lessThanOrEqualTo'] = $fieldRules['numeric']['<=']['<='];
                        //         $this->addMessageForJsLib( ['numericality', 'lessThanOrEqualTo'] );
                        //     }
                        // }
                        break;
                    case 'minlength':
                        if (
                            isset($fieldRules['minlength']['minlength'])
                        ) {
                            $this->updateRuleForJsLib();
                            $libRules[$fieldName]['length']['minimum'] = $fieldRules['minlength']['minlength'];
                            // todo: message
                            // $this->addMessageForJsLib( ['length', 'minimum'] );
                        }
                        break;
                    case 'maxlength':
                            if (
                                isset($fieldRules['maxlength']['maxlength'])
                            ) {
                                $this->updateRuleForJsLib();
                                $libRules[$fieldName]['length']['maximum'] = $fieldRules['maxlength']['maxlength'];
                                // todo: message
                                // $this->addMessageForJsLib( ['length', 'maximum'] );
                            }
                            break;
                    case 'inclusion':
                        if (
                            isset($fieldRules['inclusion']['inclusion'])
                        ) {
                            $this->updateRuleForJsLib();
                            if (isset($fieldRules['inclusion']['message'])) {
                                $libRules[$fieldName]['inclusion']['within'] = $fieldRules['inclusion']['inclusion'];
                                $this->addMessageForJsLib( ['inclusion'] );
                                // $libRules[$fieldName]['inclusion']['message'] = $fieldRules['inclusion']['message'];
                            } else {
                                $libRules[$fieldName]['inclusion'] = $fieldRules['inclusion']['inclusion'];
                            }
                        }
                        break;
                    case 'exclusion':
                        if (
                            isset($fieldRules['exclusion']['exclusion'])
                        ) {
                            $this->updateRuleForJsLib();
                            if (isset($fieldRules['exclusion']['message'])) {
                                $libRules[$fieldName]['exclusion']['within'] = $fieldRules['exclusion']['exclusion'];
                                $this->addMessageForJsLib( ['exclusion'] );
                                // $libRules[$fieldName]['exclusion']['message'] = $fieldRules['exclusion']['message'];
                            } else {
                                $libRules[$fieldName]['exclusion'] = $fieldRules['exclusion']['exclusion'];
                            }
                        }
                        break;
                    case 'email':
                        if (
                            isset($fieldRules['email']['email'])
                        ) {
                            $this->updateRuleForJsLib();
                            if ($fieldRules['email']['email'] == true) {
                                $this->addMessageForJsLib( ['email'] );
                                // $libRules[$fieldName]['email'] = (isset($fieldRules['email']['message'])) ?
                                //     [ 'message' => $fieldRules['email']['message'] ] :
                                //     true;
                            } else {
                                $libRules[$fieldName]['email'] = false;
                            }
                        }
                        break;
                    case 'date':
                        if (
                            isset($fieldRules['date']['date'])
                        ) {
                            $this->updateRuleForJsLib();
                            if ($fieldRules['date']['date'] == true) {
                                // $libRules[$fieldName]['datetime']['dateOnly'] = true;
                                $libRules[$fieldName]['date']['date'] = true;
                                if (isset($fieldRules['date']['message'])) {
                                    $libRules[$fieldName]['date']['message'] = $fieldRules['date']['message'];
                                }
                                foreach (static::COMPARISON_OPERATORS as $comparison_operator) {
                                    if (isset($fieldRules['date'][$comparison_operator][$comparison_operator])) {
                                        $this->updateSubRuleForJsLib( $comparison_operator );
                                        $libRules[$fieldName]['date'][$comparison_operator] = $this->replaceForJsLib($fieldRules['date'][$comparison_operator][$comparison_operator], false);
                                    }
                                }
                            } else {
                                $libRules[$fieldName]['date'] = false;
                            }
                        }
                        break;
                    case 'time':
                        if (
                            isset($fieldRules['time']['time'])
                        ) {
                            $this->updateRuleForJsLib();
                            if ($fieldRules['time']['time'] == true) {
                                $libRules[$fieldName]['time']['time'] = true;
                                if ( !isset($fieldRules['time']['dayTime']) || $fieldRules['time']['dayTime'] ) {
                                    $libRules[$fieldName]['time']['dayTime'] = true;
                                }
                                if (isset($fieldRules['time']['message'])) {
                                    $libRules[$fieldName]['time']['message'] = $fieldRules['time']['message'];
                                }
                                foreach (static::COMPARISON_OPERATORS as $comparison_operator) {
                                    if ( isset($fieldRules['time'][$comparison_operator][$comparison_operator]) ) {
                                        $this->updateSubRuleForJsLib( $comparison_operator );
                                        $libRules[$fieldName]['time'][$comparison_operator][$comparison_operator] = $this->replaceForJsLib($fieldRules['time'][$comparison_operator][$comparison_operator], false);
                                        if (isset($fieldRules['time'][$comparison_operator]['message'])) {
                                            $libRules[$fieldName]['time'][$comparison_operator]['message'] = $fieldRules['time'][$comparison_operator]['message'];
                                        }
                                    }
                                }
                            } else {
                                $libRules[$fieldName]['time'] = false;
                            }
                        }
                        break;
                    case 'datetime':
                        if (
                            isset($fieldRules['datetime']['datetime'])
                        ) {
                            $this->updateRuleForJsLib();
                            if ($fieldRules['datetime']['datetime'] == true) {
                                foreach (static::COMPARISON_OPERATORS as $comparison_operator) {
                                    if (isset($fieldRules['datetime'][$comparison_operator][$comparison_operator])) {
                                        $this->updateSubRuleForJsLib( $comparison_operator );
                                        $libRules[$fieldName]['datetime'][$comparison_operator] = $this->replaceForJsLib($fieldRules['datetime'][$comparison_operator][$comparison_operator], false);
                                    }
                                }
                                if (empty($libRules[$fieldName]['datetime'])) {
                                    $libRules[$fieldName]['datetime'] = true;
                                }
                                $this->addMessageForJsLib( ['datetime'] );
                            } else {
                                $libRules[$fieldName]['datetime'] = false;
                            }
                        }
                        break;
                    case '>':
                    case '>=':
                    case '<=':
                    case '<':
                        if (
                            isset($fieldRules['type']['type']) &&
                            ((
                                (gettype($fieldRules['type']['type']) === 'string') &&
                                (
                                    ($fieldRules['type']['type'] === 'integer') ||
                                    ($fieldRules['type']['type'] === 'float')
                                )
                            ) ||
                            (
                                (gettype($fieldRules['type']['type']) === 'array') &&
                                in_array($fieldRules['type']['type'], ['integer', 'float'])
                            ))
                        ) {
                            $this->updateRuleForJsLib();
                            // these rules not exists in validateJS :
                            $libRules[$fieldName][$ruleName] = $fieldRules[$ruleName][$ruleName];
                            $this->addMessageForJsLib( [$ruleName] );
                        }
                }
            }
            // add the field message
            $fieldMessage = $fieldRules['message']['message'] ?? $fieldRules['message'] ?? null;
            $fieldImportantMessage = $fieldRules['message!']['message!'] ?? $fieldRules['message!'] ?? null;
            if ($fieldMessage !== null) {
                $libRules[$fieldName]['message'] = $fieldMessage;
            }
            if ($fieldImportantMessage !== null) {
                $libRules[$fieldName]['message!'] = $fieldImportantMessage;
            }
        }
        if ($secureIt) {
            arr_secure($libRules);
        }
        return $libRules;
    }

    /**
     * Replace strings with their expected value (to generate the message to send back to the user)
     * 
     * @param string $str The source text, in which are the strings to replace
     * @param bool $isRender If true, the result will not be used to store data but to display info :
     * dates can be displayed in the user's preferred format.
     * 
     * @return string The text with the replacements made
     */
    public function replaceForJsLib (string $str, $isRender = true)
    {
        $isForJsLib = true;
        $aStrToReplace = $this->getReplacements($str);
        if ($aStrToReplace == null) {
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
            if (count($strGroups) > 1) {
                $lowerGroup0 = strtolower($strGroups[0]);
                $lowerGroup1 = strtolower($strGroups[1] ?? '');
                // if more than 1 group
                if ($isForJsLib) {
                    // if it's to generate validateJS config
                    switch ($lowerGroup0) {
                        case 'value':
                            $replacements[$strToReplace] = (static::strBeforeReplacementForJsLib() . $strGroups[1] . static::strAfterReplacementForJsLib());
                            break;
                        case 'rule':
                            $replacements[$strToReplace] = (static::strBeforeReplacementForJsLib() . 'rule' . static::strAfterReplacementForJsLib());
                            break;
                        case 'expected':
                            $replacements[$strToReplace] = (static::strBeforeReplacementForJsLib() . 'expected' . static::strAfterReplacementForJsLib());
                    }
                } else {
                    // TODO : delete $isForJsLib and this part
                    switch ($lowerGroup0) {
                        case 'value':
                            $fieldName = $strGroups[1];
                            $fieldValue = $this->getValue($fieldName);
                            if ($isRender) {
                                $fieldValue = $this->getRenderValue($fieldValue, $fieldName);
                            }
                            $replacements[$strToReplace] = ($fieldValue ?? '---ERR---');
                            break;
                        case 'rule':
                            // todo : $strGroups[1]
                            $fieldRuleValue = $this->getFieldRuleValue(null, $strGroups[1]);
                            $replacements[$strToReplace] = ($fieldRuleValue ?? '---ERR---');
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
     * @return string Right replacement delimiter : "}" in the JS library.
     */
    public static function strAfterReplacementForJsLib ()
    {
        return '}}';
    }

    /**
     * @return string Left replacement delimiter : "}" in the JS library.
     */
    public static function strBeforeReplacementForJsLib ()
    {
        return '{{';
    }

    /**
     * Updates the rule (name & value & array)
     * 
     * @param string|null $ruleName The rule name
     * @param array|null &$ruleArray The rule array
     */
    public function updateRuleForJsLib (?string $ruleName = null, ?array &$ruleArray = null)
    {
        if ($ruleName == null) {
            $ruleName =& $this->fieldRuleName;
        } else {
            $this->fieldRuleName = $ruleName;
        }
        if ($ruleArray == null) {
            $this->fieldRuleArray =& $this->fieldRules[$ruleName];
        } else {
            $this->fieldRuleArray =& $ruleArray;
        }
        $this->fieldRuleValue =& $this->fieldRuleArray[$ruleName];
        // clear old sub-rule info
        $this->fieldSubRule1 = null;
        $this->fieldSubRule1Array = null;
        $this->fieldSubRule1Value = null;
    }

    /**
     * Updates the rule (name & value & array)
     * 
     * @param string|null $ruleName The rule name
     * @param array|null &$subRuleArray The rule array
     */
    public function updateSubRuleForJsLib (?string $subRuleName = null, ?array &$subRuleArray = null)
    {
        if ($subRuleName == null) {
            $subRuleName =& $this->fieldSubRule1;
        } else {
            $this->fieldSubRule1 = $subRuleName;
        }
        if ($subRuleArray == null) {
            $this->fieldSubRule1Array =& $this->fieldRuleArray[$subRuleName];
        } else {
            $this->fieldSubRule1Array =& $subRuleArray;
        }
        $this->fieldSubRule1Value =& $this->fieldSubRule1Array[$subRuleName];
    }
    
}