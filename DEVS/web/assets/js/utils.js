// ◙◙ FILE INTEGRATED IN THE PROJECT ◙◙
// ◙◙ GLOBAL FUNCTIONS


// ◘◘ >> DATES

/**
 * Returns whether a date exists.
 * A string date in YYYY-MM-DD format can be supplied in first argument.
 * 
 * @param {number|string} iDay Day number
 * @param {number|string} iMonth Month number
 * @param {number|string} iYear Year
 * 
 * @returns {boolean} True if the date exists
 */
 function isDateValid(iDay, iMonth = null, iYear = null) {
    iMonth = +iMonth;
    iYear = +iYear;
    iDay = +iDay;
    if (iDay < 1 || iMonth < 1 || iMonth > 12) {
        return false;
    }
    return iDay > getDaysMonth(iMonth, iYear) ? false : true;
}

/**
 * Returns the number of days present in the month of a given year
 * 
 * @param {number|string} iMonth Month number
 * @param {number|string} iYear Year
 * 
 * @returns {number} Integer
 */
function getDaysMonth(iMonth, iYear) {
    iMonth = +iMonth;
    iYear = +iYear;
    if (iMonth == 2) {
        if (iYear % 4 == 0) {
            if (iYear % 100 == 0) {
                return (iYear % 400 == 0) ? 29 : 28
            }
            return 29
        }
        return 28
    }
    if (iMonth < 8) {
        return (iMonth % 2 == 0) ? 30 : 31
    }
    return (iMonth % 2 == 1) ? 30 : 31
}

/**
 * Returns the date with a zero before the day and month if less than or equal to 9
 * 
 * @param {string} sDate The desired date
 * 
 * @returns {string}
 */
function getDateWithZero(sDate = '2020-4-1') {
    let aDate = sDate.split('-');
    if (aDate[0].length === 1) { aDate[0] = '0' + aDate[0]; }
    if (aDate[1].length === 1) { aDate[1] = '0' + aDate[1]; }
    if (aDate[2].length === 1) { aDate[2] = '0' + aDate[2]; }
    return aDate.join('-');
}



// ◘◘ >> MIXED

/**
 * Returns if a data is empty or not
 * 
 * @param {*} val The value to check
 * 
 * @returns {boolean}
 */
function isEmpty(val) {
    if (val == null) {
        return true;
    }
    switch (typeof(val)) {
        case 'string':
            return (val.trim() === '');
        case 'object':
            return (Object.keys(val).length === 0);
        default:
            return false;
    }
}

/**
 * Return a value, or a specified value if error/null
 *  let o = {
		'prop_1': {
			'prop_1_A': {
				'prop_1_B': 'val_1_B'
			}
		}
	}
	valOr(o,   "prop_1, TOTO; prop_1_B",   "not found")             // will return 'not found'
	valOr(o,   "prop_1, prop_1_A; prop_1_B",   "not found")         // will return 'val_1_B'

* @param {Object|*} val The value | object
* @param {string|Array} keysIfInObject If Object provided, the keys to check
* @param {*} valOtherwise Value to return if error|null value
* 
* @returns {*}
*/
function valOr(val, keysIfInObject = '', valOtherwise = undefined) {
    if (isEmpty(keysIfInObject)) {
        return getResult(obj);
    }
    keysIfInObject = toArray(keysIfInObject);
    try {
        let value = val;
        for (let i = 0; i < keysIfInObject.length; i++) {
            value = value[keysIfInObject[i]];
        }
        return getResult(value);
    } catch (err) {
        return valOtherwise;
    }

    function getResult(val) {
        return (val == null) ?
            valOtherwise :
            val;
    }
}




// ◘◘ >> STRING

/**
 * Returns a string with as many character before reaching the number of characters specified in argument.
 * 
 * @param {string|Integer} str The source string
 * @param {string} len The desired length 
 * @param {string} chr The caracter to prepend
 * 
 * @returns {string}
 */
function getPrefixedString(str, len = 2, chr = '0') {
    str = '' + str;
    let iNbZerosAAjouter = len - str.length;
    for (let i = 0; i < iNbZerosAAjouter; i++) {
        str = chr + str;
    }
    return str;
}

