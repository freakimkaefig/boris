Boris.DetailView = function () {
    var that = {},
		mainController,
        searchInput,
        searchSubmit,
        $allDrinks,
        similarDrinkIds,

    init = function () {
        console.log("detail view init");

        mainController = Boris.MainController();
        /*
        $(mainController).on('searchresult', onSearchResult);
        */
        //$searchInput = $("#search-input");

        //$searchSubmit.on('click', onSearchSubmitClick);
        //*/
        
        $rateDrinkBtn = $("#rateDrink");
        $rateDrinkBtn.on('click', onRateDrinkClick);

        $confirmOrderDrinkBtn = $("#confirmOrderDrink");
        $confirmOrderDrinkBtn.on('click', onRateDrinkClick);

        $('#modal_confirmOrder').modal('hide');
    };
    
    //Get similar drinks and render them
    renderSimilarDrinks = function () {
    console.log("renderSimilarDrinks");
    console.log($allDrinks);

    //var count = $allDrinks.size();
    var count = Object.keys($allDrinks).length;
    var gridRatio = 0;

    //Calculate which ratio for the columns has to be used, dependent from the number of similar cocktails
    if (count <= 1) { gridRatio = 12; }
    else if (count == 2) { gridRatio = 6; }
    else { gridRatio = 4; }

    //Loop through similar drinks, max. 3 times and insert them into the belonging template
    //for (var i = 0; i < count && i < 3; i++) {
    for (var i = 0; i < 3 && i < count; i++) {
    var similarDrinkId = similarDrinkIds[i];
    var similarDrink = $allDrinks[similarDrinkId];

    var drinkName = similarDrink.name; //<?php //$allCocktails[similar[i]]->name array_search ?>
    var drinkImgSrc = "drink_example1.jpg"; //similarDrink.image;
    var drinkRating = similarDrink.rating.taste.average;

    $("#similar_drinks").append(
    '<a href="drink_detail.php?id=' + similarDrinkId + '"><div class="col-xs-' + gridRatio + ' text-center">' +
    '<img src="img/' + drinkImgSrc + '" alt="' + drinkName + '" class="img-responsive center-block" />' +
    renderRating() + "<br />" +
    '<strong>' + drinkName + '</strong>' +
    '</div></a>');
    };
    },
    
    setAllDrinks = function (pAllDrinks) {
        $allDrinks = pAllDrinks;
        //console.log(allDrinks);
    }
    
    setSimilarDrinkIds = function (pSimilarDrinkIds) {
        similarDrinkIds = pSimilarDrinkIds;
        //console.log(allDrinks);
    },
    
    /*---Event Handlers---*/
    
    onRateDrinkClick = function (drinkId) {
        //!!Give id
        goToQuestionnaire(drinkId);
    },

    onConfirmOrderDrinkBtn = function () {
    },
    
    /*---Methods---*/
    
    renderRating = function (ratingCount) {
        //Round rating
        ratingCount = Math.round(ratingCount);

        var filledContent = '<div class="glyphicon glyphicon-star"></div>';
        var emptyContent = '<div class="glyphicon glyphicon-star-empty"></div>';

        var renderedResult = "";

        //Render
        for (var i = 1; i <= 5; i++) {
        if (i <= ratingCount) { renderedResult += filledContent; }
        else { renderedResult += emptyContent; }
        }
        return renderedResult;
    },

    goToQuestionnaire = function (drinkId) {
        window.location = 'cocktail_rating.php?id=' + drinkId;
    },

    confirmOrderDrink = function () {

    };
    
    /*---Public variables and methods---*/
    that.init = init;
    that.renderSimilarDrinks = renderSimilarDrinks;
    that.setSimilarDrinkIds = setSimilarDrinkIds;
    that.setAllDrinks = setAllDrinks;

    return that;
};