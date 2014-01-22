<?php

/*
*	PARAMETERS:
*		USERID		unique id to identify each user
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
	function renderRating($ratingCount, $ratingMax, $filledContent, $emptyContent) { 
        for($i=1;$i<=5;$i++)
        {
            if($i <=  $ratingCount) { print($filledContent); }
            else { print($emptyContent); }
        }
    }
?>