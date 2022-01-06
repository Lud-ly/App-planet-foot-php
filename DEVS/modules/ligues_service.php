<?php
require_once  "initialize.php";
/**
 * Class Ligues_service | fichier ligues_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Planet-foot Project
 * @subpackage ligues_service
 * @author @LudoLabTeam - Ludo
 * @copyright  1920-2080 
 * @version v1.0
 */

class Ligues_service extends Initialize
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
    }
}
