<?php

    /**
     * Class Crypted| file crypted.php
     *
     * With this interface, we'll be able to encrypt the password using the e-mail as key of encryption.
     *
     * List of classes needed for this class
     *
     * @package Harvard
     * @subpackage crypted
     * @author Ludovic
     * @copyright  1920-2080 The Ludovic World Company
     * @version v10.1.0
     */

    abstract class Crypted	{

        /**
         * public $encrypted_data is used to store all datas needed for HTML Templates
         * @var array
         */
        public static $encrypted_data;


        /**
         * Here is where the main code is with the function called crypterssl. Here I can Access to :
         * 
         * variables $salt, $salted, $dx, $key, $iv
         * 
         * Set a random salt
         * $salt = openssl_random_pseudo_bytes(8)
         * Or empty salt so that we'll be able to compare again
         * 
         * Salt the key(32) and iv(16) = 48
         */

        static function crypterssl($maCleDeCryptage, $maChaineACrypter) {

            /**
            * public salt is used to store datas needed to encrypt password
            * @var array
            * public salted is used to store datas needed to encrypt password
            * @var array
            * public dx is used to store datas needed to encrypt password
            * @var array
            */
            
            $salt= "";
            $salted = '';
            $dx = '';

            while (strlen($salted) < 48) {
                $dx = md5($dx.$maCleDeCryptage.$salt, true);
                $salted .= $dx;
            }
            $key = substr($salted, 0, 32);
            $iv  = substr($salted, 32,16);
            self::$encrypted_data = openssl_encrypt($maChaineACrypter, 'aes-256-cbc', $key, true, $iv);
            return base64_encode('Salted__' . $salt . self::$encrypted_data);		
        }
    }
?>