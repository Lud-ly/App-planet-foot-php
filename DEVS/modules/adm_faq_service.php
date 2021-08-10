<?php
require_once  "initialize.php";
/**
 * Class adm_faq_service | fichier adm_faq_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_faq_update_service
 * @author @AfpaLabTeam - Antoine MORENO
 * @copyright  1920-2080 Afpa Lab Team - CDA 20206
 * @version v1.0
 */

class Adm_faq_service extends Initialize
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
     * Retourne la liste des faq
     * @return Array
     */

    public function adm_faq_list()
    {
        $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_faq.sql";
        return $this->oBdd->getSelectDatas($spathSQL, array());
    }
    /*************************************************
     * Ajoute une faq à la liste
     * @return Array
     */
    public function add_faq_server()
    {
        $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "insert_faq.sql";
        return  $this->oBdd->treatDatas($spathSQL, array(
            "id_center" => $this->VARS_HTML['numCenter'],
            "faq_question" => $this->VARS_HTML['question'],
            "faq_answer" => $this->VARS_HTML['answer'],
            "faq_order" => $this->VARS_HTML['order'],
            "faq_status" => $this->VARS_HTML['status'],

        ));
    }
    /*************************************************
     * Modifie une faq de la liste des faq
     * @return Array
     */
    public function update_faq_server()
    {
        $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "update_faq.sql";
        return  $this->oBdd->treatDatas($spathSQL, array(
            "id_faq" => $this->VARS_HTML['idFaq'],
            "id_center" => $this->VARS_HTML['numCenter'],
            "faq_question" => $this->VARS_HTML['question'],
            "faq_answer" => $this->VARS_HTML['answer'],
            "faq_order" => $this->VARS_HTML['order'],
            "faq_status" => $this->VARS_HTML['status'],

        ));
    }

    /****************************************************
     * Supprimer une faq de la liste
     * @return Array
     */
    public function delete_faq_server()
    {
        $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "delete_faq.sql";
        return $this->oBdd->treatDatas($spathSQL, array(
            "id_faq" => $this->VARS_HTML['id_faq']
        ));
    }
}