/**
 * Returns the possible accents
 * 
 * @param {boolean} bCommonAccents
 *  - true:             returns only the common accents
 *  - false:            returns only the uncommon accents
 * @param {string} sDesiredFormat
 *  - 'json':           returns a JSON, the most detailed
 *  - 'arr'|'array':    returns an array, values only (without corresponding unaccented letters)
 *  - 'str'|'string':   returns a string, values only without delimiter
 * 
 * @returns {JSON}
 */
function getAccents(bCommonAccents = true, sDesiredFormat = 'json') {
    let oAccents;
    const oCommonAccents = {
        'OE': 'Œ',
        'oe': 'œ',
        'AE': 'Æ',
        'ae': 'æ',
        'A': 'ÀÂ',
        'a': 'àâ',
        'C': 'Ç',
        'c': 'ç',
        'E': 'ÈÉÊ',
        'e': 'èéê',
        'I': 'Î',
        'i': 'î',
        'O': 'Ô',
        'o': 'ô',
        'U': 'ÙÛ',
        'u': 'ùû',
    }
    const oUncommonAccents = {
        'A': 'ÄÁ',
        'a': 'äá',
        'E': 'Ë',
        'e': 'ë',
        'I': 'ÏÍ',
        'i': 'ïí',
        'O': 'ÖÓ',
        'o': 'öó',
        'U': 'ÜÚ',
        'u': 'üú',
        'N': 'Ñ',
        'n': 'ñ',
        's': 'ß',
    }
    switch (bCommonAccents) {
        case true:
            oAccents = oCommonAccents;
            break;
        case false:
            oAccents = oUncommonAccents;
    }
    if (/json/i.exec(sDesiredFormat)) {
        return oAccents;
    }
    if (/arr(ay)?/i.exec(sDesiredFormat)) {
        return Object.values(oAccents);
    }
    if (/str(ing)?/i.exec(sDesiredFormat)) {
        return Object.values(oAccents).join('');
    }
}

/**
 * Returns the string with all accents replaced
 * 
 * @param {string} str The source string
 * @param {boolean} onlyMostCommonAccents 3 possibilities:
 *  - false:            replace all the accents
 *  - true|'common':    replace only the most common accents
 *  - 'uncommon':       replace only the uncommon accents
 * 
 * @returns {string}
 * @link https://alt-codes.fr/diacritiques-alphabet-francais/
 */
function str_replaceAccents(str, onlyMostCommonAccents = true) {
    let oAccents, aKeys, sCharactersWithoutAccents, sAccentedCharacters, rPattern;
    switch (onlyMostCommonAccents) {
        case true:
            return str_replaceAccents(str, 'common');
        case false:
            str = str_replaceAccents(str, 'common');
            return str_replaceAccents(str, 'uncommon');
        case 'common':
            oAccents = getAccents(true);
            break;
        case 'uncommon':
            oAccents = getAccents(false);
    }
    aKeys = Object.keys(oAccents);
    for (let i = 0; i < aKeys.length; i++) {
        sCharactersWithoutAccents = aKeys[i];
        sAccentedCharacters = oAccents[sCharactersWithoutAccents];
        rPattern = RegExp(`[${sAccentedCharacters}]`, 'gm');
        str = str.replace(rPattern, sCharactersWithoutAccents);
    }
    return str;
}

/**
 * Format a string
 * 
 * @param {string} str 
 * @param {string} format 'uppercase' | 'lowercase' | ''
 * 
 * @returns {string}
 */
function str_format(str, format) {
    format = str_filter(format, 'A-Z0-9', false);
    if (/trim/i.exec(format)) {
        // trim desired
        return str.trim();
    }
    if (/(lc)|(to)?(lower(case)?)|min(uscules?)?/i.exec(format)) {
        // lower case desired
        return str.toLowerCase();
    }
    if (/(uc)|(to)?(upper(case)?)|maj(uscules?)?/i.exec(format)) {
        // upper case desired
        return str.toUpperCase();
    }
    // initial desired
    return str;
}

