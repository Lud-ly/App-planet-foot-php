<?php
require_once dirPath($GLOBALS_INI['PATH_HOME'].'/'.$GLOBALS_INI['PATH_CLASS'].'/'.'vendor', false) . 'krumo/class.krumo.php';

/**
 * Includes development tools:
 *   • log of variables supplied as parameters (in the form of a var_dump() or a printr() equivalent)
 *   • specific log of a hacking attempt
 *   • specific log of an error
 * 
 * @requires :
 *    • utils.php
 *    • class.krumo.php
 * 
 * @author Damien Grember <dgrember@gmail.com> France, Herault 34
 * Trained by Learning Masters Numérique Digital :
 *    • Jean-Jacques Pagan
 *    • Thomas Gonzalez Vegas
 * Thank you to them, to my colleagues and to the afpanier project team :)
 * @copyright Free use for Afpanier project
 * @version 1.15
 */
abstract class Log {

    /**
     * @var string $logHtml The log html code.
     */
    private static $logHtml;

    /**
     * @var bool $refreshBackTrace If true, the debug backtrace will be refreshed by the 'f' or 'append_f' method.
     */
    private static $refreshBackTrace = true;

    /**
     * @var array $backTrace The debug backtrace.
     */
    private static $backTrace;

    /**
     * @var string 'HACKING_ATTEMPTS_SUBDIR_NAME' The name of the sub-directory where will be saved hacking attemps logs.
     */
    private const HACKING_ATTEMPTS_SUBDIR_NAME = 'hacking_attempts';

    /**
     * @var string 'METHOD_NAME_START_HTML' The method name start html
     */
    private const METHOD_NAME_START_HTML = '<a class="krumo-name">';

    /**
     * @var string 'METHOD_NAME_END_HTML' The method name end html
     */
    private const METHOD_NAME_END_HTML = '</a>';

    /**
     * @var string 'CALLER_START_HTML' The caller start html
     */
    private const CALLER_START_HTML = '<span class="krumo-call">';

    /**
     * @var string 'CALLER_END_HTML' The caller end html
     */
    private const CALLER_END_HTML = '</span>';

    /**
     * @static
     * @var bool $isHackingAttemptLog If true, the log will be saved in the hacking attempts sub-directory
     */
    private static $isHackingAttemptLog = false;

    /**
     * Replace infos (log method name / caller file path / caller line) into the log html code.
     */
    private static function replace_infos() {
        // set the replacement data
        $filePath = self::$backTrace[0]['file'];
        $line = self::$backTrace[0]['line'];
        $method_name = self::$backTrace[0]['class'] . self::$backTrace[0]['type'] . self::$backTrace[0]['function'];

        // METHOD NAME
        $startPos = strpos(self::$logHtml, self::METHOD_NAME_START_HTML) + strlen(self::METHOD_NAME_START_HTML);
        $endPos = strpos(self::$logHtml, self::METHOD_NAME_END_HTML, $startPos);
        self::$logHtml = substr_replace(self::$logHtml, $method_name, $startPos, $endPos - $startPos);

        // FILE & LINE
        $endPos = strrpos(self::$logHtml, self::CALLER_END_HTML);
        $startPos = strrpos(self::$logHtml, self::CALLER_START_HTML) + strlen(self::CALLER_START_HTML);
        $replacement = 'Called from <code>' . $filePath . '</code>, line <code>' . $line . '</code>';
        self::$logHtml = substr_replace(self::$logHtml, $replacement, $startPos, $endPos - $startPos);
    }

    /**
     * Clean provided log files : sets their content to "" (only if the file exists).
     * 
     * @param string[]|string $fileNames All file names you want to clear.
     * Without extension, name as supplied to the log method.
     */
    static function clear($fileNames = []) {
        switch (gettype($fileNames)) {
            case 'array':
                foreach ($fileNames as $fileName) {
                    static::clear($fileName);
                }
                break;
            case 'string':
                if ( !file_exists(dirPath(Log::get_logs_path(),false).$fileNames.'.html') ) {
                    return;
                }
                static::f(
                    $fileNames,
                    ''
                );
        }
    }

