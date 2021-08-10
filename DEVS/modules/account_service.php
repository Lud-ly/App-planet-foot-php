<?php
require_once  "initialize.php";
/**
 * Class Account_service | fichier account_service.php
 *
 * Manage the profile (add, delete, edit, etc.)
 *
 * Needs :
 *
 *   - require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage account_service
 * @author @AfpaLabTeam - Perez Guy
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

class Account_service extends Initialize
{
    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;

    /**
     * init variables resultat
     *
     * execute main function
     * @param string $userId The id of the connected person
     */
    public function __construct(string $userId)
    {
        // Call Parent Constructor
        parent::__construct();

        // init variables resultat
        $this->resultat = [];
    }

    /**
     *
     * Destroy service
     *
     */
    public function __destruct()
    {
        // Call Parent destructor
        parent::__destruct();
        // destroy objet_service
        unset($objet_service);
    }

    /**
     * Delete the account (set its status to 0)
     */
    public function deleteAccount(string $userId)
    {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "account__delete_account.sql";
        $aResult = $this->oBdd->treatDatas($sqlPath, [
            'userId' =>  $userId
        ]);
        // if the account deletion was successful : remove the user ID and all user data from $_SESSION
        if (isEmpty($aResult['error'])) {
		    $_SESSION = [];
        }
        // returns the result
        return $aResult;
    }

    /**
     * Returns infos about a user (name, first name, role, email...)
     * 
     * @param string|int $userId The user id
     * @return array
     */
    public function getUserInfos($userId)
    {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "account__get_user_infos.sql";
        return $this->oBdd->getSelectDatas($sqlPath, [
            'userId' =>  $userId
        ]);
    }
}
