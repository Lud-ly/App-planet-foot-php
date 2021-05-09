/**
 * Permite to format a tel input and to check whether the phone number entered by the user is valid or not..
 * 
 * A space or any character you want is inserted after each telephone number block.
 * 
 * 
 * ◘ Validation
 * 
 * Input tel number is automatically checked on 'keyup' and :
 *      - 'valid' / 'invalid' class is applied.
 *      - 'valid' / 'invalid' event is trigerred.
 * 
 * 
 * ◘ Config
 * 
 * You can see the detail of the config in TelInputMask.defaultConfig.
 * 
 * 
 * ◘ Setting Up
 * 
 * @example
 * 
 * // With default config :
 * let instance = TelInputMask.add('#tel_input')
 * 
 * // With customized config :
 * let config = TelInputMask.getDefaultConfig()
 * config.delimiter = '.'
 * config.pattern_internationalIndicativeCode = '33|32' (to accept telephone numbers from France and Belgium)
 * let instance = TelInputMask.add('#tel_input', config)
 * 
 * // when the 'tel' field is modified and has a VALID number
 * $('#tel_input').on('valid', function() {
 *      new_tel_number = $(this).attr('data-value')
 * })
 * 
 * // when the 'tel' field is modified and has an INVALID number
 * $('#tel_input').on('valid', function() {
 *      new_tel_number = '';
 * })
 * 
 * 
 * @requires jQuery
 * @requires "utils.js"
 * 
 * // Good use  ;)
 * 
 * @author Damien Grember <dgrember@gmail.com> France, Herault 34
 * Trained by Learning Masters Numérique Digital :
 *    • Jean-Jacques Pagan
 *    • Thomas Gonzalez Vegas
 * Thank you to them, to my colleagues and to the afpanier project team :)
 * @copyright Free use for Afpanier project
 * @version 1.0
 */
class TelInputMask {

    // ◘ > CLASS PROPERTIES < ◘

    /**
     * @static
     * @property {JSON} defaultConfig The config which is applied on each element by default.
     */
    static defaultConfig = {
        /**
         * @var {bool} franceOnly If true, '33' will be the indicative. Otherwise : 1 followed by one digit.
         */
        'franceOnly':							true,
        /**
         * @var {bool} format Format the phone number ?
         */
        'format':								true,
        /**
         * @var {string} delimiter The character which will be inserted between digits groups
         */
        'delimiter':							' ',
        /**
         * @var {bool} replaceInternationalIndicative If true, '+33' or '0033' will be replaced by '0'
         * (for instance in France)
         */
        'replaceInternationalIndicative':		true,
        /**
         * @var {bool} applyDynamicPattern If true, if the tel is valid, a pattern of the value of the text string will be applied
         * in attribute to make the entry appear valid. If invalid, a different pattern will be applied to make it appear invalid..
         */
        'applyDynamicPattern':					true,
        /**
         * @var {bool} triggerEventsDuringInstantiation If true, "change_validity", "valid" or "invalid" event will be triggered when instantiating.
         */
        'triggerEventsDuringInstantiation':		false,
        /**
         * @var {string} pattern_secondDigit The second digit pattern.
         */
        'pattern_secondDigit':					'4|6|7',
        /**
         * @var {string} pattern_charactersToFilter This pattern will be applied on each characters,
         * to filter only digits for instance.
         */
        'pattern_charactersToFilter':			'[0-9+]',
        /**
         * @var {string} pattern_internationalIndicativeCode Auto-generated : international indicative pattern.
         */
        'pattern_internationalIndicativeCode':	'auto',
        /**
         * @var {string} pattern_tel Auto-generated : tel number pattern.
         */
        'pattern_tel':							'auto'
    };

    /**
     * @static
     * @property {array} instances All the instances;
     */
    static instances = [];


    // ◘ > INSTANCE PROPERTIES < ◘

    /**
     * @property {JSON} config The config.
     */
    config;

    /**
     * @property {String|HTMLElement|jQuery} input The targetted input. It can be a selector or directly the DOM element, in a jQuery Object or not.
     */
    input;


