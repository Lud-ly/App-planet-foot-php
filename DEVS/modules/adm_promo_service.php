<?php
require_once  "initialize.php";
/**
 * Class Adm_promo_service  ♦  file "adm_promo_service.php"
 *
 * Communicates with the database for the management of promotions.
 *
 * This class needs :
 *   • require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage adm_promo_service
 * @author @AfpaLabTeam - Virginie & Damien
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v3.0
 */
Class Adm_promo_service extends Initialize	{

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
  public function __destruct() {
    // Call Parent destructor
    parent::__destruct();
    // destroy objet_service
    unset($objet_service);
  }

  // Methode qui va chercher les informations dans la base de données et les affiche dans le tableau
  public function adm_promo_list() {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_promo.sql";
    $this->resultat["adm_promo_list"]= $this->oBdd->getSelectDatas($spathSQL, array( 
    ));
  }

  // Methode qui récupère les modifications enregistrées par l'utilisateur et les envoie à la base de données
  public function Adm_promo_update() {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_promo_update.sql";
    $this->resultat["adm_promo_update"]= $this->oBdd->treatDatas($spathSQL, array(
                                                                "id_promo" => $this->VARS_HTML['id_promo'],
                                                                "promo_label" => $this->VARS_HTML['promo_label'],
                                                                "promo_reference" => $this->VARS_HTML['promo_reference'],
                                                                "promo_number" => $this->VARS_HTML['promo_number'],
                                                                "promo_type" => $this->VARS_HTML['promo_type'],
                                                                "promo_begin_date" => $this->VARS_HTML['promo_begin_date'],
                                                                "promo_begin_time" => $this->VARS_HTML['promo_begin_time'],
                                                                "promo_end_date" => $this->VARS_HTML['promo_end_date'],
                                                                "promo_end_time" => $this->VARS_HTML['promo_end_time'],                                                          
                                                                "promo_quantity" => $this->VARS_HTML['promo_quantity']
    ));
  }

  public function Adm_promo_insert() {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_promo_insert.sql";
    $this->resultat["adm_promo_insert"]= $this->oBdd->treatDatas($spathSQL, array(
                                                                "promo_label" => $this->VARS_HTML['promo_label'],
                                                                "promo_reference" => $this->VARS_HTML['promo_reference'],
                                                                "promo_number" => $this->VARS_HTML['promo_number'],
                                                                "promo_type" => $this->VARS_HTML['promo_type'],
                                                                "promo_begin_date" => $this->VARS_HTML['promo_begin_date'],
                                                                "promo_begin_time" => $this->VARS_HTML['promo_begin_time'],
                                                                "promo_end_date" => $this->VARS_HTML['promo_end_date'],
                                                                "promo_end_time" => $this->VARS_HTML['promo_end_time'],                                                          
                                                                "promo_quantity" => $this->VARS_HTML['promo_quantity']
    ));
  }


    /**
     * Update the user status
     * 
     * @param integer|String $userId The user id
     * @param Bool|String|Integer $userStatus The new user status
     * @return array
     */
    public function Adm_promo_status()
    {
        $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_promo_status.sql";
        $this->resultat["adm_promo_status"]= $this->oBdd->treatDatas($spathSQL, array("id_promo" => $this->VARS_HTML['id_promo'],"promo_status" => $this->VARS_HTML['promo_status']
        ));
    }

         
    /**
     * Returns the number of times a promo has been used
     * 
     * @param string|int $promoId The promo id
     * 
     * @return int
     */
    public function getAlreadyUsedPromoCount($promoId)
    {
        $sqlFilePath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_promo__get_already_used_promo_count.sql";
        $result = $this->oBdd->getSelectDatas($sqlFilePath, array(
            'promoId' =>  $promoId
        ));
        return (isset($result[0]['compteur'])) ?
          +$result[0]['compteur'] :
          null;
    }

    /**
     * Returns the number of coupon codes entered on purchases not yet made
     * 
     * @param string|int $promoId The promo id
     * 
     * @return int
     */
    public function getEnteredPromoReferenceCountOnPurchasesNotYetMade($promoId)
    {
        $sqlFilePath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_promo__get_entered_promo_code_count_on_purchases_not_yet_made.sql";
        $result = $this->oBdd->getSelectDatas($sqlFilePath, array(
          'promoId' =>  $promoId
        ));
        return (isset($result[0]['compteur'])) ?
          +$result[0]['compteur'] :
          null;
    }

    /**
     * Returns users who have entered coupon codes on purchases not yet made
     * 
     * @param string|int $promoId The promo id
     * 
     * @return array
     */
    public function getEnteredPromoReferenceUsersOnPurchasesNotYetMade($promoId)
    {
        $sqlFilePath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_promo__get_entered_promo_code_users_on_purchases_not_yet_made.sql";
        $result = $this->oBdd->getSelectDatas($sqlFilePath, array(
          'promoId' =>  $promoId
        ));
        if (isset($result['error'])) {
          return [];
        }
        return $result;
    }

    /**
     * Returns promo types
     * 
     * @return string[]
     */
     public function getPromoTypes()
     {
         $sqlFilePath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_promo__get_promo_types.sql";
         $promoTypes = $this->oBdd->getSelectDatas($sqlFilePath, array());
         $result = [];
         foreach ($promoTypes as &$promoType) {
            if (isset($promoType['promoType'])) {
                $result[] = $promoType['promoType'];
            }
         }
         return $result;
     }

     /**
      * Save a new promo
      * 
      * @param array &$jData Data to save into database
      
      * @return array Empty array on failure
      */
     public function saveNewPromo(array &$jData)
     {
        $sqlFilePath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_promo__insert_promo.sql";
        $result = $this->oBdd->treatDatas(
            $sqlFilePath, array(
                'promoLabel' =>  $jData['promoLabel'],
                'promoReference' =>  $jData['promoReference'],
                'promoQuantity' =>  $jData['promoQuantity'],
                'promoType' =>  $jData['promoType'],
                'promoBeginDatetime' =>  $jData['promoBeginDatetime'],
                'promoEndDatetime' =>  $jData['promoEndDatetime'],
                'promoStatus' =>  $jData['promoStatus'],
                'promoDescription' =>  $jData['promoDescription'],
                'promoValue' =>  $jData['promoValue']
            )
        );
        if (isset($result['error'])) {
          return [];
        }
        return $result;
     }

    /**
      * Update a promo
      * 
      * @param string|int $promoId The promo id
      * @param array $jData Data to update into database

      * @return array
      */
      public function updatePromo($promoId, $jData) {
        $sqlFilePath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_promo__update_promo.sql";
        $result = $this->oBdd->treatDatas(
            $sqlFilePath, array(
                'promoId' => $promoId,
                'promoLabel' =>  $jData['promoLabel'],
                'promoReference' =>  $jData['promoReference'],
                'promoQuantity' =>  $jData['promoQuantity'],
                'promoType' =>  $jData['promoType'],
                'promoBeginDatetime' =>  $jData['promoBeginDatetime'],
                'promoEndDatetime' =>  $jData['promoEndDatetime'],
                'promoStatus' =>  $jData['promoStatus'],
                'promoDescription' =>  $jData['promoDescription'],
                'promoValue' =>  $jData['promoValue']
            )
        );
        if (isset($result['error'])) {
          return [];
        }
        return $result;

     }
}