    /**
     * @static
     * Returns the path of the folder used for saving logs
     * 
     * @param bool $hackingAttempsPath It true, returns the hacking attemps dir path
     * 
     * @return string
     */
    static function get_logs_path() {
        $logsDirPath = Configuration::$logsPath;
        if (self::$isHackingAttemptLog) {
            return dirPath($logsDirPath . '/' . self::HACKING_ATTEMPTS_SUBDIR_NAME . '/' . strftime('%Y_%m_%d'), true);
        }
        return $logsDirPath;
    }
    
    /**
     * Returns customized css and js scripts which will be prepended to log files :
     *   - colorize content types like a var_dump() would,
     *   - unfold all arrays as soon as the page loads.
     * 
     * @param bool $colorize_types If true, colorize content types like a var_dump() would.
     * @return string $unfold_all If true, unfold all arrays as soon as the page loads.
     */
    static function get_custom_additions($colorize_types = true, $unfold_all = true) {
        $css =
        '<style type="text/css">
            .krumo-string {
                color:	#cc0000;
            }
            
            .krumo-integer {
                color:	#4e9a06;
            }
            
            .krumo-boolean {
                color:	#75507b;
            }
        </style>';

        $js =
        '<script>
            window.onload = function()
            {
                let elements = document.getElementsByClassName("krumo-expand");
                let elementsLength = elements.length;  
                for (let i = 0 ; i < elementsLength ; i++) {
                    krumo.toggle(elements[i]);
                }
            }
        </script>';
        return (($colorize_types) ? $css : '') . "\n" . (($unfold_all) ? $js : '');
    }

    /**
     * Append an error in the 'php_error.log' file.
     * A break line and json_encode() is used for each argument.
     * 
     * @param ...$data All error messages/data to log.
     */
    static function error() {
        $str = "\n" . '◘_ERR:';
        foreach (func_get_args() as $arg) {
            $str .= ( "\n".json_encode($arg) );
        }
        $str .= ( "\n" . '◘' );
        error_log( $str );
    }

    /**
     * @static
	 * Log a hacking attempt. Il will append the log to '$$__HACKING_ATTEMPTS__.html' :
	 *  - datetime,
	 *  - session data,
     *  - $_POST,
     *  - $_GET,
	 *  - debug_backtrace (including provided method arguments)
	 */
	static function hacking_attempt() {
        Log::$isHackingAttemptLog = true;
        Log::append_f(
                strftime('%Y_%m_%d__%H_%M_%S')
            ,
                [
                    $_SESSION,
                    $_POST,
                    $_GET,
                    debug_backtrace()
                ]
        );
        Log::$isHackingAttemptLog = false;
	}

    /**
     * @static
     * Save krumo(args) result in the file named "$fileName.html"
     * 
     * @param string $fileName The file name
     * @param mixed $values,... All values you want to save into the log file (in 1 or more arguments).
     */
    static function f(string $fileName, ...$values) {
        $args = func_get_args();
        unset($args[0]);
        if (self::$refreshBackTrace) {
            self::$backTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
        }
        self::$logHtml = krumo::fetch($args);
        self::replace_infos();
        write_into_file( Log::get_logs_path(), $fileName.'.html', self::$logHtml, Log::get_custom_additions() );
    }

    /**
     * @static
     * Save krumo(...$values) result in the file named 'f1.html'
     * 
     */
    static function f1(...$values) {
        self::$refreshBackTrace = false;
        self::$backTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
        Log::f('f1', func_get_args());
        self::$refreshBackTrace = true;
    }

    /**
     * @static
     * Save krumo(...$values) result in the file named 'f2.html'
     * 
     */
    static function f2(...$values) {
        self::$refreshBackTrace = false;
        self::$backTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
        Log::f('f2', func_get_args());
        self::$refreshBackTrace = true;
    }

