
/**
 * 
 */
class InputControl {

    // class properties
    /**
     * @property {string} ajaxUrl The URL used for Ajax requests
     */
    static ajaxUrl = 'route.php';

    /**
     * @property {string} ajaxAction_getRules The 'action' value : will trigger the sending of rules upon detection
     */
    static ajaxAction_getRules = 'getRules';

    /**
     * @property {string} ajaxAction_getConfig The 'action' value : will trigger the sending of config upon detection
     */
    static ajaxAction_getConfig = 'getConfig';

    static defaultConfig = {
        // elements = '.field', fieldName = 'id'
        'invalid_message_class':    'invalid_message'
    };

    /**
     * @property {json} defaultGlobalOptions Default global options
     */
    static defaultGlobalOptions = {
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
    };

    /**
     * @property { object[] } instances All instances
     */
    static instances = [];

    /**
     * @property { string[] } comparisonOperators Comparison operators
     */
    static comparisonOperators = ['<', '<=', '===', '==', '!==', '!=', '>=', '>'];

    /**
     * @property {json} info rule, subRule, value (fieldValue), options (ruleOptions), key (fieldName), attributes (fieldsValues), globalOptions, expected (expected value : rule option value)
     */
    static info = {};

    // instance properties

    /**
     * Config
     */
    config = {};

    /**
     * @property {string[]} fieldsName The fields name
     */
    fieldsName = [];

    /**
     * @property {json} fieldsRules The fields rules
     */
    fieldsRules = {};

    /**
     * @property {json} fieldsValue The fields value
     */
    fieldsValue = {};

    /**
     * @property {?string} fieldName The field name
     */
    fieldName;

    /**
     * @property {?string} fieldInput The field input
     */
    fieldInput;

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
     * @property {json|array} ruleResult Rule result
     */
    ruleResult;

    /**
      * @property {?json} validateJsResult The validate JS result (detailed)
      */
    validateJsResult;

