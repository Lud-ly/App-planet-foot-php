
/**
 * Contains methods used for input control (front-end + back-end checks)
 * 
 * @requires :
 *    • moment.js
 *    • utils.js
 *    • trait.easy_config.php
 *    • trait.input_control.validate_js_lib.php
 *    • patterns.php
 * 
 * Works on the framework developed by Jean-Jacques Pagan #Jijou
 * 
 * @author Damien Grember <dgrember@gmail.com> <06.32.99.33.86> France, Herault 34
 * I thank my trainers as well as my colleagues :)
 * @copyright Free use for Afpanier project
 * @version 1.11
 */
class InputControl {

    // ◘ class properties
    /**
     * @property {boolean} areValidatorsAdded Are the validateJS validators and messages already setted ?
     */
    static areValidatorsAdded = false;

    /**
     * @property { string[] } comparisonOperators Comparison operators
     */
    static comparisonOperators = ['<', '<=', '===', '==', '!==', '!=', '>=', '>'];

    static defaultConfig = {
        'ajax_url':                             'route.php',
        'ajax_param1__name':                    'inputControl-action',
        'ajax_param2__name':                    'inputControl-formName',
        'ajax_param3__name':                    'inputControl-issuer',
        'ajax_param1__value__config_response':  'getConfig',
        'ajax_param1__value__rules_response':   'getRules',
        'ajax_param3__value':                   'validateJS',
        'createHiddenFieldIfMissing':           true,
        'ifMissingForm__throwError':            false,
        'ifMissingForm__getRules':              true,
        'ifMissingForm__logError':              true,
        'form_class':                           'ic-form',
        'form_name_attr':                       'name',
        // 'forms_selector':                       '.ic-form[name]',                // auto-generated
        // 'form_selector':                        '.ic-form[name="{{formName}}"]', // auto-generated
        'field_class':                          'ic-field',                         // auto-generated
        'field_name_attr':                      'name',                             // auto-generated
        // 'fields_selector':                      '.ic-field[name]',               // auto-generated
        'global_options':                       {
            /**
             * @property {string} format The result format, among:
             *  - 'grouped'
             *  - 'flat'
             *  - 'detailed'
             */
            format: 'detailed',
            /**
             * @property {boolean} stopAfterFirstInvalidity If true, a result will be returned as an invalidity occured in a rule check.
             */
            stopAfterFirstInvalidity: true
        },
        'invalid_message_class':                'invalid_message',
    };

    /**
     * @property {JSON} info rule, subRule, value (fieldValue), options (ruleOptions), key (fieldName), attributes (fieldsValues), globalOptions, expected (expected value : rule option value)
     */
    static info = {};

    /**
     * @property { object[] } instances All instances
     */
    static instances = [];

    // ◘ instance properties
    /**
     * @property {boolean} areRulesSetted Are the fields rules already setted ?
     */
    areRulesSetted = false;

    /**
     * Config
     */
    config = {};

    /**
     * @property {string[]} fieldsName The fields name
     */
    fieldsName = [];

    /**
     * @property {JSON} fieldsRules The fields rules
     */
    fieldsRules = {};

    /**
     * @property {JSON} fieldsValue The fields value
     */
    fieldsValue = {};

    /**
     * @property {JSON} fieldsValueOnInit The fields value on init
     */
    fieldsValueOnInit = {};

    /**
     * @property {?string} fieldName The field name
     */
    fieldName;

    /**
     * @property {?Object} $field The field input (jQuery object)
     */
    $field;

    /**
     * @property {?string} fieldValue The field value
     */
    fieldValue;

    /**
      * @property {?string} fieldIsValid The field validity (true if the field value is valid)
      */
    fieldIsValid;

    /**
      * @property {?string} fieldMessage The field invalidity message
      */
    fieldMessage;

    /**
     * @property {?string} formName The form name.
     */
    formName;

    /**
      * @property {json} invalidFields All invalid fields (in keys)
      */
    invalidFields = {};

    /**
      * @property {?boolean} isFormValid Is the form valid ?
      */
    isFormValid;

    /**
     * @property {JSON|array} ruleResult Rule result
     */
    ruleResult;

    /**
      * @property {?json} validateJsResult The validate JS result (detailed)
      */
    validateJsResult;

    /**
      * @property {json} validFields All valid fields (in keys)
      */
    validFields = {};

    // ◘ constructor
    /**
     * @param {string} formName The form name (eg: 'addPromo')
     * @param {JSON} fieldsRules The fields rules
     * @param {?JSON} config The config (if not supplied, take account the php config)
     * 
     * @todo config merge
     */
    constructor (formName = 'myForm', fieldsRules = {}, config = null)
    {
        let oThis = this;
        // save the form name
        this.formName = formName;
        InputControl.info.formName = formName;
        generateFormAndFieldsSelectors();

        // check if the form is defined
        if (this.form() == null) {
            if (this.getConfig('ifMissingForm__logError')) {
                console.log(`InputControl : missing "${this.formName}" form`)
            }
            if (!this.getConfig('ifMissingForm__getRules')) {
                return;
            }
        }
        // are fields rules supplied ?
        if (Object.keys(fieldsRules).length > 0) {
            // yes : save them
            this.fieldsRules = fieldsRules;
            oThis.areRulesSetted = true;
        } else {
            // no : save them from php
            this.fieldsRules = this.getRules();
        }
        if (isEmpty(this.fieldsRules)) {
            console.log(`InputControl : missing rules for "${this.formName}"`)
            return;
        }
        // extract fields names
        this.fieldsName = Object.keys(this.fieldsRules);

        // push the instance
        InputControl.instances.push(this);
        // is config supplied ?
        if ( isEmpty(config) ) {
            // no : save it from php
            Object.assign(this.config, this.getConfigFromPhp());
        } else {
            // yes : save it
            Object.assign(this.config, config);
        }

        InputControl.addCustomizedMessages();

        if (!InputControl.areValidatorsAdded) {
            // add customized validators / messages
            InputControl.addCustomizedValidators();
            
            // before using it we must add the parse and format functions
            // Here is a sample implementation using moment.js
            validate.extend(validate.validators.datetime, {
                // the value is guaranteed not to be null or undefined but otherwise it
                // could be anything.
                parse: function(value, options) {
                    return +moment.utc(value);
                },
                // input is a unix timestamp
                format: function(value, options) {
                    let format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
                    return moment.utc(value).format(format);
                }
            });
            InputControl.areValidatorsAdded = true;
        }

        // listen all fields to perform front-end data entry control
        this.listenFields();

        this.initChanges();
        /**
         * Generates form / fields selectors
         */
        function generateFormAndFieldsSelectors()
        {
            // form
            let sClass = oThis.getConfig('form_class');
            let sNameAttr = oThis.getConfig('form_name_attr');
            oThis.config.forms_selector = `.${sClass}[${sNameAttr}]`;
            oThis.config.form_selector = `.${sClass}[${sNameAttr}="${oThis.formName}"]`;
            // field
            sClass = oThis.getConfig('field_class');
            sNameAttr = oThis.getConfig('field_name_attr');
            oThis.config.fields_selector = `.${sClass}[${sNameAttr}]`;
        }
    }

    // ◘ class methods
    /**
     * Add customized validators messages
     */
    static addCustomizedMessages(instance = null) {
        if (instance == null) {
            instance = InputControl.getInstance();
        }
        let messages = instance.config.default_messages;
        let customizedMessagesRules = ['type', 'allowEmpty', 'format', 'pattern', 'minlength', 'maxlength', 'inclusion', 'exclusion', 'email', 'tel', 'time']
        // validate.validators.type.options = {message: '^' + valOr( messages, ['type'] )};
    }

