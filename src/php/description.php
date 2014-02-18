<?php

$LIMIT = .1;

function createDescription($cocktail, $maleRating, $femaleRating){
	$sex = getSex($cocktail, $maleRating, $femaleRating);
	if($sex == "everyone"){
		$sex = "";
	}else{
		$sex = ", popular by ".$sex.",";
	}
	$special = getSpecial($cocktail);
	$ingredients = getIngredients($cocktail);
	return createOldDescription($cocktail)."<br/><br/>This$special Cocktail$sex is mostly made of ".$ingredients.".";
}

function getSex($cocktail, $maleRating, $femaleRating){
	global $LIMIT;
	if(isset($maleRating)&&isset($femaleRating)){
		if($maleRating["TASTE"]-$LIMIT>=$femaleRating["TASTE"]){
			return "men";
		}else if($femaleRating["TASTE"]-$LIMIT>=$maleRating["TASTE"]){
			return "women";
		}
	}
	return "everyone";
}

function getIngredients($cocktail){
	global $LIMIT;
	if(!isset($cocktail["recipe"])){
		return "the ingredients displayed on top of the page";
	}
	$ingredients = $cocktail["recipe"];
	usort($ingredients, "sortByAmount");
	if($ingredients[0]["amount"]-$LIMIT){
		return $ingredients[0]["name"]." and ".$ingredients[1]["name"];
	}else{
		return $ingredients[0]["name"];
	}
}

function getSpecial($cocktail){
	global $LIMIT;
	$ratings = $cocktail["rating"];
	foreach($ratings as $key=>$value){
		$ratings[$key]["name"]=$key;
	}
	usort($ratings,"sortByValue");
	$rDiff = $ratings[0]["value"]-$ratings[1]["value"];
	if($rDiff >= $LIMIT){
		$key = $ratings[0]["name"];
		if($key == "taste"){
			return " especially tasty";
		}else if($key == "look"){
			return " especially good looking";
		}else if($value["value"]>.5){
			return " especially ".$key;
		}
	}
	return "";
}

function createOldDescription($cocktail){
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

function createRecipeDescription($cocktail){
	$result = "To create 0.4l of ".$cocktail["name"]." follow these steps:<ul>";
	foreach($cocktail["recipe"] as $key=>$value){
		$name = $value["name"];
		$amount = floor(40*$value["amount"]).$value["unit"];
		$result .= "<li>Add $amount $name</li>";
	}
	$result .= "</ul>";
	return $result;
}

/**
Dieser <männliche> Cocktail...
Dieser besonders <starke> Cocktail...
Auffällig viele <Frauen> mochten diesen Cocktail.
Am liebsten wird dieser Cocktail @<Event> getrunken.
Diesem Cocktail sagt man nach, dass er besonders <süß> ist.
Für <Event> ist dieser Cocktail zu empfehlen.
Falls Sie auf <süße> Cocktails stehen ist dieser Cocktail definitiv etwas für sie.
Wenn Sie <Zutat> mögen -> alles gut!
**/

function sortByValue($a,$b){
	$result = $a["value"]-$b["value"];
	return $result==0?0:($result>0?-1:1);
}

function sortByAmount($a,$b){
	$result = $a["amount"]-$b["amount"];
	return $result==0?0:($result>0?-1:1);
}

?>