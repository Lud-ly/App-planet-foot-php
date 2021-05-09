<?php
require_once "adm_contact_service.php";
require_once "adm_contact.php";
/**
 * Class Adm_contact_update| fichier adm_contact_update.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_contact_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_contact_update
 * @author @AfpaLabTeam - Mouly Ludovic
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 * @version v1.0
 */

Class Adm_contact_update	{
	
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
      $objet_service = new Adm_contact_service();	
      $this->VARS_HTML = $objet_service->VARS_HTML;
      // Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service	
      // Vérifier les données du formulaire
      $this->resultat =  $this->editGestionContact();
      // SI formulaire OK, j'ajoute l'enregistrement
      if($this->resultat["isValidEdit"])	{
        $updateBdd =  $objet_service->adm_update_center_server(); 
        $this->resultat["error"] = $updateBdd["error"];
      }

    }


/********************
 * EDIT FORM CONTACT
 ********************/

  //Controle de saisie
  // Vérifier les données des summernotes édités
  function editGestionContact(){
    // Initialisation des variables
    $result= [];
    $invalidFieldsSummernote=[];

    /*********************MESSAGE CONTACT*************************************************************/
    if (((!isset($this->VARS_HTML["center_contact_form_message"]))) || ($this->VARS_HTML["center_contact_form_message"] == ""))	{
        $invalidFieldsSummernote[]= [ "center_contact_form_message" => 'Ce Textarea Message ne peut être vide'];
    }
    /*********************VALIDATION COMMANDE **************************************************/
    if (((!isset($this->VARS_HTML["center_validate_schedule"]))) || ($this->VARS_HTML["center_validate_schedule"] == ""))	{
        $invalidFieldsSummernote[]= [ "center_validate_schedule" => 'Ce Textarea Prénom ne peut être vide'];
    }
    /*********************PHONE ****************************************************************/
    if (((!isset($this->VARS_HTML["center_phoneNumber"]))) || ($this->VARS_HTML["center_phoneNumber"] == ""))	{
        $invalidFieldsSummernote[]= [ "center_phoneNumber" => 'Ce Textarea Téléphone ne peut être vide'];
    }
    //Sinon
    else{
      //Appel de la fonction isTelValid dans Input_control pour vérification
      //Si invalide remplir le tab de l'erreur
      if(!Input_control::isTelValid($this->VARS_HTML["center_phoneNumber"])){
          $invalidFieldsSummernote[]= [ "center_phoneNumber" => 'Numéro de Téléphone invalide'];
      }
    }
    /*********************DATE PAIEMENT*************************************************************/
    if (((!isset($this->VARS_HTML["withdrawall_date_available"]))) || ($this->VARS_HTML["withdrawall_date_available"] == ""))	{
        $invalidFieldsSummernote[]= [ "withdrawall_date_available" => 'Ce Textarea date et paiement ne peut être vide'];
    }
    /*********************LIEU PAIEMENT*********************************************************/
    if (((!isset($this->VARS_HTML["center_place_topay"]))) || ($this->VARS_HTML["center_place_topay"] == ""))	{
        $invalidFieldsSummernote[]= [ "center_place_topay" => 'Ce Textarea Lieu ne peut être vide'];
    }
    /*********************RETRAIT COMMANDE ****************************************************/
    if (((!isset($this->VARS_HTML["center_withdrawall_schedule"]))) || ($this->VARS_HTML["center_withdrawall_schedule"] == ""))	{
        $invalidFieldsSummernote[]= [ "center_withdrawall_schedule" => 'Ce Champ Retirer commande ne peut être vide'];
    }
    /*********************EMAIL **************************************************************/
    //Si center_contact_mail n'existe pas et qu'il est vide rempli le tab invalidFields du message d'erreur
    if (((!isset($this->VARS_HTML["center_contact_mail"]))) || ($this->VARS_HTML["center_contact_mail"] == ""))	{
        $invalidFieldsSummernote[]= [ "center_contact_mail" => 'Ce Textarea Email ne peut être vide'];
    }
    //Sinon
    else{
      //Appel de la fonction isEmailValid dans Input_control pour vérification
      //Si invalide remplir le tab de l'erreur
      if(!Input_control::isEmailValid($this->VARS_HTML["center_contact_mail"])){
           $invalidFieldsSummernote[]= [ "center_contact_mail" => "Format d'email inv@lide "];
      }
    }
    /*********************GOOGLE MAP ************************************************************/
    if (((!isset($this->VARS_HTML["center_urlGoogleMap"]))) || ($this->VARS_HTML["center_urlGoogleMap"] == ""))	{
        $invalidFieldsSummernote[]= [ "center_urlGoogleMap" => 'Ce Textarea Google map ne peut être vide'];
    }


    $nbrChampInval = count($invalidFieldsSummernote);
    //récuperer les erreurs
    //Si Tab invalidFields n'est pas vide 
    if($nbrChampInval > 0){
        $result["invalidFieldsSummernote"] = $invalidFieldsSummernote;
    }
     //Si Tab invalidFields n'a pas d'erreur-> isValidEdit
    $result["isValidEdit"] = ($nbrChampInval===0);

    return $result;
  }
	
}

?>


