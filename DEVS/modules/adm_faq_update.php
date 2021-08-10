<?php
require_once "adm_faq_service.php";
/**
 * Class Adm_faq_update | fichier adm_faq_update.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_faq_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_faq
 * @author @AfpaLabTeam - MORENO Antoine
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

class Adm_faq_update
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
   * Get interface to gestion of adm_faq_update
   */
  function main()
  {
    $objet_service = new Adm_faq_service();
    $this->VARS_HTML = $objet_service->VARS_HTML;

    // Vérifier les données du formulaire
    $this->checkFaqForm();

    // SI formulaire OK, j'ajoute l'enregistrement
    if ($this->nbrChampInval == 0) {
      // Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service
      $objet_service->update_faq_server();
      // Je passe mes parametres pour y avoir acces dans mes pages HTML
      $this->resultat = $objet_service->resultat;
    }
  }

  /**
   * Check datas form
   * @return number
   */

  /*********************************** * Vérifier les données du formulaire ajouter*******************************/
  private function checkFaqForm()
  {
    // Initialisation des variables
    $this->resultat["error_form"] = [];

    /*********************numCenter ***********************/
    if (!isset($this->VARS_HTML["numCenter"]) || ($this->VARS_HTML["numCenter"] < 1 || $this->VARS_HTML["numCenter"] > 2)) {
      $this->resultat["error_form"][] = ["numCenter" => 'Veuillez saisir un chiffre entre 1 et 2'];
    }
    /*********************question ***********************/
    if (!isset($this->VARS_HTML["question"]) || ($this->VARS_HTML["question"] == "")) {
      $this->resultat["error_form"][] = ["question" => 'Ce Champ ne peut être vide'];
    }
    /*********************answer ***********************/
    if (!isset($this->VARS_HTML["answer"]) || ($this->VARS_HTML["answer"] == "")) {
      $this->resultat["error_form"][] = ["reponse" => 'Ce Champ ne peut être vide'];
    }
    /*********************order ***********************/
    if (!isset($this->VARS_HTML["order"]) || ($this->VARS_HTML["order"] < 0)) {
      $this->resultat["error_form"][] = ["order" => 'Champ positif uniquement'];
    }
    if (!isset($this->VARS_HTML["order"]) || ($this->VARS_HTML["order"] == "")) {
      $this->resultat["error_form"][] = ["order" => 'Ce Champ  ne peut être vide'];
    }
    /*********************Status ***********************/
    if (!isset($this->VARS_HTML["status"]) || ($this->VARS_HTML["status"] == "")) {
      $this->resultat["error_form"][] = ["status" => 'Ce Champ ne peut-être vide'];
    } else if (($this->VARS_HTML["status"] < 0 || $this->VARS_HTML["status"] > 1)) {
      $this->resultat["error_form"][] = ["status" => 'Veuillez saisir un chiffre entre 0 et 1'];
    }

    $this->var_error_log($this->resultat["error_form"]);
    $this->nbrChampInval = count($this->resultat["error_form"]);
    error_log("nbrChampInval = " . $this->nbrChampInval);
  }

  private function var_error_log($object = null)
  {
    ob_start();                    // start buffer capture
    print_r($object);           // dump the values
    $contents = ob_get_contents(); // put the buffer into a variable
    ob_end_clean();                // end capture
    error_log("");
    error_log("");
    error_log("");
    error_log($contents);        // log contents of the result of var_dump( $object )
    error_log("");
    error_log("");
    error_log("");
  }
}
