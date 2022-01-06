<?php
require_once "poll_service.php";
/**
 * @package Planet-foot Project
 * @subpackage poll
 * @author @LudoLabTeam - Ludo
 * @copyright  1920-2080 
 * @version v1.0
 */
class Poll
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
        // $objet_service->getContentJson();
        // on teste si formulaire de vote a été validé
    }

  
}
