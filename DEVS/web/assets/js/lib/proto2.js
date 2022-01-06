// FICHIER NON INTEGRE AU PROJET

const A_TYPES = ['number','bigint','string','boolean','symbol','undefined','function','object']



/**
 * Remplace la sous-chaîne renvoyée par la fonction substr() par le texte fourni en argument
 * ex:
 * let str = 'le_petit_chaperon_rouge';
 * alert( str.substr(3, 5) )								// affiche 'petit'
 * alert( str.substrReplace('grand', 3, 5) )				// affiche 'le_grand_chaperon_rouge'
 * @param {String} substr Sous-chaîne à insérer
 * @param {Integer} iPosStartInsert Position où commencer l'insertion
 * @param {Integer} iLengthStrToDeleteBeforeInsert Longueur de la chaîne à supprimer avant d'insérer l'autre
 * @return {String} Chaîne avec notre sous-chaîne à la place de l'autre
 */
String.prototype.substrReplace = function(substr = 'YourText', iPosStartInsert = 0, iLengthStrToDeleteBeforeInsert = 0) {
    return (this.substr(0, iPosStartInsert) + substr + this.substr(iPosStartInsert + iLengthStrToDeleteBeforeInsert));
}
/**
 * Remplace la sous-chaîne renvoyée par la fonction substr() par le texte fourni en argument
 * ex:
 * let str = 'le_petit_chaperon_rouge';
 * alert( str.substring(3, 8) )								// affiche 'petit'
 * alert( str.substringReplace('grand', 3, 8) )				// affiche 'le_grand_chaperon_rouge'
 * @param {String} substr Sous-chaîne à insérer
 * @param {Integer} iPosStartInsert Position où commencer l'insertion
 * @param {Integer} iPosEndInsert Position où commence la partie à conserver
 * @return {String} Chaîne avec notre sous-chaîne à la place de l'autre
 */
String.prototype.substringReplace = function(substr = 'YourText', iPosStartInsert = 0, iPosEndInsert = 0) {
    return (this.substr(0, iPosStartInsert) + substr + this.substr(iPosEndInsert));
}
/**
 * Echappe certains caractères d'une chaîne pour qu'ils ne soint pas interprétés par le moteur RegExp JS
 * @return {String} Chaîne échappée
 */
String.prototype.escapeForRegExp = function() {
    let bDebugMode = true;
    S_CARACTERS_TO_ESCAPE = `]\=?^-[$(/)|`;
    let a_sSourceStringCar = this.split('');
    let iIndexCar = 0;
    let sCarStrSource, sResult;
    for (let iIndexSourceStringCar = 0; iIndexSourceStringCar < a_sSourceStringCar.length; iIndexSourceStringCar++) {
        sCarStrSource = a_sSourceStringCar[iIndexSourceStringCar];
        for (let sEscapableCar of S_CARACTERS_TO_ESCAPE) {
            if (sCarStrSource === sEscapableCar) {
                a_sSourceStringCar[iIndexSourceStringCar] = "\\" + a_sSourceStringCar[iIndexSourceStringCar];
            }
        }
        iIndexCar++;
    }
    if (bDebugMode)  { console.log('a_sSourceStringCar', (sResult = a_sSourceStringCar.join(''))) };
    return sResult;
}
/**
 * Renvoie le string compris entre deux délimiteurs
 * Attention aux caractères spéciaux des regex à échapper
 * @param {String} sDelimiterStart Délimiteur de début
 * @param {String} sDelimiterEnd Délimiteur de fin
 * @param {!String} sFlags Flags de recherche du regex (ex : 'g' / 'i' / 'gi'...)
 * @param {!Boolean} bGetDetails Renvoie les détails (index...) ou pas    (index : position du 1er caractère du délimiteur de début)
 * @param {!Integer} iMaxLaps Définir un nombre maximum de résultats / tours de boucle (100 par défaut)
 * @param {!Boolean} bResultAlwaysInArray 
 */
String.prototype.getStrBetween = function(sDelimiterStart = '(', sDelimiterEnd = ')', sFlags = 'gi', bGetDetails = false, iMaxLaps = 100, bResultAlwaysInArray = false) {
    let bDebugMode = false;
    let sRegex = sDelimiterStart.escapeForRegExp(sDelimiterStart) + '(.*?)' + sDelimiterEnd.escapeForRegExp(sDelimiterEnd);
    let oRegex = new RegExp(sRegex, sFlags);
    if (bDebugMode) { console.log('oRegex après init', oRegex) }
    let oResult;
    let aResult = [];
    let iCountLaps = 0;
    if (!oRegex.global) { iMaxLaps = 1; }
    while ((oResult = oRegex.exec(this)) !== null && iCountLaps < iMaxLaps) { // && oRegex.lastIndex !== 0 
        if (bDebugMode)  { console.log(iCountLaps, oResult, oRegex) };
        aResult.push(Object.assign({}, oResult));
        iCountLaps++;
    }
    if (iCountLaps === iMaxLaps) { console.log(`getStrBetween() : maximum number of laps reached`)}
    if (aResult.length === 1) {
        return (bGetDetails || bResultAlwaysInArray) ? aResult : aResult[0][1];
    } else if (aResult.length > 1) {
        return (bGetDetails) ? aResult : aResult.map(x => x[1]);
    }
}