    /**
     * @static
     * Append krumo(...$values) result to the file named "$fileName.html"
     * 
     * @param string $fileName The file name
     * @param mixed $values,... All values you want to save into the log file (in 1 or more arguments).
     */
    static function append_f(string $fileName, ...$values) {
        if (self::$refreshBackTrace) {
            self::$backTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
        }
        $fileExists = file_exists(Log::get_logs_path() . $fileName . '.html');
        $css_js = $fileExists ? '' : Log::get_custom_additions();
        $dir = Log::get_logs_path();
        if ($dir == null) {
            return;
        }
        $sPath = $dir . $fileName . ".html";
        $args = func_get_args();
        unset($args[0]);
        date_default_timezone_set('Europe/Paris');
        $datetime = date("Y-m-d  H:i:s");
        $prepend_data = "◘◘ $datetime ○ $fileName : \n";
        ob_start();
        krumo($args);
        self::$logHtml = ob_get_clean();
        if ($fileExists) {
            // remove style tag from new flush
            $start = strpos(self::$logHtml, '<style');
            $end = strpos(self::$logHtml, '</style>', $start) + strlen('</style>');
            if ($end > $start) {
                self::$logHtml = substr_replace(self::$logHtml, '', $start, $end - $start);
            }
            // remove style tag from new flush
            $start = strpos(self::$logHtml, '<script');
            $end = strpos(self::$logHtml, '</script>', $start) + strlen('</script>');
            if ($end > $start) {
                self::$logHtml = substr_replace(self::$logHtml, '', $start, $end - $start);
            }
        }
        self::replace_infos();
        $data = $css_js . $prepend_data . self::$logHtml;
        $fp = fopen($sPath, "c+b");
        fseek ( $fp, 0, SEEK_END );
        fwrite($fp, $data);
        fclose($fp);
    }

    /**
     * @static
     * Append krumo(...$values) result to the file named "append_f1.html"
     * 
     * @param mixed $values,... All values you want to save into the log file (in 1 or more arguments).
     */
    static function append_f1(...$values) {
        self::$refreshBackTrace = false;
        self::$backTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
        Log::append_f('append_f1', func_get_args());
        self::$refreshBackTrace = true;
    }

    /**
     * @static
     * Append krumo(...$values) result to the file named "append_f2.html"
     * 
     * @param mixed $values,... All values you want to save into the log file (in 1 or more arguments).
     */
    static function append_f2(...$values) {
        self::$refreshBackTrace = false;
        self::$backTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
        Log::append_f('append_f2', func_get_args());
        self::$refreshBackTrace = true;
    }

    /**
     * @static
     * Save var_dump() result to the file named "$fileName.html"
     * 
     * @param string $fileName The log file name.
     * @param mixed $values,... All values you want to save into the var_dump() log file (in 1 or more arguments).
     */
    static function var_dump_f(string $fileName, ...$values) {
        $args = func_get_args();
        unset($args[0]);
        ob_start();
        var_dump($args);
        $data = ob_get_clean();
        write_into_file(Log::get_logs_path(), $fileName . ".html", $data);
    }

    /**
     * @static
     * Save var_dump(...$values) result to the file named 'var_dump_f1.html'
     * 
     */
    static function var_dump_f1(...$values) {
        ob_start();
        var_dump(func_get_args());
        $data = ob_get_clean();
        write_into_file(Log::get_logs_path(), 'var_dump_f1.html', $data);
    }
    
    /**
     * @static
     * Save var_dump(...$values) result to the file named 'var_dump_f2.html'
     * 
     */
    static function var_dump_f2(...$values) {
        ob_start();
        var_dump(func_get_args());
        $data = ob_get_clean();
        write_into_file(Log::get_logs_path(), 'var_dump_f2.html', $data);
    }

    /**
     * @static
     * Save var_dump(...$values) result to the file named "$fileName.html"
     * 
     * @param string $fileName The file name
     * @param mixed $values,... All values you want to save into the var_dump log file (in 1 or more arguments).
     */
    static function var_dump_append_f(string $fileName, ...$values) {
        $dir = Log::get_logs_path();
        if ($dir == null) {
            return;
        }
        $sPath = $dir . $fileName . ".html";
        $args = func_get_args();
        unset($args[0]);
        date_default_timezone_set('Europe/Paris');
        $datetime = date("Y-m-d  H:i:s");
        $prepend_data = "◘◘ $datetime ○ $fileName : \n";
        ob_start();
        var_dump($args);
        $data = $prepend_data . ob_get_clean();
        $fp = fopen($sPath, "c+b");
        fseek ( $fp, 0, SEEK_END );
        fwrite($fp, $data);
        fclose($fp);
    }

}