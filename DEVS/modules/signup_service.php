<?php
require_once  "initialize.php";
/**
 * Class Signup_service | fichier Signup_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Planet-foot Project
 * @subpackage signup_service
 * @author @LudoLabTeam - Ludo
 * @copyright  1920-2080 
 * @version v1.0
 */

class Signup_service extends Initialize
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
        // Call Parent Constructor
        parent::__construct();

        // init variables resultat
        $this->resultat = [];

        // execute main function

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
    }


    /*************************************************
     * Ajoute un contenu a la BDD
     * @return Array
     */
    public function add_data_server()
    {
        $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "insert_user_data.sql";
        return  $this->oBdd->treatDatas($spathSQL, array(
            "user_avatar" => $this->VARS_HTML['addImage'],
            "password" => $this->VARS_HTML['user_password'],
            "user_name" => $this->VARS_HTML['addName'],
            "user_mail" => $this->VARS_HTML['addEmail'],
            "user_phoneNumber" => $this->VARS_HTML['addPhone'],
            "user_address" => $this->VARS_HTML['addAddress'],
            "user_city" => $this->VARS_HTML['addCity'],
            "user_zipCode" => $this->VARS_HTML['addZip'],

        ));
    }


    /*************************************************
     *Ajouter & Modifier l'image du fournisseur
     * Methode qui récupère le nom de l'image de l'utilisateur et les envoie à la base de données
     * @return Array
     */
    public function update_url_image_supplier($nom_fichier)
    {
        $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "update_img_supplier.sql";
        $this->resultat["adm_supplier_upload"] = $this->oBdd->getSelectDatas($spathSQL, array(
            "supplier_img" => $nom_fichier,
            "id_supplier" => $this->VARS_HTML['id_supplier']
        ));
    }
}
