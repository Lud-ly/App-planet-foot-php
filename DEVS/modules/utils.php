<?php

// ◘◘ >> PROJECT

/**
 * If no user logged in, redirects to home page
 */
function redirectToHomePageIfNoUserConnected()
{
    global $GLOBALS_INI;
    if (!isset($_SESSION['id_external_user']) || isEmpty($_SESSION['id_external_user'])) {
        require($GLOBALS_INI['PATH_HOME'] .  $GLOBALS_INI['PATH_FILES'] . Configuration::$homePage);
        die;
    }
}

/**
 * If no admin logged in, redirects to home page
 */
function redirectToHomePageIfNoAdminConnected()
{
    global $GLOBALS_INI;
    if (!isset($_SESSION['user_role']) || ($_SESSION['user_role'] == 0)) {
        require($GLOBALS_INI['PATH_HOME'] .  $GLOBALS_INI['PATH_FILES'] . Configuration::$homePage);
        die;
    }
}

/**
 * Enable the customer mode
 */
function enableCustomerMode()
{
    $_SESSION['customer_mode'] = true;
}

/**
 * Disable the customer mode
 */
function disableCustomerMode()
{
    $_SESSION['customer_mode'] = false;
}

/**
 * Returns if the current page is an admin page or not
 * 
 * @return bool
 */
function isAdminPage()
{
    global $monPHP;
    return ((substr($monPHP, 0, 4) === 'adm_') || (substr($monPHP, 0, 6) === 'admin_'));
}

/**
 * Returns if run locally or not
 * 
 * @return bool
 */
function isLocalhost()
{
    return (
        ($_SERVER['SERVER_ADDR'] === '127.0.0.1') &&
        ($_SERVER['SERVER_NAME'] === 'localhost'));
}

/**
 * Returns if the connected user is an Afpanier developper or not
 * 
 * @return bool
 */
function isDevelopperConnected()
{
    return (isset($_SESSION['isUserDevelopper']) && $_SESSION['isUserDevelopper']);
}


// ◘◘ >> AJAX

/**
 * Send a JSON to JS
 * 
 * @param array $array_to_send The array to send (will be converted with 'json_encode')
 */
function send_json_to_JS(array $array_to_send)
{
    header('Content-type: application/json');
    echo json_encode($array_to_send);
}



// ◘◘ >> HTML

/**
 * Returns the html code corresponding to the options of a select. Set the 'selected' attribute to the option that has the value $defaultValue.
 * 
 * @param array $options The different options like this:
 * [
 *      'value1' =>   'label1',
 *      'value2' =>   'label2'
 * ]
 * @param string|int $defaultValue The value to be selected by default
 * 
 * @return string
 */
function getSelectOptionsHtml($options, $defaultValue)
{
    $html = '';
    foreach ($options as $value => $label) {
        $selected = ($defaultValue == $value) ? ' selected' : '';
        $html .= "<option value=\"$value\"$selected>$label</option>";
    }
    return $html;
}



// ◘◘ >> FILE / DIRECTORY

/**
 * Clean a directory path (inserts '/' at the end, replace many '/' or '\\' by a single character).
 * If $mkdir, it will create the directory if it does not exist.
 * 
 * @param string $path The directory path
 * @param bool $mkdir If true : creates the directory if it dos not exist
 * 
 * @return string|null The correct path will be returned. If $mkdir : null will be returned if the directory doesn't exists and the creation fails.
 */
function dirPath(string $path, $mkdir = false)
{
    $path = preg_replace('@([/\\\])+@', '$1', $path . '/');
    if ($mkdir && !is_dir($path)) {
        mkdir($path, 0777, true);
    }
    if (!$mkdir || is_dir($path)) {
        return $path;
    }
}

/**
 * Write a content into a file
 * 
 * @param string $dirPath The folder path. ex: 'C:\logs\'
 * @param string $fileName The file name. ex: 'my_file.txt'
 * @param mixed $content The content to append at the end of the file
 * @param mixed $beforeNewContent? Anything to write before the new content. Line break by default.
 * @param mixed $afterNewContent? Anything to write before the new content
 * @param Bool $bAppend? If true, the actual file content is preserved and the new content is written after it.
 */
