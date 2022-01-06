<?php


/**
 * Rules which are used by Input_control objects
 */
class Input_control__fieldsRules
implements Countable, Iterator, ArrayAccess
{
    /**
     * @property array $jFieldsRules All fields rules
     */
    private $jFieldsRules = [];

    /**
     * @property array|null $selectedFields All selected fields
     */
    private $selectedFields = null;

    /**
     * @property array $aEmpty An empty array : for passage by reference
     */
    private static $aEmpty = [];


    // ◘ CONSTRUCTOR
    /**
     * @param Input_control__fieldsRules|array $fieldsRules Rules that concern all the fields.
     * Array like this :
     * [ $fieldName => $fieldRules,... ]
     * @param bool $byReference. Default: false.
     *  • true: $fieldsRules will be setted by reference.
     *  • false: $fieldsRules will be cloned.
     */
    function __construct (iterable &$fieldsRules, $byReference = false)
    {
        $this->setFieldsRules($fieldsRules, $byReference);
    }

    /**
     * Returns the fields rules array by reference.
     * 
     * @return array
     */
    public function &arr (): array
    {
        return $this->jFieldsRules;
    }

    /**
     * Returns a new object with a copy of the field rules.
     * 
     * @return Input_control__fieldsRules New instance
     */
    public function &clone (): Input_control__fieldsRules
    {
        if ($this->selectedFields !== null) {
            // clone from selected fields
            $jFieldsRules =& $this->fieldsRulesFromSelectedFields(false);
        } else {
            // clone from all fields
            $jFieldsRules = $this->toArray();
        }
        $oNewFieldsRules = new Input_control__fieldsRules($jFieldsRules, false);
        return $oNewFieldsRules;
    }

    /**
     * Removes the rules from one or more fields
     * 
     * @param string|string[] $fieldsNames Name of fields to delete
     * 
     * @return Input_control__fieldsRules Current instance
     */
    public function &delete (): Input_control__fieldsRules
    {
        $aFieldsName = $this->fieldsName();
        foreach ($aFieldsName as $sFieldNameToDelete) {
            if (isset($this->jFieldsRules[$sFieldNameToDelete])) {
                unset($this->jFieldsRules[$sFieldNameToDelete]);
            }
        }
        $this->resetSelectedFields();
        return $this;
    }

    /**
     * Returns a copy of all field names in an array (selected fields or all fields)
     * 
     * @return array
     */
    public function fieldsName (): array
    {
        if ($this->selectedFields !== null) {
            // only selected fields
            return $this->selectedFields;
        } else {
            // all fields
            return array_keys($this->arr());
        }
    }

    /**
     * Returns fields rules from selected fields
     * 
     * @param bool $byReference. Default: false.
     *  • true: $fieldsRules will be setted by reference.
     *  • false: $fieldsRules will be cloned.
     * 
     * @return array
     */
    private function &fieldsRulesFromSelectedFields ($byReference = false): array
    {
        if (empty($this->selectedFields)) {
            return static::$aEmpty;
        }
        $jFieldsRules = [];
        foreach ($this->selectedFields as $fieldName) {
            if ($byReference) {
                $jFieldsRules[$fieldName] =& $this->jFieldsRules[$fieldName];
            } else {
                $jFieldsRules[$fieldName] = $this->jFieldsRules[$fieldName];
            }
        }
        return $jFieldsRules;
    }

    /**
     * Returns a new instance, or a copy of the fields rules in an array
     * with the possibility of including and excluding certain field names.
     * 
     * @param string[]|null $inclusion All fields to include. If null : all fields will be included. Default: null.
     * @param string[]|null $exclusion All fields to exclude. If null : no field will be excluded. Default: null.
     * 
     * @return Input_control__fieldsRules Current instance
     */
    public function filterByFields (?array $inclusion = null, ?array $exclusion = null)
    {
        $jFieldsRules =& $this->arr();
        // $inclusion: all fields by default (if null)
        if ($inclusion === null) {
            $inclusion = array_keys($jFieldsRules);
        }
        // $exclusion: no field by default (if null)
        if ($exclusion === null) {
            $exclusion = [];
        }
        $this->resetSelectedFields(true);
        foreach ($jFieldsRules as $fieldName => &$fieldValue) {
            if (
                in_array($fieldName, $inclusion) &&
                !in_array($fieldName, $exclusion)
            ) {
                $this->selectedFields[] = $fieldName;
            }
        }
        return $this;
    }

    /**
     * Reset all selected fields (set them to null)
     * 
     * @param bool $array. Default: false.
     *  - true: will be []
     *  - false: will be null
     */
    public function resetSelectedFields ($array = false)
    {
        $this->selectedFields = ($array ? [] : null);
    }

    /**
     * Apply or return a rule on each field, or on all fields
     */
    public function rule ($ruleName, $ruleValue): Input_control__fieldsRules
    {
        $aFieldsName = $this->fieldsName();
        foreach ($aFieldsName as $sFieldName) {
            $this->jFieldsRules[$sFieldName][$ruleName] = $ruleValue;
        }
        return $this;
    }

    /**
     * Set new fields rules (after deleting the rules from all fields)
     * 
     * @param Input_control__fieldsRules|array $fieldsRules Rules that concern all the fields.
     * Array like this :
     * [ $fieldName => $fieldRules,... ]
     * @param bool $byReference. Default: false.
     *  • true: $fieldsRules will be setted by reference.
     *  • false: $fieldsRules will be cloned.
     * 
     * @return Input_control__fieldsRules Current instance
     */
    public function setFieldsRules (&$fieldsRules, $byReference = false)
    {
        switch (gettype($fieldsRules)) {
            case 'array':
                if ($byReference) {
                    $this->jFieldsRules =& $fieldsRules;
                } else {
                    $this->jFieldsRules = $fieldsRules;
                }
                break;
            case 'object':
                if ($byReference) {
                    $this->jFieldsRules =& $fieldsRules->arr();
                } else {
                    $this->jFieldsRules =& $fieldsRules->toArray();
                }
                break;
        }
        return $this;
    }

    /**
     * Returns a copy of the fields rules in an array.
     */
    public function toArray (): array
    {
        return $this->jFieldsRules;
    }

    /**
     * Insert fields rules into a new InputControl instance
     * 
     * @return Input_control New instance
     */
    public function &insertIntoNewInputControl ($formName = null, $config = [])
    {
        $newInstance = Input_control::new(
            $this,
            $formName,
            $config
        );
        return $newInstance;
    }

    /**
     * Insert fields rules into a new InputControl instance
     * 
     * @return Input_control New instance
     */
    public function &insertIntoNewInputControlWithValidateJS ($formName = null, $config = [])
    {
        $newInstance = Input_control::newValidateJs(
            $this,
            $formName,
            $config
        );
        return $newInstance;
    }

    // Countable
    public function count () {
        return count($this->jFieldsRules);
    }

    // Iterator
    public function rewind (){
        reset($this->jFieldsRules);
    }
    public function current (){
        return current($this->jFieldsRules);
    }
    public function key (){
        return key($this->jFieldsRules);
    }
    public function next (){
        return next($this->jFieldsRules);
    }
    public function valid (){
        return !is_null(key($this->jFieldsRules));
    }

    // ArrayAccess
    public function offsetSet ($offset, $value) {
        if (is_null($offset)) {
            $this->jFieldsRules[] = $value;
        } else {
            $this->jFieldsRules[$offset] = $value;
        }
    }
    public function offsetExists ($offset) {
        return isset($this->jFieldsRules[$offset]);
    }
    public function offsetUnset ($offset) {
        unset($this->jFieldsRules[$offset]);
    }
    public function offsetGet ($offset) {
        return isset($this->jFieldsRules[$offset]) ? $this->jFieldsRules[$offset] : null;
    }
}