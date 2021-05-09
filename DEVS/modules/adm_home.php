<?php
require_once "adm_home_service.php";
/**
 * Class adm_home | fichier adm_home.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "index_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_home
 * @author @AfpaLabTeam - JiJou
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Adm_home	{
	
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
        // init variables resultat
        $this->resultat = [];

        // execute main function
        $this->main();

        // check the action to execute
        if ( !isset($_POST['action']) ) {
            return;
        }
        switch ( $_POST['action'] ) {
            case 'enable_customer_mode':
                // ENABLE THE CUSTOMER MODE
                enableCustomerMode();
                send_json_to_JS(['error' => false]);
                break;
            case 'disable_customer_mode':
                // DISABLE THE CUSTOMER MODE
                disableCustomerMode();
                send_json_to_JS(['error' => false]);
        }
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
     * Get interface to gestion of accueil
     */
    function main() {
		$objet_service = new Adm_home_service();
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
		
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $objet_service->resultat;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
}

?>

