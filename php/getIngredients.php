<?php

/*
*	PARAMETERS: NONE
*	RESULT: list of ingredients
*
*	EXAMPLE:

{
	"success" : 1,
	"data" : {
		"1" : {
			"name" : "Cola",
			"description" : "Cola is too sweet",
			"image" : "none.png",
			"unit" : "cl",
			"alcohol" : "0"
		},
		"2" : {
			"name" : "Rum",
			"description" : "Rum ... just rum!",
			"image" : "none.png",
			"unit" : "cl",
			"alcohol" : "35"
		}
	}
}

*/

// HEADER
header('Content-Type: application/json; charset=utf-8');
include("config.php");
$link = mysql_connect($sqllocation , $sqluser , $sqlpwd ) or die('Couldnt connect to database');
mysql_select_db($sqldb, $link) or die(mysql_error());
// END HEADER

$finalresult = array();
$finalresult["success"] = $CODE_ERROR;

// QUERY ALL INGREDIENTS
$query = "SELECT * FROM `ingredient`";
$result = mysql_query($query, $link) or die(mysql_error());
$ingredients = array();
while ($row = mysql_fetch_array($result)){
	$ingredient = array();
	$ingredient["name"] = $row["name"];
	$ingredient["description"] = $row["description"];
	$ingredient["image"] = $row["image"];
	$ingredient["unit"] = $row["unit"];
	$ingredient["alcohol"] = $row["alcohol"];
	$ingredients[$row["id"]] = $ingredient;
}

$finalresult["success"] = $CODE_SUCCESS;
$finalresult["data"] = $ingredients;

// ENCODE THE RESULT
echo json_encode($finalresult);
	
?>