/**
 * Filter a string.
 * 
 * @param {string} str The source string
 * @param {string} sCharactersToKeep What characters to keep ? Will be placed between square brackets in the pattern. ex : 'A-Z0-9'
 * @param {boolean} bCaseSensitive Case sensitive ?
 * @param {string} sFormat The 'str_format()' result format
 * 
 * @returns {string}
 */
function str_filter(str, sCharactersToKeep = 'A-Z0-9', bCaseSensitive = false, sFormat = null) {
    let rPattern, sFlags;
    sFlags = (bCaseSensitive) ? 'gm' : 'igm';
    rPattern = RegExp(`[^${sCharactersToKeep}]`, sFlags);
    str = str.replace(rPattern, '');
    return (sFormat == null) ? str : str_format(str, sFormat);
}

/**
 * Returns all letters from a string having replaced the accents with unaccented letters.
 * 
 * @param {string} str  The source string
 * @param {boolean} bReplaceAccents  :
 *  - false:   Keep accents
 *  - true:    Replace accents with unaccented letters
 * @param {string} sOtherCharactersToKeep  Other characters to keep. Ex: '!?:' | '0-9'...
 * @param {string} sResultFormat  The 'str_format()' result format
 * @param {boolean} bOnlyMostCommonAccents  :
 *  - true:    Only most common accents
 *  - false:   All accents (most common and uncommon)
 * 
 * @returns {string}
 */
function str_getA(str, bReplaceAccents = false, sOtherCharactersToKeep = '', sResultFormat = '', bOnlyMostCommonAccents = true) {
    let sCharactersToKeep = 'A-Z' + sOtherCharactersToKeep ?? '';
    if (bReplaceAccents) {
        str = str_replaceAccents(str, bOnlyMostCommonAccents);
    } else {
        sCharactersToKeep += getAccents(true, 'string');
        if (!bOnlyMostCommonAccents) {
            sCharactersToKeep += getAccents(false, 'string');
        }
    }
    str = str_filter(str, sCharactersToKeep, false);
    return str_format(str, sResultFormat);
}

/**
 * Returns all letters from a string having replaced the accents with unaccented letters.
 * By default, takes into account '.' (you can modify this thanks to the parameter 'sOtherCharactersToKeep').
 * 
 * @param {string} str  The source string
 * @param {boolean} bReplaceAccents  :
 *  - false:   Keep accents
 *  - true:    Replace accents with unaccented letters
 * @param {string} sOtherCharactersToKeep  Other characters to keep. Ex: '!?:' | '0-9'...
 * @param {string} sResultFormat  The 'str_format()' result format
 * @param {boolean} bOnlyMostCommonAccents  :
 *  - true:    Only most common accents
 *  - false:   All accents (most common and uncommon)
 * 
 * @returns {string}
 */
function str_getAN(str, bReplaceAccents = false, sOtherCharactersToKeep = '.', sResultFormat = '', bOnlyMostCommonAccents = true) {
    return str_getA(str, bReplaceAccents, '0-9' + sOtherCharactersToKeep, sResultFormat, bOnlyMostCommonAccents);
}

/**
 * Returns all figures from a string.
 * By default, takes into account '.' (you can modify this thanks to the parameter 'sOtherCharactersToKeep').
 * 
 * @param {string} str  The source string
 * @param {string} sOtherCharactersToKeep  Other characters to keep. Case insensitive. Ex: ',.€'...
 * @param {string} sResultFormat  The 'str_format()' result format
 * 
 * @returns {string}
 */
function str_getN(str, sOtherCharactersToKeep = '.', sResultFormat = '') {
    let sCharactersToKeep = '0-9' + sOtherCharactersToKeep ?? '';
    str = str_filter(str, sCharactersToKeep, false);
    return str_format(str, sResultFormat);
}

/**
 * Returns if 2 string contains the same alphanumeric content (the same letters and figures in the same order)
 * By default, takes into account '.' (you can modify this thanks to the parameter 'sOtherCharactersToKeep').
 * 
 * @param {string} str1
 * @param {string} str2
 * @param {boolean} bCaseSensitive  Case sensitive ?
 * @param {boolean} bAccentsSensitive  Accents sensitive ?
 * @param {string} sOtherCharactersToKeep  Other characters to keep.  Ex: '!?%:'...
 * 
 * @returns {boolean}
 */
