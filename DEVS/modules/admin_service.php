<?php
require_once  "initialize.php";

/**
 * class admin_service | file admin_service.php
 *
 * This class is used to display data concerning the different administrators and
 * to modify them if necessary, or to add / remove administrators.
 * Communicates with the database.
 *
 * Needs :
 *   - require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage admin_service
 * @author @AfpaLabTeam - JiJou
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */
class Admin_service extends Initialize	{

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
    }

    /**
     *
     * Destroy service
     *
     */
    public function __destruct() {
        // call Parent destructor
        parent::__destruct();
        // destroy objet_service
        unset($objet_service);
    }


    /**
     * Delete the admin role (modify it from 1 to 0)
     * 
     * @param integer $userId The user id
     * @return array
     */
    public function deleteAdminRole($userId)
    {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "admin__delete_admin_role.sql";
        $sUserId = $userId;
        secure($sUserId);
        return $this->oBdd->treatDatas($sqlPath, [
                'userId' =>  $sUserId
        ]);
    }

    /**
     * Returns the list of administrators and their information
     * 
     * @return array
     */
    public function getAdminsInfos()
    {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "admin__get_admins_infos.sql";
        return $this->oBdd->getSelectDatas($sqlPath, []);
    }

    /**
     * Get all non-admin users
     * 
     * @return array
     */
    public function getNotAdminUsers()
    {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "admin__get_not_admin_users.sql";
        return $this->oBdd->getSelectDatas($sqlPath, []);
    }

    /**
     * Get infos about a non-admin user
     * 
     * @param string $userId The user id
     * @return array
     */
    public function getNotAdminUserInfos($userId)
    {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "admin__get_not_admin_user_infos.sql";
        return $this->oBdd->getSelectDatas($sqlPath, [
            'userId' =>   $userId
        ]);
    }

    /**
     * Returns the user role
     * 
     * @param string|Integer $userId? The user id. Connected user if null.
     * @return Integer
     */
    public function getUserRole($userId = null)
    {
        // if undefined $userId : take $_SESSION['id_user']
        if (isEmpty($userId)) {
            if (isset($_SESSION['id_user'])) {
                $userId = $_SESSION['id_user'];
            } else {
                return;
            }
        }
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "admin__get_user_role.sql";
        $aResult = $this->oBdd->getSelectDatas($sqlPath, [
            'userId' =>   $userId
        ]);
        if (!isEmpty($aResult)) {
            return +$aResult[0]['userRole'];
        }
    }
    
    /**
     * Returns the connected user role
     * 
     * @return Integer
     */
    public function getConnectedUserRole()
    {
        return $this->getUserRole();
    }

    /**
     * Update the user role
     * 
     * @param integer|String $userId The user id
     * @param Bool|String|Integer $userRole The new user role
     * @return array
     */
    public function updateRole($userId, $userRole)
    {
        // if the connected person want to define a SuperAdmin role
        if ($userRole == 4) {
            // ..we will verify if the connected person is really SuperAdmin
            $connectedUserRole = $this->getConnectedUserRole();
            if ($connectedUserRole != 4 ) {
                // ◘◘◘ hacking attempt !! ◘◘◘
                Log::hacking_attempt("id_personne_connectée: $connectedUserRole. id_personne_ciblée: $userId, role_personne_ciblée: $userRole");
                return [
                    'error' => "Droits manquants : seul un SuperAdmin peut déclarer un SuperAdmin.",
                    'hackingAttempt' => true
                ];
            }
        }
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "admin__update_role.sql";
        $sUserId = $userId;
        secure($sUserId);
        $sUserRole = $userRole;
        secure($sUserRole);
        return $this->oBdd->treatDatas($sqlPath, [
              'userId' =>  +$sUserId,
              'userRole' => $sUserRole
        ]);
    }

    /**
     * Update the user status
     * 
     * @param integer|String $userId The user id
     * @param Bool|String|Integer $userStatus The new user status
     * @return array
     */
    public function updateStatus($userId, $userStatus)
    {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "admin__update_statut.sql";
        $sUserId = $userId;
        secure($sUserId);
        $sUserStatus = $userStatus;
        secure($sUserStatus);
        return $this->oBdd->treatDatas($sqlPath, [
            'userId' =>  +$sUserId,
            'userStatus' => $sUserStatus
        ]);
    }

}
  