function write_into_file($dirPath, $fileName, $content, $beforeNewContent = "", $afterNewContent = "", $bAppend = false)
{
    $flags = ($bAppend) ?
        "c+b" :
        "w";
    $dirPath = dirPath($dirPath, true);
    if ($dirPath == null) {
        return;
    }
    $fileName = $dirPath . $fileName;
    $fp = fopen($fileName, $flags);
    fseek($fp, 0, SEEK_END);
    fwrite($fp, to_string($beforeNewContent) . to_string($content) . to_string($afterNewContent));
    fclose($fp);
}

/**
 * Append a content to a file
 * 
 * @param string $fileName The file name. ex: 'my_file.txt'
 * @param mixed $content The content to append at the end of the file
 * @param mixed $beforeNewContent? Anything to write before the new content. Line break by default.
 * @param mixed $afterNewContent? Anything to write before the new content
 */
function append_to_file($fileName, $content, $beforeNewContent = "\n", $afterNewContent = "")
{
    write_into_file($fileName, $content, $beforeNewContent, $afterNewContent, true);
}



// ◘◘ >> ARRAY
if (!function_exists('array_key_first')) {
    function array_key_first(array $arr)
    {
        foreach ($arr as $key => $unused) {
            return $key;
        }
        return NULL;
    }
}

/**
 * Remove numeric keys in a array.
 * @param array &$arr The array.
 * @return array Returns initial array (not a copy).
 */
function arr_remove_numeric_keys(&$arr)
{
    foreach ($arr as $key => &$val) {
        if (preg_match('/^\d+$/', $key)) {
            unset($arr[$key]);
        }
    }
    return $arr;
}

/**
 * Filter keys.
 * 
 * @param array $aSource The source array.
 * @param array $aKeysToKeep The keys to keep.
 * 
 * @return array
 */
function arr_filter_keys(array $aSource, array $aKeysToKeep)
{
    global $aTheseAreTheKeysToKeep;
    $aTheseAreTheKeysToKeep = $aKeysToKeep;
    $aResult = array_filter(
        $aSource,
        function ($key) {
            // keep only provided keys
            global $aTheseAreTheKeysToKeep;
            return (in_array($key, $aTheseAreTheKeysToKeep));
        },
        ARRAY_FILTER_USE_KEY
    );
    unset($aTheseAreTheKeysToKeep);
    return $aResult;
}

/**
 * Returns a array containing the desired key from a set of arrays
 * @param array &$aSource The source array (which contains other arrays containing the desired key)
 * @param string &sKeysToKeep The key to keep
 * @return array
 */
function arr_filter_key_from_sub_arr(array &$aSource, array $sKeysToKeep)
{
    global $sTheKeyToKeep;
    $sTheKeyToKeep = $sKeysToKeep;
    $result = array_map(function ($arr) {
        global $sTheKeyToKeep;
        return $arr[$sTheKeyToKeep];
    }, $aSource);
    unset($sTheKeyToKeep);
    return $result;
}

/**
 * If $data is an array: return it, otherwise return [$data]
 * 
 * @param mixed $data The source data
 * 
 * @return array
 */
function to_arr($data)
{
    $dataType = gettype($data);
    if (
        ($dataType === 'string') &&
        (substr($data, 0, 2) === '{"')
    ) {
        $aResult = json_decode($data, true);
        if ($aResult !== null && json_last_error() === JSON_ERROR_NONE) {
            return $aResult;
        }
    }
    return ($dataType === 'array') ? $data : [$data];
}

/**
 * Sort an indexed 2D array by a specified sub array key, either ascending or descending.
 * 
 * @param array $records The array.
 * @param string $field The field to sort.
 * @param bool $reverse By default it will sort ascending but if you specify $reverse as true it will return the records sorted descending.
 * 
 * @link https://www.php.net/manual/fr/function.asort.php
 */
function recordSort($records, $field, $reverse = false)
{
    $hash = array();

    foreach ($records as $record) {
        $hash[$record[$field]] = $record;
    }

    ($reverse) ? krsort($hash) : ksort($hash);

    $records = array();

    foreach ($hash as $record) {
        $records[] = $record;
    }

    return $records;
}



// ◘◘ >> REGEX

/**
 * Returns the pattern which will concern a group
 * 
 * @param string $pattern The pattern group
 * @param string $name The name group (null by default)
 * @param string $capture If true, the result will be captured (true by default)
 * 
 * @return string The pattern to which we will have integrated the config
 */