function str_isANEqual(str1, str2, bCaseSensitive = false, bAccentsSensitive = false, sOtherCharactersToKeep = '.') {
    let bReplaceAccents = !bAccentsSensitive;
    let sResultFormat = (bCaseSensitive) ?
        '' :
        'lower';
    return (str_getAN(str1, bReplaceAccents, sOtherCharactersToKeep, sResultFormat, true) == str_getAN(str2, bReplaceAccents, sOtherCharactersToKeep, sResultFormat, true));
}

/**
 * Returns if 2 string contains the same alpha content (the same letters in the same order).
 * 
 * @param {string} str1
 * @param {string} str2
 * @param {boolean} bCaseSensitive  Case sensitive ?
 * @param {boolean} bAccentsSensitive  Accents sensitive ?
 * @param {string} sOtherCharactersToKeep  Other characters to keep.  Ex: '!?%:'...
 * 
 * @returns {boolean}
 */
function str_isAEqual(str1, str2, bCaseSensitive = false, bAccentsSensitive = false, sOtherCharactersToKeep = '') {
    let bReplaceAccents = !bAccentsSensitive;
    let sResultFormat = (bCaseSensitive) ?
        '' :
        'lower';
    return (str_getA(str1, bReplaceAccents, sOtherCharactersToKeep, sResultFormat, true) === str_getA(str2, bReplaceAccents, sOtherCharactersToKeep, sResultFormat, true));
}

/**
 * Returns if 2 string contains the same numeric content (the same figures in the same order).
 * By default, takes into account '.' (you can modify this thanks to the parameter 'sOtherCharactersToKeep').
 * 
 * @param Mixed val1  The first value to compare (string or number)
 * @param Mixed val2  The second value to compare (string or number)
 * @param {string} sOtherCharactersToKeep  Other characters to keep.  Ex: '!?%:'...
 * 
 * @returns {boolean}
 */
function str_isNEqual(val1, val2, sOtherCharactersToKeep = '.') {
    val1 = (typeof(val1) === 'string') ?
        str_getN(val1, sOtherCharactersToKeep, '') :
        '' + val1;
    val2 = (typeof(val2) === 'string') ?
        str_getN(val2, sOtherCharactersToKeep, '') :
        '' + val2;
    return (val1 == val2);
}

/**
 * Format a tel number. The tel number can begin with :
 *  - 0[1-9] 	(01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09)
 *  - +33[1-9]
 *  - 0033[1-9]
 *  - 1-9 followed by any other number instead of '33' if 'frenchOnly' is set to false.
 * 
 * Returns the initial string if no phone number format detected.
 * 
 * @param {string} telNumber The source tel number
 * @param {bool} franceOnly If true, accept only french phone number
 * @param {string} delimiter The desired delimiter (one space by default)
 * 
 * @returns {string} The formatted tel number
 */
function formatTelNumber(telNumber, franceOnly = true, delimiter = ' ') {
    telNumber = str_getN(telNumber, '+');
    // if begins with 0[1-9]
    if (/^0[1-9]\d{1,8}$/.exec(telNumber)) {
        return telNumber.replace(/(.{2})(?=.)/g, "$1" + delimiter);
    }
    // if begins with 00xxx or +xxx
    let sCountry = (franceOnly ? '33' : '[1-9]\\d');
    let pattern = `^(?<start>(?:\\+|00)${sCountry}[1-9])(?<end>\\d{1,8})$`;
    let re = RegExp(pattern);
    aMatch = re.exec(telNumber)
    if (aMatch != null) {
        return aMatch.groups.start + delimiter + aMatch.groups.end.replace(/(.{2})(?=.)/g, "$1" + delimiter);
    }
    return telNumber;
}

/**
 * Escapes non-alpha-decimal characters
 * 
 * @param {string} str The source string
 * 
 * @returns {string}
 */
