
/**
 * Contains static methods which concerns jsons in an array
 * 
 * [
 *      {},
 *      {},
 *      {}..
 * ]
 */
class jsonArray
{

    /**
     * 
     * @param { JSON[] } arr Source array
     * @param { string } sPropName Property name
     * @param { string } sOperator Comparison operator
     * @param { * } value The value to compare
     * @param { number } iLimit The limit (int). 0 for unlimited, or integer to limit the number of results. Default: 0
     * @param { boolean } bReturnJsonIfUniqueResult It true. Returns the json if unique result. Default: true.
     * 
     * @returns { {}[] | {} } Array which contain json(s)
     */
    static findWhere (arr, sPropName, sOperator = '==', value = true, iLimit = 1, bReturnJsonIfUniqueResult = true)
    {
        let aArrKeys = Object.keys(arr);
        let iArrLength = arr.length;
        let aResult = [];
        let sKey;
        let j;
        for (let i = 0; i < iArrLength; i++) {
            sKey = aArrKeys[i];
            j = arr[sKey];
            switch (sOperator) {
                case '<':
                    if (j[sPropName] < value) {
                        appendJsonToResult();
                        if (returnResultNow()) {
                            return getResult();
                        }
                    }
                    break;
                case '<=':
                    if (j[sPropName] <= value) {
                        appendJsonToResult();
                        if (returnResultNow()) {
                            return getResult();
                        }
                    }
                    break;
                case '==':
                    if (j[sPropName] == value) {
                        appendJsonToResult();
                        if (returnResultNow()) {
                            return getResult();
                        }
                    }
                    break;
                case '===':
                    if (j[sPropName] === value) {
                        appendJsonToResult();
                        if (returnResultNow()) {
                            return getResult();
                        }
                    }
                    break;
                case '>':
                    if (j[sPropName] > value) {
                        appendJsonToResult();
                        if (returnResultNow()) {
                            return getResult();
                        }
                    }
                    break;
                case '>=':
                    if (j[sPropName] >= value) {
                        appendJsonToResult();
                        if (returnResultNow()) {
                            return getResult();
                        }
                    }
                    break;
                case '!==':
                    if (j[sPropName] !== value) {
                        appendJsonToResult();
                        if (returnResultNow()) {
                            return getResult();
                        }
                    }
                    break;
                case '!=':
                    if (j[sPropName] != value) {
                        appendJsonToResult();
                        if (returnResultNow()) {
                            return getResult();
                        }
                    }
            }
        }
        return getResult();
        /**
         * Append the json to the result array
         */
        function appendJsonToResult()
        {
            aResult.push(j);
        }
        /**
         * Returns the desired result : 
         * 
         * @returns { JSON[] | JSON } Array of jsons, or unique json
         */
        function getResult()
        {
            if (
                bReturnJsonIfUniqueResult &&
                (aResult.length === 1)
            ) {
                return aResult[0];
            } else {
                return aResult;
            }
        }
        /**
         * Returns wheter the result array is to return now
         * 
         * @returns {boolean}
         */
        function returnResultNow()
        {
            if (iLimit == 0) {
                return true;
            }
            return (aResult.length >= iLimit);
        }
    }
}
