<?php

/*
*	PARAMETERS:
*		USERID		unique id to identify each user (-1 if you dont have a userid yet)
*		AGE			age of the user
*		SEX			gender of the user
*		COCKTAIL	id of the cocktail rated
*		BITTER		bitterness (1-5)
*		SWEET		sweetness (1-5)
*		FRUITY		fruityness (1-5)
*		STRONG		strength (1-5)
*		TASTE		overall rating (1-5)
*		LOOK		look of the cocktail (1-5)
*	OPTIONAL PARAMETERS:
*		all the location/event tags as GET-Parameter
*		named as follows:
*
*		beach, businessparty, statnight, wedding, cocktailbar,
*		dinner, couch, preparty, date, disco, party, summernight,
*		winternight, never
*
*		It doesnt matter whats the value of those parameters
*		as long as theyre set!!!
*	RESULT: successcode
*
*	EXAMPLE:
	
	rate.php?userid=123&age=22&sex=w&cocktail=11&bitter=1&sweet=4&fruity=4&strong=2&taste=4&look=3&beach&summernight&cocktailbar
	
	{ "success" : 1 }

*/
	
// HEADER
header('Content-Type: application/json; charset=utf-8');
error_reporting(0);
include("config.php");
// END HEADER


// PREPARE RESULT
$json = array();
$json["success"]=$CODE_INSUFFICIENT_PARAMETERS;

// GET REQUIRED PARAMETERS
if(isset($_GET["userid"])){
	$userid = mysql_real_escape_string($_GET["userid"]);
}else{
	$json["message"] = "id (userid) missing";
	echo json_encode($json);
	exit();
}
if(isset($_GET["age"])){
	$age = mysql_real_escape_string($_GET["age"]);
}else{
	$json["message"] = "user age (age) missing";
	echo json_encode($json);
	exit();
}
if(isset($_GET["sex"])){
	$sex = mysql_real_escape_string($_GET["sex"]);
}else{
	$json["message"] = "user gender (sex) missing";
	echo json_encode($json);
	exit();
}
if(isset($_GET["cocktail"])){
	$cocktail = mysql_real_escape_string($_GET["cocktail"]);
}else{
	$json["message"] = "cocktail id (cocktail) missing";
	echo json_encode($json);
	exit();
}
if(isset($_GET["bitter"])){
	$bitter = mysql_real_escape_string($_GET["bitter"]);
}else{
	$json["message"] = "bitter rating (bitter) missing";
	echo json_encode($json);
	exit();
}
if(isset($_GET["sweet"])){
	$sweet = mysql_real_escape_string($_GET["sweet"]);
}else{
	$json["message"] = "sweet rating (sweet) missing";
	echo json_encode($json);
	exit();
}
if(isset($_GET["fruity"])){
	$fruity = mysql_real_escape_string($_GET["fruity"]);
}else{
	$json["message"] = "fruity rating (fruity) missing";
	echo json_encode($json);
	exit();
}
if(isset($_GET["strong"])){
	$strong = mysql_real_escape_string($_GET["strong"]);
}else{
	$json["message"] = "strength rating (strong) missing";
	echo json_encode($json);
	exit();
}
if(isset($_GET["taste"])){
	$taste = mysql_real_escape_string($_GET["taste"]);
}else{
	$json["message"] = "taste rating (taste) missing";
	echo json_encode($json);
	exit();
}
if(isset($_GET["look"])){
	$look = mysql_real_escape_string($_GET["look"]);
}else{
	$json["message"] = "look rating (look) missing";
	echo json_encode($json);
	exit();
}
$json["success"]=$CODE_ERROR;

