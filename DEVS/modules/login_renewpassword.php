<?php
require_once "login_renewpassword_service.php";
/**
 * Class login_renewpassword | fichier login_renewpassword.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe nécessite l'utilisation de la classe :
 *
 * require_once "login_renewpassword_service.php";
 *
 * @package afpanier
 * @subpackage login_renewpassword
 * @author Afpa-Lab Team | Virignie
 * @copyright  2018-2080 The Afpa-Lab Team
 * @version v3.0
 */

Class Login_renewpassword {
	
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
     * Get interface to gestion of login_renewpassword
     */
    function main() {
		$objet_service = new login_renewpassword_service();
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
		
		// Je passe mes paramètres pour y avoir accès dans mes pages HTML
		$this->resultat = $objet_service->resultat;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
}
?>