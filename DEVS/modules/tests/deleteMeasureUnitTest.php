<?php

	require_once "configuration.php"; 
	require_once "database.php"; 
	require_once "security.php"; 
	require_once "initialize.php"; 
	
	use PHPUnit\Framework\TestCase;
	
	Class DeleteMeasureUnitTest extends TestCase {
		
		/**
		* @test
		*/
		public function testDeletion() {
			
			$oInit= new Initialize();
			
			// Content SQL of the file delete_measureunit.sql 
			$sql= "select * from measureunit";
			
			// Initialize the number of results 
			$iNbMeasureUnitOld= 0; 
			
			// Execute the query in NATIVE SQL CODE *
			$results_db= $oInit->oBdd->prepare($sql); 
			$results_db->execute();
			
			// Fetch on results and count them 
			while ($ligne = $results_db->fetch()) { 
				$iNbMeasureUnitOld++; 
			}		
			$iNbMeasureUnitOld--;

			
			$spathSQL = $oInit->GLOBALS_INI["PATH_HOME"] . $oInit->GLOBALS_INI["PATH_MODEL"] . "delete_measureunit.sql"; 
			$aResOfMeasureUnit = $oInit->oBdd->getSelectDatas($spathSQL, array(
																	"id_measureUnit" => 8,
			), false);
			
			// Content SQL of the file delete_measureunit.sql 
			$sql= "select * from measureunit";
			
			// Initialize the number of results 
			$iNbMeasureUnitNew= 0; 
			
			// Execute the query in NATIVE SQL CODE *
			$results_db= $oInit->oBdd->prepare($sql); 
			$results_db->execute();
			
			// Fetch on results and count them 
			while ($ligne = $results_db->fetch()) { 
				$iNbMeasureUnitNew++; 
			}
			
			// Comparison to see if the deletion was OK
			$this->assertEquals($iNbMeasureUnitOld, $iNbMeasureUnitNew);
			
		}
	}
?>