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
 * @package Planet-foot Project
 * @subpackage index_service
 * @author @LudoLabTeam - Ludo
 * @copyright  1920-2080 
 * @version v1.0
 */

class Login
{

    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;
    private $_front_user_password_for_verif;
    private $_front_username_for_verif;

    /**
     * init variables resultat
     *
     * execute main function
     */
    public function __construct()
    {
        // init variables resultat
        $this->resultat = [];
        $this->front_user_password = "";
        $this->front_username = "";
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
     * Get interface to gestion of login
     */
    function main()
    {
        $objet_service = new Login_service();
        $this->VARS_HTML = $objet_service->VARS_HTML;
        // $objet_service->verif_index_users();


        if (isset($_POST["front_user_password"]) && $_POST["front_user_password"] !== "") {
            $objet_service->index_list_users();
        }
    }
}