    /**
     * Add customized validators
     */
    static addCustomizedValidators()
    {
        // type
        validate.validators.type = function(value, options, key, attributes, globalOptions) {
            if (typeof(options) !== 'object') {
                let tmp = options;
                options = {};
                options.type = tmp;
            }
            if (options.strict === undefined) {
                options.strict = false;
            }
            let cmpValue = valOr(options,['type']) ?? options;
            let isValid;
            InputControl.updateInfo(
                {
                    'rule': 'type',
                    'subRule': null,
                    'fieldValue': value,
                    'fieldRules': options,
                    'fieldName': key,
                    'fieldsValue': attributes,
                    'globalOptions': globalOptions
                }
            );
            switch (cmpValue) {
                case 'bool':
                case 'boolean':
                    let aPossibleValues = [true, false];
                    if (!options.strict) {
                        aPossibleValues.push('true','false','0','1', 0, 1);
                    }
                    isValid = aPossibleValues.contains(value);
                    break;
                case 'str':
                case 'string':
                    isValid = ( typeof(value) === 'string' );
                    break;
                case 'arr':
                case 'array':
                    isValid = Array.isArray(value);
                    break;
                case 'json':
                    // todo
                    isValid = (
                        (typeof(value) === 'object') &&
                        !Array.isArray(value)
                    );
                    break;
                default:
                    isValid = ( typeof(value) === cmpValue );
            }
            if (!isValid) {
                return InputControl.generateErrorMessage();
            }
        };
        // COMPARISON OPERATORS
        // >=
        validate.validators['>='] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['>=']) ?? options;
            let isValid = ( value >= cmpValue );
            if (!isValid) {
                InputControl.updateInfo(
                    {
                        'rule': '>=',
                        'subRule': null,
                        'fieldValue': value,
                        'fieldRules': options,
                        'fieldName': key,
                        'fieldsValue': attributes,
                        'globalOptions': globalOptions
                    }
                );
                return InputControl.generateErrorMessage();
            }
        };
        // >
        validate.validators['>'] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['>']) ?? options;
            let isValid = ( value > cmpValue );
            if (!isValid) {
                InputControl.updateInfo(
                    {
                        'rule': '>',
                        'subRule': null,
                        'fieldValue': value,
                        'fieldRules': options,
                        'fieldName': key,
                        'fieldsValue': attributes,
                        'globalOptions': globalOptions
                    }
                );
                return InputControl.generateErrorMessage();
            }
        };
        // <=
        validate.validators['<='] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['<=']) ?? options;
            let isValid = ( value <= cmpValue );
            if (!isValid) {
                InputControl.updateInfo(
                    {
                        'rule': '<=',
                        'subRule': null,
                        'fieldValue': value,
                        'fieldRules': options,
                        'fieldName': key,
                        'fieldsValue': attributes,
                        'globalOptions': globalOptions
                    }
                );
                return InputControl.generateErrorMessage();
            }
        };
        // <
        validate.validators['<'] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['<']) ?? options;
            let isValid = ( value < cmpValue );
            if (!isValid) {
                InputControl.updateInfo(
                    {
                        'rule': '<',
                        'subRule': null,
                        'fieldValue': value,
                        'fieldRules': options,
                        'fieldName': key,
                        'fieldsValue': attributes,
                        'globalOptions': globalOptions
                    }
                );
                return InputControl.generateErrorMessage();
            }
        };
        // !==
        validate.validators['!=='] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['!==']) ?? options;
            let isValid = ( value !== cmpValue );
            if (!isValid) {
                InputControl.updateInfo(
                    {
                        'rule': '!==',
                        'subRule': null,
                        'fieldValue': value,
                        'fieldRules': options,
                        'fieldName': key,
                        'fieldsValue': attributes,
                        'globalOptions': globalOptions
                    }
                );
                return InputControl.generateErrorMessage();
            }
        };
        // !=
        validate.validators['!='] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['!=']) ?? options;
            let isValid = ( value != cmpValue );
            if (!isValid) {
                InputControl.updateInfo(
                    {
                        'rule': '!=',
                        'subRule': null,
                        'fieldValue': value,
                        'fieldRules': options,
                        'fieldName': key,
                        'fieldsValue': attributes,
                        'globalOptions': globalOptions
                    }
                );
                return InputControl.generateErrorMessage();
            }
        };
        // numeric
        validate.validators['numeric'] = function(value, options, key, attributes, globalOptions) {
            let testResult, isValid;
            if (options == true) {
                options = {
                    numeric:    true
                };
            }
            let aSubrules = Object.keys(options);
            let iSubrules = aSubrules.length;
            let sSubRule;
            // is the value numeric ?
            InputControl.updateInfo(
                {
                    'rule': 'numeric',
                    'subRule': null,
                    'fieldValue': value,
                    'fieldRules': options,
                    'fieldName': key,
                    'fieldsValue': attributes,
                    'globalOptions': globalOptions
                }
            );
            isValid = !isNaN(value);
            if (!isValid) {
                return InputControl.generateErrorMessage();
            }
            // is the value an integer ?
            if ( valOr(options,['onlyInteger']) ) {
                InputControl.updateInfo(
                    {
                        'subRule': 'onlyInteger',
                    }
                );
                isValid = Number.isInteger(+value);
                if (!isValid) {
                    return InputControl.generateErrorMessage();
                }
            }
            let jRules;
            for (let i = 0; i < iSubrules; i++) {
                sSubRule = aSubrules[i];
                if (!InputControl.comparisonOperators.contains(sSubRule)) {
                    continue;
                }
                InputControl.updateInfo(
                    {
                        'subRule': sSubRule,
                    }
                );
                jRules = {};
                jRules[sSubRule] = {};
                jRules[sSubRule][sSubRule] = options[sSubRule];
                InputControl.addMessage(jRules[sSubRule]);
                testResult =  validate.single(
                    +value,
                    jRules
                );
                isValid = (testResult === undefined);
                if (!isValid) {
                    return InputControl.generateErrorMessage();
                }
            }
        };
        // DATE
        validate.validators['date'] = function(value, options, key, attributes, globalOptions) {
            let validateResult, isValid, expectedValue, operator, obj;
            let instance = InputControl.getInstance();
            instance.initRuleResult('date', ...arguments);
            isValid = (
                (new Date(value).toString() !== 'Invalid Date') &&
                (/^\d{4}-\d{2}-\d{2}$/.test(value))
            );
            InputControl.updateInfo(
                {
                    'rule': 'date',
                    'subRule': null,
                    'fieldValue': value,
                    'fieldRules': options,
                    'fieldName': key,
                    'fieldsValue': attributes,
                    'globalOptions': globalOptions
                }
            );
            if (!isValid) {
                return InputControl.generateErrorMessage();
            }
            // DATE {{COMPARISON_OPERATORS}}
            let iCount = InputControl.comparisonOperators.length;
            for (let i = 0; i < iCount; i++) {
                operator = InputControl.comparisonOperators[i];
                expectedValue = valOr(options,[operator]);
                if (expectedValue !== undefined) {
                    InputControl.updateInfo(
                        {
                            'subRule': operator
                        }
                    );
                    obj = {};
                    obj[operator] = {};
                    obj[operator][operator] = InputControl.info.expectedValue;
                    InputControl.addMessage(obj);
                    validateResult = validate.single(
                        value,
                        obj
                    );
                    isValid = ( validateResult === undefined );
                    if (!isValid) {
                        return InputControl.generateErrorMessage();
                    }
                }
            }
            return;
        };
        // PATTERN
        validate.validators['pattern'] = function(value, options, key, attributes, globalOptions) {
            let instance = InputControl.getInstance();
            instance.initRuleResult('pattern', ...arguments);
            let matches = options.pattern.exec(value);
            if (matches == null) {
                return  '^' + (
                        valOr(options, ['message!']) ??
                        valOr(options, ['message']) ??
                        'Le format ne correspond pas'
                );
            }
            if (matches.groups == null) {
                return;
            }
            // add groups value to the supplied options
            options.groupsValue = matches.groups;
            let groupsName = Object.keys(matches.groups);
            let groupsCount = groupsName.length;
            let groupName, groupValue, groupRules, validateResult;
            let oValue = {}, oRules = {};
            for (let i = 0; i < groupsCount; i++) {
                groupName = groupsName[i];
                groupValue = matches.groups[groupName];
                if (groupValue === undefined) {
                    continue;
                }
                groupRules = valOr(options, ['groups',groupName]);
                if (groupRules === undefined) {
                    continue;
                }
                oValue[groupName] = groupValue;
                oRules[groupName] = groupRules;
                validateResult = validate(
                    oValue,
                    oRules,
                    {format: 'flat'}
                );
                if (validateResult !== undefined) {
                    // INVALID : the group not respects the rules
                    return  '^' + (
                            valOr(options, ['message!']) ??
                            valOr(options, ['message']) ??
                            // valOr(groupRules, ['message']) ??
                            valOr(validateResult, ['0']) ??
                            'Le format ne correspond pas'
                    );
                }
            }
        };
        // TIME
        validate.validators['time'] = function(value, options = {dayTime: true}, key, attributes, globalOptions) {
            let isTimeValueResult, oRulesValueResult = {}, oGroupsValueResult, newTimeValue
            let isTimeCmpValueResult, oRulesCmpValueResult = {}, oGroupsCmpValueResult, newTimeCmpValue
            let isValid, expectedValue, operator, isValidResult;
            let groups, oValue = {}, oRules = {};
            let instance = InputControl.getInstance();
            instance.initRuleResult('time', ...arguments);
            if (typeof(options) !== 'object') {
                options = {};
            }
            if (options.dayTime === undefined) {
                options.dayTime = false;
            }
            groups = {
                time_hh: {
                    numericality: {
                        onlyInteger: true,
                        greaterThanOrEqualTo: 0,
                        lessThanOrEqualTo: 23,     // 838 if !dayTime
                        message: '^L\'heure doit être comprise entre 0 et 23' // or 838
                    }
                },
                time_mm: {
                    numericality: {
                        onlyInteger: true,
                        greaterThanOrEqualTo: 0,
                        lessThanOrEqualTo: 59,
                        message: '^Les minutes doivent être comprises entre 0 et 59'
                    }
                },
                time_ss: {
                    numericality: {
                        onlyInteger: true,
                        greaterThanOrEqualTo: 0,
                        lessThanOrEqualTo: 59,
                        message: '^Les secondes doivent être comprises entre 0 et 59'
                    }
                },
                time_ms: {
                    numericality: {
                        onlyInteger: true
                    }
                }
            };
            isTimeValueResult = getValidateResult(value, oRulesValueResult);
            if (isTimeValueResult !== undefined) {
                // INVALID
                InputControl.updateInfo(
                    {
                        'rule': 'time',
                        'subRule': null,
                        'fieldValue': value,
                        'fieldRules': options,
                        'fieldName': key,
                        'fieldsValue': attributes,
                        'globalOptions': globalOptions
                    }
                );
                return  '^' + (
                        valOr(options, ['message!']) ??
                        valOr(options, ['message']) ??
                        // valOr(groupRules, ['message']) ??
                        valOr(isTimeValueResult, ['0']) ??
                        "L'heure n'est pas valide"
                );
            }
            oGroupsValueResult = oRulesValueResult[key].pattern.groupsValue;
            newTimeValue = formatTime(oGroupsValueResult.time_hh ?? 0, oGroupsValueResult.time_mm ?? 0, oGroupsValueResult.time_ss ?? 0, oGroupsValueResult.time_ms ?? 0);

            // TIME {{COMPARISON_OPERATORS}}
            let iCount = InputControl.comparisonOperators.length;
            let obj;
            for (let i = 0; i < iCount; i++) {
                operator = InputControl.comparisonOperators[i];
                expectedValue = valOr(options,[operator,operator]);
                if (expectedValue !== undefined) {
                    InputControl.updateInfo(
                        {
                            'rule': 'time',
                            'subRule': null,
                            'fieldValue': value,
                            'fieldRules': options,
                            'fieldName': key,
                            'fieldsValue': attributes,
                            'globalOptions': globalOptions
                        }
                    );
                    isTimeCmpValueResult = getValidateResult(expectedValue, oRulesCmpValueResult);
                    if (isTimeCmpValueResult !== undefined) {
                        // INVALID (if the cmp value is not a time)
                        return  '^' + (
                                valOr(options, ['message!']) ??
                                valOr(options, ['message']) ??
                                // valOr(groupRules, ['message']) ??
                                valOr(isTimeCmpValueResult, ['0']) ??
                                "L'heure n'est pas valide"
                        );
                    }
                    // updates info (comparison operator..)
                    InputControl.updateInfo(
                        {
                            'subRule': operator
                        }
                    );
                    oGroupsCmpValueResult = oRulesCmpValueResult[key].pattern.groupsValue;
                    newTimeCmpValue = formatTime(oGroupsCmpValueResult.time_hh ?? 0, oGroupsCmpValueResult.time_mm ?? 0, oGroupsCmpValueResult.time_ss ?? 0, oGroupsCmpValueResult.time_ms ?? 0);
                    obj = {};
                    obj[operator] = newTimeCmpValue;
                    isValidResult = validate.single(
                        newTimeValue,
                        obj
                    );
                    isValid = ( isValidResult === undefined );
                    if (!isValid) {
                        return InputControl.generateErrorMessage();
                    }
                }
            }
            /**
             * Format a time to allow comparisons
             * 
             * @param {string|int} time_hh Hour
             * @param {string|int} time_mm Minutes
             * @param {string|int} time_ss Seconds
             * @param {string|int} time_ms Fractional seconds
             * 
             * @returns {string}
             */
            function formatTime(time_hh = 0, time_mm = 0, time_ss = 0, time_ms = 0)
            {
                let sizes = {
                    time_hh: 3,
                    time_mm: 2,
                    time_ss: 2,
                    time_ms: 6
                }
                let values = {};
                let names, name, size, value, valueSize;
                names = Object.keys(sizes);
                for (let i = 0; i < names.length; i++) {
                    name = names[i];
                    size = sizes[name];
                    value = ('' + arguments[i]);
                    valueSize = value.length;
                    values[name] = ('0'.repeat(size - valueSize) + value);
                }
                return (values.time_hh + ':' + values.time_mm + ':' + values.time_ss + '.' + values.time_ms);
            }
            /**
             * Constructs and returns a validateJs result about time checkin (with pattern)
             * 
             * @param {string} value The time to check
             * @returns {JSON} oRules The rules (pattern groups will be added)
             */
            function getValidateResult(value, oRules)
            {
                let validateResult, oValue = {};
                oValue[key] = value;
                oRules[key] = {};
                oRules[key].pattern = {};
                if (options.dayTime) {
                    oRules[key].pattern.pattern = /^(?<time_hh>\d{1,2}):(?<time_mm>\d{1,2})(?::(?<time_ss>\d{1,2}))?(?:\.(?<time_ms>\d{1,6}))?$/;
                } else {
                    groups.time_hh.numericality.lessThanOrEqualTo = 838;
                    groups.time_hh.numericality.message = '^L\'heure doit être comprise entre -838 et 838';
                    oRules[key].pattern.pattern = /^(?<neg>-)?(?<time_hh>\d{1,3}):(?<time_mm>\d{1,2})(?::(?<time_ss>\d{1,2}))?(?:\.(?<time_ms>\d{1,6}))?$/;
                }
                oRules[key].pattern.groups = groups;
                validateResult = validate(
                    oValue,
                    oRules,
                    {format: 'flat'}
                );
                return validateResult;
            }
        };
    }

    /**
     * If no message is present among the rules provided,
     * add the default message that corresponds to the rule
     * and the sub-rule defined in info
     * 
     * @param {JSON} jfieldRules The field rules
     */
    static addMessage(jfieldRules)
    {
        let instance = InputControl.getInstance();
        let defaultMessages = instance.config.default_messages;
        let rule = InputControl.info.rule;
        let libRule = InputControl.info.libRule;
        let subRule = InputControl.info.subRule;
        let libSubRule = InputControl.info.libSubRule;
        let jRules;
        if ( jsonValOr(jfieldRules,[subRule]) ) {
            jRules = jfieldRules[subRule];
        } else if ( jsonValOr(jfieldRules,[libSubRule]) ) {
            jRules = jfieldRules[libSubRule];
        } else if ( typeof(jfieldRules) === 'object' ) {
            jRules = jfieldRules;
        }
        if (jRules.message === undefined) {
            jRules.message = strValOr( defaultMessages, [libRule,libRule+'.'+libSubRule] ) ??
                             strValOr( defaultMessages, [rule,rule+'.'+subRule] );
        }
    }

    /**
     * Collects values
     * 
     * @param {string|HTMLElement|object} container The HTML element in which to look for the values. Default: 'body'.
     * @param {string|HTMLElement|object} target Selector | DOM element | jQuery object. Default: '.ic-field'.
     * Default: '[data-field]'.
     * @param {string} fieldNameAttr The attribute name which contains the field name. Default: 'name'.
     * @param {boolean} hiddenFields If true, all hidden fields value will be recovered. Default: true.
     * 
     * @returns 
     */
    static collectValues(container = 'body', target = '.ic-field', fieldNameAttr = 'name', hiddenFields = true)
    {
        let sFieldName, jFieldsValue = {};
        $(target, container).each(function() {
            if (
                ( typeof(fieldNameAttr) === 'string' ) &&
                (
                    !$(this).hasAttr('data-ignored') ||
                    ['false','0'].includes( $(this).attr('data-ignored') )
                ) &&
                (
                    hiddenFields ||
                    ($(this).attr('type') !== 'hidden')
                )
            ) {
                sFieldName = $(this).attr(fieldNameAttr);
                jFieldsValue[sFieldName] = $(this).value();
            }
        })
        return jFieldsValue;
    }

    /**
     * Generate and returns the error message
     * 
     * @param {boolean} prependField If true, the field name (beautified) will be prepended to the message.
     * 
     * @returns {string}
     */
    static generateErrorMessage(prependField = true)
    {
        let instance = InputControl.getInstance();
        let rule = InputControl.info.rule;
        let libRule = InputControl.info.libRule;
        let subRule = InputControl.info.subRule;
        let libSubRule = InputControl.info.libSubRule;
        let value = InputControl.info.value;
        let options = InputControl.info.options;
        let fieldName = InputControl.info.key;
        let fieldRules = InputControl.info.globalOptions[fieldName];
        let attributes = InputControl.info.attributes;
        let defaultMessages = instance.config.default_messages;
        let message, expectedValue;
        let vipMessageParam = instance.getConfig('prioritary_message_param');
        let messageParam = 'message';

        // EXPECTED VALUE
        expectedValue =
            // valOr( InputControl.info, ['expectedValue'] ) ??
            valOr( options, [rule,subRule,subRule] ) ??
            valOr( options, [libRule,libSubRule,libSubRule] ) ??
            valOr( options, [rule,subRule] ) ??
            valOr( options, [libRule,libSubRule] ) ??
            valOr( options, [subRule] ) ??
            valOr( options, [libSubRule] ) ??
            valOr( options, [rule,rule] ) ??
            valOr( options, [libRule,libRule] ) ??
            valOr( options, [rule] ) ??
            valOr( options, [libRule] ) ??
            'options';
        expectedValue = getRenderizedValue(expectedValue);
        // MESSAGE
        message = 
            strValOr( options, [subRule,messageParam] ) ??
            strValOr( options, [libSubRule,messageParam] ) ??
            strValOr( fieldRules, [vipMessageParam] ) ??
            strValOr( defaultMessages, [libRule,libRule+'.'+libSubRule] ) ??
            strValOr( defaultMessages, [rule,rule+'.'+subRule] ) ??
            strValOr( options, [messageParam] ) ??
            strValOr( fieldRules, [messageParam] ) ??
            strValOr( defaultMessages, [rule,rule] ) ??
            strValOr( defaultMessages, [libRule,libRule] ) ??
            strValOr( defaultMessages, [rule] ) ??
            strValOr( defaultMessages, [libRule] ) ??
            instance.getConfig('message') ??
            'Donnée invalide';
        let newMessage = message;
        let strBefore = instance.getConfig('str_before_replacement');
        let strAfter = instance.getConfig('str_after_replacement');
        // expected
        if (typeof(expectedValue) !== 'string') {
            expectedValue = JSON.stringify(expectedValue);
        }
        newMessage = newMessage.replace(
            strBefore + 'expected' + strAfter,
            expectedValue
        );
        // value
        if (typeof(value) !== 'string') {
            value = JSON.stringify(value);
        }
        newMessage = newMessage.replace(
            strBefore + 'value' + strAfter,
            value
        );
        // field
        newMessage = newMessage.replace(
            strBefore + 'field' + strAfter,
            fieldName
        );
        if ( !prependField ) {
            newMessage = '^' + newMessage;
        }
        return newMessage;
        /**
         * Generates the value formated for a render display
         * and returns it (or initial value on failure)
         * 
         * @param {string} value The source value
         * 
         * @returns {string}
         */
        function getRenderizedValue(value)
        {
            let newValue;
            // YYYY-MM-DD to JJ/MM/AAAA
            if (
                (/\d{2,4}-\d{1,2}-\d{1,2}/.test(value)) &&
                (validate.single(
                    value,
                    {
                        datetime: {
                            dateOnly:   true
                        }
                    }
                ) === undefined)
            ) {
                newValue = moment(value).format("DD/MM/YYYY")
                if (newValue === 'Invalid date') {
                    newValue = null;
                }
            }
            // returns result or initial value
            if (typeof(newValue) === 'string') {
                return newValue;
            } else {
                return value;
            }
        }
    }

    /**
     * Generate and returns the error result
     * 
     * @param {string} rule Rule (defined in PHP)
     * @param {string|null} subRule Sub-rule (defined in PHP)
     * @param {*} value Field value
     * @param {*} options Fields rules (transformed php rules to validateJs rules)
     * @param {string} key Field name
     * @param {*} attributes Fields values
     * @param {object|null} instance The instance (if null, take account of the last instance)
     * @param {boolean} prependField If true, the field name (beautified) will be prepended to the message.
     * 
     * @returns {string}
     */
    static generateErrorResult(subRule = null, prependField = false)
    {
        let instance = InputControl.getInstance();
        let rule = InputControl.info.rule;
        let value = InputControl.info.value;
        let options = InputControl.info.options;
        let key = InputControl.info.key;
        let attributes = InputControl.info.attributes;
        let globalOptions = instance.getConfig('global_options');
        let message = InputControl.generateErrorMessage(rule, subRule, value, options, key, attributes);
        let result;
        switch (globalOptions.format) {
            case 'grouped':
            case 'flat':
                return message;
            case 'detailed':
                result = {};
                result.attribute = key
                result.attributes = attributes
                result.error = message;
                result.globalOptions = globalOptions;
                result.options = options;
                result.validator = rule;
                result.value = value;
                result.subRule = subRule;
                result.rule = rule;
                return result;
        }
    }

    /**
     * Returns the default config param value
     * 
     * @param {string} paramName The parameter name
     *  
     * @returns {*|null} Null on failure
     */
    static getConfig(paramName)
    {
        return InputControl.defaultConfig[paramName] ?? null;
    }

    /**
     * Returns the type of error from the validateJs default message
     * 
     * @param {string} message The validateJs default error message
     * 
     * @returns {JSON}
     */
    static getInfoFromMessage(message, analyseOtherInfo = true)
    {
        let patterns = {
            presence:       /^(?<field>.+) can't be blank$/,
            type:           /^(?<field>.+) must be of (?:type (?<expected>\w+)|the correct type)$/,
            length:         /^(?<field>.+) is (?<detail>too short|too long|the wrong length) \((?:minimum is|maximum is|should be) (?<expected>\d+) characters\)$/,
            format:         /^(?<field>.+) is invalid$/,
            numericality:   /^(?<field>.+) must be (?<detail>a valid number|an integer|greater than or equal to|greater than|less than or equal to|less than|equal to|divisible by|odd|even)(?: (?<expected>-?\d.*))?$/,
            email:          /^(?<field>.+) is not a valid email$/,
            exclusion:      /^(?<value>.+) is restricted$/,
            inclusion:      /^(?<value>.+) is not included in the list$/,
            url:            /^(?<field>.+) is not a valid url$/,
            equality:       /^(?<field>.+) is not equal to (?<field_2>.+)$/
        }
        let patternsNames = Object.keys(patterns);
        let patternsCount = patternsNames.length;
        let patternName, matches;
        let oResult = {};
        for (let i = 0; i < patternsCount; i++) {
            patternName = patternsNames[i];
            matches = patterns[patternName].exec(message);
            if (matches == null) {
                continue;
            }
            switch (patternName) {
                case 'presence':
                    oResult.libRule = 'presence';
                    if (
                        (InputControl.info.value !== null) &&
                        (InputControl.info.value !== undefined)
                    ) {
                        oResult.rule = 'allowEmpty';
                        oResult.libSubRule = 'allowEmpty';
                    } else {
                        oResult.rule = 'required';
                    }
                    return getResult();
                case 'type':
                    oResult.libRule = 'type';
                    oResult.rule = 'type';
                    return getResult();
                case 'email':
                    oResult.libRule = 'email';
                    oResult.rule = 'email';
                    return getResult();
                case 'format':
                    oResult.libRule = 'format';
                    oResult.libSubRule = 'pattern';
                    oResult.rule = 'pattern';
                    return getResult();
                case 'length':
                    oResult.libRule = 'length';
                    switch (matches.groups['detail']) {
                        case 'the wrong length':
                            oResult.libSubRule = 'is';
                            oResult.rule = '=='; // todo
                            break;
                        case 'too short':
                            oResult.libSubRule = 'minimum';
                            oResult.rule = 'minlength';
                            // oResult.subRule = '>='; // todo
                            break;
                        case 'too long':
                            oResult.libSubRule = 'maximum';
                            oResult.rule = 'maxlength';
                            break;
                    }
                    return getResult();
                case 'inclusion':
                    oResult.libRule = 'inclusion';
                    oResult.rule = 'inclusion';
                    return getResult();
                case 'exclusion':
                    oResult.libRule = 'exclusion';
                    oResult.rule = 'exclusion';
                    return getResult();
                case 'numericality':
                    oResult.libRule = 'numericality';
                    oResult.rule = 'numeric';
                    switch (matches.groups['detail']) {
                        case 'a valid number':
                            oResult.libSubRule = 'strict';
                            oResult.subRule = 'strict'; // todo
                            break;
                        case 'an integer':
                            oResult.libSubRule = 'onlyInteger';
                            oResult.subRule = 'onlyInteger';
                            break;
                        case 'greater than':
                            oResult.libSubRule = 'greaterThan';
                            oResult.subRule = '>';
                            break;
                        case 'greater than or equal to':
                            oResult.libSubRule = 'greaterThanOrEqualTo';
                            oResult.subRule = '>=';
                            break;
                        case 'equal to':
                            oResult.libSubRule = 'equalTo';
                            oResult.subRule = '==';
                            break;
                        case 'less than or equal to':
                            oResult.libSubRule = 'lessThanOrEqualTo';
                            oResult.subRule = '<=';
                            break;
                        case 'less than':
                            oResult.libSubRule = 'lessThan';
                            oResult.subRule = '<';
                            break;
                        case 'divisible by':
                            oResult.libSubRule = 'divisibleBy';
                            oResult.subRule = 'divisibleBy'; // todo
                            break;
                        case 'odd':
                            oResult.libSubRule = 'odd';
                            oResult.subRule = 'odd'; // todo
                            break;
                        case 'even':
                            oResult.libSubRule = 'even';
                            oResult.subRule = 'even'; // todo
                    }
                    return getResult();
                case 'url':
                    oResult.libRule = 'url';
                    oResult.rule = 'url'; // todo
                    return getResult();
                case 'equality':
                    oResult.libRule = 'equality';
                    oResult.rule = '===';
                    return getResult();
            }
            if (analyseOtherInfo) {
                if ( InputControl.info['rule'] != null ) {
                    oResult.rule = InputControl.info['rule'];
                    if ( InputControl.info['subRule'] != null ) {
                        oResult.subRule = InputControl.info['subRule'];
                    }
                    return getResult();
                }
            }
        }
        /**
         * Add the expected value (the comparison value to the result) if defined
         * and returns the result
         * 
         * @returns {JSON}
         */
        function getResult()
        {
            if (matches != null) {
                let groups = ['expected', 'field', 'field_2', 'value'];
                let tmpValue;
                groups.forEach(function(groupName) {
                    tmpValue = valOr(matches, ['groups', groupName]);
                    if ( tmpValue !== undefined ) {
                        oResult[groupName] = tmpValue;
                    }
                })
            }
            return oResult;
        }
    }

    /**
     * returns the desired instance (last by default)
     * 
     * @param {string} desiredInstance Form name of desired instance. (If 'auto', returns the current instance). Default: 'auto'.
     * 
     * @returns {object} Returns an InputControl object
     */
    static getInstance(desiredInstance = 'auto')
    {
        if (desiredInstance === 'auto') {
            desiredInstance = InputControl.info.formName;
        }
        for (let i = 0; i < InputControl.instances.length; i++) {
            if (InputControl.instances[i].formName === desiredInstance) {
                return InputControl.instances[i];
            }
        }
    }

    /**
     * Returns the name of the current .js file (without extension)
     * 
     * @returns {string}
     */
    static getJsFileName()
    {
        let url = document.location.href;
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        return url;
    }

    /**
     * Returns the initial value, or the new expected value.
     * Eg: if the expected value is '{{startDate}}', 'startDate' field value will be returned as new expected value
     * 
     * @returns {*}
     */
    static getNewExpectedValue(isRender = false)
    {
        let instance = InputControl.getInstance();
        let expectedValue = InputControl.info.expectedValue_init;
        if ( typeof(expectedValue) !== 'string' ) {
            return expectedValue;
        }
        let aStringsToReplace = instance.getReplacements(expectedValue);
        if (aStringsToReplace == null) {
            return expectedValue;
        }
        let iStringsToReplace = aStringsToReplace.length;
        let sStrToReplace;

        let aGroups, iGroups, aNewGroups;
        /**
         * @var {string} sGroup The group (trimmed and lowercased)
         */
        let sGroup;
        // TODO value...
        // for each string to replace (eg : "date.now" | "value.startDate" | "startDate")
        for (let i = 0; i < iStringsToReplace; i++) {
            sStrToReplace = aStringsToReplace[i];
            aGroups = sStrToReplace.split('.');
            iGroups = aGroups.length;
            // copy groups into aNewGroups
            // or generates it if only the second group was supplied
            if (iGroups > 1) {
                aNewGroups = aGroups;
            } else if (iGroups === 1) {
                guessMissingFirstGroup();
            }
            // on error : continue
            if (
                !Array.isArray(aNewGroups) ||
                (aNewGroups.length < 2)
            ) {
                continue;
            }
            // get replacements from the new groups
            let jReplacements = getReplacementsFromGroups();
            expectedValue = InputControl.replaceStr(expectedValue, jReplacements);
        }
        return expectedValue;
        /**
         * Guess the first group (because only the second group was defined by the developer)
         */
        function guessMissingFirstGroup()
        {
            // guess the missing first group
            sGroup = sStrToReplace.trim();
            if (instance.isField(sGroup)) {
                // if field name : 'value'
                aNewGroups = ['value', sGroup];
            } else if ( /^val(ue)?$/i.test(sGroup) ) {
                // if 'value' : 'value'
                aNewGroups = ['value', instance.info.key];
            } else if ( /^rule([ _]?name)?$/i.test(sGroup) ) {
                // if 'rule' : 'rule'
                aNewGroups = ['rule', instance.info.rule];
            } else if ( /^(expected|cmp)([ _]?value)?$/i.test(sGroup) ) {
                // if 'expected' : 'rule'
                aNewGroups = ['expected', 'expected'];
            } else {
                // if as below :
                switch (sGroup.toLowerCase()) {
                    case 'now':
                        let aRules = ['date', 'datetime', 'time'];
                        let sRule;
                        for (let i = 0; i < aRules.length; i++) {
                            sRule = aRules[i];
                            if (InputControl.info.rule === sRule) {
                                aNewGroups = [sRule, 'now'];
                                break;
                            }
                        }
                        if (aNewGroups == null) {
                            aNewGroups = ['datetime', 'now'];
                        }
                        break;
                    case 'date':
                        aNewGroups = ['date', 'now'];
                        break;
                    case 'time':
                        aNewGroups = ['time', 'now'];
                        break;
                }
            }
        }
        /**
         * Returns the initial value if it's a string.
         * Otherwise, stringifies and returns it.
         * 
         * @param {*} value The source value
         * 
         * @returns {string}
         */
        function getRenderValue(value)
        {
            if (typeof(value) === 'string') {
                return value;
            } else {
                return JSON.stringify(value);
            }
        }
        /**
         * Returns all replacements from the groups
         * eg: one group
         */
        function getReplacementsFromGroups()
        {
            let jReplacements = {};
            /**
             * @var {string} group0 The first group (lowercased)
             */
            let group0 = aNewGroups[0].toLowerCase();
            /**
             * @var {string} group1 The second group (lowercased)
             */
            let group1 = (aNewGroups[1] ?? '').toLowerCase();
            let fieldName;
            // what first group ?
            switch (group0) {
                case 'value':
                    fieldName = aNewGroups[1];
                    let fieldValue = instance.getFieldValue(fieldName);
                    addReplacement(fieldValue);
                    break;
                case 'rule':
                    fieldName = InputControl.info.key;
                    let fieldRuleName = aNewGroups[1];
                    let fieldRuleValue = instance.getFieldRuleValue(fieldRuleName);
                    addReplacement(fieldRuleValue);
                    break;
                case 'cmp':
                case 'expected':
                    addReplacement( InputControl.info.expectedValue );
                    break;
                case 'datetime':
                    switch (group1) {
                        case 'now':
                            addReplacement( moment().format("YYYY-MM-DD hh:mm:ss") );
                            break;
                    }
                    break;
                case 'date':
                    switch (group1) {
                        case 'now':
                            addReplacement( moment().format("YYYY-MM-DD") );
                            break;
                    }
                    break;
                case 'time':
                    switch (group1) {
                        case 'now':
                            addReplacement( moment().format("HH:mm:ss") );
                            break;
                    }
                    break;
            }
            return jReplacements;
            /**
             * Add a replacement value
             * 
             * @param {*} value The value which will replace the string
             */
            function addReplacement(value)
            {
                let renderedValue;
                if (isRender) {
                    renderedValue = getRenderValue(value);
                }
                jReplacements[sStrToReplace] = renderedValue ?? value;
            }
        }
    }

    /**
     * Replace all strings by their supplied value
     * 
     * @param {string} str The source string
     * @param {JSON} replacements All strings to replace and their replacement value
     * 
     * @returns {string}
     */
    static replaceStr(str, replacements)
    {
        if (typeof(str) !== 'string') {
            console.log('replaceStr() : non string "str" arg')
            return str;
        }
        let instance = InputControl.getInstance();
        let strBefore, strAfter;
        if (instance === undefined) {
            strBefore = InputControl.defaultConfig.str_before_replacement;
            strAfter = InputControl.defaultConfig.str_after_replacement;
        } else {
            strBefore = instance.getConfig('str_before_replacement');
            strAfter = instance.getConfig('str_after_replacement');
        }
        let newStr = str;
        let aStringsToReplace = Object.keys(replacements);
        let iReplacements = aStringsToReplace.length;
        let sStrToReplace;
        for (let i = 0; i < iReplacements; i++) {
            sStrToReplace = aStringsToReplace[i];
            newStr = newStr.replace(
                strBefore + sStrToReplace + strAfter,
                replacements[sStrToReplace]
            );
        }
        return newStr;
    }

    /**
     * Updates info
     * 
     * @param {JSON} jInfo Infos to update
     */
    static updateInfo(jInfo)
    {
        let instance = InputControl.getInstance();
        let aProps = Object.keys(jInfo);
        let sProp, val;
        let bReplaceComparisonValue = false;
        for (let i = 0; i < aProps.length; i++) {
            sProp = aProps[i];
            val = jInfo[sProp];
            switch (sProp) {
                case 'formName':
                    // • to do directly (not with updateInfo) :
                    // InputControl.info.formName = val;
                    break;
                case 'rule':
                    InputControl.info.rule = val;
                    if (InputControl.info.rule !== val) {
                        instance.initRuleResult();
                    }
                    break;
                case 'subRule':
                    InputControl.info.subRule = val;
                    if (InputControl.info.key !== 'single') {
                        bReplaceComparisonValue = true;
                    }
                    break;
                case 'fieldValue':
                    InputControl.info.value = val;
                    break;
                case 'fieldRules':
                    InputControl.info.options = val;
                    break;
                case 'fieldName':
                    if (val !== 'single') {
                        InputControl.info.key = val;
                        replaceComparisonValue();
                    }
                    break;
                case 'fieldsValue':
                    InputControl.info.attributes = val;
                    break;
                case 'globalOptions':
                    InputControl.info.globalOptions = val;
            }
        }
        if ( bReplaceComparisonValue ) {
            replaceComparisonValue();
        }
        /**
         * Replace the expected value (subrule/rule value).
         * 
         * @example
         * // if the expected value is "{{date.now}}", today will be returned in "yyyy-mm-dd" format
         */
        function replaceComparisonValue()
        {
            let fieldsRules = instance.fieldsRules;
            // saves the initial expected value
            let initValue;
            let fieldName = InputControl.info.key;
            let rule = InputControl.info.rule;
            let subRule = InputControl.info.subRule;
            if (subRule != null) {
                initValue = valOr(fieldsRules, [fieldName,rule,subRule]);
            } else {
                initValue = valOr(fieldsRules, [fieldName,rule]);
            }
            InputControl.info.expectedValue_init = initValue;
            // is the rule a comparison operator ?
            if ( InputControl.comparisonOperators.contains(subRule) ) {
                // yes :
                if (
                    (typeof(InputControl.info.expectedValue_init) === 'object') &&
                    !Array.isArray(InputControl.info.expectedValue_init) &&
                    (InputControl.info.expectedValue_init[subRule] !== undefined)
                ) {
                    // if the expected value is like { ">=": "12:00",.. }
                    // expectedValue will be "12:00"
                    InputControl.info.expectedValue_init = InputControl.info.expectedValue_init[subRule];
                }
                // now, we will replace the expected value if necessary
                InputControl.info.expectedValue = InputControl.getNewExpectedValue(false);
            } else {
                // no: we copy the initial expected value
                InputControl.info.expectedValue = InputControl.info.expectedValue_init;
            }
        }
    }

    // ◘ instance methods
    /**
     * Displays an error message
     * 
     * @param {string} sFieldName The field name
     * @param {string|null} message The message to display. If undefined, the message will be auto-recovered.
     */
    displayErrorMessage(sFieldName, message = undefined)
    {
        let $msg = this.fieldMessageObject(sFieldName, true);
        if (
            (message === undefined) ||
            (message === null)
        ) {
            message = this.getMessage();
        }
		$msg.html( message );
    }

    /**
     * Returns the input which is associated to a field name, encapsulated in a jQuery object.
     * 
     * @param {?string} fieldName The field name
     * @param {boolean} strictMode If true, the field name must be exactly equal. Default: true.
     * 
     * @returns {object} jQuery DOM element, or null on failure
     */
    field(fieldName = null, strictMode = true)
    {
        if (fieldName == null) {
            fieldName = this.fieldName;
        }
        let $form = this.form();
        if ($form == null) {
            if (this.getConfig('ifMissingForm__logError')) {
                console.log(`inputControl : missing "${this.formName}" form`);
            }
            if (!this.getConfig('ifMissingForm__throwError')) {
                return;
            }
        }
        if (strictMode) {
            let sClass = this.getConfig('field_class');
            let sNameAttr = this.getConfig('field_name_attr');
            let sFieldSelector = `.${sClass}[${sNameAttr}="${fieldName}"]`;
            return $form.find(sFieldSelector);
        } else {
            let sFieldsSelector = this.getConfig('fields_selector');
            let $formFields = $form.find(sFieldsSelector);
            let $field, sFieldName;
            for (let i = 0; i < $formFields.length; i++) {
                $field = $($formFields[i]);
                sFieldName = $field.attr(this.getConfig('field_name_attr'));
                if (str_isANEqual(fieldName, sFieldName)) {
                    return $field;
                }
            }
        }
    }

    /**
     * Returns the span which will contain the message describing that the field is invalid, encapsulated in a jQuery object.
     * 
     * @param {?string} fieldName The field name
     * 
     * @returns {object} Null on failure
     */
    fieldMessageObject(fieldName = null, createIfUndefined = true)
    {
        if (fieldName == null) {
            fieldName = this.fieldName;
        }
        let msgSpanId = this.formName + '-' + fieldName + '-message';
        let $msg = $('#' + msgSpanId);
        let msgCount = $msg.length;
        if (createIfUndefined && (msgCount === 0)) {
            let $input = this.field(fieldName);
            $input.after(`<span id="${msgSpanId}" class="${this.getConfig('invalid_message_class')}"></span>`);
            return $('#' + msgSpanId);
        }
        return $msg;
    }
    
    /**
     * Returns form inputs, encapsulated in a jQuery object.
     * 
     * @returns {object} Null on failure
     */
    fields()
    {
        return this.form().find( '.' + this.getConfig('field_class') );
    }

    /**
     * Returns the form.
     * 
     * @param {string} desiredReturn Possibilities. Default: 'jQuery' :
     *  - 'jQuery': returns the DOM node in a jQuery object (object)
     *  - 'selector': returns the jQuery selector (string)
     *  - 'htmlElement': returns the DOM node (object)
     * 
     * @returns {Object|HTMLElement|null} Null on failure.
     */
    form(desiredReturn = 'jQuery')
    {
        let sFormSelector = this.getConfig('form_selector');
        let $form = $(sFormSelector);
        if (!$form.length) {
            return null;
        }
        switch (desiredReturn) {
            case 'jQuery':
                return $form;
            case 'selector':
                return sFormSelector;
            case 'htmlElement':
            default:
                return $form[0];
        }
    }

    /**
     * Returns the config param value (or the default if not setted)
     * 
     * @param {string} paramName The parameter name
     *  
     * @returns {*|null} Null on failure.
     */
    getConfig(paramName)
    {
        return this.config[paramName] ?? InputControl.getConfig(paramName);
    }
    
    /**
     * Apply and returns the config which were defined in the PHP class
     * 
     * @param {?string} page The PHP file name (without extension). Eg: 'adm_promo'.
     * If not supplied, the caller js file name is taken account.
     * @param {boolean} logTheResult If true, result will be logged in console (with 'err' on failure)
     * 
     * @returns {JSON|null} Null on failure
     */
    getConfigFromPhp(page = null, logTheResult = false)
    {
        if (isEmpty(page)) {
            page = InputControl.getJsFileName();
        }
        let oThis = this;

        let jData = {
            'page': page,
            'bJSON': 1,
            'bLoadHtml': false
        }
        jData[oThis.getConfig('ajax_param1__name')] = oThis.getConfig('ajax_param1__value__config_response');
        jData[oThis.getConfig('ajax_param2__name')] = oThis.formName;
        jData[oThis.getConfig('ajax_param3__name')] = oThis.getConfig('ajax_param3__value');
        let jResponse = $.ajax({
            'type': 'POST',
            'url': oThis.getConfig('ajax_url'),
            'async': false,
            'data': jData,
            'dataType': 'json',
            'cache': false
        })
        .done(function(jData) {
            if (logTheResult) {
                console.log('InputControl', oThis.formName, 'getConfigFromPhp()', jData)
            }
        })
        .fail(function(err) {
            if (logTheResult) {
                console.log('InputControl', oThis.formName, 'getConfigFromPhp() : error', err)
            }
        })
        return jResponse.responseJSON ?? null;
    }

    /**
     * Returns the field rule value
     * 
     * @param {string} fieldName The field name
     * @param {string} rule The rule name
     * @param {?string} subrule The subrule name
     * 
     * @returns {object} Null on failure
     */
    getFieldRuleValue(fieldName, rule, subRule = null)
    {
        return valOr( this.fieldsRules,[fieldName,rule,subRule] ) ??
                     valOr( this.fieldsRules,[fieldName,rule] )
        ;
    }

    /**
     * Returns the value of the input which is associated to a field name.
     * 
     * @param {?string} fieldName The field name
     * 
     * @returns {?string} Null on failure
     */
    getFieldValue(fieldName = null)
    {
        let $field = this.field(fieldName);
        if ($field == null) {
            return;
        }
        return $field.value();
    }

    /**
     * Returns the invalid field message.
     * 
     * @returns {?string}
     */
    getMessage()
    {
        return this.fieldMessage ?? null;
    }

    /**
     * @getter
     * Returns the global option value (or the default if not setted)
     * 
     * @param {string} paramName The parameter name
     *  
     * @returns {*}
     */
    getOption(paramName)
    {
        return valOr(
            InputControl.info, ['globalOptions',paramName],
            valOr( this.getConfig('global_options'), [paramName], null )
        );
    }

    /**
     * Returns replacement strings
     * 
     * @param { string } str The string which contains values to replace (eg : "Today we are the {{date.now}} and it's {{time.now}}")
     * @param { int } limit The maximum number of info you accept for each group ("." is the separator).
     * eg: "date.now" contains 2 info.
     * 
     * @returns { string[]|null } String groups. In the example, will return : ["date.now", "time.now"]. Returns null on failure.
     */
    getReplacements(str, limit = 4)
    {
        if (typeof(str) !== 'string') {
            return str;
        }
        let sPattern = this.getConfig('str_before_replacement') + '(?<str_to_replace>(?:[\\w<>!=]+)' + '(?:\\.[\\w<>!=]+)?'.repeat(limit - 1) + ')' + this.getConfig('str_after_replacement');
        let re = RegExp(sPattern, 'g');
        let matches = re.exec(str);
        if (matches != null && matches.groups != null) {
            return Object.values(matches.groups);
        }
    }
    
    /**
     * Returns the rule result
     * 
     * @returns {array|json}
     */
    getRuleResult()
    {
        return this.ruleResult;
    }
         
    /**
     * Returns the fields rules which were defined in the PHP class
     * 
     * @param {?string} page The PHP file name (without extension). Eg: 'adm_promo'.
     * If not supplied, the caller js file name is taken account.
     * @param {boolean} logTheResult If true, result will be logged in console (with 'err' on failure)
     * 
     * @returns {JSON|null} Null on failure
     */
    getRules(page = null, logTheResult = true)
    {
        let oThis = this;
        if (oThis.areRulesSetted) {
            return oThis.fieldsRules;
        }
        if (isEmpty(page)) {
            page = InputControl.getJsFileName();
        }
        let jData = {
            'page': page,
            'async': false,
            'bJSON': 1,
            'bLoadHtml': false
        }
        jData[oThis.getConfig('ajax_param1__name')] = oThis.getConfig('ajax_param1__value__rules_response');
        jData[oThis.getConfig('ajax_param2__name')] = oThis.formName;
        jData[oThis.getConfig('ajax_param3__name')] = oThis.getConfig('ajax_param3__value');
        let jResponse = $.ajax({
            'type': 'POST',
            'url': oThis.getConfig('ajax_url'),
            'async': false,
            'data': jData,
            'dataType': 'json',
            'cache': false
        })
        .done(function(jData) {
            if (logTheResult) {
                console.log('InputControl', oThis.formName, 'getRules()', jData)
            }
            oThis.areRulesSetted = true;
        })
        .fail(function(err) {
            if (logTheResult) {
                console.log('InputControl', oThis.formName, 'getRules() : error', err)
            }
        })
        return jResponse.responseJSON ?? null;
    }

    /**
     * Returns form fields values
     * 
     * @param {boolean} onlyModified If true, returns only the value of fields that have been modified. Default: false.
     * @param {boolean} hiddenFields If true, all hidden fields value will be recovered. Default: true.
     * @param {boolean} stringifyResult Stringify the result ? Default: false.
     * 
     * @returns {JSON|string} String if stringified result desired
     */
    getValues(onlyModified = false, hiddenFields = true, stringifyResult = false)
    {
        let jValues = InputControl.collectValues(
            this.form(),
            `.${this.getConfig('field_class')}`,
            this.getConfig('field_name_attr'),
            hiddenFields
        );
        if (onlyModified) {
            let aFields = Object.keys(this.fieldsValueOnInit);
            let iFields = aFields.length;
            let sFieldName, initValue;
            for (let i = 0; i < iFields; i++) {
                sFieldName = aFields[i];
                initValue = this.fieldsValueOnInit[sFieldName];
                if (initValue === jValues[sFieldName]) {
                    // delete the field value if the same as at the beginning
                    delete jValues[sFieldName];
                }
            }
        }
        return stringifyResult ?
            JSON.stringify(jValues) :
            jValues;
    }

    /**
     * Initializes changes
     */
    initChanges()
    {
        this.fieldsValueOnInit = this.getValues(false, true, false);
    }

    /**
     * Initializes the rule result
     */
    initRuleResult()
    {
        switch ( this.getOption('format') ) {
            case 'flat':
                this.ruleResult = [];
                break;
            case 'grouped':
                this.ruleResult = {};
                // this.ruleResult[key] = [];
                break;
            case 'detailed':
                this.ruleResult = [];
        }
    }

    /**
     * Returns whether a string is a field name
     * 
     * @param {string} str The string to check
     * 
     * @returns {boolean}
     */
    isField(str)
    {
        return this.fieldsName.contains(str);
    }

    /**
     * Returns whether the field has already been tested
     * 
     * @param {?string} fieldName The field name. If null, it will be auto-recovered. Default: null.
     */
    isFieldAlreadyChecked(fieldName = null)
    {
        if (fieldName == null) {
            fieldName = this.fieldName
        }
        return (
            (this.validFields[fieldName] !== undefined) ||
            (this.invalidFields[fieldName] !== undefined)
        );
    }

    /**
     * Returns wheter a field is valid or not
     * 
     * @param {string} fieldName The field name
     * @param {?*} fieldValue The field value. Default: null.
     * @param {boolean} checkValue Check the value ? If false, returns the validity observed during the last modification of the field. If 'auto', it will auto-determined. Default: 'auto'.
     * 
     * @returns {boolean}
     */
    isFieldValid(fieldName, fieldValue = null, checkValue = 'auto')
    {
        let jValue;
        let oThis = this;
        if (fieldName !== this.fieldName) {
            this.fieldName = fieldName;
        }
        let bIsValueSupplied = (
            (fieldValue !== undefined) &&
            (fieldValue !== null)
        );
        let bIsFieldAlreadyChecked = this.isFieldAlreadyChecked();
        if ( checkValueNow() ) {
            if (!bIsValueSupplied) {
                fieldValue = this.getFieldValue(fieldName);
            }
            this.fieldValue = fieldValue;
            jValue = {};
            jValue[fieldName] = fieldValue;
            this.validateJsResult = this.validate(
                jValue,
                {format: "grouped"} // grouped (by default) | flat | detailed
            );
            this.fieldMessage = this.messageFromValidateResult(false);
            return (this.validateJsResult == null);
        } else {
            return (this.validFields[fieldName] !== undefined);
        }
        /**
         * Check the value now ?
         * 
         * @returns {boolean}
         */
        function checkValueNow()
        {
            switch (checkValue) {
                case 'auto':
                    if (bIsValueSupplied) {
                        return true;
                    } else {
                        return !bIsFieldAlreadyChecked;
                    }
                case false:
                    return false;
                default:
                    return true;
            }
        }
    }

    /**
     * Are all form fields valid ?
     * Saves it and returns it.
     * 
     * @returns {boolean}
     */
    isValid()
    {
        let oThis = this;
        let aInvalidFields = Object.keys(oThis.invalidFields);
        if (aInvalidFields.length > 0) {
            return returnValidity(false);
        }
        let aFields = Object.keys(this.fieldsRules);
        let iFieldsCount = aFields.length;
        let aValidFields = Object.keys(oThis.validFields);
        if (iFieldsCount === aValidFields.length) {
            return returnValidity(true);
        }
        for (let i = 0; i < iFieldsCount; i++) {
            oThis.fieldName = aFields[i];
            if (aValidFields.includes(oThis.fieldName)) {
                // if the field has already been checked : continue
                continue;
            }
            // else : check the field value
            oThis.setFieldValidity(oThis.fieldName, null, true);
            if (!oThis.fieldIsValid) {
                return returnValidity(false);
            }
        }
        return returnValidity(true);
        function returnValidity (isFormValid = true)
        {
            oThis.isFormValid = isFormValid;
            return isFormValid;
        }
    }
    
    /**
     * Returns the back-end response
     * 
     * @param {JSON} jBackEndResponse The back-end response
     * 
     * @returns {bool|null} Returns wheter the jData is valid, or null on failure.
     */
    isValidFromBackEnd(jBackEndResponse)
    {
        log (
            'jBackEndResponse',
            'see .invalid_fields',
            jBackEndResponse
        );
        if (
            (typeof(jBackEndResponse) !== 'object') ||
            (jBackEndResponse.is_valid === undefined) ||
            (typeof(jBackEndResponse.is_valid) !== 'boolean')
        ) {
            return;
        }
        // IF INVALID DATA
        if (!jBackEndResponse.is_valid) {
            if (jBackEndResponse.invalid_fields !== undefined) {
                let jInvalidFields = jBackEndResponse.invalid_fields;
                let aInvalidFieldsName = Object.keys(jInvalidFields);
                let iInvalidFields = aInvalidFieldsName.length;
                let sInvalidFieldName;
                let $fieldMessageContainer;
                for (let i = 0; i < iInvalidFields; i++) {
                    sInvalidFieldName = aInvalidFieldsName[i];
                    $fieldMessageContainer = this.fieldMessageObject(sInvalidFieldName, true);
                    $fieldMessageContainer.html(
                        jInvalidFields[sInvalidFieldName].message
                    )
                }
            }
        }
        return jBackEndResponse.is_valid ?? false;
    }

    /**
     * Listen to field changes and check validity.
     * 
     * If a field is invalid, a message is inserted in the span located just after the input.
     * If the span element does not yet exist, it is created.
     * 
     * 2 events are triggered :
     *  • "changeBeforeCheck": when a change has just been detected on the input
     *  • "field_change": after "changeBeforeCheck", after checking the validity, and displaying the message in the event of invalidity
     */
    listenFields()
    {
        const oThis = this;
        const $form = oThis.form();
        const aFields = Object.keys(this.fieldsRules);
        const iFieldsCount = aFields.length;
        let $elemLinkedToInput;
        let sNewInputId;
        if (oThis.form() == null) {
            if (this.getConfig('ifMissingForm__logError')) {
                console.log(`inputControl : missing "${oThis.formName}" form`);
            }
            if (!this.getConfig('ifMissingForm__throwError')) {
                return;
            }
        }
        // for each field
        for (let i = 0; i < iFieldsCount; i++) {
            oThis.fieldName = aFields[i];
            oThis.$field = oThis.field();
            if (oThis.$field == null) {
                console.log(`inputControl : missing "${oThis.fieldName}" field`);
                continue;
            }
            sNewInputId = oThis.$field.attr('id') ?? (oThis.formName + '-' + oThis.fieldName);
            $elemLinkedToInput = $form.find(`[for=${oThis.fieldName}]`);
            // generate and apply an id on the field
            oThis.$field.attr('id', sNewInputId);
            // connects the elements whose 'for' attr value was equal to fieldName
            $elemLinkedToInput.attr('for', sNewInputId);
            // activate smart attr setter
            addAttributes();
            // listen field changes
            oThis.$field.on('change', function() {
                let bIsFormValidOnInit = oThis.isFormValid;
                $(this).trigger('change-before-check');
                oThis.fieldName = $(this).attr( oThis.getConfig('field_name_attr') );
                oThis.setFieldValidity(oThis.fieldName, null);
                oThis.isValid();
                if (oThis.isFormValid !== bIsFormValidOnInit) {
                    if (oThis.isFormValid) {
                        $form.trigger('valid');
                        $form.addClass('valid').removeClass('invalid');
                    } else {
                        $form.trigger('invalid')
                        $form.addClass('invalid').removeClass('valid');
                    }
                    $form.trigger('validity-change')
                }
            })
        }
        /**
         * Adds the most suitable attributes to the input according to the validation rules
         */
        function addAttributes()
        {
            const $field = oThis.$field;
            const sInputType = $field.attr('type');
            const jFieldRules = oThis.fieldsRules[oThis.fieldName];
            switch (sInputType) {
                case 'text':
                // ◘ TEXT
                    // min
                    if (Number.isInteger((valOr(jFieldRules,['length','minimum'])))) {
                        $field.attr('minlength', jFieldRules.length.minimum);
                    }
                    // max
                    if (Number.isInteger((valOr(jFieldRules,['length','maximum'])))) {
                        $field.attr('maxlength', jFieldRules.length.maximum);
                    }
                    // pattern
                    if (valOr(jFieldRules,['format','pattern'])) {
                        $field.attr('pattern', jFieldRules.format.pattern);
                    }
                    // ◘ DATE (with datepicker)
                    if ($field.hasClass('datepicker')) {
                        treatDateField(true);
                    }
                    break;
                case 'date':
                // ◘ DATE (with input[type=date])
                    treatDateField();
                    break;
                case 'number':
                // ◘ NUMBER
                    // min
                    if (Number.isInteger(valOr(jFieldRules,['numeric','>=']))) {
                        getNewExpectedValue('numeric','>=');
                        $field.attr('min', InputControl.info.expectedValue);
                    }
                    // max
                    if (Number.isInteger(valOr(jFieldRules,['numeric','<=']))) {
                        getNewExpectedValue('numeric','<=');
                        $field.attr('max', InputControl.info.expectedValue);
                    }
                    break;
            }
            // required
            if (
                !valOr(jFieldRules,['presence','allowEmpty']) ||
                valOr(jFieldRules,['presence'])
            ) {
                $field.attr('required', true);
            }
            /**
             * Replace the rule value if necessary
             * 
             * @param {string} rule 
             * @param {string} subRule 
             */
            function getNewExpectedValue(rule, subRule)
            {
                InputControl.updateInfo(
                    {
                        'rule': rule,
                        'subRule': subRule,
                        'fieldValue': jFieldRules[rule][subRule],
                        'fieldRules': jFieldRules,
                        'fieldName': oThis.fieldName,
                        'fieldsValue': oThis.fieldsValue,
                        // 'globalOptions': globalOptions
                    }
                );
                InputControl.info.expectedValue = InputControl.getNewExpectedValue();
            }
            /**
             * Treat a date field
             * 
             * @param {boolean} bIsDatePicker Is it a jQuery UI DatePicker field ? Default: false.
             */
            function treatDateField(bIsDatePicker = false)
            {
                // min
                if (
                    valOr(jFieldRules,['date','date']) &&
                    (valOr(jFieldRules,['date','>=']) !== undefined)
                ) {
                    getNewExpectedValue('date','>=');
                    if (bIsDatePicker) {
                        $field.datepicker({
                            // dateFormat: "dd/mm/yy",
                            dateFormat: "yy-mm-dd",
                            minDate: new Date(InputControl.info.expectedValue)
                        })
                    } else {
                        $field.attr('min', InputControl.info.expectedValue);
                    }
                }
                // max
                if (
                    valOr(jFieldRules,['date','date']) &&
                    (valOr(jFieldRules,['date','<=']) !== undefined)
                ) {
                    getNewExpectedValue('date','<=');
                    if (bIsDatePicker) {
                        $field.datepicker({
                            // dateFormat: "dd/mm/yy",
                            dateFormat: "yy-mm-dd",
                            maxDate: new Date(InputControl.info.expectedValue)
                        })
                    } else {
                        $field.attr('max', InputControl.info.expectedValue);
                    }
                }
            }
        }
    }

    /**
     * Log info in console
     * 
     * @param {*} otherDataToLog Optional data to log. Default: null.
     */
    log(otherDataToLog = null)
    {
        let aDataToLog = [
            'InputControl', this.formName, 'log()',
            {
                this: this,
                validFields: this.validFields,
                invalidFields: this.invalidFields
            }
        ];
        if (otherDataToLog !== null) {
            aDataToLog.push(otherDataToLog);
        }
        log(...aDataToLog)
    }

    /**
     * Returns a result from a validateJs result
     * 
     * @param {boolean} isDetailed Is the source validateJs result detailed ?
     * 
     * @returns {string}
     */
    messageFromValidateResult(isDetailed = true) {
        if (this.validateJsResult === undefined) {
            return;
        }
        let libResult = this.validateJsResult[0];
        return libResult.error ?? libResult[this.fieldName] ?? libResult[0] ?? null;
    }

    /**
     * Apply 'valid' or 'invalid' class on the input
     * And display the error message on invalidity
     * 
     * @param {?string} fieldName The field name. Auto-recovered if null. Default: null.
     * @param {?boolean} fieldIsValid Is the field valid ? Auto-recovered if null. Default: null.
     * @param {boolean} showMessage Display the message ? Default: true.
     * 
     * @returns {boolean} Is the field value valid ?
     */
    setFieldValidity(fieldName = null, fieldIsValid = null, showMessage = true) {
        if (fieldName == null) {
            fieldName = this.fieldName;
        }
        if (fieldIsValid == null) {
            // check whether the field value is valid
            fieldIsValid = this.isFieldValid(fieldName, null, true)
        }
        if (fieldIsValid) {
            delete this.invalidFields[fieldName];
            this.validFields[fieldName] = fieldName;
        } else {
            delete this.validFields[fieldName];
            this.invalidFields[fieldName] = fieldName;
        }
        let $input = this.field(fieldName);
        $input.removeClass(['invalid', 'valid']);
        switch (fieldIsValid) {
            case true:
                $input.addClass('valid');
                if (showMessage) {
                    this.displayErrorMessage(fieldName, '');
                }
                break;
            case false:
                $input.addClass('invalid');
                if (showMessage) {
                    this.displayErrorMessage(fieldName, null);
                }
        }
        this.fieldIsValid = fieldIsValid;
        return fieldIsValid;
    }

    /**
     * Apply values in all form fields
     * 
     * @param {JSON} jValues Fields values to set in form fields
     * @param {boolean} strictMode If true, the field name must be exactly equal. Default: false.
     * @param {boolean} initChanges If true, all futures changes will be compared to actual values (after assignation). Default: false.
     */
    setValues(jValues, strictMode = false, initChanges = false)
    {
        let aKeys = Object.keys(jValues);
        let iLength = aKeys.length;
        let sFieldName;
        let $form = this.form();
        let $field;
        const sClass = this.getConfig('field_class');
        const sNameAttr = this.getConfig('field_name_attr');
        for (let i = 0; i < iLength; i++) {
            sFieldName = aKeys[i];
            $field = this.field(sFieldName, strictMode);
            if ($field === undefined) {
                if (!this.getConfig('createHiddenFieldIfMissing')) {
                    continue;
                }
                $form.prepend(`<input id="${this.formName}-${sFieldName}" ${sNameAttr}="${sFieldName}" class="${sClass}" type="hidden">`);
                $field = this.field(sFieldName, true);
            }
            $field.value(jValues[sFieldName]);
        }
        if (initChanges) {
            this.initChanges();
        }
    }

    /**
     * Returns whether supplied fields values are valid.
     * If invalid, error messages will be returned.
     * 
     * @param {JSON} fieldsValues All fields values
     * @param {string} globalOptions The global options. Can contain:
     *  - 'format': value among:
     *      - 'grouped' (by default)
     *      - 'flat'
     *      - 'detailed'
     * 
     * @internal validator lib args:
     * fieldValue, fieldRules, fieldName, fieldsValue, globalOptions
     */
    validate(fieldsValues, globalOptions = {format: 'flat', stopAfterFirstInvalidity: true})
    {
        let oThis = this;
        let fieldNames = Object.keys(fieldsValues);
        let valuesCount = fieldNames.length;
        let fieldName, fieldValue, fieldRulesName, fieldRulesCount, oValues, ruleName, oRule, ruleResult, oRules;
        let aPrioritaryRules = ['presence', 'type'], obj;
        let finalResult;
        let desiredFormat = valOr(globalOptions, 'format', 'grouped');
        let continueIfRuleIs = [];
        let fieldsRules = oThis.fieldsRules;
        switch ( desiredFormat ) {
            case 'grouped':
                finalResult = {};
                break;
            case 'flat':
            case 'detailed':
                finalResult = [];
        }
        InputControl.info.formName = this.formName;
        InputControl.updateInfo(
            {
                'fieldsValue': fieldsValues,
                'globalOptions': globalOptions
            }
        );
        for (let i = 0; i < valuesCount; i++) {
            fieldName = fieldNames[i];
            fieldValue = fieldsValues[fieldName];
            InputControl.updateInfo(
                {
                    'fieldValue': fieldValue,
                    'fieldName': fieldName
                }
            );
            oValues = {};
            oValues[fieldName] = fieldValue;
            // if allowEmpty && empty value
            if (
                (fieldsRules[fieldName].presence !== undefined) &&
                (fieldsRules[fieldName].presence.allowEmpty == true) &&
                isEmpty(fieldValue)
            ) {
                InputControl.updateInfo(
                    {
                        'rule': 'presence',
                        'subRule': 'allowEmpty',
                        'fieldRules': fieldsRules[fieldName].presence
                    }
                );
                return;
            }
            aPrioritaryRules.forEach(function(prioritaryRule) {
                ruleName = prioritaryRule;
                // ◙◙ type / presence ◙◙
                oRule = valOr(fieldsRules, [fieldName, ruleName]);
                if (oRule != null) {
                    InputControl.updateInfo(
                        {
                            'rule': ruleName,
                            'subRule': null,
                            'fieldRules': fieldsRules[fieldName][ruleName]
                        }
                    );
                    oRules = {};
                    obj = {};
                    obj[ruleName] = fieldsRules[fieldName][ruleName];
                    // obj[ruleName] = 'number'; ////////
                    oRules[fieldName] = obj;
                    // addMessage();
                    checkWithLib();
                    if (
                        returnResultNow()
                    ) {
                        return getResult();
                    }
                    continueIfRuleIs.push(ruleName);
                }
            })
            fieldRulesName = Object.keys(fieldsRules[fieldName]);
            fieldRulesCount = fieldRulesName.length;
            for (let i = 0; i < fieldRulesCount; i++) {
                ruleName = fieldRulesName[i];
                // continue if the rule is a message
                if (['message', 'message!'].contains(ruleName)) {
                    continue;
                }
                // continue if it's a prioritary rule (because already checked)
                if (continueIfRuleIs.contains(ruleName)) {
                    continue;
                }
                InputControl.updateInfo(
                    {
                        'rule': ruleName,
                        'subRule': null,
                        'fieldRules': fieldsRules[fieldName][ruleName]
                    }
                );
                obj = {};
                obj[ruleName] = fieldsRules[fieldName][ruleName];
                oRules = {};
                oRules[fieldName] = obj;
                // addMessage();    
                checkWithLib();
                if (returnResultNow()) {
                    return getResult();
                }
            }
            return getResult();
        }
        /**
         * Check whether the value is valid compared to the rule (with the JS library)
         * and save the result
         * @internal
         * The rule result is appened to finalResult
         */
        function checkWithLib()
        {
            // checks the rule with the js lib
            ruleResult = validate(
                oValues,
                oRules,
                {format: 'detailed'} // grouped, flat, detailed
            );
            // if valid rule : returns
            if (ruleResult === undefined) {
                return;
            }
            let initialMessage = ruleResult[0].error;
            let messageInfo = InputControl.getInfoFromMessage(initialMessage, true);
            // updates rule & subRule from the message info
            if ( valOr(messageInfo, ['rule']) != null ) {
                InputControl.info.rule = messageInfo['rule'];
                InputControl.info.subRule = valOr(messageInfo, ['subRule']);
                InputControl.info.libRule = valOr(messageInfo, ['libRule']);
                InputControl.info.libSubRule = valOr(messageInfo, ['libSubRule']);
                InputControl.info.expected = valOr(messageInfo, ['expected']);
                // InputControl.info.value = valOr(messageInfo, ['value']);
            }
            let newMessage = InputControl.generateErrorMessage(true);
            // generates and saves the result in the desired format
            // (from the detailed result)
            ruleResult[0].error = newMessage;
            switch ( desiredFormat ) {
                case 'grouped': // json
                    if (finalResult[fieldName] === undefined) {
                        finalResult[fieldName] = [];
                    }
                    finalResult[fieldName].push(newMessage)
                    break;
                case 'flat': // array
                    finalResult.push(newMessage);
                    break;
                case 'detailed': // array
                    Object.assign(
                        ruleResult[0],
                        messageInfo
                    );
                    finalResult.push(ruleResult[0]);
            }
        }
        function getMessage(prependField = false)
        {
            return InputControl.generateErrorMessage(prependField);
        }
        /**
         * Add the invalid message (fr)
         * 
         * @param {?string} message The message to display. If null, the message will be auto-recovered. Default: null.
         */
        function addMessage(message = null)
        {
            if (message === null) {
                message = InputControl.getMessage();
            }
            let val;
            if ( typeof(oRules[fieldName][ruleName]) !== 'object' ) {
                val = oRules[fieldName][ruleName];
                oRules[fieldName][ruleName] = {};
                oRules[fieldName][ruleName][ruleName] = val;
            }
            oRules[fieldName][ruleName]['message'] = message;
        }
        /**
         * Returns the result to return
         * 
         * @returns {*}
         */
        function getResult()
        {
            return ruleResult;
        }
        /**
         * Returns whether to return a result now or not
         * 
         * @returns {boolean}
         */
        function returnResultNow()
        {
            return (
                ruleResult !== undefined &&
                valOr(globalOptions, ['stopAfterFirstInvalidity'], true)
            );
        }
    }
}