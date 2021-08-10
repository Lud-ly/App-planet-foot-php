<?php
require_once "adm_faq_service.php";
require_once "input_control.php";
/**
 * Class Adm_faq | fichier adm_faq.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "adm_faq_service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_faq
 * @author @AfpaLabTeam - Antoine MORENO
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

class Adm_faq
{
    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;

    /**
     * public $nbrChampInval is used to store the numbers of errors found in the form
     * @var int
     */
    public $nbrChampInval;


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
     * Get interface to gestion of adm_faq
     */
    function main()
    {
        $objet_service = new Adm_faq_service();
        $this->VARS_HTML = $objet_service->VARS_HTML;
        // Ici je fais mon appel $objet_service->ma_methode_qui_est_dans_le_service

        // Je passe mes parametres pour y avoir acces dans mes pages HTML
        // $this->resultat = $objet_service->resultat;

        //switch action du ajax que je recois
        //case "list"
        // $result = $objet_service->adm_faq_list(); 
        // // Je passe mes parametres pour y avoir acces dans mes pages HTML
        // // $this->resultat = $objet_service->resultat;
        // $this->VARS_HTML = $objet_service->VARS_HTML;
        // send_json_to_JS($result);

    }

    /**
     * Check datas form
     * @return number
     */

    /*********************************** * Vérifier les données du formulaire ajouter*******************************/
    public function checkFaqForm()
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
        } else if (($this->VARS_HTML["status"] < 1 || $this->VARS_HTML["status"] > 2)) {
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
