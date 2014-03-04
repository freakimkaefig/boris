<?php

/*
*	PARAMETERS: id of a cocktail
*	RESULT: list of ingredients
*
*	EXAMPLE:

{
	"success" : 1,
	"data" : [{
			"id" : "2",
			"amount" : "100",
			"order" : "1"
		}, {
			"id" : "1",
			"amount" : "300",
			"order" : "2"
		}
	]
}

*/
	
// HEADER
header('Content-Type: application/json; charset=utf-8');
error_reporting(0);
include("config.php");
$link = mysql_connect($sqllocation , $sqluser , $sqlpwd ) or die('Couldnt connect to database');
mysql_select_db($sqldb, $link) or die(mysql_error());
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);
// END HEADER

$finalresult = array();
$finalresult["success"] = $CODE_ERROR;

// CHECK WHETHER ID IS SET
if(!isset($_GET["id"])){
	$finalresult["success"] = $CODE_INSUFFICIENT_PARAMETERS;
	echo json_encode($finalresult);
	exit();
}
$id = mysql_real_escape_string($_GET["id"]);

// QUERY ALL COCKTAILS
$query = "SELECT * FROM `recipe` WHERE `cocktailid`=$id ORDER BY `order`";
$result = mysql_query($query, $link) or die(mysql_error());
$ingredients = array();
while ($row = mysql_fetch_array($result)){
	$ingredient = array();
	$ingredient["id"] = $row["ingredientid"];
	$ingredient["amount"] = $row["amount"];
	$ingredient["order"] = $row["order"];
	$ingredients[count($ingredients)] = $ingredient;
}

$finalresult["success"] = $CODE_SUCCESS;
$finalresult["data"] = $ingredients;

// ENCODE THE RESULT
echo json_encode($finalresult);
	
?>