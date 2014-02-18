<?php

function createDescription($cocktail, $maleRating, $femaleRating){
	$result = "";
	if($cocktail["rating"]["taste"]["value"]>.5){
		$result .= "Most users like this cocktail.<br/>They find ".$cocktail["name"]."<br/>";
	}else{
		$result .= "Most users find ".$cocktail["name"]."<br/>";
	}
	foreach($cocktail["rating"] as $key=>$value){
		if($key == "taste"){
			$result .= "tasty and ";
		}else if($key == "look"){
			$result .= "good looking and ";
		}else if($value["value"]>.5){
			$result .= $key." and ";
		}
	}
	$result .= "<br/>like to drink it ".$cocktail["events"][0]["tag"];
	return $result;
}

?>