function getPatternGroup($pattern, $name = null, $capture = true)
{
    if (!$capture) {
        return '(?:' . $pattern . ')';
    } elseif (gettype($name) === 'string') {
        return '(?<' . $name . '>' . $pattern . ')';
    } elseif ($name == '') {
        return '(?' . $pattern . ')';
    }
}



// ◘◘ >> STRING

/**
 * Stringify a value
 * todo: complete..
 */
function to_string($val)
{
    switch (gettype($val)) {
        case 'array':
            return json_encode($val);
        default:
            return $val;
    }
}

/**
 * Replaces all fields of a given text with their value
 * 
 * @param string $str The initial text
 * @param array $fields All fields : [field name => field value..]
 * @param string $before The text string located before the name of the field to replace
 * @param string $after The text string located after the name of the field to replace
 * @param bool $alsoJsonEncodeStrings If true, strings will be json_encoded like other types of values
 * 
 * @return string
 */
function replaceFields($str, $fields, $before = '{', $after = '}', $alsoJsonEncodeStrings = false)
{
    foreach ($fields as $fieldName => $fieldValue) {
        if (
            (gettype($fieldValue) !== 'string') ||
            ($alsoJsonEncodeStrings)
        ) {
            $fieldValue = json_encode($fieldValue);
        }
        $str = str_replace(($before . $fieldName . $after), $fieldValue, $str);
    }
    return $str;
}

/**
 * Returns whether a string begins with the provided string
 * 
 * @param string $haystack The string to search in
 * @param string $needle The string to look for
 * @param bool $caseSensitive If true, the comparison is case sensitive
 * 
 * @return bool
 */
function string_starts_with($haystack, $needle, $caseSensitive = true)
{
    if (!$caseSensitive) {
        $haystack = strtoupper($haystack);
        $needle = strtoupper($needle);
    }
    return strpos($haystack, $needle) === 0;
}

/**
 * Returns whether a string is equal to an other by offering comparison options
 * 
 * @param string $str1 The first string
 * @param string[]|string $expected The expected string.
 * @param bool $caseSensitive If true, will be sensitive to upper and lower case
 * @param bool $dashesAndSpacesSensitive If false, dashes and spaces will be ignored
 * @param string $desiredResult The result type, among :
 *  - 'bool' / 'boolean':       If equal: a boolean will be returned
 *  - 'str1' / 'string 1':      If equal: $str1 will be returned
 *  - 'str2' / 'string 2':      If equal: $str2 will be returned
 *  - 'str' / 'string':         If equal: source string will be returned (lowered if !$caseSensitive, without spaces and accents if !$dashesAndSpacesSensitive)
 * 
 * @return bool
 */
function getStrEqual(string $str1, $str2, bool $caseSensitive = false, bool $dashesAndSpacesSensitive = false, string $desiredResult = 'str2')
{
    $str2Type = gettype($str2);
    if ($str2Type === 'array') {
        foreach ($str2 as $str2FromArray) {
            if (gettype($str2FromArray) !== 'string') {
                continue;
            } else {
                $strEqual = getStrEqual($str1, $str2FromArray, $caseSensitive, $dashesAndSpacesSensitive, 'str2');
                if ($strEqual !== null) {
                    return getStrEqual($str1, $strEqual, $caseSensitive, $dashesAndSpacesSensitive, $desiredResult);
                }
            }
        }
        return null;
    } else if ($str2Type !== 'string') {
        return null;
    }
    $newStr1 = $str1;
    $newStr2 = $str2;
    if (!$caseSensitive) {
        $newStr1 = strtolower($newStr1);
        $newStr2 = strtolower($newStr2);
    }
    if (!$dashesAndSpacesSensitive) {
        $newStr1 = preg_replace('/[ _-]+/', '', $newStr1);
        $newStr2 = preg_replace('/[ _-]+/', '', $newStr2);
    }
    $isStrEqual = ($newStr1 === $newStr2);
    if (preg_match('/^bool(ean)?$/i', $desiredResult)) {
        return $isStrEqual;
    }
    if (preg_match('/^\$?str(ing)?[_ -]?1$/i', $desiredResult)) {
        return ($isStrEqual) ? $str1 : null;
    }
    if (preg_match('/^\$?str(ing)?[_ -]?2$/i', $desiredResult)) {
        return ($isStrEqual) ? $str2 : null;
    }
    if (preg_match('/^str(ing)?$/i', $desiredResult)) {
        return ($isStrEqual) ? $newStr1 : null;
    }
}

