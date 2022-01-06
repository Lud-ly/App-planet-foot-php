<?php
require_once "signup_service.php";
require_once "input_control.php";

/**
 * Class Signup_upload_add | fichier signup_upload_add.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_supplier_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Signup_upload_add
 * @author @AfpaLabTeam - Mouly Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

class Signup_add
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
   * Get interface to gestion of adm_supplier_add
   */
  function main()
  {
    $objet_service = new signup_service();
    $this->VARS_HTML = $objet_service->VARS_HTML;
    // Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
    // Vérifier les données du formulaire
    $result = $this->checkFormulaireSupplier();
    // SI formulaire OK et l'image uploadé, j'ajoute l'enregistrement
    if ($result["isValid"]) {
      $this->resultat =  $objet_service->add_data_server();
    }
    send_json_to_JS($result);

    // Je passe mes parametres pour y avoir acces dans mes pages HTML
    // $this->resultat = $objet_service->resultat;

  }
  /**
   * Check datas form
   * @return number
   */

  /*********************************** * Vérifier les données du formulaire ajouter*******************************/


  function checkFormulaireSupplier()
  {
    // Initialisation des variables
    $result = [];
    $invalidFields = [];
    $validFields = [];

    /*********************IMAGE ***********************/
    // if (((!isset($this->VARS_HTML["nom_fichier"]))) || ($this->VARS_HTML["nom_fichier"] == ""))	{
    //     $invalidFields[]= [ "nom_fichier" => 'Ce Champ Image ne peut être vide'];
    // }

    /*********************password ***********************/
    if (((!isset($this->VARS_HTML["user_password"]))) || ($this->VARS_HTML["user_password"] == "")) {
      $invalidFields[] = ["user_password" => 'Ce Champ Mot de passe ne peut être vide'];
    }
    /*********************NAME ***********************/
    if (((!isset($this->VARS_HTML["addName"]))) || ($this->VARS_HTML["addName"] == "")) {
      $invalidFields[] = ["addName" => 'Ce Champ Nom ne peut être vide'];
    }
    /*********************EMAIL ***********************/
    //Si addEmail n'existe pas et qu'il est vide rempli le tab invalidFields du message d'erreur
    if (((!isset($this->VARS_HTML["addEmail"]))) || ($this->VARS_HTML["addEmail"] == "")) {
      $invalidFields[] = ["addEmail" => 'Ce Champ Email ne peut être vide'];
    }
    //Sinon
    else {
      //Appel de la fonction isEmailValid dans Input_control pour vérification
      //Si invalide remplir le tab de l'erreur
      if (!Input_control::isEmailValid($this->VARS_HTML["addEmail"])) {
        $invalidFields[] = ["addEmail" => "Format d'email inv@lide "];
      }
    }
    /*********************PHONE ***********************/
    if (((!isset($this->VARS_HTML["addPhone"]))) || ($this->VARS_HTML["addPhone"] == "")) {
      $invalidFields[] = ["addPhone" => 'Ce Champ Téléphone ne peut être vide'];
    }
    //Sinon  
    else {
      //Appel de la fonction isTelValid dans Input_control pour vérification
      //Si invalide remplir le tab de l'erreur
      if (!Input_control::isTelValid($this->VARS_HTML["addPhone"])) {
        $invalidFields[] = ["addPhone" => 'Numéro de Téléphone invalide, N° requis: 04,06,07'];
      }
    }
    /*********************ADDRESS ***********************/
    if (((!isset($this->VARS_HTML["addAddress"]))) || ($this->VARS_HTML["addAddress"] == "")) {
      $invalidFields[] = ["addAddress" => 'Ce Champ Adresse ne peut être vide'];
    }
    /*********************CITY ***********************/
    if (((!isset($this->VARS_HTML["addCity"]))) || ($this->VARS_HTML["addCity"] == "")) {
      $invalidFields[] = ["addCity" => 'Ce Champ Ville ne peut être vide'];
    }
    /*********************ZIPCODE ***********************/
    if (((!isset($this->VARS_HTML["addZip"]))) || ($this->VARS_HTML["addZip"] == "")) {
      $invalidFields[] = ["addZip" => 'Ce Champ Code postal ne peut être vide'];
    } else {
      if (!preg_match("/^[0-9]{5,5}$/", $this->VARS_HTML["addZip"])) {
        $invalidFields[] = ["addZip" => 'Code postal invalide'];
      }
    }



    $nbrChampInval = count($invalidFields);
    //récuperer les erreurs
    //Si Tab invalidFields n'est pas vide 
    if ($nbrChampInval > 0) {
      $result["invalidFields"] = $invalidFields;
    }
    //Si Tab invalidFields n'a pas d'erreur-> isValid
    $result["isValid"] = ($nbrChampInval === 0);

    return $result;
  }
}