// -------		ARRAY		-------

/**
 * Renvoie le nombre d'éléments contenus dans l'array
 * @return {Integer} Nombre d'éléments
 */
Array.prototype.count = function() {
    let iNbElements = 0;
    this.forEach(function() {
        iNbElements++;
    })
    return iNbElements;
}
/**
 * Renvoie le nombre d'objets autres que des arrays contenus dans l'array source, 
 * Le filtrage concerne les tableaux d'objets :
 * possibilité de filtrer les résultats en ne comptant que les objets internes
 * dont la propriété 'sPropNameToSearch' vaut la valeur 'valueToCompare' (inférieure à, égale, supérieure à...)
 * @param {?String} sPropNameToSearch Nom de la propriété du/des objet(s) qui se trouve(nt) dans l'array et dont on cherchera la valeur
 * @param {?String} sComparisonOperator '===' | '==' | '!==' | '!=' | '<' | '<=' | '>' | '>='
 * @param {?*} valueToCompare Valeur de la propriété à tester
 * @return {Integer} Nombre de colonnes
 */
Array.prototype.countObj = function(sPropNameToSearch = '', sComparisonOperator = '!==', valueToCompare = undefined) {
    let iNbColonnes = 0;
    if (sPropNameToSearch === '') {
        this.forEach(function(valeur) {
            if (typeof(valeur) === 'object') {
                iNbColonnes++;
            }
        })
    } else {
        this.forEach(function(valeur) {
            if (typeof(valeur) === 'object' && !Array.isArray(valeur)) {
                switch (sComparisonOperator) {
                    case '===': if (valeur[sPropNameToSearch] === valueToCompare)  { iNbColonnes++; } break;
                    case '==' : if (valeur[sPropNameToSearch]  == valueToCompare)  { iNbColonnes++; } break;
                    case '!==': if (valeur[sPropNameToSearch] !== valueToCompare)  { iNbColonnes++; } break;
                    case '!=' : if (valeur[sPropNameToSearch]  != valueToCompare)  { iNbColonnes++; } break;
                    case  '<' : if (valeur[sPropNameToSearch]   < valueToCompare)  { iNbColonnes++; } break;
                    case  '<=': if (valeur[sPropNameToSearch]  <= valueToCompare)  { iNbColonnes++; } break;
                    case  '>' : if (valeur[sPropNameToSearch]   > valueToCompare)  { iNbColonnes++; } break;
                    case  '>=': if (valeur[sPropNameToSearch]  >= valueToCompare)  { iNbColonnes++; }
                }
            }
        })
    }
    return iNbColonnes;
}

/**
 * Transforme un array en objet (uniquement si chaque valeur de l'array est de type 'string')
 * La valeur de chaque élément de l'array devient clé du nouvel objet
 * Celle-ci a pour valeur celle renseignée en argument
 * @param {*} valueOfEachProperty 
 */
Array.prototype.toObject = function(valueOfEachProperty = {}) {
    let oResult = {};
    this.forEach(function(valArray) {
        //todo: uniquement si string
        oResult[valArray] = valueOfEachProperty;
    })
    return oResult;
}
/**
 * Renvoie le nombre d'éléments de chaques types contenus dans l'array
 * possibilité de différentier les objets 'array'/'date'/'regex' des autres objets
 * @param {?Array[String]|String} filterType Type des objets qui se trouvent dans l'array que l'on veut compter
 * @param {?Boolean} bDifferentiateObjects Si true, les 'array'/'date'/'regex' apparaitront tels quels et non comme 'object'
 * @param {?Boolean} bHideIfNull Si true, les objets d'un type dont il n'y a aucune occurence n'apparaitront pas dans les résultats
 * @return {Integer|Object{Integer}} Integer si un seul filtre de type | Objet{Integer} sinon
 */
