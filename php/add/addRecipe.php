<?php
	
// HEADER
header('Content-Type: application/json; charset=utf-8');
include("addAnything.php");

addOrUpdate("recipe","cocktailid");

?>