function escapeChars(str) {
    return str.replace(/([\W]+)/g, '\\$1');
}

/**
 * Convert specials HTML entities HTML in character.
 * 
 * @ignore This function has been moved from 'adm_admin.js'. It doesn't seem to be used.
 */
function htmlspecialchars_decode(str) {
    if (typeof(str) == "string") {
        str = str.replace(/&amp;/g, "&");
        str = str.replace(/&quot;/g, "\"");
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/&lt;/g, "<");
        str = str.replace(/&gt;/g, ">");
    }
    return str;
}



// ◘◘ >> NUMBER

/**
 * Returns a string with as many '0' before reaching the number of characters specified in argument.
 * 
 * @param {string|Integer} str The source number
 * @param {string} len The desired length 
 * 
 * @returns {string}
 */
function getNumberWithZero(number) {
    return getPrefixedString(number, 2, '0');
}

/**
 * Returns a random integer
 * 
 * @param {number} min 
 * @param {number} max
 * 
 * @returns {number}
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




// ◘◘ >> OBJECT

/**
 * Search among the value of each element of an array
 * 
 * @param Object haystack The source Array | JSON
 * @param Mixed needle What you are looking for
 * @param {string} sStringFilter If you are looking for text :
 *  - 'AN' :    Compare only the alphanumeric content (all letters and figures)
 *  - 'A' :     Compare only the alpha content (all letters)
 *  - 'N' :     Compare only the numeric content (all figures)
 * @param {string} desiredReturn The return you want :
 *  'boolean' :     a boolean (by default)
 *  'key' :         the array key
 *  'value' :       the array value
 *  'index' :       the array index (the needle position into the array : index 0 corresponds to the 1st element)
 *  'all'|'json' :  all previous elements returned in a JSON
 * @param {boolean} bCaseSensitive Case sensitive ?
 * @param {boolean} bAccentsSensitive Accents sensitive ?
 * @param {string} sOtherCharactersToKeep Other characters to keep.  Ex: '!?%:'...
 * 
 * @returns {*}
 */
function obj_contains(haystack, needle, sSearchAmong = 'values', desiredReturn = 'boolean', sStringFilter = 'AN', bCaseSensitive = false, bAccentsSensitive = false, sOtherCharactersToKeep = '.') {
    let aKeys, i, bSearchAmongKeys, aInWhichToLook, content, sType, fct;
    aKeys = Object.keys(haystack);
    bSearchAmongKeys = (/keys?/i.exec(sSearchAmong));
    aInWhichToLook = (bSearchAmongKeys) ?
        aKeys :
        Object.values(haystack);
    for (i = 0; i < aInWhichToLook.length; i++) {
        content = aInWhichToLook[i];
        sType = typeof(content);
        if (sType === 'string') {
            switch (sStringFilter) {
                case 'AN':
                case 'an':
                    if (str_isANEqual(content, '' + needle, bCaseSensitive, bAccentsSensitive, sOtherCharactersToKeep)) {
                        return getResult(true);
                    }
                    break;
                case 'A':
                case 'a':
                    if (str_isAEqual(content, '' + needle, bCaseSensitive, bAccentsSensitive, sOtherCharactersToKeep)) {
                        return getResult(true);
                    }
                    break;
                case 'N':
                case 'n':
                    if (str_isNEqual(content, '' + needle, sOtherCharactersToKeep)) {
                        return getResult(true);
                    }
                    break;
                default:
                    if (content === ('' + needle)) {
                        return getResult(true);
                    }
            }
        } else if (sType === 'number' && content == needle) {
            return getResult(true);
        }
    }
    return getResult();

    function getResult(bFound = false) {
        if (/bool(ean)?/i.exec(desiredReturn)) {
            // return a BOOLEAN
            return (bFound) ? true : false;
        }
        if (/key?/i.exec(desiredReturn)) {
            // return the KEY
            return (bFound) ? aKeys[i] : null;
        }
        if (/val(ue)?/i.exec(desiredReturn)) {
            // return the VALUE
            return (bFound) ? haystack[aKeys[i]] : null;
        }
        if (/ind(ex)?/i.exec(desiredReturn)) {
            // return the INDEX
            return (bFound) ? i : null;
        }
        if (/all|json/i.exec(desiredReturn)) {
            // return ALL infos (JSON)
            return (bFound) ? {
                'found': true,
                'key': aKeys[i],
                'value': haystack[aKeys[i]],
                'index': i
            } : {
                'found': false
            };
        }
    }
}