Array.prototype.countType = function(filterType = null, bDifferentiateObjects = true, bCheckDetails = true, bHideIfNull = true, bAlwaysResultInObject = false) {
    let oTypeFound = A_TYPES.toObject(0);
    let aObjectType = ['array', 'date', 'regex'];
    let oResult = {}, sResult;
    // filterType --> vers Array()
    if (filterType === '' || filterType === null || filterType === undefined) {
        filterType = [];
    } else if (typeof(filterType) === 'string') {
        filterType = [filterType];
    }
    if ( (!Array.isArray(filterType)) ) {
        displayError();
    }
    // vérifie si (types d'objets spécifiés === array ou/et date ou/et regex)
    filterType.forEach(function(sType) {
        if (typeof(sType) === 'string') {
            if (aObjectType.indexOf(sType) >= 0) {
                bDifferentiateObjects = true;
            }
        } else {
            displayError();
        }
    })
    // si (bDifferentiateObjects) { ajoute les formats d'objets spécifiques à oTypeFound }
    if (bDifferentiateObjects) {
        aObjectType.forEach(function(sTypeObjet) {
            oTypeFound[sTypeObjet] = 0;
        })
    }
    this.forEach(function(valeur) {
        if (typeof(valeur) === 'object' && bDifferentiateObjects) {
            // todo... regex + date
            if (Array.isArray(valeur)) {
                oTypeFound['array']++;
            } else {
                oTypeFound[typeof(valeur)]++;
            }
        } else {
            oTypeFound[typeof(valeur)]++;
        }
    })
    if (bHideIfNull) {
        Object._deletePropIf(oTypeFound, '', '===', 0);
    }
    // renvoie le résultat sous forme d'entier si 1 type trouvé, ou d'array si plusieurs
    if (!bAlwaysResultInObject && filterType[1] === undefined && filterType[0] !== undefined) {
        return oTypeFound[filterType[0]] ?? 0;
    } else {
        // on ne renvoie que les résultats correspondant aux types demandés dans filterType
        oResult = Object._filterProp(oTypeFound, filterType);
        return oResult;	
    }
    function displayError() {
        throw new TypeError(`countType() ---> filterType n'accepte que des formats transmis en string | array de strings parmi la liste suivante :
        'number', 'bigint',	'string', 'boolean', 'symbol', 'undefined',	'function',	'object', 
        et 'array', 'date', 'regex'`);
    }
}
/**
 * Vérifie si l'objet ne contient que le(s) type(s) fournis en argument
 * @param {String|[String]} typeContent Type(s) à vérifier
 * @param {?Boolean} bDifferentiateObjects Si true, les 'array'/'date'/'regex' apparaitront tels quels et non comme 'object'
 * @param {Boolean} bMustContainAllTypesProvided Si true, la fonction renverra false si TOUS les types fournis en argument n'ont pas été trouvés dans l'array
 * @return {Boolean} true si l'array ne contient pas des valeurs d'autres types que les types demandés
 */
Array.prototype.containsOnlyType = function(typeContent = '', bDifferentiateObjects = true, bMustContainOnlyAllTypesProvided = true) {
    let iCountAll, iCountType = 0, oCountType;
    if (typeof(typeContent) === 'string')  { typeContent = [typeContent]; }
    iCountAll = this.count();
    oCountType = this.countType(typeContent, bDifferentiateObjects, true, true, true);
    typeContent.forEach(function(sType) {
        iCountType = iCountType + oCountType[sType];
        delete oCountType[sType];
    })
    if (bMustContainOnlyAllTypesProvided && Object.keys(oCountType).length > 0)  {
        return false;
    }
    return (iCountType === iCountAll);
}


// -------		NUMBER		-------

Number.prototype.separateThousands = function(sSeparator = ' ') {
    var sNombre = ''+this.valueOf();
    var sRetour = '';
    var count=0;
    for(var i=sNombre.length-1 ; i>=0 ; i--)
    {
        if(count!=0 && count % 3 == 0)
            sRetour = sNombre[i]+sSeparator+sRetour ;
        else
            sRetour = sNombre[i]+sRetour ;
        count++;
    }
    return sRetour;
}
Number.prototype.enLettres = function() {
    let iNombre = this.valueOf();
    if (isNaN(iNombre) || iNombre < 0 || 999 < iNombre) {
        return 'Veuillez entrer un nombre entier compris entre 0 et 999.';
    }
    var units2Letters = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'],
        tens2Letters = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];
    var units = iNombre % 10,
        tens = (iNombre % 100 - units) / 10,
        hundreds = (iNombre % 1000 - iNombre % 100) / 100;
    var unitsOut, tensOut, hundredsOut;
    if (iNombre === 0) {
        return 'zéro';
    } else {
        // Traitement des unités
        unitsOut = (units === 1 && tens > 0 && tens !== 8 ? 'et-' : '') + units2Letters[units];
        // Traitement des dizaines
        if (tens === 1 && units > 0) {
            tensOut = units2Letters[10 + units];
            unitsOut = '';
        } else if (tens === 7 || tens === 9) {
            tensOut = tens2Letters[tens] + '-' + (tens === 7 && units === 1 ? 'et-' : '') + units2Letters[10 + units];
            unitsOut = '';
        } else {
            tensOut = tens2Letters[tens];
        }
        tensOut += (units === 0 && tens === 8 ? 's' : '');
        // Traitement des centaines
        hundredsOut = (hundreds > 1 ? units2Letters[hundreds] + '-' : '') + (hundreds > 0 ? 'cent' : '') + (hundreds > 1 && tens == 0 && units == 0 ? 's' : '');
        // Retour du total
        return hundredsOut + (hundredsOut && tensOut ? '-' : '') + tensOut + (hundredsOut && unitsOut || tensOut && unitsOut ? '-' : '') + unitsOut;
    }
}



// -------		REGEXP		-------

RegExp.prototype.escape = function(str) {
    return str.escapeForRegExp();
}
String.prototype.capitalize = function() {
    return (this.substring(0, 1).toUpperCase() + this.substring(1));
}


