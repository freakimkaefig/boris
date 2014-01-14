<?php

/*
*	PARAMETERS: NONE
*	RESULT: list of cocktails
*
*	EXAMPLE:

{
	"success" : 1,
	"data" : {
		"1" : {
			"name" : "Testcocktail",
			"description" : "This is a delicious test-cocktail",
			"image" : "none.png",
			"orders" : "0",
			"offers" : "0"
		}
	}
}

*/

	
// HEADER
header('Content-Type: application/json; charset=utf-8');
include("config.php");
$link = mysql_connect($sqllocation , $sqluser , $sqlpwd ) or die('Couldnt connect to database');
mysql_select_db($sqldb, $link) or die(mysql_error());
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);
// END HEADER

$finalresult = array();
$finalresult["success"] = $CODE_ERROR;

// QUERY ALL COCKTAILS
$query = "SELECT * FROM `cocktail`";
$result = mysql_query($query, $link) or die(mysql_error());
$cocktails = array();
while ($row = mysql_fetch_array($result)){
	$cocktail = array();
	$cocktail["name"] = $row["name"];
	$cocktail["description"] = $row["description"];
	$cocktail["image"] = $row["image"];
	$cocktail["orders"] = $row["orders"];
	$cocktail["offers"] = $row["offers"];
	$cocktails[$row["id"]] = $cocktail;
}

//QUERY ALL RATINGS
/*
$query = "SELECT * FROM `rating`";
$result = mysql_query($query, $link) or die(mysql_error());
$cocktails = array();
while ($row = mysql_fetch_array($result)){
	$cocktail = array();
	$cocktail["name"] = $row["name"];
	$cocktail["description"] = $row["description"];
	$cocktail["image"] = $row["image"];
	$cocktail["orders"] = $row["orders"];
	$cocktail["offers"] = $row["offers"];
	$cocktails[$row["id"]] = $cocktail;
}*/

$finalresult["success"] = $CODE_SUCCESS;
$finalresult["data"] = $cocktails;

// ENCODE THE RESULT
echo json_encode($finalresult);
	
?>