// ◘◘ >> ARRAY

/**
 * Returns an array.
 * @param {*} data The source data
 * @param {boolean} bSplit If data is not an array, 2 possibilities :
 *  bSplit == false:          Returns [data]
 *  bSplit == true:           If it's a string: split the string. If it's an object: returns keys or values of the Json.
 * @param {string} sSplitterIfString Splitter used to split the string. '[\\s,;]+' by default.
 * @param {string} sTargetIfObject If data is an object, 2 possibilities :
 *  sTargetIfObject == 'keys':            Returns all data keys
 *  sTargetIfObject == 'val'|'values':    Returns all data keys
 */
function toArray(data, bSplit = true, sSplitterIfString = 'auto', sTargetIfObject = 'values') {
    let aResult = [];
    switch (typeof(data)) {
        case 'string':
            if (!bSplit) {
                return [data];
            }
            let sPattern = (sSplitterIfString == null || sSplitterIfString == '' || sSplitterIfString === 'auto') ?
                '[\\s,;]+' :
                sSplitterIfString;
            aResult = data.split(new RegExp(sPattern, ''));
            return aResult;
        case 'object':
            if (!bSplit) {
                return (Array.isArray(data)) ?
                    data : [data];
            } else {
                return (/val(ues?)?/i.exec(sTargetIfObject)) ?
                    Object.values(data) :
                    Object.keys(data);
            }
        default:
            return [data];
    }
}




// ◘◘ >> DOM

/**
 * Returns if an element is a DOM Element. It can be a DOM Element or a JQuery selector/obj.
 * 
 * @param {*} el The element
 * @param {boolean} bAllowSelector If true, returns true if a JQuery selector targeting at least one element is provided (ex: '.elem')
 * @param {boolean} bAllowJQueryObj If true, returns true if a JQuery Object containing at least one element is provided.
 * 
 * @returns {boolean}
 */
