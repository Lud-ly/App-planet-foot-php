<?php

//SESSION START
session_start();
require 'configuration.php';
$GLOBALS_INI = Configuration::getGlobalsINI();
$classPath = $GLOBALS_INI['PATH_HOME'] . $GLOBALS_INI['PATH_CLASS'];
// require ($classPath . 'afpaconnect.php');
require($classPath . 'utils.php');
//require ($classPath . 'log.php');

// Saves the logs dir path
Configuration::$logsPath = Configuration::getLogsPath(true);


// Class dynamic
if ((isset($_GET["page"])) && ($_GET["page"] != "")) {
	$monPHP = $_GET["page"];
} else {
	if ((isset($_POST["page"])) && ($_POST["page"] != "")) {
		$monPHP = $_POST["page"];
	} else {
		$monPHP = "index";
		header("Location: login");
	}
}
// list of classes authorized when you are NOT connected
$list_class = array("index");
if (!isset($_SESSION["id_user"]) || (isset($_SESSION["id_user"]) && $_SESSION["id_user"] == "")) {
	if (!in_array($monPHP, $list_class)) {
		//$monPHP = "index";
	}
}

// Test if classes exist
if (!(file_exists($GLOBALS_INI["PATH_HOME"] . $GLOBALS_INI["PATH_CLASS"] . $monPHP . ".php"))) {
	$monPHP = "index";
}

$myClass = ucfirst($monPHP);

require $GLOBALS_INI["PATH_HOME"] . $GLOBALS_INI["PATH_CLASS"] . $monPHP . ".php";

$oMain = new $myClass();

// specifies to load the 'html' page (by default or if requested)
if (!isset($oMain->VARS_HTML["bLoadHtml"]) || ($oMain->VARS_HTML["bLoadHtml"] == 1)) {
	$page_to_load = "route.html";
	//if AJAX WITH JSON
	if ((isset($oMain->VARS_HTML["bJSON"])) && ($oMain->VARS_HTML["bJSON"] == 1)) {
		$page_to_load = $monPHP . ".html";
	}

	// load the 'html' page
	require $GLOBALS_INI["PATH_HOME"] . $GLOBALS_INI["PATH_FILES"] . $page_to_load;
}
unset($oMain);