    // ◘ > CONSTRUCTOR < ◘

    /**
     * Create an instance and link it to the supplied input.
     * Apply the effects directly to the input.
     * 
     * @param {String|HTMLElement|jQuery} input The targetted input. It can be a selector or directly the DOM element, in a jQuery Object or not.
     * @param {JSON|'auto'} config The config to apply. You have 2 possibilities:
     *   - 'auto': 			apply the default config (visible below)
     *   - {your_config}: 	apply your config.
     * 
     * To see all possibilities, you can call getDefaultConfig().
     * 
     * The default config is as follows:
     * @example
     * oConfig = {
     *   'franceOnly':							true,
     *   'format':								true,
     *   'delimiter':							' ',
     *   'replaceInternationalIndicative':		true,
     *   'applyDynamicPattern':					true,
     *   'triggerEventsDuringInstantiation':	false,
     *   'pattern_secondDigit':					'4|6|7',
     *   'pattern_charactersToFilter':			'[0-9+]',
     *   'pattern_internationalIndicativeCode':	'auto',
     *   'pattern_tel':							'auto'
     * }
     * 
     * // Once the constructor is called, the instance can be accessed directly like this:
     * 
     * let instance = TelInputMask.obj('#tel_input')
     * 
     * @todo Controls before assignment.
     */
    constructor(input, config = 'auto') {
        if ($(input).data('TelInputMask') != undefined) {
            throw new Error("This DOM element is already linked to a TelInputMask object. \nThe instance is accessible like this: \nlet instance = $ (input) .data ('TelInputMask')")
        }
        // save the input
        if ($(input)[0] == undefined) {
            throw new Error("Missing input. You can provide a selector (ex: '.telInput'), a HTMLElement (ex: \"document;getElementById('myInput'))\", or a jQuery Object (ex: $('#myInput')).");
        }
        this.input = $(input)[0];
        // save the config
        let iConfigLength, sKey, providedParamValue;
        this.config = TelInputMask.getDefaultConfig();
        if (typeof(config) === 'object') {
            iConfigLength = Object.keys(config).length;
            for (let i = 0; i < iConfigLength; i++) {
                sKey = Object.keys(config)[i];
                providedParamValue = config[sKey];
                // if the parameter provided does not exist in the default config : iterates
                if (this.config[sKey] === undefined) {
                    continue;
                }
                // if the type of the parameter provided is different from that of the default value: iterates
                if ( typeof(providedParamValue) !== typeof(this.config[sKey]) ) {
                    log('telInputMask >>> diff type >>>', providedParamValue, this.config[sKey]);
                    continue;
                }
                // ok : copy the provided param into instance config
                this.config[sKey] = providedParamValue;
            }
            log('telInputMask >>> this.config >>>', this.config)
        }
        // generates patterns from config
        if (this.config.pattern_internationalIndicativeCode === 'auto') {
            this.config.pattern_internationalIndicativeCode = (this.config.franceOnly ? '33' : '[1-9]\\d');
        }
        if (this.config.pattern_tel === 'auto') {
            this.config.pattern_tel = '^(0|((\\+|00)' + this.config.pattern_internationalIndicativeCode + '))(' + this.config.pattern_secondDigit + ')\\d{8}$';
        }
        // link this instance to the input
        $(input).data('TelInputMask', this);
        // save the instance
        TelInputMask.instances.push(this);
        // apply the effects on the input
        this.start();
    }


    // ◘ > CLASS METHODS < ◘

    /**
     * @static
     * Create an instance and link it to the supplied input.
     * Apply the effects directly to the input.
     * 
     * @param {string|HTMLElement|jQuery} input The targetted input. It can be a selector or directly the DOM element, in a jQuery Object or not.
     * @param {JSON} config The config to apply. To see all possibilities, you can watch 'TelInputMask.defaultConfig'
     * 
     * @example
     * // Once the constructor is called, the instance can be accessed directly like this:
     * let instance = TelInputMask.add('#tel_input', 'auto');
     * 
     * // You can then also find the instance like this :
     * let instance = TelInputMask.obj('#tel_input')
     * 
     * @todo Controls before assignment.
     * 
     * @returns {Object} The new instance.
     */
    static add(input, config = 'auto') {
        let instance = new TelInputMask(input, config);
        return instance;
    }

