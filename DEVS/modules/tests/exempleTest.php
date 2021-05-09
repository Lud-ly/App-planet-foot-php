<?php
	
	require_once "configuration.php"; 
	require_once "database.php"; 
	require_once "security.php"; 
	require_once "initialize.php"; 
	
	use PHPUnit\Framework\TestCase; 
	
	Class ExempleTest extends TestCase {
		/** @test */ 
		public function test() 
		{ 
			$boolean = false; 
			$this->assertTrue($boolean); 
		}
	}
?>