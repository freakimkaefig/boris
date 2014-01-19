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

	// FUNCTION TO SORT EVENTS
	function eventsort($a, $b){
		if ($a["value"] == $b["value"]) {
			return 0;
		}
		return ($a["value"] > $b["value"]) ? -1 : 1;
	}

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
	AVG(LOOK) AS ALOOK,
	SUM(`AM_STRAND`)/COUNT(*) AS beach,
	SUM(`FIRMENFEIER`)/COUNT(*) AS businessparty,
	SUM(`JUNGGESELLENABSCHIED`)/COUNT(*) AS statnight,
	SUM(`HOCHZEIT`)/COUNT(*) AS wedding,
	SUM(`COCKTAILBAR`)/COUNT(*) AS cocktailbar,
	SUM(`NACH_DEM_ESSEN`)/COUNT(*) AS afterdinner,
	SUM(`AUF_DEM_SOFA`)/COUNT(*) AS onthecouch,
	SUM(`VORGLUEHEN`)/COUNT(*) AS preparty,
	SUM(`ERSTES_DATE`)/COUNT(*) AS firstdate,
	SUM(`DISCO`)/COUNT(*) AS disco,
	SUM(`WG_PARTY`)/COUNT(*) AS wgparty,
	SUM(`SOMMERABEND`)/COUNT(*) AS summernight,
	SUM(`WINTERABEND`)/COUNT(*) AS winternight,
	SUM(`NIE`)/COUNT(*) AS never
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
		// GET THE EVENTS/LOCATIONS
		$events = array();
		// ON THE BEACH
		$beach = array();
		$beach["tag"]="on the beach";
		$beach["value"]=$row["beach"];
		$events[count($events)]=$beach;
		// BUSINESSPARTY
		$bparty = array();
		$bparty["tag"]="at a businessparty";
		$bparty["value"]=$row["businessparty"];
		$events[count($events)]=$bparty;
		// STATNIGHT
		$statnight = array();
		$statnight["tag"]="at a statnight";
		$statnight["value"]=$row["statnight"];
		$events[count($events)]=$statnight;
		// WEDDING
		$wedding = array();
		$wedding["tag"]="at a wedding";
		$wedding["value"]=$row["wedding"];
		$events[count($events)]=$wedding;
		// COCKTAILBAR
		$cocktailbar = array();
		$cocktailbar["tag"]="at a cocktailbar";
		$cocktailbar["value"]=$row["cocktailbar"];
		$events[count($events)]=$cocktailbar;
		// AFTER DINNER
		$dinner = array();
		$dinner["tag"]="after dinner";
		$dinner["value"]=$row["afterdinner"];
		$events[count($events)]=$dinner;
		// ONTHECOUCH
		$onthecouch = array();
		$onthecouch["tag"]="on the couch";
		$onthecouch["value"]=$row["onthecouch"];
		$events[count($events)]=$onthecouch;
		// PREPARTY
		$preparty = array();
		$preparty["tag"]="at a preparty";
		$preparty["value"]=$row["preparty"];
		$events[count($events)]=$preparty;
		// FIRSTDATE
		$firstdate = array();
		$firstdate["tag"]="on the first date";
		$firstdate["value"]=$row["firstdate"];
		$events[count($events)]=$firstdate;
		// DISCO
		$disco = array();
		$disco["tag"]="in a disco";
		$disco["value"]=$row["disco"];
		$events[count($events)]=$disco;
		// WG PARTY
		$wgparty = array();
		$wgparty["tag"]="at a home party";
		$wgparty["value"]=$row["wgparty"];
		$events[count($events)]=$wgparty;
		// SUMMERNIGHT
		$summernight = array();
		$summernight["tag"]="on a summernight";
		$summernight["value"]=$row["summernight"];
		$events[count($events)]=$summernight;
		// WINTERNIGHT
		$winternight = array();
		$winternight["tag"]="on a winternight";
		$winternight["value"]=$row["winternight"];
		$events[count($events)]=$winternight;
		// NEVER
		$never = array();
		$never["tag"]="never";
		$never["value"]=$row["never"];
		$events[count($events)]=$never;
		// ASSIGN RATING TO COCKTAIL
		$cocktails[$row["COCKTAIL"]]["rating"]=$rating;
		// ASSIGN EVENTS TO COCKTAIL
		usort($events,"eventsort");
		$cocktails[$row["COCKTAIL"]]["events"]=$events;
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