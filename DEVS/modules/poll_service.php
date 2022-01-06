<?php
require_once  "initialize.php";
/**
 * Class index_service | fichier poll_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Planet-foot Project
 * @subpackage poll_service
 * @author @LudoLabTeam - Ludo
 * @copyright  1920-2080 
 * @version v1.0
 */

class Poll_service extends Initialize
{

    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;

    private $username="lsdfhslf";
    private $message="dljsld";
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

        // $this->username = $username;
        // $this->message = $message;

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



    /*
     * Get polls data
     * Returns single or multiple poll data with respective options
     * @param string single, all
     */
    public function getPolls()
    {

        $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "index_list_poll.sql";
        $this->resultat["index_list_poll"] = $this->oBdd->getSelectDatas($spathSQL, array());
    }


}
