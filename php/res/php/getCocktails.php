<?php

/*
*	PARAMETERS: NONE
*	OPTIONAL PARAMETERS:
*		id     - query only a specific cocktail
*		rating - adds ratings to all cocktails
*					give a number here to get the
*					probability that the different
*					ratings are higher than the given number
*		recipe - adds all ingredients as a recipe to all cocktails
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

// GET OPTIONAL PARAMETERS
if(isset($_GET["id"])){
	$id = mysql_real_escape_string($_GET["id"]);
}
if(isset($_GET["rating"])){
	$rate = mysql_real_escape_string($_GET["rating"]);
}
if(isset($_GET["recipe"])){
	$rec = true;
}

$finalresult = array();
$finalresult["success"] = $CODE_ERROR;

// QUERY ALL COCKTAILS
$query = "SELECT * FROM `cocktail`";
if(isset($id)){
	$query .= " WHERE id=".$id;
}
$result = mysql_query($query, $link) or die(mysql_error());
$cocktails = array();
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

if(isset($rate)){
	// QUERY ALL RATINGS
	$query = "SELECT 
	COCKTAIL,
	SUM(IF(BITTER>$rate,1,0))/COUNT(BITTER) AS BITTER,
	AVG(BITTER) AS ABITTER,
	SUM(IF(SWEET>$rate,1,0))/COUNT(SWEET) AS SWEET,
	AVG(SWEET) AS ASWEET,
	SUM(IF(FRUITY>$rate,1,0))/COUNT(FRUITY) AS FRUITY,
	AVG(FRUITY) AS AFRUITY,
	SUM(IF(STRONG>$rate,1,0))/COUNT(STRONG) AS STRONG,
	AVG(STRONG) AS ASTRONG,
	SUM(IF(TASTE>$rate,1,0))/COUNT(TASTE) AS TASTE,
	AVG(TASTE) AS ATASTE,
	SUM(IF(LOOK>$rate,1,0))/COUNT(LOOK) AS LOOK,
	AVG(LOOK) AS ALOOK
	FROM `rating`";
	if(isset($id)){
		$query .= " WHERE COCKTAIL=".$id;
	}
	$query .= " GROUP BY COCKTAIL";
	$result = mysql_query($query, $link) or die(mysql_error());
	while ($row = mysql_fetch_array($result)){
		$rating = array();
		// BITTER
		$bitter = array();
		$bitter["average"]=$row["ABITTER"];
		$bitter["value"]=$row["BITTER"];
		$rating["bitter"]=$bitter;
		// SWEET
		$sweet = array();
		$sweet["average"]=$row["ASWEET"];
		$sweet["value"]=$row["SWEET"];
		$rating["sweet"]=$sweet;
		// FRUITY
		$fruity = array();
		$fruity["average"]=$row["AFRUITY"];
		$fruity["value"]=$row["FRUITY"];
		$rating["fruity"]=$fruity;
		// STRONG
		$strong = array();
		$strong["average"]=$row["ASTRONG"];
		$strong["value"]=$row["STRONG"];
		$rating["strong"]=$strong;
		// TASTE
		$taste = array();
		$taste["average"]=$row["ATASTE"];
		$taste["value"]=$row["TASTE"];
		$rating["taste"]=$taste;
		// LOOK
		$look["average"]=$row["ALOOK"];
		$look["value"]=$row["LOOK"];
		$rating["look"]=$look;
		// ASSIGN TO COCKTAIL
		$cocktails[$row["COCKTAIL"]]["rating"]=$rating;
	}
}

if(isset($rec)){
	// QUERY ALL INGREDIENTS
	$query = "SELECT
	`id`, `name`, `description`, `unit`, `alcohol`,
	`cocktailid`, `amount`, `order`
	FROM
	`ingredient`,
	`recipe`
	WHERE ingredientid = id";
	if(isset($id)){
		$query .= " AND cocktailid=".$id;
	}
	$query .= " ORDER BY `order` ASC";
	$result = mysql_query($query, $link) or die(mysql_error());
	while ($row = mysql_fetch_array($result)){
		// BUILD INGREDIENT
		$ingredient = array();
		$ingredient["id"] = $row["id"];
		$ingredient["name"] = $row["name"];
		$ingredient["description"] = $row["description"];
		$ingredient["unit"] = $row["unit"];
		$ingredient["alcohol"] = $row["alcohol"];
		$ingredient["amount"] = $row["amount"];
		$ingredient["order"] = $row["order"];
		// ADD INGREDIENT TO COCKTAIL
		$cocktails[$row["cocktailid"]]["recipe"]
		[count($cocktails[$row["cocktailid"]]["recipe"])]=$ingredient;
	}
}

$finalresult["success"] = $CODE_SUCCESS;
$finalresult["data"] = $cocktails;

// ENCODE THE RESULT
echo json_encode($finalresult);
	
?>