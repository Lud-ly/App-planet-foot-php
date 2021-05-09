<?php
require_once "admin_service.php";

/**
 * class Admin__get_not_admin_user_infos | file admin__get_not_admin_user_infos.php
 *
 * This class is used to display data concerning the different administrators and
 * to modify them if necessary, or to add / remove administrators.
 *
 * Needs :
 *
 *   - require_once "admin_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage admin__get_not_admin_user_infos
 * @author @AfpaLabTeam - Damien
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */
class Admin__get_not_admin_user_infos	{
	
    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;
    public $result;

    /**
     * init variables resultat
     *
     * execute main function
     */
    public function __construct() {
        // init variables resultat
        $this->resultat = [];
        // init variables resultat
        $this->result = [];

        // execute main function
        $this->main();
    }

    /**
     *
     * Destroy service
     *
     */
    public function __destruct() {
        // destroy objet_service
        unset($objet_service);
    }

    /**
     * Get interface to gestion of order
     */
    private function main() {
		$objet_service = new Admin_service();
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
        $aNotAdminUserInfos = $objet_service->getNotAdminUserInfos($_POST['user_id']);
        send_json_to_JS($aNotAdminUserInfos);
        
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
        // $this->resultat = $objet_service->resultat;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
}