/**
 * Returns whether a string is equal to an other by offering comparison options
 * 
 * @param string $str1 The first string
 * @param string[]|string $expected The expected string.
 * @param bool $caseSensitive If true, will be sensitive to upper and lower case
 * @param bool $dashesAndSpacesSensitive If false, dashes and spaces will be ignored
 * 
 * @return bool
 */
function isStrEqual(string $str1, $str2, bool $caseSensitive = false, bool $dashesAndSpacesSensitive = false): ?bool
{
    return getStrEqual($str1, $str2, $caseSensitive, $dashesAndSpacesSensitive, 'bool');
}



// ◘◘ >> DATE / TIME
/**
 * Returns datetime infos
 * 
 * @param string $datetime The datetime
 * @param array $desiredInfos The desired infos. It can be :
 *   - 'day':       day in 2 digits
 *   - 'month2':   month in letters
 *   - 'year_4':    year_4 in 4 digits
 *   - 'hh':        hour in 2 digits
 *   - 'ss':        seconds in 2 digits
 * 
 * @return array
 */
function getDatetimeInfos($datetime, $desiredInfos = [])
{
    preg_match('/^(?:(?<year>[1-2]\d{3})-(?<month>\d{1,2})-(?<day>\d{1,2}))? ?(?:(?<hour>\d{1,2}):(?<min>\d{1,2})(?::(?<sec>\d{1,2}))?)?$/', $datetime, $matches);
    $matches['datetime'] = $matches[0];
    if (($matches == null) || ($matches['datetime'] === '')) {
        return;
    }
    arr_remove_numeric_keys($matches);
    // add infos
    $matches['year_4'] = $matches['year'];
    unset($matches['year']);
    $matches['month_1'] = getOneOrTwoDigitsStr($matches['month'], true);
    $matches['month_2'] = getOneOrTwoDigitsStr($matches['month'], false);
    $matches['month_fr'] = getMonth(+$matches['month_1'], true, 'all');
    $matches['month_fr_current_abbreviated'] = getMonth(+$matches['month_1'], true, 'current');
    unset($matches['month']);
    $matches['weekday_1'] = getWeekDay($matches['datetime'], false);
    $matches['weekday_fr'] = getWeekDay(+$matches['weekday_1'], true, 'all');
    $matches['weekday_fr_current_abbreviated'] = getWeekDay(+$matches['weekday_1'], true, 'current');
    $matches['day_1'] = getOneOrTwoDigitsStr($matches['day'], true);
    $matches['day_2'] = getOneOrTwoDigitsStr($matches['day'], false);
    unset($matches['day']);
    $matches['hour_1'] = getOneOrTwoDigitsStr($matches['hour'], true);
    $matches['hour_2'] = getOneOrTwoDigitsStr($matches['hour'], false);
    unset($matches['hour']);
    $matches['min_1'] = getOneOrTwoDigitsStr($matches['min'], true);
    $matches['min_2'] = getOneOrTwoDigitsStr($matches['min'], false);
    unset($matches['min']);
    $matches['sec_1'] = getOneOrTwoDigitsStr($matches['sec'], true);
    $matches['sec_2'] = getOneOrTwoDigitsStr($matches['sec'], false);
    unset($matches['sec']);
    if (count($desiredInfos) === 0) {
        return $matches;
    }
    return arr_filter_keys($matches, $desiredInfos);
}

/**
 * Returns the week day, in number or in letters (french). 
 * 
 * @param string|int $data The datetime or the digit week day.
 * @param bool $letters If true, the day will be turned over in letters
 * @param string|int $characters Concerns the length of the returned word, if letters are desired. Among :
 *    - 'all':  The entire word.
 *    - 'current':  The most current abbreviation.
 *    - integer:  The desired number of characters.
 * 
 * @return string
 */
