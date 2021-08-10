<?php

require_once "adm_client_service.php";

/**
 * 
 * Class Adm_client_delete | file adm_client_delete.php
 *
 * In this class, we show the interface "adm_client_delete.html".
 * With this interface, we'll be able to delete an article from an order not yet validated
 *
 * @package Afpanier Project
 * @subpackage adm_client_service
 * @author @Afpa Lab Team - Ludovic
 * @copyright  1920-2080 The Afpa Lab Team Group Corporation World Company
 * @version v1.0
 */
class Adm_client_delete {
	
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
		$objet_service = new Adm_client_service();

		// launching of the function purchase_delete_article of an article only if the status is correct
		
			$objet_service-> adm_client_delete();
		
		
		$this->resultat = $objet_service->resultat;
        $this->VARS_HTML = $objet_service->VARS_HTML;
        
        unset($objet_service);
	}
}

?>