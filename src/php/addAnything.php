<?php
	
error_reporting(0);
echo '{ "success" : '.$CODE_PERMISSION_DENIED.'}';
exit();
	
function addOrUpdate($table, $idName){
if(!isset($table)||!isset($idName))return;

// HEADER
include("config.php");
$link = mysql_connect($sqllocation , $sqluser , $sqlpwd ) or die('Couldnt connect to database');
mysql_select_db($sqldb, $link) or die(mysql_error());
mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $link);
// END HEADER

$id = -1;

if(isset($_GET[$idName]))$id=mysql_real_escape_string($_GET[$idName]);

if($id==-1){

$fields = "";
$values = "";

foreach($_GET as $key=>$value){
	$fields .= "`".mysql_real_escape_string($key)."`,";
	if(is_numeric($value)){
		$values .= mysql_real_escape_string($value).",";
	}else{
		$values .= "'".mysql_real_escape_string($value)."',";
	}
}

$fields = rtrim($fields, ",");
$values = rtrim($values, ",");

// ADD NEW ITEM
$query = "INSERT INTO `$table` ($fields) VALUES ($values)";

}else{

// UPDATE TABLE
$query = "UPDATE `$table` SET ";
foreach($_GET as $key=>$value){
	if($key!=$idName){
		$query .= "`".mysql_real_escape_string($key)."`=";
		if(is_numeric($value)){
			$query .= mysql_real_escape_string($value).",";
		}else{
			$query .= "'".mysql_real_escape_string($value)."',";
		}
	}
}
$query = rtrim($query,",");
$query.=" WHERE `id`=".mysql_real_escape_string($id);

}

echo $query;

mysql_query($query, $link) or die(mysql_error());

}
?>