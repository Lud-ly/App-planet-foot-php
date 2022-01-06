<?php
require_once "poll_service.php";
/**
 * @package Planet-foot Project
 * @subpackage poll
 * @author @LudoLabTeam - Ludo
 * @copyright  1920-2080 
 * @version v1.0
 */
class PollAdd
{
    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;


    public function __construct()
    {

        // init variables resultat
        $this->resultat = [];

        // execute main function
        $this->main();
        //  $this->getContentJson();
    }


    /**
     * Get interface to gestion of polls
     */
    function main()
    {
        $objet_service = new Poll_service();
        // Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
        // Je passe mes parametres pour y avoir acces dans mes pages HTML
        $this->resultat = $objet_service->resultat;
        $this->VARS_HTML = $objet_service->VARS_HTML;
        // on teste si formulaire de vote a été validé
        $result = $this->getErrors();
        // SI formulaire OK et l'image uploadé, j'ajoute l'enregistrement
        if ($result["isValid"]) {
        //   $this->resultat =  $objet_service->add_data_server();
        }
        send_json_to_JS($result);
    }

    private function getErrors()
    {
      // Initialisation des variables
      $result = [];
      $invalidFields = [];
      $validFields = [];
  
  
      /*********************user ***********************/
      if (((!isset($this->VARS_HTML["username"]))) || ($this->VARS_HTML["username"] == "")) {
        $invalidFields[] = ["username" => 'Ce Champ Name ne peut être vide'];
      }
      /*********************message ***********************/
      if (((!isset($this->VARS_HTML["message"]))) || ($this->VARS_HTML["message"] == "")) {
        $invalidFields[] = ["message" => 'Ce Champ Message ne peut être vide'];
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
