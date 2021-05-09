<?php

	require_once "configuration.php"; 
	require_once "database.php"; 
	require_once "security.php"; 
	require_once "initialize.php"; 
	
	use PHPUnit\Framework\TestCase;
	
	Class UpdateClientTest extends TestCase {
		
		/**
		* @test
		*/
		public function testUpdate() {
			
			$oInit= new Initialize();
			
			// Content SQL of the file delete_measureunit.sql 
			$sql= "select user_mail from user where id_user=2";
			
			// Initialize the mail
			$sEmailClient= ""; 
			
			// Execute the query in NATIVE SQL CODE *
			$results_db= $oInit->oBdd->prepare($sql); 
			$results_db->execute();

			
			while ($ligne = $results_db->fetch()) { 
				$sEmailClient= $ligne['user_mail'];
			}
			
			$spathSQL = $oInit->GLOBALS_INI["PATH_HOME"] . $oInit->GLOBALS_INI["PATH_MODEL"] . "update_adm_client.sql"; 
			$aResOfClient = $oInit->oBdd->getSelectDatas($spathSQL, array(
																	"id_user" => 2,
																	"user_mail" => "hautefeuille.ludovic@orange.com"
			), false);
			
			// Initialize the mail address
			$sEmailClientNew= ""; 
			
			// Execute the query in NATIVE SQL CODE *
			$results_db= $oInit->oBdd->prepare($sql); 
			$results_db->execute();
			
			// Fetch on results and count them 
			while ($ligne = $results_db->fetch()) { 
				$sEmailClientNew= $ligne['user_mail'];
			}	
			
			// Comparison to see if the deletion was OK
			$this->assertNotEquals($sEmailClient, $sEmailClientNew);		
		}
	}
?>