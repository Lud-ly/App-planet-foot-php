<?php

    /**
     * Contains patterns used for edit control.
     * get() method permite to get a pattern with delimiters.
     * 
     * Needs :
     *  - patterns.php
     */
    abstract class Patterns {

        // ◘ >>  PROPERTIES  << ◘
        
        /**
         * @var String $email Email pattern.
         */
        public static $email = '^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

        /**
         * @var String $tel Tel pattern.
         * Accept (+33 | 0033 | 0) followed by (4|6|7) followed by 8 figures.
         */
        public static $tel = '^(0|((\+|00)33))(4|6|7)\d{8}$';

        /**
         * @var String $not_empty Not Empty pattern.
         * Determines whether a string contains characters other than spaces.
         */
        public static $not_empty = '\S';



        // ◘ >>  METHODS  << ◘
        /**
         * Returns a pattern (with delimiters)
         * 
         * @param string $patternName The desired pattern (ex: 'tel')
         * @param Bool $delimiter The desired delimiter (ex: '' | '/' | '@'...)
         */
        public static function get($patternName = 'tel', $delimiter = '') {
            switch ($patternName) {
                case 'email':
                    return $delimiter . self::$email . $delimiter;
                case 'tel':
                    return $delimiter . self::$tel . $delimiter;
                case 'not_empty':
                    return $delimiter . self::$not_empty . $delimiter;
    
            }
            
        }
    }