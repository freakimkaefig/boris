<?php

error_reporting(0);
echo '{ "success" : '.$CODE_PERMISSION_DENIED.'}';
exit();

// HEADER
header('Content-Type: application/json; charset=utf-8');
include("config.php");
$link = mysql_connect($sqllocation , $sqluser , $sqlpwd ) or die('Couldnt connect to database');
mysql_select_db($sqldb, $link) or die(mysql_error());
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);
// END HEADER

$query = "DELETE FROM `recipe` WHERE 
`cocktailid`=".$_GET["cocktailid"]." AND 
`ingredientid`=".$_GET["ingredientid"]." AND
`order`=".$_GET["order"].";";

mysql_query($query, $link) or die(mysql_error());

?>