function getWeekDay($data, $letters = true, $characters = 'all')
{
    $days_fr =              ['fake',  'lundi',  'mardi',  'mercredi',  'jeudi',  'vendredi',  'samedi',  'dimanche'];
    $days_fr_abbreviated =  ['fake',  null,     null,     5,           null,     5,           3,         3];
    if (gettype($data) === 'integer') {
        $day = $data;
    } else {
        $date = new DateTime($data);
        $day = $date->format('N');
    }
    if (!$letters) {
        return $day;
    }
    if ($characters === 'all') {
        return $days_fr[$day];
    }
    if ($characters > strlen($days_fr[$day])) {
        return $days_fr[$day];
    }
    if ($characters === 'current') {
        $dayLength = strlen($days_fr[$day]);
        $strLength = isset($days_fr_abbreviated[$day]) ? $days_fr_abbreviated[$day] : $dayLength;
        $str = substr($days_fr[$day], 0, $strLength);
        if ($strLength < $dayLength) {
            $str .= '.';
        }
        return $str;
    } else if (gettype($characters) === 'integer') {
        $str = substr($days_fr[$day], 0, $characters);
        return $str;
    }
}

/**
 * Returns the month, in number or in letters (french). 
 * 
 * @param string|int $val The datetime or the digit month.
 * @param bool $letters If true, the day will be turned over in letters
 * @param string|int $characters Concerns the length of the returned word, if letters are desired. Among :
 *    - 'all':  The entire word.
 *    - 'current':  The most current abbreviation.
 *    - integer:  The desired number of characters.
 * 
 * @return string
 */
function getMonth($val, $letters = true, $characters = 'all')
{
    $months_fr =                ['fake',  'janvier',  'février',  'mars',  'avril',  'mai',  'juin',  'juillet',  'août',  'septembre',  'octobre',  'novembre',  'décembre'];
    $months_fr_abbreviated =    ['fake',  4,          4,          null,    3,        null,   null,    5,          null,    4,            3,          3,           3];
    $type = gettype($val);
    switch ($type) {
        case 'integer':
            $month = $val;
            break;
        case 'string':
            $date = new DateTime($val);
            $month = $date->format('n');
    }
    if (!$letters) {
        return $month;
    }
    if ($characters === 'all') {
        return $months_fr[$month];
    }
    if ($characters === 'current') {
        $monthLength = strlen($months_fr[$month]);
        $strLength = isset($months_fr_abbreviated[$month]) ? $months_fr_abbreviated[$month] : $monthLength;
        $str = mb_substr($months_fr[$month], 0, $strLength);
        if ($strLength < $monthLength) {
            $str .= '.';
        }
        return $str;
    } else if (gettype($characters) === 'integer') {
        if ($characters > strlen($months_fr[$month])) {
            return $months_fr[$month];
        }
        $str = mb_substr($months_fr[$month], 0, $characters);
        return $str;
    }
}

/**
 * Returns the number provided as 1 or 2 digits (with or without zero)
 * 
 * @param int|string $number The source number
 * @param bool $oneDigitDesired
 * If true :
 *      - ($number < 10) will be returned without the zero
 * If false :
 *      - ($number < 10) will be returned with the zero
 * 
 * @return string
 */
function getOneOrTwoDigitsStr($number, $oneDigitDesired = true)
{
    $length = strlen('' . +$number);
    $iNumber = +$number;
    // if bad $number provided : returns
    if ($length > 2) {
        return;
    }
    // one character desired
    if ($oneDigitDesired) {
        return ('' . $iNumber);
    }
    // two characters desired
    return ($length === 1) ? ('0' . $iNumber) : ('' . $iNumber);
}

/**
 * Returns the number of days present in the month of a given year
 * 
 * @param int $month The month number
 * @param int $year The year
 * @returns {TinyInt}
 */
function getDaysMonth(int $month, int $year)
{
    if ($month == 2) {
        if ($year % 4 === 0) {
            if ($year % 100 === 0) {
                return ($year % 400 === 0) ? 29 : 28;
            }
            return 29;
        }
        return 28;
    }
    if ($month < 8) {
        return ($month % 2 === 0) ? 30 : 31;
    }
    return ($month % 2 === 1) ? 30 : 31;
}



// ◘◘ >> MIXED

/**
 * Returns if a data is empty or not
 * 
 * @param mixed $data The data to check
 * @return Bool
 */
