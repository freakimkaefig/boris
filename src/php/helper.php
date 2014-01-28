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
    
    function calcAlcPercentage($recipe) {
        //amount * alcohol
        $alcoholPercentage = 0.0;
        
        foreach($recipe as $ingredient)
        {
            //echo $ingredient->alcohol;
            $alcoholPercentage += $ingredient->alcohol * $ingredient->amount;
        }
        
        //$alcoholPercentage = 0.6 * 40 + 0.2 * 25;
        echo $alcoholPercentage;
    }
?>