// GET OPTIONAL PARAMETERS
if(isset($_GET["beach"])){
	$beach = "1";
}else{
	$beach = "0";
}
if(isset($_GET["businessparty"])){
	$businessparty = "1";
}else{
	$businessparty = "0";
}
if(isset($_GET["statnight"])){
	$statnight = "1";
}else{
	$statnight = "0";
}
if(isset($_GET["wedding"])){
	$wedding = "1";
}else{
	$wedding = "0";
}
if(isset($_GET["cocktailbar"])){
	$cocktailbar = "1";
}else{
	$cocktailbar = "0";
}
if(isset($_GET["dinner"])){
	$dinner = "1";
}else{
	$dinner = "0";
}
if(isset($_GET["couch"])){
	$couch = "1";
}else{
	$couch = "0";
}
if(isset($_GET["preparty"])){
	$preparty = "1";
}else{
	$preparty = "0";
}
if(isset($_GET["date"])){
	$date = "1";
}else{
	$date = "0";
}
if(isset($_GET["disco"])){
	$disco = "1";
}else{
	$disco = "0";
}
if(isset($_GET["party"])){
	$party = "1";
}else{
	$party = "0";
}
if(isset($_GET["summernight"])){
	$summernight = "1";
}else{
	$summernight = "0";
}
if(isset($_GET["winternight"])){
	$winternight = "1";
}else{
	$winternight = "0";
}
if(isset($_GET["never"])){
	$never = "1";
}else{
	$never = "0";
}

// DB Connection
$link = mysql_connect($sqllocation , $sqluser , $sqlpwd ) or die('Couldnt connect to database');
mysql_select_db($sqldb, $link) or die('Couldnt select database: ' . mysql_error());
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);

if($userid == -1){
	// get new user id
	$query = "SELECT MAX(USER) FROM `rating` WHERE 1";
	$result = mysql_query($query, $link) or die(mysql_error());
	if($row = mysql_fetch_array($result)){
		$userid=$row[0]+1;
	}else{
		$userid = 0;
	}
}

// INSERT OR UPDATE IF RATING OF THAT COCKTAIL FROM THAT USER ALREADY EXISTS
$query = "INSERT INTO `rating` (
`USER`,
`AGE`,
`SEX`,
`COCKTAIL`,
`BITTER`,
`SWEET`,
`FRUITY`,
`STRONG`,
`TASTE`,
`LOOK`,
`AM_STRAND`,
`FIRMENFEIER`,
`JUNGGESELLENABSCHIED`,
`HOCHZEIT`,
`COCKTAILBAR`,
`NACH_DEM_ESSEN`,
`AUF_DEM_SOFA`,
`VORGLUEHEN`,
`ERSTES_DATE`,
`DISCO`,
`WG_PARTY`,
`SOMMERABEND`,
`WINTERABEND`,
`NIE`)
VALUES
($userid,
$age,
'$sex',
$cocktail,
$bitter,
$sweet,
$fruity,
$strong,
$taste,
$look,
$beach, $businessparty, $statnight, $wedding, $cocktailbar,
$dinner, $couch, $preparty, $date, $disco, $party, $summernight,
$winternight, $never)
ON DUPLICATE KEY UPDATE
`AGE`=$age,
`SEX`='$sex',
`BITTER`=$bitter,
`SWEET`=$sweet,
`FRUITY`=$fruity,
`STRONG`=$strong,
`TASTE`=$taste,
`LOOK`=$look,
`AM_STRAND`=$beach,
`FIRMENFEIER`=$businessparty,
`JUNGGESELLENABSCHIED`=$statnight,
`HOCHZEIT`=$wedding,
`COCKTAILBAR`=$cocktailbar,
`NACH_DEM_ESSEN`=$dinner,
`AUF_DEM_SOFA`=$couch,
`VORGLUEHEN`=$preparty,
`ERSTES_DATE`=$date,
`DISCO`=$disco,
`WG_PARTY`=$party,
`SOMMERABEND`=$summernight,
`WINTERABEND`=$winternight,
`NIE`=$never";

mysql_query($query, $link) or die(mysql_error());

$json["userid"]=$userid;
$json["success"]=$CODE_SUCCESS;
echo json_encode($json);
	
?>