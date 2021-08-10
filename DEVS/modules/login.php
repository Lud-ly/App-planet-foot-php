<?php

require_once "afpaconnect.php";
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

class Login
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
     * Get interface to gestion of login
     */
    function main()
    {
        $objet_service = new Login_service();

        // Vérification des données front
        // Appel AfpaConnect
        $this->resultat["aOfDatasConnect"] = Afpaconnect::connect("afpanier", $objet_service->VARS_HTML["login_username"], $objet_service->VARS_HTML["login_password"]);

        /*
		0:     "Utilisateur"
        1:     "Administrateur Informatique"
        2:     "Administrateur CRCD"
        3:     "Administrateur Compta"
        4:     "Administrateur SuperAdmin"
		*/
        switch ($this->resultat["aOfDatasConnect"]["code"]) {
            case "001":
                $_SESSION["id_external_user"] = $this->resultat["aOfDatasConnect"]["content"]["id"];
                $_SESSION["user_name"] = $this->resultat["aOfDatasConnect"]["content"]["lastName"];
                $_SESSION["user_firstname"] = $this->resultat["aOfDatasConnect"]["content"]["firstName"];
                $_SESSION["user_mail"] = $this->resultat["aOfDatasConnect"]["content"]["mailPro"];
                $_SESSION["user_identifier"] = $this->resultat["aOfDatasConnect"]["content"]["identifier"];
                $_SESSION["user_phoneNumber"] = $this->resultat["aOfDatasConnect"]["content"]["phone"];
                $_SESSION["user_gender"] = $this->resultat["aOfDatasConnect"]["content"]["gender"];
                $_SESSION["user_status"] = $this->resultat["aOfDatasConnect"]["content"]["status"];
                if ($this->resultat["aOfDatasConnect"]["content"]["role"]["tag"] == "ROLE_USER") {
                    $this->resultat["aOfDatasConnect"]["url"] = "index";
                    $_SESSION["user_role"] = 0;
                } else  if ($this->resultat["aOfDatasConnect"]["content"]["role"]["tag"] == "ROLE_SUPER_ADMIN") {
                    $this->resultat["aOfDatasConnect"]["url"] = "adm_home";
                    $_SESSION["user_role"] = 4;
                }
                $_SESSION["centerId"] = +$this->resultat["aOfDatasConnect"]["content"]["center"]["id"];
                $_SESSION["id_user"] = $objet_service->getInternalUserId($_SESSION["id_external_user"]);
                break;
            case "002":
                break;
        }
        // LE CODE 007 correspond a un user/password incorrect
        if ($this->resultat["aOfDatasConnect"]["code"] != "007") {
            // donc on lance la requete de la function pour incrémenter le connection_counter de la table user__mainBasket
            $objet_service->add_counter_counter_user__mainBasket();
            error_log(" -- appelle fonction pour incrémenter le compteur de connexion ");
        }

        if (empty($_SESSION["id_user"])) {
            unset($_SESSION["id_user"]);
        }
        log::f(
            '$_SESSION',
            $_SESSION
        );
        // Je passe mes parametres pour y avoir acces dans mes pages HTML
        $this->VARS_HTML = $objet_service->VARS_HTML;
        if (isset($_SESSION["id_external_user"])) {
            error_log("id user connecté : " . $_SESSION["id_external_user"]);
        }
    }
}
