<?php
require_once "login_service.php";
/**
 * Class Login_ajax | fichier login_ajax.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe nécessite l'utilisation de la classe :
 *
 * require_once "login_service.php";
 *
 * @package Afpanier
 * @subpackage Register_ajax
 * @author Afpa-lab Team | Florent LEGER
 * @copyright  2018-2080 Afpa-lab Corp
 * @version v1.0
 */

Class Login_ajax {
	
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
    public function __construct() 
    {
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
    public function __destruct() 
    {
        // destroy objet_service
        unset($objet_service);
    }

    /**
     * Get interface to login service
     */ 
    function main() 
    {
		$objet_service = new Login_service();
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
        $objet_service-> login_connectSession(); 

        // Je passe mes paramètres pour y avoir accès dans mes pages HTML
        $this->resultat = $objet_service->resultat;
        $this->VARS_HTML = $objet_service->VARS_HTML;

        if(isset($this->resultat["select_user"][0]["id_user"]) && $this->resultat["select_user"][0]["active_user"] == 1)
        {
            $_SESSION["connect"] = true;
            $_SESSION["user"] = $this->resultat["select_user"][0];
            $objet_service->login_lastConnection($_SESSION['user']['id_user']);

        }
        else
        {
            $_SESSION["connect"] = false;
        }
    }
	
}

?>