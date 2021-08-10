<?php
require_once "adm_supplier_service.php";
require_once "adm_supplier.php";
/**
 * Class Adm_supplier_update | fichier adm_supplier_update.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_supplier_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_supplier_update
 * @author @AfpaLabTeam - Mouly Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Adm_supplier_update	{
	
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
     * Get interface to gestion of adm_supplier_update
     */
    function main() {
		    $objet_service = new Adm_supplier_service();
        $this->VARS_HTML = $objet_service->VARS_HTML;
        // Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
        // Vérifier les données du formulaire
         $this->resultat =  $this->editFormulaireSupplier();
        // SI formulaire OK, j'ajoute l'enregistrement
         if($this->resultat["isValidEdit"])	{
            $updateBdd =  $objet_service->update_supplier_server(); 
            $this->resultat["error"] = $updateBdd["error"];
        }
        // send_json_to_JS($result);
        // Je passe mes parametres pour y avoir acces dans mes pages HTML
       // $this->resultat = $objet_service->resultat;
      
        
    }

    /******************************EDIT FORM************************************ */

     //Controle de saisie
     // Vérifier les données du formulaire édité
  function editFormulaireSupplier(){
    // Initialisation des variables
    $result= [];
    $invalidEditFields=[];

    /*********************IMAGE ***********************/
    if (((!isset($this->VARS_HTML["editImage"]))) || ($this->VARS_HTML["editImage"] == ""))	{
        $invalidEditFields[]= [ "editImage" => 'Ce Champ Image ne peut être vide'];
    }
      /*********************FIRSTNAME ***********************/
    if (((!isset($this->VARS_HTML["editFirstname"]))) || ($this->VARS_HTML["editFirstname"] == ""))	{
        $invalidEditFields[]= [ "editFirstname" => 'Ce Champ Prénom ne peut être vide'];
    }
      /*********************NAME ***********************/
    if (((!isset($this->VARS_HTML["editName"]))) || ($this->VARS_HTML["editName"] == ""))	{
        $invalidEditFields[]= [ "editName" => 'Ce Champ Nom ne peut être vide'];
    }
      /*********************EMAIL ***********************/
     //Si editEmail n'existe pas et qu'il est vide rempli le tab invalidFields du message d'erreur
    if (((!isset($this->VARS_HTML["editEmail"]))) || ($this->VARS_HTML["editEmail"] == ""))	{
        $invalidEditFields[]= [ "editEmail" => 'Ce Champ Email ne peut être vide'];
      }
      //Sinon
    else{
    //Appel de la fonction isEmailValid dans Input_control pour vérification
    //Si invalide remplir le tab de l'erreur
      if(!Input_control::isEmailValid($this->VARS_HTML["editEmail"])){
        $invalidEditFields[]= [ "editEmail" => "Format d'email inv@lide "];
        }
    }
      /*********************PHONE ***********************/
    if (((!isset($this->VARS_HTML["editPhone"]))) || ($this->VARS_HTML["editPhone"] == ""))	{
        $invalidEditFields[]= [ "editPhone" => 'Ce Champ Téléphone ne peut être vide'];
      }
    //Sinon  
    else{
      //Appel de la fonction isTelValid dans Input_control pour vérification
      //Si invalide remplir le tab de l'erreur
      if(!Input_control::isTelValid($this->VARS_HTML["editPhone"])){
        $invalidEditFields[]= [ "editPhone" => 'Numéro de Téléphone invalide,ex:0467232032'];
      }
    }
      /*********************ADDRESS ***********************/
    if (((!isset($this->VARS_HTML["editAddress"]))) || ($this->VARS_HTML["editAddress"] == ""))	{
      $invalidEditFields[]= [ "editAddress" => 'Ce Champ Adresse ne peut être vide'];
    }
      /*********************CITY ***********************/
    if (((!isset($this->VARS_HTML["editCity"]))) || ($this->VARS_HTML["editCity"] == ""))	{
      $invalidEditFields[]= [ "editCity" => 'Ce Champ Ville ne peut être vide'];
    }
      /*********************ZIPCODE ***********************/
    if (((!isset($this->VARS_HTML["editZip"]))) || ($this->VARS_HTML["editZip"] == ""))	{
      $invalidEditFields[]= [ "editZip" => 'Ce Champ Code postal ne peut être vide'];
    }
    else{
      if(!preg_match("/^[0-9]{5,5}$/",$this->VARS_HTML["editZip"])){
        $invalidEditFields[]= [ "editZip" => 'Code postal invalide'];
      }
    }
      /*********************STORE ***********************/
    if (((!isset($this->VARS_HTML["editStore"]))) || ($this->VARS_HTML["editStore"] == ""))	{
      $invalidEditFields[]= [ "editStore" => 'Ce Champ Magasin ne peut être vide'];
    }
      /*********************GOOGLE MAP ***********************/
    if (((!isset($this->VARS_HTML["editMap"]))) || ($this->VARS_HTML["editMap"] == ""))	{
      $invalidEditFields[]= [ "editMap" => 'Ce Champ google Map ne peut être vide'];
    }


    $nbrChampInval = count($invalidEditFields);
    //récuperer les erreurs
    //Si Tab invalidFields n'est pas vide 
    if($nbrChampInval > 0){
      $result["invalidEditFields"] = $invalidEditFields;
    }
     //Si Tab invalidFields n'a pas d'erreur-> isValidEdit
    $result["isValidEdit"] = ($nbrChampInval===0);

    return $result;
  }
  
	
}

?>


