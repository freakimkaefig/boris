<?php
	
echo '{ "success" : '.$CODE_PERMISSION_DENIED.'}';
exit();
	
// HEADER
header('Content-Type: application/json; charset=utf-8');
include("addAnything.php");

addOrUpdate("ingredient","id");

?>