function isDomElement(el, bAllowSelector = true, bAllowJQueryObj = true, bAllowMultipleElements = true) {
    let sType = typeof(el),
        oJq;
    switch (sType) {
        case 'string':
            if (!bAllowSelector) {
                return false;
            }
            return isDomElement_JQueryObject($(el));
        case 'object':
            if (!bAllowJQueryObj || !(el instanceof jQuery) || !isDomElement_JQueryObject(el)) {
                return false;
            }
            return true;
        default:
            return false;
    }
    /**
     * Returns if all elements into a JQuery object are DOM Elements or not
     * 
     * @param {Object} oJq The JQuery object
     * 
     * @returns {boolean}
     */
    function isDomElement_JQueryObject(oJq) {
        if (oJq.length === 0 || (!bAllowMultipleElements && oJq.length > 1)) {
            return false;
        }
        for (let i = 0; i < oJq.length; i++) {
            if (oJq[i].nodeType == null || oJq[i].nodeType != 1) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Check the element with isDomElemt(). Multiple elements are not allowed.
 * Returns a DOM Element OR a JQuery object containing a DOM Element.
 * If error : returns null.
 * If you don't want a JQuery object and more than one element are found : only the first element is returned.
 * 
 * @param {DOMElement|Object|string} el The source DOM Element(s) into a JQuery object or not, or in a JQuery selector
 * @param {boolean} bReturnJQueryObj If true, returns a JQuery Object containing the provided DOM Element(s)
 * 
 * @returns {DOMElement|Object}
 */
function getDomElem(el, bReturnJQueryObj = true, bAllowMultipleElements = true) {
    if (!isDomElement(el, true, true, bAllowMultipleElements)) {
        return null;
    }
    switch (typeof(el)) {
        case 'string':
            return (bReturnJQueryObj ? $(el) : $(el)[0]);
        case 'object':
            if (el instanceof jQuery) {
                return (bReturnJQueryObj ? el : el[0]);
            }
            return (bReturnJQueryObj ? $(el) : el);
        default:
            return null;
    }
}



// ◘◘ >> HTML

/**
    * Returns the html code corresponding to the options of a select. Set the 'selected' attribute to the option that has the value $defaultValue.
    * 
    * @param {JSON|array} options The different options like this:
    * {
    *      'value1' :   'label1',
    *      'value2' :   'label2'
    * }
    * OR like this :
    * [
    *      'label1',
    *      'label2'
    * ]
    * @param {bool} bValueAsLabel If true, the value will be the same that the label (object value). If false, it will be the object key.
    * @param {string|int} defaultValue The value to be selected by default
    * 
    * @returns {string}
    */
function getSelectOptionsHtml(options, bValueAsLabel = false, defaultValue = '') {
    let value,
        sSelected,
        sHtml = '',
        aKeys = Object.keys(options),       // option value (if not numeric)
        aLabel = Object.values(options),    // option label
        iLength = aKeys.length;
    for (let i = 0; i < iLength; i++) {
        value = ( bValueAsLabel ) ?
                aLabel[i] :
                aKeys[i];
        sSelected = (defaultValue == value) ? ' selected' : '';
        sHtml += `<option value="${value}"${sSelected}>${aLabel[i]}</option>`;
    }
    return sHtml;
}


// ◘◘ >> CSS

/**
 * Returns CSS var name (prefixed with '--')
 * @param {string} sCssVarname 
 */
function getCssVarname(sCssVarname) {
    sCssVarname = sCssVarname.trim();
    if (sCssVarname.substring(0, 2) !== '--') {
        sCssVarname = '--' + sCssVarname;
    }
    return sCssVarname;
}

/**
 * Assign a value to a css var
 * 
 * @param {string} sCssVarname The css var name
 * @param {string|number} value The value you want to set
 */
function setCssVar(sCssVarname, value) {
    sCssVarname = getCssVarname(sCssVarname);
    document.documentElement.style.setProperty(sCssVarname, value);
}

/**
 * Returns a css value
 * 
 * @param {string} sCssVarname The css var name
 * 
 * @return {string}
 */
function getCssVar(sCssVarname) {
    sCssVarname = getCssVarname(sCssVarname);
    return getComputedStyle(document.documentElement).getPropertyValue(sCssVarname);
}


// ◘◘ >> DEVELOPER

/**
 * Alias for 'console.log()'
 * Only if in localhost.
 * 
 * Except that here, all the objects are stringified then parsed.
 * 
 * This way you are sure you are seeing the value of the object at the moment you log it.
 * Otherwise, many browsers provide a live view that constantly
 * updates as values change. This may not be what you want.
 * 
 * @param {...*} data All values you want to add to the log in the console
 */
function log(...data) {
    if ( !isLocalhost() ) {
        return;
    }
    let a = [],
        sType;
    for (let i = 0; i < arguments.length; i++) {
        sType = typeof(arguments[i]);
        a[i] = (sType === 'object' && !Array.isArray(arguments[i])) ?
            JSON.parse(JSON.stringify(arguments[i])) :
            arguments[i];
    };
    console.log(...a);
}

/**
 * Alias for 'alert()', except, that it allows in addition to provide
 * one or more arguments : each argument will be displayed on a new line.
 * 
 * JSON.stringify() is applied on each argument, allowing :
 *  - display the content of objects
 *  - distinguish the numerical values from the text strings
 * 
 * @param {...*} data All values you want to display in a new line
 */
function a(...data) {
    if ( !isLocalhost() ) {
        return;
    }
    let s = '';
    for (let i = 0; i < arguments.length; i++) {
        s = s + JSON.stringify(arguments[i]) + "\n";
    };
    alert(s);
}

/**
 * Show an error from an ajax result (prepended to body)
 * .fail(function(error) {
            showError(error)
    });
 * 
 * @param {string} data 
 */
function showError(data) {
    if ( !isLocalhost() ) {
        return;
    }
    if (typeof(data) !== 'object') {
        return;
    }
    if ( (data.responseText == undefined) || (typeof(data.responseText) !== 'string') ) {
        return;
    }
    if (/<font size=['"]1['"]><table class=['"]xdebug-error/i.exec(data.responseText) == null) {
        return;
    };
    $('body').prepend(data.responseText + '<br>-------')
}


// ◘◘ >> REGEXP

/**
 * Escape special characters in a pattern
 * 
 * @param {string} str The string to patternize
 * 
 * @returns {string}
 */
function patternize(str) {
    return str.replace(/([+])/, "\\$1");
}

/**
 * Filter a string
 * 
 * @param {string} str The source string
 * @param {string} chrPattern The pattern which will be applied on each character
 * 
 * @returns {{string}
 */
function filterString(str, chrPattern) {
    let sCar;
    let re = new RegExp(chrPattern);
    let sResult = '';
    for (let i = 0; i < str.length; i++) {
        sCar = str.charAt(i);
        if (re.exec(sCar)) {
            sResult += sCar;
        }
    }
    return sResult;
}



// ◘◘ >> SECURITY

/**
 * Check if a json indicates that a hack attempt has taken place and takes the appropriate action
 * 
 * @param {JSON} json 
 */
function checkHackingAttempt(json) {
    if (json.hackingAttempt == true) {
        setTimeout(
            function() {
                window.open('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4a9529e8-cf9b-4b7b-a70d-ad27fd90ae1c/d8o8kao-2be99487-2c9f-45f3-9cb1-9343e05d2900.jpg/v1/fill/w_1020,h_783,q_70,strp/lucky_luke_and_the_daltons_by_mirinata_d8o8kao-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRhOTUyOWU4LWNmOWItNGI3Yi1hNzBkLWFkMjdmZDkwYWUxY1wvZDhvOGthby0yYmU5OTQ4Ny0yYzlmLTQ1ZjMtOWNiMS05MzQzZTA1ZDI5MDAuanBnIiwiaGVpZ2h0IjoiPD03ODYiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC80YTk1MjllOC1jZjliLTRiN2ItYTcwZC1hZDI3ZmQ5MGFlMWNcL21pcmluYXRhLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.J8HEQiHvVmvXba88H0knHm5ZD7xlgMeFAG_rmsW9DXE');
            },
            2500
        );
    }
}



// ◘◘ >> INPUT

/**
 * Set the caret position in a input
 * 
 * @param {HTMLElement} ctrl The input
 * @param {number} start Start position
 * @param {number} end End position
 */
function setCaretPosition(ctrl, start, end = start) {
    // IE >= 9 and other browsers
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(start, end);
    }
    // IE < 9 
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
    }
}

/**
 * Replace international indicative by '0' in a tel number.
 * 
 * @param {string} telNumber The source tel number
 * @param {string} pattern_internationalIndicativeCode The pattern corresponding to the international code
 * 
 * @returns {string}
 */
function tel_replaceInternationalIndicative(telNumber, pattern_internationalIndicativeCode = '[1-9]\\d') {
    let pattern, re;
    pattern = '^(?<indicative>(?:(?:00)|(?:\\+))' + pattern_internationalIndicativeCode + ')(?=[1-9])';
    re = RegExp(pattern);
    aMatches = re.exec(telNumber);
    if (aMatches != null) {
        return telNumber.replace(aMatches.groups.indicative, '0');
    }
    return telNumber;
}

/**
 * Applies an identical pattern to the value of the input so that it appears visually as valid.
 * 
 * @param {JQuery|string|DOMElement} input The input concerned
 */
function setValidPattern(input) {
    input = $(input);
    let val = input.val();
    input.attr('pattern', patternize(val));
}

/**
 * Applies an identical pattern to the value of the input so that it appears visually as valid.
 * 
 * @param {JQuery|string|DOMElement} input The input concerned
 */
function setInvalidPattern(input) {
    input = $(input);
    let val = input.val();
    input.attr('pattern', patternize('^◘>>' + val + '<<◘$'));
}