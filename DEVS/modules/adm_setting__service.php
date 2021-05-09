<?php
require_once  "initialize.php";
/**
 * Class adm_setting__service | fichier adm_setting__service.php
 *
 * Provides services to the business layer.
 *
 * This class requires the use of the following files:
 *    • require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_setting_service
 * @author @AfpaLabTeam - Virginie & Damien
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v3.0
 */

Class Adm_setting__service extends Initialize	{

    /**
      * public $resultat is used to store all datas needed for HTML Templates
      * @var array
      */
    public $resultat;

    /**
      * init variables resultat
      *
      * execute main function
      */
    public function __construct() {
      // Call Parent Constructor
      parent::__construct();

      // init variables resultat
      $this->resultat = [];

      // execute main function
      
    }

    /**
      *
      * Destroy service
      *
      */
    public function __destruct() {
      // Call Parent destructor
      parent::__destruct();
      // destroy objet_service
      unset($objet_service);
    }

    /**
        * Returns the id of the provided parameter
        * 
        * @param string $paramName The parameter name
        * @param string|int $centerId The center id
        * 
        * @return string|null Null if the parameter isn't in database
        */
    private function getParamId(string $paramName, $centerId) {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "setting__get_param_id.sql";
        $aResult = $this->oBdd->getSelectDatas($sqlPath, [
                'centerId' =>  $centerId,
                'paramName' =>  $paramName
        ]);
        if ( isset($aResult[0]['paramId']) ) {
            return $aResult[0]['paramId'];
        }
    }


    /**
     * Recover the settings in database
     * 
     * @param bool $valOnly If true : returns an associative array with the name of the parameters as keys, and their value as values
     * @param bool $paramsToFilter The names of the desired parameters. If empty, all parameters will be returned.
     * 
     * @return array
     */
    public function getParams($valOnly = false, array $paramsToFilter = []) {
        $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "setting__get_params.sql";
        $arr = $this->oBdd->getSelectDatas(
            $sSqlPath,
            [
                'centerId' =>       $_SESSION['id_center']
            ]
        );
        // ◘           [ ['paramName'   => $name,
        //                'paramValue'  => $value,
        //                'paramStatus' => $status].. ]
        if (!$valOnly) {
            if (count($paramsToFilter) > 0) {
                // filter params
                foreach ($arr as $paramIndex => &$paramInfos) {
                    $paramName = $paramInfos['paramName'];
                    if (!in_array($paramName, $paramsToFilter)) {
                        unset($arr[$paramIndex]);
                    }
                }
            }
            return $arr;
        }
        // ◘           [ [$name => $value].. ]
        $aResult = [];
        foreach ($arr as $paramInfos) {
            $paramName = $paramInfos['paramName'];
            $paramValue = $paramInfos['paramValue'];
            $aResult[$paramName] = $paramValue;
        }
        if (count($paramsToFilter) > 0) {
            // filter params
            $aResult = arr_filter_keys(
                $aResult,
                $paramsToFilter
            );
        }
        return $aResult;
    }


    /**
     * Update the settings in database ('crcdValidation', 'validationTime', 'paymentTime' or 'recoveryTime' if provided)
     * Or insert them if they don't already exist.
     * 
     * @return array
     */
    public function saveParams() {
        $aResult = [];
        // recover secured data
        $aSource = Input_control::getData(true);
        $sSqlInsertPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "setting__insert_parameter.sql";
        $sSqlUpdatePath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "setting__update_parameter.sql";
        foreach ($aSource as $paramName => $paramValue) {
            $paramId = $this->getParamId($paramName, $_SESSION['id_center']);
            $replacements = [
                'centerId' =>       $_SESSION['id_center'],
                'paramName' =>      $paramName,
                'paramValue' =>     $paramValue
            ];
            if ( $paramId === null ) {
                // non-existent parameter: we will create it
                $aResult[$paramName] = $this->oBdd->treatDatas($sSqlInsertPath, $replacements);
            } else {
                // the parameter is already in the database: we update it
                $aResult[$paramName] = $this->oBdd->treatDatas($sSqlUpdatePath, $replacements);
            }
            // if error : returns
            if ( !isEmpty($aResult[$paramName]['error']) ) {
                $aResult['error'] = $aResult[$paramName]['error'];
                return $aResult;
            }
        }
        // Returns the result
        return $aResult;
    }

}


?>

