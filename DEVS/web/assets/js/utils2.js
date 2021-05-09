
// ◘◘ >> ARRAY

/**
 * Returns a Json object from values
 * The config below will return :
 * [
 *      {
 *          'id_field':         0,
 *          'name_field':       'name_1',
 *          'value_field':      'value_1',
 *          'is_active_field':  true,
 *      },{
 *          'id_field':         1,
 *          'name_field':       'name_2',
 *          'value_field':      'value_2',
 *          'is_active_field':  true,
 *      },{
 *          'id_field':         2,
 *          'name_field':       'name_3',
 *          'value_field':      'value_3',
 *          'is_active_field':  true,
 *      },
 * ]
 * @param {Array} aConfig The config like that :
 * [
	{
		'key':      'id_field',
		'val':      '{AI}'
	},{
		'key':      'name_field',
		'val':      ['name_1', 'name_2', 'name_3']
	},{
		'key':      'value_field',
		'val':      ['value_1', 'value_2', 'value_3']
	},{
		'key':      'is_active_field',
		'val':      true
	}
 * ]
 * @param {Integer} iStartIfAutoIncrement If it is an auto-incremented value, specifies the first value
 */
    function obj(aConfig, iStartIfAutoIncrement = 0) {
        let oSource, aResult = [],
            aLength = [],
            aUniqueLength, iLength;
        // checks if arrays have same length
        for (let i = 0; i < aConfig.length; i++) {
            aResult.push({});
            if (aConfig[i]['val'] != null && Array.isArray(aConfig[i]['val'])) {
                aLength.push(aConfig[i]['val'].length);
            }
        }
        aUniqueLength = aLength.getUnique();
        if (aUniqueLength.length > 1) {
            throw new Error("The number of val must be the same in all arrays");
        }
        iLength = aUniqueLength[0];
        // push an empty Json into result for each value
        for (let j = 0; j < iLength; j++) {
            aResult[j] = {};
        }
        // write value
        for (let i = 0; i < aConfig.length; i++) {
            oSource = aConfig[i];
            sName = oSource['key'];
            if (oSource['val'] === '{AI}') {
                // auto-increment value
                for (let j = 0; j < iLength; j++) {
                    aResult[j][sName] = j + iStartIfAutoIncrement;
                }
            } else if (Array.isArray(oSource['val'])) {
                // value from array
                for (let j = 0; j < iLength; j++) {
                    aResult[j][sName] = oSource['val'][j];
                }
            } else {
                // same value for all iterations
                for (let j = 0; j < iLength; j++) {
                    aResult[j][sName] = oSource['val'];
                }
            }
        }
        return aResult;
    }
    
    
    // ◘◘ >> DOM
    
    /**
     * Returns all attributes of a DOM Element
     * 
     * @param {DOMElement|string} elemt The DOM Element
     * 
     * @returns {Json}
     */
     function getAttributes(elemt) {
        if (typeof(elemt) === 'string') {
            elemt = $(elemt)[0];
        }
        if (elemt == null || !elemt.hasAttributes()) {
            return null;
        }
        let oResult = {},
            sAttrName;
        let aAttrs = elemt.attributes;
        for (let i = aAttrs.length - 1; i >= 0; i--) {
            sAttrName = aAttrs[i].name;
            oResult[sAttrName] = aAttrs[i].value;
        }
        return oResult;
    }
    