    /**
     * @static
     * Returns the instance which is associated with the input.
     * 
     * @param {String|HTMLElement|jQuery} input The targetted input. It can be a selector or directly the DOM element, in a jQuery Object or not.
     * 
     * @example
     * TelInputMask.obj('#tel_input')
     * 
     * @returns {Object} The instance.
     */
    static obj(input) {
        return $(input).data('TelInputMask');
    }

    /**
     * @static
     * Returns the default config.
     * The explanations on the different parameters are given in 'TelInputMask.defaultConfig'
     * 
     */
    static getDefaultConfig() {
        return Object.assign({}, TelInputMask.defaultConfig);
    }

    /**
     * @static
     * Modify the default config.
     * 
     * @param {JSON} config The config to apply to each new instance whose config is the default.
     * 
     * @todo Controls before assignment.
     */
    static setDefaultConfig(config) {
        if (typeof(config) !== 'object') {
            throw new TypeError("The config must be a JSON object.")
        }
        TelInputMask.defaultConfig = config;
    }

    /**
     * @static
     * Restarts the actions on all the inputs linked to the instances
     * 
     */
    static start() {
        TelInputMask.instances.forEach(
            instance => instance.start()
        )
    }

    /**
     * @static
     * Stops the actions on all the inputs linked to the instances
     * 
     */
    static stop() {
        TelInputMask.instances.forEach(
            instance => instance.stop()
        )
    }


    // ◘ > INSTANCE METHODS < ◘

    /**
     * Returns the instance config
     * 
     * @returns {JSON}
     */
    getConfig() {
        return this.config;
    }

