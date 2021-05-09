<?php
require_once "contact_service.php";
require_once "input_control.php";
/**
 * Class Contact | fichier contact.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "contact_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage contact
 * @author @AfpaLabTeam - JIJOU
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 * @version v1.0
 */

Class Contact	{
	
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
     * Get interface to gestion of accueil
     */
    function main() {
		$objet_service = new Contact_service();
        $this->VARS_HTML = $objet_service->VARS_HTML;
		// Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
		// Je passe mes parametres pour y avoir acces dans mes pages HTML
        $this->resultat = $this->validFormContactClient();
        
    }

     /******************************VALIDATION FORMULAIRE CONTACT************************************ */

    //Controle de saisie
    // Vérifier les données du formulaire page contact coté client
    function validFormContactClient(){
        // Initialisation des variables
        $result= [];
        $invalidFormFieds=[];

        /*********************INPUT NOM ***********************/
        if (((!isset($this->VARS_HTML["nom"]))) || ($this->VARS_HTML["nom"] == ""))	{
            $invalidFormFieds[]= [ "nom" => 'Ce Champ Nom ne peut être vide'];
        }
        /*********************PRENOM ***********************/
        if (((!isset($this->VARS_HTML["prenom"]))) || ($this->VARS_HTML["prenom"] == ""))	{
            $invalidFormFieds[]= [ "prenom" => 'Ce Champ Prénom ne peut être vide'];
        }
        /*********************EMAIL ***********************/
        //Si email n'existe pas et qu'il est vide, remplis le tab invalidFields du message d'erreur
        if (((!isset($this->VARS_HTML["email"]))) || ($this->VARS_HTML["email"] == ""))	{
            $invalidFormFieds[]= [ "email" => 'Ce Champ Email ne peut être vide'];
        }
        //Sinon
        else{
        //Appel de la fonction isEmailValid dans Input_control pour vérification
        //Si invalide remplir le tab de l'erreur
        if(!Input_control::isEmailValid($this->VARS_HTML["email"])){
            $invalidFormFieds[]= [ "email" => 'Email invalide'];
            }
        }
        /*********************TELEPHONE ***********************/
        if (((!isset($this->VARS_HTML["telephone"]))) || ($this->VARS_HTML["telephone"] == ""))	{
            $invalidFormFieds[]= [ "telephone" => 'Ce Champ Téléphone ne peut être vide'];
        }
        //Sinon
        else{
        //Appel de la fonction isTelValid dans Input_control pour vérification
        //Si invalide remplir le tab de l'erreur
        if(!Input_control::isTelValid($this->VARS_HTML["telephone"])){
            $invalidFormFieds[]= [ "telephone" => 'Numéro de Téléphone invalide'];
        }
        }
        /*********************SUJET ***********************/
        if (((!isset($this->VARS_HTML["subject"]))) || ($this->VARS_HTML["subject"] == ""))	{
        $invalidFormFieds[]= [ "subject" => 'Ce Champ Sujet commande ne peut être vide'];
        }
        /*********************TEXTAREA MESSAGE ***********************/
        if (((!isset($this->VARS_HTML["contact_message_content"]))) || ($this->VARS_HTML["contact_message_content"] == ""))	{
        $invalidFormFieds[]= [ "contact_message_content" => 'Ce Champ Message ne peut être vide'];
        }


        $nbrChampInval = count($invalidFormFieds);
        //récuperer les erreurs
        //Si Tab invalidFields n'est pas vide 
        if($nbrChampInval > 0){
        $result["invalidFormFieds"] = $invalidFormFieds;
        }
        //Si Tab invalidFields n'a pas d'erreur-> isValidEdit
        $result["isValidForm"] = ($nbrChampInval===0);

        return $result;
    }
	
}

?>

