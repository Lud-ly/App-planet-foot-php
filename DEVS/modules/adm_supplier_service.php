<?php
require_once  "initialize.php";
/**
 * Class adm_supplier_service | fichier adm_supplier_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_supplier_update_service
 * @author @AfpaLabTeam - Mouly Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 * @version v1.0
 */

class Adm_supplier_service extends Initialize
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
        // destroy objet_service
        unset($objet_service);
    }

    /***********************************
     * Retourne la liste des producteurs
     * @return Array
     */

    public function adm_supplier_list(){
        $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_supplier_list.sql";
		$this->resultat["adm_supplier_list"]= $this->oBdd->getSelectDatas($spathSQL, array(                                                         
    ));
}
    /*************************************************
     * Ajoute un producteur à la liste des producteurs
     * @return Array
     */
    public function add_supplier_server(){
        $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "insert_supplier.sql";
       return  $this->oBdd->treatDatas($spathSQL, array(  
                                                                "supplier_name" => $this->VARS_HTML['addName'],
                                                                "supplier_firstname" => $this->VARS_HTML['addFirstname'],
                                                                "supplier_img" => $this->VARS_HTML['addImage'],
                                                                "supplier_mail" => $this->VARS_HTML['addEmail'],
                                                                "supplier_phoneNumber" => $this->VARS_HTML['addPhone'],
                                                                "supplier_address" => $this->VARS_HTML['addAddress'],   
                                                                "supplier_zipCode" => $this->VARS_HTML['addZip'],
                                                                "supplier_city" => $this->VARS_HTML['addCity'],
                                                                "supplier_storeName" => $this->VARS_HTML['addStore'],
                                                                "supplier_urlGoogleMap" => $this->VARS_HTML['addMap'],
                                                                            
    )); 
    }
      /*************************************************
     * Modifie un producteur de la liste des producteurs
     * Methode qui récupère les modifications enregistrées par l'utilisateur et les envoie à la base de données
     * @return Array
     */
    public function update_supplier_server(){
        $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "update_supplier.sql";
      return  $this->oBdd->treatDatas($spathSQL, array(  
                                                                "id_supplier" => $this->VARS_HTML['id_supplier'],
                                                                "supplier_name" => $this->VARS_HTML['editName'],
                                                                "supplier_firstname" => $this->VARS_HTML['editFirstname'],
                                                                "supplier_img" => $this->VARS_HTML['editImage'],
                                                                "supplier_mail" => $this->VARS_HTML['editEmail'],
                                                                "supplier_phoneNumber" => $this->VARS_HTML['editPhone'],
                                                                "supplier_address" => $this->VARS_HTML['editAddress'],
                                                                "supplier_city" => $this->VARS_HTML['editCity'],
                                                                "supplier_zipCode" => $this->VARS_HTML['editZip'], 
                                                                "supplier_storeName" => $this->VARS_HTML['editStore'],
                                                                "supplier_urlGoogleMap" => $this->VARS_HTML['editMap']
                                                                            
    )); 
    }

     /****************************************************
     * Supprimer un producteur de la liste des producteurs
     * Methode qui récupère la suppression enregistré par l'utilisateur et delete à la base de données
     * @return Array
     */
    public function delete_supplier_server() {
        $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "delete_supplier.sql";
        return $this->oBdd->treatDatas($spathSQL, array(
            "id_supplier" => $this->VARS_HTML['id_supplier']                                                      
        ));
      }

    /*************************************************
     *Ajouter & Modifier l'image du fournisseur
     * Methode qui récupère le nom de l'image de l'utilisateur et les envoie à la base de données
     * @return Array
     */
    public function update_url_image_supplier($nom_fichier){
        $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "update_img_supplier.sql";
        $this->resultat["adm_supplier_upload"]= $this->oBdd->getSelectDatas($spathSQL, array(      
            "supplier_img" => $nom_fichier, 
            "id_supplier" => $this->VARS_HTML['id_supplier']
        )); 
    }

}
?>