    // constructor
    /**
     * @param {JSON} fieldsRules The fields rules
     * @param {?JSON} config The config (if not supplied, take account the php config)
     * 
     * @todo config merge
     */
    constructor (fieldsRules = {}, config = null)
    {
        if (Object.keys(fieldsRules).length > 0) {
            this.fieldsRules = fieldsRules;
        } else {
            this.fieldsRules = InputControl.getRules();
        }
        this.fieldsName = Object.keys(this.fieldsRules);

        InputControl.instances.push(this);

        if ( isEmpty(config) ) {
            // get config from php
            this.config = InputControl.getConfigFromPhp();
        } else {
            this.config = config;
        }

        // add customized validators
        InputControl.addCustomizedValidators();
        InputControl.addCustomizedMessages();
        
        // Before using it we must add the parse and format functions
        // Here is a sample implementation using moment.js
        validate.extend(validate.validators.datetime, {
            // The value is guaranteed not to be null or undefined but otherwise it
            // could be anything.
            parse: function(value, options) {
                return +moment.utc(value);
            },
            // Input is a unix timestamp
            format: function(value, options) {
                var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
                return moment.utc(value).format(format);
            }
        });

        // validate.validators.inclusion.options = {message: "Pas inclus"};
        // validate.validators.datetime.options = {message: "Pas un datetime"};
        // validate.validators.datetime.options = {message: "Pas un datetime"};

        // todo: config merge...
        // validate.validators.presence.options = {message: "can't be empty"};

        // teste

        let test = validate.single(
            '6:4:9',
            {time: {
                dayTime: true
            }}
        );
        
        log(
            'zzz ♠♠ test ♠♠',
            test
        );

        // this.fieldsRules.promoStartDate.date['>='] = '2021-04-22';
        // this.fieldsRules.promoEndDate.date['>='] = '2021-04-01';
        // console.log('fieldsRules', this.fieldsRules);
        //

        this.listenFields();
        console.log(
            'zzz  this', this
        )
        // validate.validators.presence.options = {message: "can't be empty"};
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
            // a('cmpValue', cmpValue, typeof(value))
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
                InputControl.updateInfo('type', null, ...arguments);
                return InputControl.generateErrorMessage();
            }
        };
        // COMPARISON OPERATORS
        // >=
        validate.validators['>='] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['>=']) ?? options;
            let isValid = ( value >= cmpValue );
            if (!isValid) {
                InputControl.updateInfo('>=', null, ...arguments);
                return InputControl.generateErrorMessage();
            }
        };
        // >
        validate.validators['>'] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['>']) ?? options;
            let isValid = ( value > cmpValue );
            if (!isValid) {
                InputControl.updateInfo('>', null, ...arguments);
                return InputControl.generateErrorMessage();
            }
        };
        // <=
        validate.validators['<='] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['<=']) ?? options;
            let isValid = ( value <= cmpValue );
            if (!isValid) {
                InputControl.updateInfo('<=', null, ...arguments);
                return InputControl.generateErrorMessage();
            }
        };
        // <
        validate.validators['<'] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['<']) ?? options;
            let isValid = ( value < cmpValue );
            if (!isValid) {
                InputControl.updateInfo('<', null, ...arguments);
                return InputControl.generateErrorMessage();
            }
        };
        // !==
        validate.validators['!=='] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['!==']) ?? options;
            let isValid = ( value !== cmpValue );
            if (!isValid) {
                InputControl.updateInfo('!==', null, ...arguments);
                return InputControl.generateErrorMessage();
            }
        };
        // !=
        validate.validators['!='] = function(value, options, key, attributes, globalOptions) {
            let cmpValue = valOr(options,['!=']) ?? options;
            let isValid = ( value != cmpValue );
            if (!isValid) {
                InputControl.updateInfo('!=', null, ...arguments);
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
            InputControl.updateInfo('numeric', null, ...arguments);
            isValid = !isNaN(value);
            if (!isValid) {
                return InputControl.generateErrorMessage();
            }
            // is the value an integer ?
            if ( valOr(options,['onlyInteger']) ) {
                InputControl.updateInfo('numeric', 'onlyInteger', ...arguments);
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
                InputControl.updateInfo('numeric', sSubRule, ...arguments);
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
            log('date : args ◘◘', arguments)
            a('date : args ◘◘')
            let validateResult, isValid, expectedValue, operator, obj;
            let instance = InputControl.getInstance();
            instance.initRuleResult('date', ...arguments);
            console.log('this.ruleResult', instance.ruleResult)
            isValid = (
                (new Date(value).toString() !== 'Invalid Date') &&
                (/^\d{4}-\d{2}-\d{2}$/.test(value))
            );
            if (!isValid) {
                InputControl.updateInfo('date', null, ...arguments);
                // if ( instance.addInvalidity() ) {
                    console.log(
                        '▬▬ invalid. ruleResult 1 :',
                        instance.ruleResult
                    )
                    return InputControl.generateErrorMessage();
                // }
            }
            // console.log(
            //     '☻☻☻ grouped',
            //     validate(
            //         {'Champ': '2020-02-2ff'},
            //         {'Champ': {'datetime': {dateOnly: true}}},
            //         {format: 'grouped'}
            //     )
            // )
            // DATE {{COMPARISON_OPERATORS}}
            let iCount = InputControl.comparisonOperators.length;
            for (let i = 0; i < iCount; i++) {
                operator = InputControl.comparisonOperators[i];
                expectedValue = valOr(options,[operator]);
                if (expectedValue !== undefined) {
                    a('♥♥♥', expectedValue)
                    InputControl.updateInfo('date', operator, ...arguments);
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
                        // if ( instance.addInvalidity() ) {
                            console.log(
                                '▬▬ invalid. ruleResult operat. :',
                                instance.ruleResult
                            )
                            console.log(
                                '▬▬ InputControl.info :',
                                InputControl.info
                            )
                            return InputControl.generateErrorMessage();
                        // }
                    }
                }
            }
            // a(
            //     'invalid. ruleResult fin :',
            //     instance.ruleResult
            // )
            return;
        };
        // PATTERN
        validate.validators['pattern'] = function(value, options, key, attributes, globalOptions) {
            let instance = InputControl.getInstance();
            instance.initRuleResult('pattern', ...arguments);
            log('◘◘ pattern : options', options);
            // a('options')
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
            let validateResult, isValid, expectedValue, operator;
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
            oValue[key] = value;
            oRules[key] = {};
            oRules[key].pattern = {};
            if (options.dayTime) {
                oRules[key].pattern.pattern = /(?<time_hh>\d{1,2}):(?<time_mm>\d{1,2})(?::(?<time_ss>\d{1,2}))?(?:\.(?<time_ms>\d{1,6}))?/;
            } else {
                groups.time_hh.numericality.lessThanOrEqualTo = 838;
                groups.time_hh.numericality.message = '^L\'heure doit être comprise entre -838 et 838';
                oRules[key].pattern.pattern = /(?<neg>-)?(?<time_hh>\d{1,3}):(?<time_mm>\d{1,2})(?::(?<time_ss>\d{1,2}))?(?:\.(?<time_ms>\d{1,6}))?/;
            }
            oRules[key].pattern.groups = groups;
            validateResult = validate(
                oValue,
                oRules,
                {format: 'flat'}
            );
            if (validateResult !== undefined) {
                // INVALID
                return  '^' + (
                        valOr(options, ['message!']) ??
                        valOr(options, ['message']) ??
                        // valOr(groupRules, ['message']) ??
                        valOr(validateResult, ['0']) ??
                        "L'heure n'est pas valide"
                );
            }
            
            // todo: here!!!
            let values = oRules.single.pattern.groupsValue;
            let fieldTime = formatTime(values.time_hh ?? 0, values.time_mm ?? 0, values.time_ss ?? 0, values.time_ms ?? 0);
            // TIME {{COMPARISON_OPERATORS}}
            let iCount = InputControl.comparisonOperators.length;
            for (let i = 0; i < iCount; i++) {
                operator = InputControl.comparisonOperators[i];
                expectedValue = valOr(options,[operator]);
                if (expectedValue !== undefined) {
                    // expectedValue : to cmp_format
                    // expectedValue = valOr(options,[operator]);
                    obj = {};
                    obj[operator] = expectedValue;
                    validateResult = validate.single(
                        fieldTime,
                        obj
                    );
                    isValid = ( validateResult === undefined );
                    if (!isValid) {
                        InputControl.updateInfo('time', operator, ...arguments);
                        // if ( instance.addInvalidity() ) {
                            console.log(
                                '▬▬ invalid. ruleResult operat. :',
                                instance.ruleResult
                            )
                            console.log(
                                '▬▬ InputControl.info :',
                                InputControl.info
                            )
                            return InputControl.generateErrorMessage();
                        // }
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
        };


        // DATETIME
        // validate.validators['datetime'] = function(value, options, key, attributes) {
        //     let validateResult, isValid, expectedValue, operator, obj;
        //     isValid = (
        //         (new Date(value).toString() !== 'Invalid Date') &&
        //         (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value))
        //     );
        //     if (!isValid) {
        //         InputControl.updateInfo('datetime', null, ...arguments);
        //         return InputControl.generateErrorMessage();
        //     }
        //     // todo : dateOnly === true
        //     // DATETIME {{COMPARISON_OPERATORS}}
        //     let iCount = InputControl.comparisonOperators.length;
        //     for (let i = 0; i < iCount; i++) {
        //         operator = InputControl.comparisonOperators[i];
        //         expectedValue = valOr(options,[operator]);
        //         if (expectedValue !== undefined) {
        //             // a(value, operator, expectedValue)
        //             obj = {};
        //             obj[operator] = expectedValue;
        //             validateResult = validate.single(
        //                 value,
        //                 obj
        //             );
        //             isValid = ( validateResult === undefined );
        //             if (!isValid) {
        //                 InputControl.updateInfo('datetime', operator, ...arguments);
        //                 return InputControl.generateErrorMessage();
        //             }
        //         }
        //     }
        // };
    }

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
     * If no message is present among the rules provided,
     * add the default message that corresponds to the rule
     * and the sub-rule defined in info
     * 
     * @param {json} jfieldRules The field rules
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
        if (
            valOr(jfieldRules,[subRule]) &&
            (typeof(jfieldRules[subRule]) === 'object')
        ) {
            jRules = jfieldRules[subRule];
        } else if (
            valOr(jfieldRules,[libSubRule]) &&
            (typeof(jfieldRules[libSubRule]) === 'object')
        ) {
            jRules = jfieldRules[libSubRule];
        } else if (
            (typeof(jfieldRules) === 'object')
        ) {
            jRules = jfieldRules;
        }
        if (jRules.message === undefined) {
            jRules.message = valOr( defaultMessages, [libRule,libRule+'.'+libSubRule] ) ??
                             valOr( defaultMessages, [rule,rule+'.'+subRule] );
        }
    }

    /**
     * Returns the type of error from the validateJs default message
     * 
     * @param {string} message The validateJs default error message
     * 
     * @returns {json}
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
        // log('InputControl.info', InputControl.info)
        for (let i = 0; i < patternsCount; i++) {
            patternName = patternsNames[i];
            matches = patterns[patternName].exec(message);
            if (matches == null) {
                continue;
            }
            // log ('getInfoFromMessage(): matches', matches)
            switch (patternName) { // totoo
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
                    log('♥♥♥ getInfoFromMessage: getResult()', getResult())
                    // a('♥♥♥ getResult');
                    return getResult();
                }
            }
        }
        /**
         * Add the expected value (the comparison value to the result) if defined
         * and returns the result
         * 
         * @returns {json}
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

        // a(
        //     'rule subRule',
        //     rule,
        //     subRule
        // )
        log('options', libSubRule, options, InputControl.info)
        log('libSubRule', libSubRule)
        log('InputControl.info', InputControl.info)
        // a('options' )

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
            valOr( options, [subRule,messageParam] ) ??
            valOr( options, [libSubRule,messageParam] ) ??
            valOr( fieldRules, [vipMessageParam] ) ??
            valOr( defaultMessages, [libRule,libRule+'.'+libSubRule] ) ??
            valOr( defaultMessages, [rule,rule+'.'+subRule] ) ??
            valOr( options, [messageParam] ) ??
            valOr( fieldRules, [messageParam] ) ??
            valOr( defaultMessages, [rule,rule] ) ??
            valOr( defaultMessages, [libRule,libRule] ) ??
            valOr( defaultMessages, [rule] ) ??
            valOr( defaultMessages, [libRule] ) ??
            instance.getConfig('message') ??
            'Donnée invalide';
        // a(
        //     '○○ MESSAGE ○○',
        //     message
        // )
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
        console.log(newMessage)
        console.log('♠♠ instance', instance)
        log ('♠message', message)
        console.log('◘♦♣♠◘ rule', rule)
        console.log('◘♦♣♠◘ subRule', subRule)
        console.log('◘♦♣♠◘ fieldValue (value)', value)
        console.log('◘♦♣♠◘ fieldRules (options)', options)
        console.log('◘♦♣♠◘ fieldName (key)', fieldName)
        console.log('◘♦♣♠◘ fieldsValues (attributes)', attributes)
        console.log('◘♦♣♠◘ message', message)
        console.log('◘♦♣♠◘ newMessage', newMessage)
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
        // let instance = InputControl.getInstance();
        let rule = InputControl.info.rule;
        let value = InputControl.info.value;
        let options = InputControl.info.options;
        let key = InputControl.info.key;
        let attributes = InputControl.info.attributes;
        let globalOptions = InputControl.info.globalOptions ?? InputControl.defaultGlobalOptions;
        log('InputControl.info', InputControl.info);
        // a(...arguments)
        let message = InputControl.generateErrorMessage(rule, subRule, value, options, key, attributes);
        // a('♠♠ message ♠♠', message)
        let result;
        switch (globalOptions.format) {
            case 'grouped':
            case 'flat':
                return message;
            case 'detailed':
                // console.log(
                //     '☻☻☻',
                //     validate(
                //         {'Champ': '2020-02-2ff'},
                //         {'Champ': {'datetime': {dateOnly: true}}},
                //         {format: 'flat'}
                //     )
                // )
                console.log('☻☻☻ args', arguments)
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

    // class methods
    /**
     * Check if MULTIPLE fields are valid and returns the result :
     *  - is data valid ?
     *  - valid fields ?
     *  - invalid fields ?
     *  - if error : what error ?
     * 
     * @param {json} fieldsValue The data to check (all the fields to be checked). Like this :
     *  [ $fieldName => $fieldValue,.. ]
     * @param {json} fieldsRules All fields rules
     * 
     * @returns {json}
     */
    static checkAll(fieldsValue, fieldsRules)
    {
        console.log('♠ fieldsValue', fieldsValue);
        console.log('♠ fieldsRules', fieldsRules);
        let libResult = validate(fieldsValue, fieldsRules);
        return InputControl.resultFromValidateResult(libResult);
    }

    /**
     * Returns a result from a validateJs result
     * 
     * @param {json} validateJsResult The validateJs result
     * 
     * @returns {json}
     */
    static resultFromValidateResult(validateJsResult) {
        
    }

    /**
     * Collects values
     * 
     * @param {string|HTMLElement|object} elements Selector | DOM element | jQuery object
     * '.field' by default
     * @param {string} fieldName Possibilities :
     *  - 'id' :        The name of each field will match the id of each input
     *  - attrName :    The name of each field will match the value of the specified attribute
     * 
     * @returns 
     */
    static collectValues(elements = '.field', fieldName = 'id')
    {
        let sField, fieldsValue = {};
        $(elements).each(function() {
            if (
                ( typeof(fieldName) === 'string' ) &&
                (
                    ( $(this).attr('data-ignored') === undefined ) ||
                    ( $(this).attr('data-ignored') == false )
                )
            ) {
                sField = $(this).attr(fieldName);
                fieldsValue[sField] = $(this).value();
            }
        })
        return fieldsValue;
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
     * Apply and returns the config which were defined in the PHP class
     * 
     * @param {?string} page The PHP file name (without extension). Eg: 'adm_promo'.
     * If not supplied, the caller js file name is taken account.
     * @param {boolean} logTheResult If true, result will be logged in console (with 'err' on failure)
     * 
     * @returns {json|null} Null on failure
     */
    static getConfigFromPhp(page = null, logTheResult = true)
    {
        if (isEmpty(page)) {
            page = InputControl.getJsFileName();
        }
        let data = {
            'page': page,
            'action': InputControl.ajaxAction_getConfig,
            'bJSON': 1,
            'bLoadHtml': false
        }
        let json = $.ajax({
            'type': 'POST',
            'url': InputControl.ajaxUrl,
            'async': false,
            'data': data,
            'dataType': 'json',
            'cache': false
        })
        .done(function(data) {
            if (logTheResult) {
                console.log('InputControl.getConfigFromPhp()', data)
            }
        })
        .fail(function(err) {
            if (logTheResult) {
                console.log('InputControl.getConfigFromPhp() : error', err)
            }
        }).responseJSON ?? null;
        return json;
    }

    /**
     * returns the desired instance (last by default)
     * 
     * @param {number} desiredInstance Index of desired instance. integer (-1 by default)
     * 
     * @returns {object} Returns an InputControl object
     */
    static getInstance(desiredInstance = -1)
    {
        if (InputControl.instances.length === 0) {
            return;
        }
        let instancesCount = InputControl.instances.length;
        if (desiredInstance > 0) {
            return InputControl.instances[ desiredInstance ]
        } else if (desiredInstance < 0) {
            return InputControl.instances[ instancesCount + desiredInstance ]
        }
    }

    /**
     * Returns the fields rules which were defined in the PHP class
     * 
     * @param {?string} page The PHP file name (without extension). Eg: 'adm_promo'.
     * If not supplied, the caller js file name is taken account.
     * @param {boolean} logTheResult If true, result will be logged in console (with 'err' on failure)
     * @param {boolean} getConfig If true, get the config from PHP.
     * 
     * @returns {json|null} Null on failure
     */
    static getRules(page = null, logTheResult = true, getConfig = true)
    {
        if (isEmpty(page)) {
            page = InputControl.getJsFileName();
        }
        let data = {
            'page': page,
            'action': InputControl.ajaxAction_getRules,
            'bJSON': 1,
            'bLoadHtml': false
        }
        return $.ajax({
            'type': 'POST',
            'url': InputControl.ajaxUrl,
            'async': false,
            'data': data,
            'dataType': 'json',
            'cache': false
        })
        .done(function(data) {
            if (logTheResult) {
                console.log('InputControl.getRules()', data)
            }
        })
        .fail(function(err) {
            if (logTheResult) {
                console.log('InputControl.getRules() : error', err)
            }
        }).responseJSON ?? null;
        if (getConfig) {
            InputControl.getConfig();
        }
    }

    /**
     * Update info :
     *  - key,
     *  - attributes,
     *  - expected,
     *  - libRule,
     *  - libSubRule
     * 
     * @param {string} rule The rule (◘)
     * @param {string} subRule The subRule (◘)
     * @param {*} fieldValue The field value (value)
     * @param {*} fieldRules The field rules (options)
     * @param {string} fieldName The field name (key)
     * @param {json} fieldsValue The fields value (attributes)
     * @param {json} globalOptions The global options (globalOptions)
     */
    static updateInfo(rule, subRule, fieldValue, fieldRules, fieldName, fieldsValue, globalOptions)
    // static updateInfo(rule, subRule, value, options, key, attributes, expected = undefined, fieldsRules)
    {
        let instance = InputControl.getInstance();
        let fieldsRules = instance.fieldsRules;
        if (InputControl.info.rule !== rule) {
            instance.initRuleResult()
        }
        InputControl.info.rule = rule;
        InputControl.info.subRule = subRule;
        InputControl.info.value = fieldValue;
        InputControl.info.options = fieldRules;
        InputControl.info.key = fieldName;
        InputControl.info.attributes = fieldsValue;
        InputControl.info.globalOptions = globalOptions;
        if (fieldName !== 'single') {
            replaceExpectedValue();
        }
        log('replaceExpectedValue() InputControl.info', InputControl.info);
        /**
         * Replace the expected value.
         * 
         * @example
         * // if the expected value is "{{date.now}}", today will be returned in "yyyy-mm-dd" format
         */
        function replaceExpectedValue()
        {
            // saves the initial expected value
            if (subRule != null) {
                InputControl.info.expectedValue_init = valOr(fieldsRules, [fieldName,rule,subRule]);
            } else {
                InputControl.info.expectedValue_init = valOr(fieldsRules, [fieldName,rule]);
            }
            // is the rule a comparison operator ?
            if ( InputControl.comparisonOperators.contains(subRule) ) {
                // yes: we will replace the expected value if necessary
                InputControl.info.expectedValue = InputControl.getNewExpectedValue();
                a(
                    'replaceExpectedValue(). comparisonOperators',
                    rule,
                    subRule,
                    InputControl.info.expectedValue_init,
                    InputControl.info.expectedValue,
                )
            } else {
                // no: we copy the initial expected value
                InputControl.info.expectedValue = InputControl.info.expectedValue_init;
            }
            // we replace the initial expected value
            if (subRule != null) {
                fieldsRules[fieldName][rule][subRule] = InputControl.info.expectedValue;
            } else {
                log('fieldsRules fieldName', fieldName, fieldsRules, rule, subRule)
                a(
                    'fieldsRules fieldName',
                    // fieldsRules,
                    fieldName,
                    rule,
                    subRule
                )
                fieldsRules[fieldName][rule] = InputControl.info.expectedValue;
            }
        }
    }

    /**
     * Replace all strings by their supplied value
     * 
     * @param {string} str The source string
     * @param {json} replacements All strings to replace and their replacement value
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
        let strBefore = instance.getConfig('str_before_replacement');
        let strAfter = instance.getConfig('str_after_replacement');

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
        a(
            'replaceStr(): str, newStr',
            str,
            newStr
        );
        return newStr;
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
        if (typeof(expectedValue) !== 'string') {
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
        log('getNewExpectedValue() this.info ♥♥', this.info);
        // a('getNewExpectedValue() this.info ♥♥')
        // for each string to replace (eg : "date.now" | "value.startDate" | "startDate")
        for (let i = 0; i < iStringsToReplace; i++) {
            sStrToReplace = aStringsToReplace[i];
            aGroups = sStrToReplace.split('.');
            iGroups = aGroups.length;
            // a('getNewExpectedValue() sStrToReplace', sStrToReplace)
            // copy groups into aNewGroups
            // or generates it if only the second group was supplied
            if (iGroups > 1) {
                aNewGroups = aGroups;
            } else if (iGroups === 1) {
                guessMissingFirstGroup();
            }
            log('getNewExpectedValue() aNewGroups', aNewGroups)
            a('getNewExpectedValue() aNewGroups')
            // on error : continue
            if (
                !Array.isArray(aNewGroups) ||
                (aNewGroups.length < 2)
            ) {
                continue;
            }
            // get replacements from the new groups
            let oReplacements = getReplacementsFromGroups();
            log('oReplacements', oReplacements);
            expectedValue = InputControl.replaceStr(expectedValue, oReplacements);
        }
        return expectedValue;
        /**
         * Guess the first group (because only the second group was defined by the developer)
         */
        function guessMissingFirstGroup()
        {
            // guess the missing first group
            sGroup = sStrToReplace.trim();
            log('guessMissingFirstGroup(): sGroup isField', sGroup, instance.isField(sGroup))
            a('guessMissingFirstGroup(): sGroup isField');
            if (instance.isField(sGroup)) {
                // if field name : 'value'
                aNewGroups = ['value', sGroup];
            } else if ( /^val(ue)?$/i.test(sGroup) ) {
                // if 'value' : 'value'
                aNewGroups = ['value', instance.info.key];
            } else if ( /^rule([ _]?name)?$/i.test(sGroup) ) {
                // if 'rule' : 'rule'
                aNewGroups = ['rule', instance.info.rule];
            } else if ( /^(expected|cmp)([ _]?value)$/i.test(sGroup) ) {
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
            log('guessMissingFirstGroup(): aNewGroups', aNewGroups)
            // a('guessMissingFirstGroup(): aNewGroups')
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
            let oReplacements = {};
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
                    // log('value: oReplacements', oReplacements);
                    // a('value: oReplacements', oReplacements)
                    break;
                case 'rule':
                    fieldName = InputControl.info.key;
                    let fieldRuleName = aNewGroups[1];
                    let fieldRuleValue = instance.getFieldRuleValue(fieldRuleName);
                    addReplacement(fieldRuleValue);
                    // a('rule: fieldName, fieldRuleName, fieldRuleValue, oReplacements ◘ ', fieldName, fieldRuleName, fieldRuleValue, oReplacements)
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
            return oReplacements;
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
                oReplacements[sStrToReplace] = renderedValue ?? value;
            }
        }
    }

    /**
     * Add an invalidity to the rule result
     * 
     * @returns {boolean} If true, we must return the result now (don't check other sub-rules).
     */
    addInvalidity()
    {
        // let format = (
        //     this.getOption('format') ?? 'detailed'
        // )
        // switch ( format ) {
        //     case 'flat':
        //         this.ruleResult.push(
        //             InputControl.generateErrorMessage()
        //         );
        //         break;
        //     case 'grouped':
        //         this.ruleResult[InputControl.info.key].push(
        //             InputControl.generateErrorMessage()
        //         );
        //         break;
        //     case 'detailed':
        //         this.ruleResult.push(
        //             // InputControl.generateErrorMessage()
        //             InputControl.generateErrorResult()
        //         );
        // }
        // return (
        //     this.getOption('stopAfterFirstInvalidity') ?? false
        // );
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
        // a(
        //     'getRuleResult',
        //     this.ruleResult
        // )
        return this.ruleResult;
    }

    // instance methods
    /**
     * Check if MULTIPLE fields are valid and returns the result :
     *  - is data valid ?
     *  - valid fields ?
     *  - invalid fields ?
     *  - if error : what error ?
     * 
     * @returns {json}
     */
    checkAll() {
        console.log('zzz this.fieldsValue', this.fieldsValue);
        let checkAllResult = this.validate(this.fieldsValue);
        console.log('zzz checkAllResult', checkAllResult);
        return checkAllResult;
    }

    /**
     * Collect all fields value and returns whether their content is valid or not, and details
     * 
     * @param {string|HTMLElement|object} elements Selector | DOM element | jQuery object
     * '.field' by default
     * @param {string} fieldName Possibilities :
     *  - 'id' :        The name of each field will match the id of each input
     *  - attrName :    The name of each field will match the value of the specified attribute
     * 
     * @returns {json}
     */
    checkFields(elements = '.field', fieldName = 'id')
    {
        this.fieldsValue = InputControl.collectValues(elements, fieldName);
        log('zzz i', this.fieldsValue)
        a('zzz i')
        return this.checkAll();
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
        let msgSpanId = fieldName + 'Message';
        let $msg = $('#' + msgSpanId);
        let msgCount = $msg.length;
        if (createIfUndefined && (msgCount === 0)) {
            let $input = this.fieldObject(fieldName);
            $input.after(`<span id="${msgSpanId}" class="${this.getConfig('invalid_message_class')}"></span>`);
            return $('#' + msgSpanId);
        }
        return $msg;
    }

    /**
     * Returns the input which is associated to a field name, encapsulated in a jQuery object.
     * 
     * @param {?string} fieldName The field name
     * 
     * @returns {object} Null on failure
     */
    fieldObject(fieldName = null)
    {
        if (fieldName == null) {
            fieldName = this.fieldName;
        }
        return $('#' + fieldName);
    }
         
    /**
     * @getter
     * Returns the config param value (or the default if not setted)
     * 
     * @param {string} paramName The parameter name
     *  
     * @returns {*}
     */
    getConfig(paramName)
    {
        return this.config[paramName] ?? InputControl.defaultConfig[paramName] ?? null;
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
            valOr( InputControl.defaultGlobalOptions, [paramName], null )
        );
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
                this.ruleResult[key] = [];
                break;
            case 'detailed':
                this.ruleResult = [];
        }
    }

    /**
     * Returns wheter a field is valid or not
     * 
     * @param {string} fieldName The field name
     * @param {?*} fieldValue The field value
     * 
     * @returns {boolean}
     */
    isFieldValid(fieldName, fieldValue = null)
    {
        let value, rules;
        if (fieldName !== this.fieldName) {
            this.fieldName = fieldName;
        }
        if (fieldValue === null) {
            fieldValue = this.getFieldValue(fieldName);
            this.fieldValue = fieldValue;
        }
        value = {};
        value[fieldName] = fieldValue;
        rules = {};
        rules[fieldName] = this.fieldsRules[fieldName];
        //this.validateJsResult = validate(
        this.validateJsResult = this.validate(
            value,
            rules,              // here!!
            {format: "grouped"} // grouped (by default) | flat | detailed
        );
        log('♠♠♠ this.validateJsResult', this.validateJsResult)
        this.fieldMessage = this.messageFromValidateResult(false);
        // console.log('◘this.fieldMessage◘', this.fieldMessage)
        // console.log('◘◘', fieldName, fieldValue, this.validateJsResult, (this.validateJsResult == null))
        return (this.validateJsResult == null);
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
     * Returns the input which is associated to a field name, encapsulated in a jQuery object.
     * 
     * @param {?string} fieldName The field name
     * 
     * @returns {object} Null on failure
     */
    getFieldValue(fieldName = null)
    {
        return this.fieldObject(fieldName).value();
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
     * Returns the result from a validate result
     * 
     * @param {json|null} validateResult The validate() result
     * @param {json|null} globalOptions The global options
     * 
     * @returns {string}
     */
    getResultFromValidateResult(validateResult, globalOptions = {'format': 'flat'})
    {
        if (validateResult == null) {
            return;
        }
        let fieldName;
        let rule, subRule, phpRule, phpSubRule, ruleDetail, desiredFormat;
        // let fieldName = validateResult[0].attribute;
        let invalidRulesCount = Object.keys(validateResult).length;
        let aResult, currentResult;
        console.log('getResultFromValidateResult(): validateResult', validateResult)
        // todo
        desiredFormat = valOr(
            globalOptions,
            'format',
            valOr(InputControl.defaultGlobalOptions, 'format', 'grouped')
        );
        switch (desiredFormat) {
            case 'grouped':
            case 'flat':
            case 'detailed':
                aResult = [];
        }
        let fieldValue, fieldsValues, message;
        if (invalidRulesCount > 1) {
            console.log('getResultFromValidateResult(): invalidRulesCount', invalidRulesCount);
        }
        for (let i = 0; i < invalidRulesCount; i++) {
            phpSubRule = null;
            console.log('getResultFromValidateResult(): validateResult[i]', validateResult[i]);
            fieldName = validateResult[i].attribute;
            rule = validateResult[i].validator;
            fieldValue = validateResult[i].value;
            fieldsValues = validateResult[i].attributes;
            ruleDetail = validateResult[i].options;
            switch (rule) {
                case 'length':
                    if (validateResult[i].options.minimum !== undefined) {
                        phpRule = 'minlength';
                    } else if (validateResult[i].options.maximum !== undefined) {
                        phpRule = 'maxlength';
                    }
                    break;
                case 'date':
                    // if (validateResult[i].options.minimum !== undefined) {
                    //     phpRule = 'minlength';
                    // } else if (validateResult[i].options.maximum !== undefined) {
                    //     phpRule = 'maxlength';
                    // }
                    console.log('getResultFromValidateResult() date..', validateResult, fieldsValues, ruleDetail)
                    break;
                default:
                    phpRule = rule;
            }
            message = InputControl.generateErrorMessage(phpRule, phpSubRule, fieldValue, ruleDetail, fieldName, fieldsValues);
            switch (desiredFormat) {
                case 'grouped':
                    currentResult = message;
                    break;
                case 'flat':
                    currentResult = message;
                    break;
                case 'detailed':
                    currentResult = validateResult[i];
                    currentResult.phpRule = phpRule;
                    currentResult.phpSubRule = phpSubRule;
                    // currentResult.error_init = currentResult.error;
                    // currentResult.error = message;
                    // currentResult = {};
                    // currentResult.attribute = fieldName;
                    // currentResult.attributes = fieldsValues;
                    // currentResult.error = message;
                    // currentResult.globalOptions = {format: desiredFormat};
                    // currentResult.options = ruleDetail;
                    // currentResult.validator = rule;
                    // currentResult.value = fieldValue;
            }
            aResult.push(currentResult);
        }
        return aResult;
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
     * Returns whether all the data in the fields is valid
     * 
     * @returns {boolean}
     */
    isValid()
    {
        return this.checkFields();
    }

    /**
     * Listen fields changes
     */
    listenFields()
    {
        let oThis = this;
        let fields = Object.keys(this.fieldsRules);
        let fieldsCount = fields.length;
        for (let i = 0; i < fieldsCount; i++) {
            oThis.fieldName = fields[i];
            oThis.fieldInput = oThis.fieldObject();
            oThis.fieldInput.on('change', function() {
                oThis.fieldName = $(this).attr('id');
                oThis.fieldValue = oThis.getFieldValue();
                oThis.fieldIsValid = oThis.isFieldValid(oThis.fieldName, oThis.fieldValue);
                oThis.setFieldValidity(oThis.fieldName, oThis.fieldIsValid);
                // alert(oThis.getMessage())
            })
        }
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

    setFieldValidity(fieldName, fieldIsValid = null, showMessage = true) {
        if (fieldName == null) {
            fieldName = this.fieldName;
        }
        if (fieldIsValid == null) {
            fieldIsValid = this.isFieldValid(fieldName)
        }
        let $msg = this.fieldMessageObject(fieldName, true);
        console.log(
            'setFieldValidity(): span',
            $msg
        )
        let $input = this.fieldObject(fieldName);
        $input.removeClass(['invalid', 'valid']);
        switch (fieldIsValid) {
            case true:
                $input.addClass('valid');
                if (showMessage) {
                    $msg.html( '' );
                }
                break;
            case false:
                $input.addClass('invalid');
                if (showMessage) {
                    $msg.html( this.getMessage() );
                }
        }
    }

    /**
     * Returns whether supplied fields values are valid.
     * If invalid, error messages will be returned.
     * 
     * @param {json} fieldsValues All fields values
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
        InputControl.info.globalOptions = globalOptions;
        let oThis = this;
        let fieldNames = Object.keys(fieldsValues);
        let valuesCount = fieldNames.length;
        let fieldName, fieldValue, fieldRulesName, fieldRulesCount, oValues, ruleName, oRule, ruleResult, oRules;
        let aPrioritaryRules = ['presence', 'type'], obj;
        let finalResult;
        let desiredFormat = valOr(globalOptions, 'format', 'grouped');
        let continueIfRuleIs = [];
        switch ( desiredFormat ) {
            case 'grouped':
                finalResult = {};
                break;
            case 'flat':
            case 'detailed':
                finalResult = [];
        }
        for (let i = 0; i < valuesCount; i++) {
            fieldName = fieldNames[i];
            fieldValue = fieldsValues[fieldName];
            // log('fieldValue', fieldValue);
            // a('fieldValue')
            oValues = {};
            oValues[fieldName] = fieldValue;
            aPrioritaryRules.forEach(function(prioritaryRule) {
                ruleName = prioritaryRule;
                // ◙◙ type / presence ◙◙
                oRule = valOr(oThis.fieldsRules, [fieldName, ruleName]);
                if (oRule != null) {
                    oRules = {};
                    obj = {};
                    obj[ruleName] = oThis.fieldsRules[fieldName][ruleName];
                    // obj[ruleName] = 'number'; ////////
                    oRules[fieldName] = obj;
                    InputControl.updateInfo(
                        ruleName,
                        null,
                        fieldValue,
                        oRules[fieldName][ruleName],
                        fieldName,
                        fieldsValues,
                        globalOptions
                    );
                    // addMessage();
                    checkWithLib();
                    if (returnResultNow()) {
                        return getResult();
                    }
                    continueIfRuleIs.push(ruleName);
                    // delete oThis.fieldsRules[fieldName][ruleName];
                }
            })
            fieldRulesName = Object.keys(oThis.fieldsRules[fieldName]);
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
                // a(fieldName, ruleName)
                // log('ruleName, ruleval', ruleName, ruleval)
                obj = {};
                obj[ruleName] = oThis.fieldsRules[fieldName][ruleName];
                oRules = {};
                oRules[fieldName] = obj;
                InputControl.updateInfo(
                    ruleName,
                    null,
                    fieldValue,
                    oRules[fieldName][ruleName],
                    fieldName,
                    fieldsValues,
                    globalOptions
                );
                // addMessage();
                checkWithLib();
                if (returnResultNow()) {
                    // a(fieldName, ruleName, ruleResult)
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
            log('checkWithLib(): oValues, oRules, ruleResult', oValues, oRules, ruleResult)
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
            // log('ruleResult', ruleResult)
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
            // a(
            //     'initialMessage , newMessage',
            //     initialMessage,
            //     newMessage
            // )
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
            // let defaultMessages = oThis.config.default_messages;
            // log('defaultMessages', defaultMessages)
            let message =
                // valOr(oRules, [fieldName,ruleName,'message']) ??
                // valOr(defaultMessages, [ruleName,ruleName]) ??
                // valOr(defaultMessages, [ruleName]) ??
                // valOr(oRules, [fieldName,'message']) ??
                InputControl.generateErrorMessage(prependField);
            // if (
            //     !prependField
            //     && (message.substring(0,1) !== '^')
            // ) {
            //     message = '^' + message;
            // }
            log('getMessage(): message', message)
            return message;
        }
        /**
         * Add the invalid message (fr)
         */
        function addMessage()
        {
            let message = getMessage();
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
        log('getResult(): ruleResult', ruleResult);
        return (
            ruleResult
        );
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