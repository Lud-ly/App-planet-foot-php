<?php
require_once  "initialize.php";
/**
 * Class notif__service | fichier notif__service.php
 *
 * Provides services to the business layer.
 *
 * This class requires the use of the following files:
 *    • require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_setting_service
 * @author @AfpaLabTeam - Damien
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v3.0
 */

Class Notif__service extends Initialize	{

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
        // Call Parent destructor
        parent::__destruct();
        // destroy objet_service
        unset($objet_service);
    }


    /**
     * Returns unvalidated orders (status == 1)
     * 
     * @param integer $hoursBeforeEndOfValidation In how many hours from now it will no longer be possible to validate the order
     * @param bool $connectedUser If false : checks for all users. If true : checks only the connected user.
     * 
     * @return array
     */
    public function getUnvalidatedOrders($hoursBeforeEndOfValidation, $connectedUser = false) {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "notif__get_orders.sql";
        $condition = '';
        if ($connectedUser) {
            $condition = 'AND user.id_user = ' . $_SESSION['id_user'];
        }
        return $this->oBdd->getSelectDatas($sqlPath, [
                'hoursBeforeEnd' => $hoursBeforeEndOfValidation,
                'purchaseStatus' => '1',
                'basketDate' => 'basket_end_validation_date',
                'condition' => $condition
        ]);
    }


    /**
     * Returns unpaid orders (status == 2)
     * 
     * @param integer $hoursBeforeEndOfPayment In how many hours from now it will no longer be possible to pay for the order
     * @param bool $connectedUser If false : checks for all users. If true : checks only the connected user.
     * 
     * @return array
     */
    public function getUnpaidOrders($hoursBeforeEndOfPayment, $connectedUser = false) {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "notif__get_orders.sql";
        $condition = '';
        if ($connectedUser) {
            $condition = 'AND user.id_user = ' . $_SESSION['id_user'];
        }
        return $this->oBdd->getSelectDatas($sqlPath, [
                'hoursBeforeEnd' => $hoursBeforeEndOfPayment,
                'purchaseStatus' => '2',
                'basketDate' => 'basket_payment_end_date',
                'condition' => $condition
        ]);
    }

    
    /**
     * Returns unrecovered orders (status == 3)
     * 
     * @param integer $hoursBeforeEndOfRecovery In how many hours from now it will no longer be possible to pick up the order
     * @param bool $connectedUser If false : checks for all users. If true : checks only the connected user.
     * 
     * @return array
     */
    public function getUnrecoveredOrders($hoursBeforeEndOfRecovery, $connectedUser = false) {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "notif__get_orders.sql";
        $condition = '';
        if ($connectedUser) {
            $condition = 'AND user.id_user = ' . $_SESSION['id_user'];
        }
        return $this->oBdd->getSelectDatas($sqlPath, [
                'hoursBeforeEnd' => $hoursBeforeEndOfRecovery,
                'purchaseStatus' => '3',
                'basketDate' => 'basket_withdrawal_end_date',
                'condition' => $condition
        ]);
    }

    /**
     * Returns unrecovered orders (status == 3)
     * 
     * @param integer $hoursBeforeEndOfRecovery In how many hours from now it will no longer be possible to pick up the order
     * 
     * @return array
     */
    public function getUserNotifs($hoursBeforeEndOfRecovery) {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "notif__get_unrecovered_orders.sql";
        return $this->oBdd->getSelectDatas($sqlPath, [
                'hoursBeforeEndOfRecovery' => $hoursBeforeEndOfRecovery
        ]);
    }


    /**
     * Update the 'read' status
     * 
     * @param string|int $purchaseId The purchase id
     * @param string $readField The name of the 'read' field
     * 
     * @return array
     */
    public function updateReadStatus($purchaseId, $readField) {
        $sqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "notif__update_read_status.sql";
        return $this->oBdd->treatDatas($sqlPath, [
                'purchaseId' => $purchaseId,
                'readField' => $readField
        ]);
    }
}


?>

