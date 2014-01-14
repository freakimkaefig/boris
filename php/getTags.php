<?php

/*
*	PARAMETERS: NONE
*	RESULT: list of tags by cocktails and distinct
*
*	EXAMPLE:
	
{
	"success" : 1,
	"data" : {
		"tags" : [{
				"cocktailid" : "1",
				"tag" : "strong"
			}, {
				"cocktailid" : "1",
				"tag" : "sweet"
			}
		],
		"distincttags" : ["strong", "sweet"]
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

// QUERY ALL TAGS AND COCKTAILS
$query = "SELECT * FROM `tags`";
$result = mysql_query($query, $link) or die(mysql_error());
$tags = array();
while ($row = mysql_fetch_array($result)){
	$tag = array();
	$tag["cocktailid"] = $row["cocktailid"];
	$tag["tag"] = $row["tag"];
	$tags[count($tags)] = $tag;
}

// QUERY ALL DISTINCT TAGS
$query = "SELECT DISTINCT `tag` FROM `tags`";
$result = mysql_query($query, $link) or die(mysql_error());
$distincttags = array();
while ($row = mysql_fetch_array($result)){
	$tag = array();
	$distincttags[count($distincttags)] = $row["tag"];
}

// ENCODE THE RESULT
$jsonresult = array();
$jsonresult["tags"] = $tags;
$jsonresult["distincttags"] = $distincttags;

$finalresult["success"] = $CODE_SUCCESS;
$finalresult["data"] = $jsonresult;

echo json_encode($finalresult);
	
?>