    /**
     * To be used after a stop(), if you want to restart actions on the input.
     * 
     */
    start() {
        let sVal, sChar;
        let oConfig = this.config;
        let input = this.input;
        // keydown: storage of the last values (for the management of ctrl + z)
        $(input).off('keydown.saveValue');
        $(input).on('keydown.saveValue', function(e) {
            if (e.which === 8) {	// backspace
                let iCaretPosition = e.target.selectionStart;
                // if no text is selected
                if (iCaretPosition === e.target.selectionEnd) {
                    sChar = input.value.substr(iCaretPosition - 1, 1);
                    // if selector placed after a space
                    if (str_getN(sChar, '') === '') {
                        // we move the selector one character to the left
                        // so that the previous character can be deleted
                        setCaretPosition(input, iCaretPosition - 1);
                    }
                }
            }
            sVal = this.value;
            let aData = $(this).data('previous');
            let oNewData = {
                'val':	sVal
            };
            if (aData == undefined) {
                aData = [oNewData];
                $(this).data('previous', aData);
            } else if (aData[aData.length - 1].val !== sVal) {
                aData.push(oNewData);
            }
            // log('saved', aData)
        })
        // keyup: 
        $(input).off('keyup.filterReplaceFormatCheck');
        $(input).on('keyup.filterReplaceFormatCheck', function(e) {
            filterReplaceFormatCheck.call(this, e);
        })
        filterReplaceFormatCheck.call(
            input,
            {
                falseEvent: true,  // to ignore the control of pressed keys
                target:
                {
                    selectionStart: $(input).val().length // to place the selector at the end of the text
                }
            }
        );
        function filterReplaceFormatCheck(e) {
            let bFilter, bReplace, bFormat, sTel;
            let iCaretPosition, sVal, aStr;
            let bFalseEvent = (e.falseEvent === true);
            if (!bFalseEvent) {
                if (e.ctrlKey) {
                    switch (e.which) {
                        case 65:	// ctrl + a
                        case 67:	// ctrl + c
                            return;
                        case 90:	// ctrl + z (improvable)
                            let aData = $(this).data('previous');
                            if (aData.length > 0) {
                                this.value = aData[aData.length - 2].val;
                            }
                            break;
                        default:
                            // alert(e.which)
                            return;
                    }
                }
                if (e.which === 17) {
                    return;
                }
            }
            // log('e.ctrlKey, e.which, e ◘◘ ', e.ctrlKey, e.which, e)
            bFilter = 	(typeof(oConfig.pattern_charactersToFilter) === 'string'
                        && !isEmpty(oConfig.pattern_charactersToFilter));
            // bFilter = $(this).hasAttr('filter');
            bReplace = oConfig.replaceInternationalIndicative;
            // bReplace = $(this).hasAttr('replace');
            bFormat = oConfig.format;
            // bFormat = $(this).hasAttr('format');
            if (bFilter) {
                iCaretPosition = e.target.selectionStart;
                sVal = this.value;
                aStr = {
                    before_sel:	sVal.substring(0, iCaretPosition),
                    after_sel:	sVal.substring(iCaretPosition)
                }
                aStr.before_sel = filterString(aStr.before_sel, oConfig.pattern_charactersToFilter);
                aStr.after_sel = filterString(aStr.after_sel, oConfig.pattern_charactersToFilter);
                this.value = aStr.before_sel + aStr.after_sel;
                iCaretPosition = aStr.before_sel.length;
                setCaretPosition(this, iCaretPosition);
            }
            if (bReplace) {
                iCaretPosition = e.target.selectionStart;
                sVal = this.value;
                aStr = {
                    before_sel:	sVal.substring(0, iCaretPosition),
                    after_sel:	sVal.substring(iCaretPosition)
                }
                aStr.before_sel = tel_replaceInternationalIndicative(aStr.before_sel, oConfig.pattern_internationalIndicativeCode);
                iCaretPosition = aStr.before_sel.length;
                this.value = aStr.before_sel + aStr.after_sel;
                setCaretPosition(this, iCaretPosition);
            }
            if (bFormat) {
                let sInit, sFormated;
                iCaretPosition = iCaretPosition ?? e.target.selectionStart;
                sInit = this.value.substr(0, iCaretPosition);
                sVal = formatTelNumber(this.value, oConfig.franceOnly, oConfig.delimiter);
                this.value = sVal;
                for (let i = iCaretPosition; i < sVal.length; i++) {
                    sFormated = sVal.substr(0, i);
                    if (str_isNEqual(sInit, sFormated, '+')) {
                        setCaretPosition(this, i);
                    }
                }
            }
            let bTriggerEvent = (!bFalseEvent || oConfig.triggerEventsDuringInstantiation);
            sTel = str_getN(this.value, '+');
            let re = RegExp(oConfig.pattern_tel)
            if (re.exec(sTel) !== null) {
                // VALID
                $(this).removeClass('invalid');
                $(this).addClass('valid');
                if (oConfig.applyDynamicPattern) {
                    $(this).attr('pattern', patternize('^' + this.value + '$'));
                }
                if ($(this).attr('data-value') != sTel) {
                    // update the 'data-value' attr
                    $(this).attr('data-value', sTel);
                    if (bTriggerEvent) {
                        $(this).trigger('valid');
                        $(this).trigger('change_validity');
                    }
                }
            } else {
                // INVALID
                $(this).removeClass('valid');
                $(this).addClass('invalid');
                if (oConfig.applyDynamicPattern) {
                    $(this).attr('pattern', patternize('^◘ invalid ◘>>' + this.value + '<<◘◘$'));
                }
                if (($(this).attr('data-value') != undefined)) {
                    // delete the 'data-value' attr
                    $(this).removeAttr('data-value');
                    if (bTriggerEvent) {
                        $(this).trigger('invalid');
                        $(this).trigger('change_validity');
                    }
                }
            }
        }
    }

    /**
     * Stop actions on the input
     * 
     */
    stop() {
        $(this.input).off('keydown.saveValue');
        $(this.input).off('keyup.filterReplaceFormatCheck');
    }

    /**
     * Returns the value (the phone number if valid, without spaces or special characters)
     * 
     * @returns {string}
     */
    val() {
        return $(this.input).attr('data-value');
    }
}