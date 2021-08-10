<?php

/**
 * Input_control JS Library Integration interface.
 * 
 * Ensures that the class can convert validation rules that have been
 * supplied to an Input_Control object for use with a JavaScript library.
 * These are automatically transmitted / retrieved.
 */
interface Input_control__JsLibIntegration
{
    public static function strAfterReplacementForJsLib ();
    public static function strBeforeReplacementForJsLib ();

    public function addMessageForJsLib (array $subArrays);
    public function getRulesForJsLib ($secureIt = true): ?array;
    public function replaceForJsLib (string $str, $isRender = true);
    public function updateRuleForJsLib (?string $ruleName = null, ?array &$ruleArray = null);
    public function updateSubRuleForJsLib (?string $subRuleName = null, ?array &$subRuleArray = null);
}