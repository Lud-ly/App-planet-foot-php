<?php
require_once  "initialize.php";

/**
 * Class Adm_offer_service | fichier Adm_offer_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Afpanier v3 Project
 * @subpackage Adm_offer_service
 * @author @AfpaLabTeam - Perez Guy
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v1.0
 */

Class Adm_offer_service extends Initialize	{

  /**
   * public $resultat is used to store all datas needed for HTML Templates
   * @var array
   */
  public $resultat;
  public $basket_name;
  public $basket_description;
  public $basket_number;
  public $basket_price;
  public $basket_quantity;
  public $basket_reference;
  public $basket_image;
  public $ingredient;
  public $id_basket;
  public $aTableau;
  public $code_promo;
  public $photo;
  public $CodePromoDateFin;
  public $CodePromoHeureFin;


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

  // list of all datas needed when loading adm_offer page
  public function adm_offer_list() {
    // list of suppliers and their baskets
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_offer_supplier.sql";
    $this->resultat["adm_offer_supplier_list"] = $this->oBdd->getSelectDatas($spathSQL, array(
    ));

    // list of suppliers
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_offer_suppliers.sql";
    $this->resultat["adm_offer_suppliers_list"] = $this->oBdd->getSelectDatas($spathSQL, array(
    ));

    // list of mainBaskets
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_offer_mainBasket.sql";
    $this->resultat["adm_offer_mainbasket_list"] = $this->oBdd->getSelectDatas($spathSQL, array(
    ));

    // list of categories
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_offer_category.sql";
    $this->resultat["adm_offer_category_list"] = $this->oBdd->getSelectDatas($spathSQL, array(
    ));

    // list of products
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_offer_product.sql";
    $this->resultat["adm_offer_product_list"] = $this->oBdd->getSelectDatas($spathSQL, array(
    ));

    // list of measure units
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_offer_measureUnit.sql";
    $this->resultat["adm_offer_measureUnit_list"] = $this->oBdd->getSelectDatas($spathSQL, array(
    ));

    // list of promo codes
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "select_adm_offer_codePromo.sql";
    $this->resultat["adm_offer_codePromo_list"] = $this->oBdd->getSelectDatas($spathSQL, array(
    ));
  }

  /**
  * Update informations of basket or mainBasket
  * 
  * @param integer $basketId The basket id
  * @param integer $mainBasketId The mainbasket id
  * @param string mainBasket_name The name of one baskets family
  * @param string basket_name The basket name
  * @param string basket_image The basket image
  * @param string basket_description A little basket description like a catchphrase
  * @param integer basket_number the remaining number of baskets to sell
  * @param integer basket_quantity The number of baskets to sell
  * @param integer basket_price The basket price
  * @return array
  */

  public function adm_offer_update($basketId, $mainBasketId) {
    $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_offer_update.sql";
    return $this->oBdd->treatDatas($spathSQL, array(
                                                                "id_basket"=>$basketId,
                                                                "id_mainBasket"=>$mainBasketId,
                                                                "mainBasket_name"=>$this->VARS_HTML['mainBasket_name'],
                                                                "basket_name"=>$this->VARS_HTML["basket_name"],
                                                                "basket_image"=>$this->VARS_HTML["basket_image"],
                                                                "basket_description"=>$this->VARS_HTML["basket_description"],
                                                                "basket_number"=>$this->VARS_HTML['basket_number'],
                                                                "basket_quantity"=>$this->VARS_HTML["basket_quantity"],
                                                                "basket_price"=>$this->VARS_HTML["basket_price"],

    ));
  }


  /**
  * register the information of a new mainBasket in database
  *
  * @param string mainBasket_name The name of one baskets family
  * @param string basket_image The basket image
  * @param string basket_description A little basket family's description like a catchphrase
  *
  * @return array
  */
  public function basket_validation() {
                
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_offer_mainbasket_insert.sql";
    $this->resultat= $this->oBdd->treatDatas($spathSQL, array(
                                                            "mainBasket_name"=> $this->VARS_HTML["mainBasket_name"],
                                                            "mainBasket_image"=> $this->VARS_HTML["mainBasket_image"],
                                                            "mainBasket_description"=> $this->VARS_HTML["mainBasket_description"],
                                                            ));
  
    // keep in memory the id of the brand new mainbasket                                                        
    $this->id_mainBasket= $this->oBdd->getLastInsertId();

    // launch the function to save 1 or several basket(s) related to this mainbasket
    $this->adm_offer_save();
  }   


  /**
  * Register the informations of baskets and related baskets' ingredients as well as related promotional codes
  * 
  * @param string $basket_name The basket name
  * @param string $basket_description A little basket description like a catchphrase
  * @param integer $basket_number the remaining number of baskets to sell
  * @param integer $basket_quantity The number of baskets to sell
  * @param integer $basket_price The basket price
  * @param mixed $basket_reference The basket reference
  * @param string $basket_image the basket image
  * @param integer $code_promo The promotionnal codes
  * @param string $ingredient the list of ingredients per basket
  *
  * @return array
  */
  public function adm_offer_save() {

    $this->basket_name= $this->VARS_HTML['basket_name'];
    $this->basket_description= $this->VARS_HTML['basket_description'];
    $this->basket_number= $this->VARS_HTML['basket_number'];
    $this->basket_quantity= $this->VARS_HTML['basket_quantity'];
    $this->basket_price= $this->VARS_HTML['basket_price'];
    $this->basket_reference= $this->VARS_HTML['basket_reference'];
    $this->basket_image= $this->VARS_HTML['basket_image'];
    $this->code_promo= $this->VARS_HTML['code_promo'];

    $this->ingredient= $this->VARS_HTML['ingredient'];

    $this->ingredient= explode(";",$this->ingredient);

    // tranlation of the string "basket_name" received from AJAX to an array 
    $this->basket_name= explode(",",$this->basket_name);

    // tranlation of the string "basket_description" received from AJAX to an array 
    $this->basket_description= explode(",",$this->basket_description); 

    // tranlation of the string "basket_number" received from AJAX to an array 
    $this->basket_number= explode(",",$this->basket_number);

    // tranlation of the string "basket_quantity" received from AJAX to an array 
    $this->basket_quantity= explode(",",$this->basket_quantity);

    // tranlation of the string "basket_price" received from AJAX to an array 
    $this->basket_price= explode(",",$this->basket_price);

    // tranlation of the string "basket_reference" received from AJAX to an array 
    $this->basket_reference= explode(",",$this->basket_reference);

    // tranlation of the string "basket_image" received from AJAX to an array 
    $this->basket_image= explode(",",$this->basket_image);

    // tranlation of the string "code_promo" received from AJAX to an array 
    $this->code_promo= explode(",",$this->code_promo);

    // loop for the request which add (a) new line(s) of basket(s) to the new purchase 
    for ($i=0; $i<count($this->basket_name); $i++) {
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_offer_basket_save.sql";
      $this->resultat["adm_offer_save"]= $this->oBdd->treatDatas($spathSQL, array(
                                                                  "id_supplier" => $this->VARS_HTML["id_supplier"],
                                                                  'id_mainBasket' => $this->id_mainBasket,
                                                                  "basket_name"=> $this->basket_name[$i],
                                                                  "basket_image"=> $this->basket_image[$i],
                                                                  "basket_description"=> $this->basket_description[$i],
                                                                  "basket_reference"=> $this->basket_reference[$i],
                                                                  "basket_number"=> $this->basket_number[$i],
                                                                  "basket_quantity"=> $this->basket_quantity[$i],
                                                                  "basket_price"=> $this->basket_price[$i],
                                                                  "basket_begin_date" => $this->VARS_HTML["basket_begin_date"],
                                                                  "basket_end_date" => $this->VARS_HTML["basket_end_date"],
                                                                  "basket_begin_validation_date" => $this->VARS_HTML["basket_begin_validation_date"],
                                                                  "basket_end_validation_date" => $this->VARS_HTML["basket_end_validation_date"],
                                                                  "basket_payment_begin_date" => $this->VARS_HTML["basket_payment_begin_date"],
                                                                  "basket_payment_end_date" => $this->VARS_HTML["basket_payment_end_date"],
                                                                  "basket_withdrawal_begin_date" => $this->VARS_HTML["basket_withdrawal_begin_date"],
                                                                  "basket_withdrawal_end_date" => $this->VARS_HTML["basket_withdrawal_end_date"],
                                                              ));    
      $this->id_basket= $this->oBdd->getLastInsertId();                                                         
      
      $this->ingredient[$i]= explode(",",$this->ingredient[$i]);

      // loop to add ingredient(s) to the corresponding basket
      for ($j=0 ;$j<count($this->ingredient[$i]);$j++) {
        $this->aTableau= explode(" ",$this->ingredient[$i][$j]);
        if ($this->aTableau[2]== "") {
          $this->aTableau[2]= "null";
        }
        if ($this->aTableau[1]== "") {
          $this->aTableau[1]= "null";
        }
        
        $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_offer_basket_ingredients_save.sql";
        $this->resultat["adm_offer_save"]= $this->oBdd->treatDatas($spathSQL, array(
                                                                  "id_basket" => $this->id_basket,
                                                                  "id_product" => $this->aTableau[0],
                                                                  "id_measureUnit" => $this->aTableau[2],
                                                                  "product_quantity" =>$this->aTableau[1],
        ));
      }

      //loop to add the Promo code to the corresponding basket
      if ($this->code_promo[$i] != "") {
        $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_offer_codePromo_save.sql";
        $this->resultat["adm_offer_save"]= $this->oBdd->treatDatas($spathSQL, array(
                                                                                "id_basket" => $this->id_basket,
                                                                                "id_promo" => $this->code_promo[$i],
        ));
      }
      
    }
  }

  /**
  * delete informations of baskets, related ingredients and related promotional codes
  * 
  * @param integer id_basket The basket id
  * @return array
  */

  public function adm_offer_delete() {            
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_offer_delete.sql";
    $this->resultat= $this->oBdd->treatDatas($spathSQL, array(
                                                            "id_basket"=> $this->VARS_HTML["id_basket"],
    ));
  }  


  /**
  * register informations related to a new ingredient
  * 
  * @return array
  */
  public function adm_offer_addNewIngredient() {         
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_offer_ingredient_add.sql";
    $this->resultat['adm_offer_ingredient_add']= $this->oBdd->treatDatas($spathSQL, array(
                                                            "id_category"=> $this->VARS_HTML["id_category"],
                                                            "product_name"=> $this->VARS_HTML["product_name"],
    ));
  }  


  /**
  * register informations related to a new category of products
  * 
  * @return array
  */
  public function adm_offer_category_add() {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_offer_category_add.sql";
    $this->resultat['adm_offer_category_add']= $this->oBdd->treatDatas($spathSQL, array(
                                                            "category_name"=> $this->VARS_HTML["category_name"],
    ));
  }

  
  /**
  * register informations related to a new measure unit
  * 
  * @return array
  */
  public function adm_offer_measureUnit_add() {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_offer_measureUnit_add.sql";
    $this->resultat['adm_offer_measureUnit_add']= $this->oBdd->treatDatas($spathSQL, array(
                                                            "measureUnit_name"=> $this->VARS_HTML["measureUnit_name"],
    ));
  }


  /**
  * register informations related to a new promotional code
  * 
  * @param string $CodePromoDateFin if exiss, correspond to the date of offer end
  * @return array
  */
  public function adm_offer_codePromo_add() {
    $this->CodePromoDateFin= $this->VARS_HTML['promo_end_date'];

    // if the promo's date of end is unknown
    if ($this->CodePromoDateFin== "") {
      $this->CodePromoDateFin= 'null';
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_offer_codePromo_add.sql";
    } else {
      $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_offer_codePromo_add_end.sql";
    }

    $this->resultat['adm_offer_codePromo_add']= $this->oBdd->treatDatas($spathSQL, array(
                                                            "promo_label" => $this->VARS_HTML["promo_label"],
                                                            "promo_reference"=> $this->VARS_HTML["promo_reference"],
                                                            "promo_number" => $this->VARS_HTML["promo_number"],
                                                            "promo_type" => $this->VARS_HTML["promo_type"],
                                                            "promo_begin_date" => $this->VARS_HTML["promo_begin_date"],
                                                            "promo_end_date" => $this->CodePromoDateFin,
                                                            "promo_quantity" => $this->VARS_HTML["promo_quantity"],
    ));
  }
  
}
?>

