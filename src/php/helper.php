<?php
    /*  Render presentation of rating with, e.g. as filled and empty stars
        PARAMETERS: 
            ratingCount     - rating (can be decimal value)
            ratingMax       - count of maximum rating
            filledContent   - content for filled representation, e.g. <div>..</div>
            emptyContent     - content for empty representation, e.g. <div>..</div>
    */
    function renderRating($ratingCount, $ratingMax, $filledContent, $emptyContent) { 
        //Round rating
        $ratingCount = round($ratingCount, 0, PHP_ROUND_HALF_UP);
        //Render
        for($i=1;$i<=$ratingMax;$i++)
        {
            if($i <=  $ratingCount) { print($filledContent); }
            else { print($emptyContent); }
        }
    }
    
    /* Calculate how much alcohol is in the drink at all*/
    function calcAlcPercentage($recipe) {
        $alcoholPercentage = 0.0;
        
        foreach($recipe as $ingredient)
        {
            $alcoholPercentage += $ingredient->alcohol * $ingredient->amount;
        }
        echo $alcoholPercentage;
    }
    
    /* Calculate which taste types are over 50% and show their icons */
    function renderStrongTastes($cocktail) {
    
        $rating = $cocktail->rating;    
        $resultingIcons = "";
        
        if(isset($rating->sour) && isset($rating->sour->average) &&  $rating->sour->average > 2.5) 
            $resultingIcons =  $resultingIcons .  "<img src='img/sour0.png' class='attribute-rating' alt='Sour' title='Sour'/>";
        if(isset($rating->sweet) && isset($rating->sweet->average) &&  $rating->sweet->average > 2.5) 
            $resultingIcons =  $resultingIcons .  "<img src='img/sweet0.png' class='attribute-rating' alt='Sweet' title='Sweet'/>";
        if(isset($rating->bitter) && isset($rating->bitter->average) &&  $rating->bitter->average > 2.5) 
            $resultingIcons =  $resultingIcons .  "<img src='img/bitter0.png' class='attribute-rating' alt='Bitter' title='Bitter'/>";
        if(isset($rating->fruity) && isset($rating->fruity->average) &&  $rating->fruity->average > 2.5) 
            $resultingIcons =  $resultingIcons .  "<img src='img/fruity0.png' class='attribute-rating' alt='Fruity' title='Fruity'/>";
        
        echo $resultingIcons;
    }
?>