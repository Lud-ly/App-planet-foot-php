<?php
require_once "login_service.php";
/**
 * Class Login | fichier login.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "login_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage login
 * @author @AfpaLabTeam - Virginie
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Login	{
	
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
     * Get interface to gestion of login
     */
    function main() {
		$objet_service = new Login_service();

        /**
         * @var bool $developerMode Indicates whether developer mode is to be activated or not
         */
        $developerMode = false;
        // todo: modify
        switch ($objet_service->VARS_HTML["login_username"]) {
            case 'jijou':
                $login = 'pagan.jijou@gmail.com';
                $developerMode = true;
                $_SESSION['user_role']= 4;
                $_SESSION['id_user']= 1;
                break;
            case 'virginie':
            case 'vivi':
                $login = 'Vigneron.Vivi@sfr.com';
                $developerMode = true;
                break;
            case 'guy':
                $login = 'perez.guy@gmail.com';
                $developerMode = true;
                break;
            case 'zeludo':
            case 'ludovic':
                $login = 'hautefeuille.ludo@orange.com';
                $developerMode = true;
                break;
            case 'ptitlu':
            case 'ludo':
                $login = 'ludo_mouly_fausse_adresse@gmail.com';
                $developerMode = true;
                break;
            case 'antoine':
            case 'anto':
                $login = 'antoine_malinnn_fausse_adresse@gmail.com';
                $developerMode = true;
                $_SESSION['user_role']= 0;
                $_SESSION['id_user']= 7;
                break;
            case 'damien':
            case 'dam':
                $login = 'dgrember@gmail.com';
                $developerMode = true;
                break;
            // case 'lucas':
            //     $login = '';
            //     break;
            // case 'guillian':
            //     $login = '';
            //     break;
            default:
                $login = '';
        }
        Login::applyDeveloperMode($developerMode);

        if (!isEmpty($login)) {
            $connectedUserInfos = $objet_service->getUserInfos($login);
            if (!isEmpty($connectedUserInfos)) {
                foreach ($connectedUserInfos as $userInfoName => $userInfoValue) {
                    if (
                        is_numeric($userInfoValue) &&
                        (gettype($userInfoValue) === 'string') &&
                        (strlen($userInfoValue) === 1)
                    ) {
                        // copy user info (converted into number) into $_SESSION
                        $_SESSION[$userInfoName] = +$userInfoValue;
                    } else {
                        // copy user info into $_SESSION
                        $_SESSION[$userInfoName] = $userInfoValue;
                    }
                }
            }
        }
        
        // recuperation de la derniere date de connexion
        $objet_service -> date_last_connexion();
		
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
		
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
		$this->resultat = $objet_service->resultat;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
    /**
     * Activates / deactivates the developer mode depending on whether the connected user is a developer of the Afpanier project or not
     * 
     * @param bool $isUserAfpanierDevelopper Is the user an Afpanier developper ?
     */
    private static function applyDeveloperMode($isUserAfpanierDevelopper = true) {
        $_SESSION['isUserDevelopper'] = $isUserAfpanierDevelopper;
    }


}

?>

