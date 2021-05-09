<?php

/**
 * Allows you to simplify configuration management.
 * 
 * @author Damien Grember <dgrember@gmail.com> France, Herault 34
 * Trained by Learning Masters Numérique Digital :
 *    • Jean-Jacques Pagan
 *    • Thomas Gonzalez Vegas
 * Thank you to them, to my colleagues and to the afpanier project team :)
 * @copyright Free use for Afpanier project
 * @version 1.0
 */
trait EasyConfig {

    /**
     * Returns the config generated from the default config, on which each customized parameter has been replaced, provided that its value is of the same type as that of the default config
     * 
     * @param array &$defaultConfig The default config
     * @param array &$customizedParams The parameters to apply over the default config, if of the same type
     * @param bool $onlyIfSameType If true, accept the parameter provided only if it is of the same type as the default
     * 
     * @return array
     */
    private static function getCustomizedConfig(&$defaultConfig, &$customizedParams, $onlyIfSameType = true) {
        // returns null if error
        if (
            gettype($defaultConfig) !== 'array' ||
            gettype($customizedParams) !== 'array' ||
            count($defaultConfig) === 0
        ) {
            return;
        }
        $result = $defaultConfig;
        // cycle through each parameter
        foreach ($customizedParams as $providedParamName => $providedParamValue) {
            // if the parameter provided does not exist in the default config : iterates
            if ( !isset($defaultConfig[$providedParamName]) ) {
                continue;
            }
            // if the type of the parameter provided is different from that of the default value: iterates (if requested)
            if (
                ( $onlyIfSameType ) &&
                ( gettype($providedParamValue) !== gettype($defaultConfig[$providedParamName]) )
            ) {
                continue;
            }
            // ok : copy the provided param into the result
            $result[$providedParamName] = $providedParamValue;
        }
        // returns the result
        return $result;
    }

    /**
     * Allows you to filter parameters, and to rename them (ignore case, dashes and spaces) so that the final name in config is the one present in $allowedParams.
     * 
     * @param mixed[] &$config The config which will be optimized
     * @param string[] &$allowedParams All parameters you allows for this config.
     * @param bool $deleteUnknownParams If true, accept the parameter provided only if it is of the same type as the default
     * @param bool $recursivity If true, the 
     * 
     * @return array
     */
    private static function optimizeConfig (&$config, &$allowedParams, $deleteUnknownParams = false, $recursivity = true) {
        if ( !is_numeric(array_key_first($allowedParams)) ) {
            // if $allowedParams keys are not numbers :
            // $validParams = $allowedParams values
            $validParams = array_keys($allowedParams);
        } else {
            $validParams =& $allowedParams;
        }
        foreach ($config as $providedParamName => $providedParamValue) {
            $correctParamName = getStrEqual($providedParamName, $validParams);
            if ($correctParamName === null) {
                if ($deleteUnknownParams) {
                    // remove the item if not an allowed param
                    unset($config[$providedParamName]);
                }
            } elseif ($correctParamName !== $providedParamName) {
                $paramValue = $config[$providedParamName];
                unset($config[$providedParamName]);
                $config[$correctParamName] = $paramValue;
                // rename param if its name is not well formated (spaces, dashes, case..)
                $providedParamName = $correctParamName;
            }
            if (
                $recursivity &&
                ( isset($config[$correctParamName]) ) &&
                ( gettype($config[$correctParamName]) === 'array' ) &&
                ( isset($allowedParams[$correctParamName]) ) &&
                ( gettype($allowedParams[$correctParamName]) === 'array' )
            ) {
                // recursive call with 
                static::optimizeConfig(
                    $config[$correctParamName],
                    $allowedParams[$correctParamName],
                    false,
                    true
                );
            }
        }

    }

}