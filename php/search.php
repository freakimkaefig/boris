<?php

/*
*	PARAMETERS: NONE
*	OPTIONAL PARAMETERS:
*		NAME 		name of the cocktail to search for
*		DATA		json-array of ingredient to search for
*	RESULT: list of cocktails with the searchname AND 
*			at least one of the ingredients in the array
*
*	EXAMPLE:

search.php?name=Testcocktail
search.php?data={"ingredients":["Gin","Ananassaft","Wodka"]}

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

$json = array();
$json["success"] = $CODE_ERROR;

// GET OPTIONAL PARAMETERS
if(isset($_GET["name"])){
	$name = mysql_real_escape_string($_GET["name"]);
}else{
	$name = "";
}
if(isset($_GET["data"])){
	$ingredients = $_GET["data"];
	$ingredients = json_decode($ingredients, true);
	if(isset($ingredients["ingredients"])&&is_array($ingredients["ingredients"])){
		$ingredients = $ingredients["ingredients"];
	}else{
		$json["success"]=$CODE_MALFORMED;
		echo json_encode($json);
		exit();
	}
}

$cocktails = array();

$extra = "";

if(isset($ingredients)){
	// QUERY ALL INGREDIENTS
	$query = "SELECT `cocktail`.id 
	FROM `cocktail`, `ingredient`, `recipe`
	WHERE
	(`ingredient`.name LIKE '%".$ingredients[0]."%'
	AND `ingredient`.id=`recipe`.ingredientid
	AND `recipe`.cocktailid=`cocktail`.id)";
	for($i=1;$i<count($ingredients);$i++){
		$query .=
		"OR
		(`ingredient`.name LIKE '%".$ingredients[$i]."%'
		AND `ingredient`.id=`recipe`.ingredientid
		AND `recipe`.cocktailid=`cocktail`.id)";
	}
	$result = mysql_query($query, $link) or die(mysql_error());
	if ($row = mysql_fetch_array($result)){
		$extra .= " AND (`id`=".$row["id"];
	}
	while ($row = mysql_fetch_array($result)){
		$extra .= " OR `id`=".$row["id"];
	}
	$extra .= ")";
}

// QUERY ALL COCKTAILS
$query = "SELECT * FROM `cocktail` WHERE name LIKE '%$name%'".$extra;
$result = mysql_query($query, $link) or die(mysql_error());
while ($row = mysql_fetch_array($result)){
	$cocktail = array();
	$cocktail["name"] = $row["name"];
	$cocktail["description"] = $row["description"];
	$cocktail["image"] = $row["image"];
	$cocktail["orders"] = $row["orders"];
	$cocktail["offers"] = $row["offers"];
	if(isset($rec)){
		$cocktail["recipe"] = array();
	}
	$cocktails[$row["id"]] = $cocktail;
}

$json["success"] = $CODE_SUCCESS;
$json["data"] = $cocktails;

// ENCODE THE RESULT
echo json_encode($json);
	
?>