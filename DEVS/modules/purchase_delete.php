<?php

require_once "purchase_service.php";

/**
 * 
 * Class purchase_delete | file purchase_delete.php
 *
 * In this class, we show the interface "purchase_delete.html".
 * With this interface, we'll be able to delete an article from an order not yet validated
 *
 * @package Afpanier Project
 * @subpackage purchase_service
 * @author @Afpa Lab Team - Ludovic
 * @copyright  1920-2080 The Afpa Lab Team Group Corporation World Company
 * @version v1.0
 */
class Purchase_delete {
	
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
	public function __construct()	{
		// init variables resultat
		$this->resultat= [];

		// execute main function
		$this->main();
	}

	/**
	 * Get interface to gestion of promotion
	 */
	function main()	{

        /** 
		* Creation de l'obj de la classe de mon fichier service et 
		* lancement de la methode delete promo pour recup les donner de la DB 
		*/
		$objet_service = new Purchase_service();

		// launching of the function purchase_delete_article of an article only if the status is correct
		if ($objet_service->VARS_HTML["purchase_status"]==1 && $objet_service->VARS_HTML['iIndice']== $objet_service->VARS_HTML['iIndiceModal']) {
			$objet_service-> purchase_delete_basket();
		}
		
		$this->resultat = $objet_service->resultat;
        $this->VARS_HTML = $objet_service->VARS_HTML;
        
        unset($objet_service);
	}
}

?>