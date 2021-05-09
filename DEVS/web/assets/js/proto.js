// FICHIER INTEGRE AU PROJET

// -------		ARRAY		-------

Array.prototype.getUnique = function() {
    var o = {}, a = [], i, e;
    for (i = 0; e = this[i]; i++) {
        o[e] = 1;
    };
    for (e in o) {
        a.push(e);
    };
    return a;
}

Array.prototype.contains = function(val) {
    return (this.indexOf(val) !== -1);
}


	
// -------		STRING		-------
/**
 * Returns alphanumeric characters
 * 
 * @param {bool} bReplaceAccents If true, accents will be replaced before filtering
 * @param {bool} bLowerCaseDesired 3 formatting possibilities:
 *  - true :   the text will be returned in lowercase
 *  - false :  in upper case
 *  - "" :     same as the source
 * 
 * @returns {string}
 * @link https://alt-codes.fr/diacritiques-alphabet-francais/
 */
String.prototype.getAn = function(bReplaceAccents = true, bLowerCaseDesired = true) {
    let aKeys, sCharactersWithoutAccents, sAccentedCharacters, sResult = this;
    const oReplacements = {
        'OE': 'Œ',
        'oe': 'œ',
        'A': 'ÀÂÄÁ',
        'a': 'àâäá',
        'AE': 'Æ',
        'ae': 'æ',
        'C': 'Ç',
        'c': 'ç',
        'E': 'ÈÉÊË',
        'e': 'èéêë',
        'I': 'ÎÏÍ',
        'i': 'îïí',
        'O': 'ÔÖÓ',
        'o': 'ôöó',
        'U': 'ÙÛÜÚ',
        'u': 'ùûüú',
        'N': 'Ñ',
        'n': 'ñ',
        's': 'ß',
    }
    if (bReplaceAccents) {
        aKeys = Object.keys(oReplacements);
        for (let i = 0; i < aKeys.length; i++) {
            sCharactersWithoutAccents = aKeys[i];
            sAccentedCharacters = oReplacements[sCharactersWithoutAccents];
            rPattern = RegExp(`[${sAccentedCharacters}]`, 'gm');
            sResult = sResult.replace(rPattern, sCharactersWithoutAccents);
        }
    }
    sResult = sResult.replace(/[^A-Z0-9]/ig, '');
    if (bLowerCaseDesired) { return sResult.toLowerCase(); }
    if (!bLowerCaseDesired) { return sResult.toUpperCase(); }
    return sResult;
}

/**
 * Filters the alphanumeric characters and returns if the two results are identical or not.
 * 
 * @param {string} str The string to compare
 *
 * @returns {bool}
 */
String.prototype.isAnEqual = function(str) {
    return (this.getAn(true) === str.getAn(true));
}

String.prototype.toCamelCase = function() {
    return this
    .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
    .replace(/\s/g, '')
    .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
    // Autre possibilité :
    // return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(lettre, index) {
    // 	return (index == 0) ? lettre.toLowerCase() : lettre.toUpperCase();
    // }).replace(/\s+/g, '');
}

String.prototype.toPascalCase = function() {
    return this
    .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
    .replace(/\s/g, '')
    .replace(/^(.)/, function($1) { return $1.toUpperCase(); });
}

String.prototype.toUpperCaseFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.isInt = function() {
    return ((parseFloat(this) == parseInt(this)) && !isNaN(this))
}

String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
}

String.prototype.capitalize = function() {
    return this.toUpperCaseFirstLetter();
}




// -------		JQUERY		-------

$.fn.toggleAttr = function(attr, val) {
    var test = $(this).attr(attr);
    if ( test ) { 
        // if attrib exists with ANY value, still remove it
        $(this).removeAttr(attr);
    } else {
        $(this).attr(attr, val);
    }
    return this;
};

$.fn.toggleAttrVal = function(attr, val1, val2) {
    var test = $(this).attr(attr);
    if ( test === val1) {
        $(this).attr(attr, val2);
        return this;
    }
    if ( test === val2) {
        $(this).attr(attr, val1);
        return this;
    }
    // default to val1 if neither
    $(this).attr(attr, val1);
    return this;
};

$.fn.appear = function(duration = 400) {
    $(this).animate({opacity: 1}, duration);
};

$.fn.disappear = function(duration = 400) {
    $(this).animate({opacity: 0}, duration);
};

/**
 * Returns whether the element contains such an attribute or not
 * 
 * @param {string} attrName The attribute name
 * 
 * @returns {bool}
 */
(function( $ ){
    $.fn.hasAttr = function(attrName) {
        return ($(this).attr(attrName) !== undefined);
    };
})( jQuery );

/**
 * Returns the value regardless of the type of element
 * 
 * @returns {mixed}
 */
(function( $ ){
    $.fn.value = function() {
        if ( $(this).is(':checkbox') ) {
            return +$(this).is(':checked');
        } else {
            return ( $(this).attr('data-value') ?? $(this).val() );
        }
    };
})( jQuery );