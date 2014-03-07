<?php

/*
*	PARAMETERS: ID
*/

// HEADER
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');
include("config.php");
$link = mysql_connect($sqllocation , $sqluser , $sqlpwd ) or die('Couldnt connect to database');
mysql_select_db($sqldb, $link) or die(mysql_error());
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);
// END HEADER

// GET PARAMETERS
if(isset($_GET["id"])){
	$id = mysql_real_escape_string($_GET["id"]);
}else{
	exit();
}

// QUERY ALL COCKTAILS
$query = "UPDATE `cocktail` SET `orders` = `orders`+1 WHERE `id`=$id";
$result = mysql_query($query, $link) or die(mysql_error());