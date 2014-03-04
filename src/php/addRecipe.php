<?php

error_reporting(0);	
echo '{ "success" : '.$CODE_PERMISSION_DENIED.'}';
exit();
	
// HEADER
header('Content-Type: application/json; charset=utf-8');
include("addAnything.php");

addOrUpdate("recipe","cocktailid");

?>