function isEmpty($val)
{
    if ($val == null) {
        return true;
    }
    switch (gettype($val)) {
        case 'string':
            return (trim($val) === '');
        case 'array':
            return (count($val) === 0);
        default:
            return false;
    }
}

/**
 * Returns whether a provided string is a php type
 * 
 * @param string $str The string to check
 * 
 * @return bool
 */
function isPhpType(string $str, $includeNull = false): bool
{
    $phpTypes = ['boolean', 'integer', 'double', 'string', 'array', 'object', 'resource'];
    if ($includeNull) {
        $phpTypes[] = 'NULL';
    }
    return in_array($str, $phpTypes);
}



// ◘◘ >> DEVELOPPER

/**
 * Write the given script surrounding it with a </script> tag
 * 
 * @param string $content The JS code to execute (will be surrounded by </script> tags) 
 */
function jsScript($content)
{
    echo '<script>' . $content . '</script>';
}

/**
 * JS Script : alias for 'alert()' function.
 * 
 * Except, that it allows in addition to provide
 * one or more arguments : each argument will be displayed on a new line.
 * 
 * JSON.stringify() is applied on each argument :
 *  - used to display the content of objects
 *  - text strings are displayed as is (not surrounded by quotes)
 *  - arrays are prefixed by "(arr) "
 *  - numeric values are prefixed by "(num) "
 */
function a()
{
    if (!isLocalhost()) {
        return;
    }
    $s = '';
    $args = func_get_args();
    foreach ($args as $arg) {
        $json_enc = json_encode($arg);
        $first_car = substr($json_enc, 0, 1);
        if ($first_car === '"') {
            // string
            $json_enc = substr($json_enc, 1, strlen($json_enc) - 2);
        } else if ($first_car === '[') {
            // array
            $json_enc = '(arr)' . '\t' . $json_enc;
        } else if (is_numeric($arg)) {
            // number
            $json_enc = '(num)' . '\t' . $json_enc;
        }
        $s .= $json_enc . "\\n";
    }
    jsScript(
        'alert(\'' . '<<< PHP >>>\n' . $s . '\')'
    );
}

/**
 * JS Script : alias for 'console.log()' function.
 * Only if in localhost or if a project developer is connected as a client.
 * 
 */
function l()
{
    if (!isLocalhost() || !isDevelopperConnected()) {
        return;
    }
    $s = '';
    foreach (func_get_args() as $arg) {
        $json_enc = json_encode($arg);
        if (!$json_enc) {
            $s .= '"(err) : ' . json_last_error_msg() . '"';
        } else {
            $s .= $json_enc . ", ";
        }
    }
    jsScript(
        'console.log("<<< PHP >>>",' . $s . ')'
    );
}

/**
 * shortcut for krumo() : developper tool similar to var_dump()
 */
function k()
{
    krumo(func_get_args());
}



// ◘◘ >> SECURITY

/**
 * • Replace 'script' tags by 'em' tags
 * • Escape html special characters with 'ENT_QUOTES' flag
 * 
 * @param mixed &$value The value to secure
 * 
 * @return mixed Same type as origin
 */
function secure(&$value)
{
    if (gettype($value) === 'string') {
        $value = preg_replace("/(?<=<|<\/)script/i", "em", $value);
        $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    }
    return $value;
}

/**
 * On each value of the provided array :
 *  • Replace 'script' tags by 'em' tags
 *  • Escape html special characters with 'ENT_QUOTES' flag
 * 
 * @param mixed[] &$arr The array to secure
 */
function arr_secure(&$arr)
{
    array_walk_recursive($arr, 'secure');
}


// ◘◘ >> FAKE !
/**
 * Send an e-mail (fake). Creates a log file named 'notif__all_users__sendEmail.html' which contains all provided arguments for the moment.
 * 
 * @param string $email
 * @param string $sender
 * @param string $recipient
 * @param string $subject
 * @param string $content
 */
function sendEmail($senderEmail, $recipientEmail, $subject, $content)
{
    $emailInfos = [
        'senderEmail' =>  $senderEmail,
        'recipientEmail' =>  $recipientEmail,
        'subject' =>  $subject,
        'content' =>  $content
    ];
    // todo : modify this function
    Log::append_f('notif__all_users__sendEmail', $emailInfos);
}
