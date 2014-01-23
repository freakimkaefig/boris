Boris.DetailView = function () {
    var that = {},
		mainController,
		searchInput,
		searchSubmit,
        $allDrinks,
        similarDrinkIds,
        is_tablet = false,

    init = function () {
        console.log("detail view init");

        mainController = Boris.MainController();

        //Check if tablet
        if ($.cookie('tablet') == "true") {
            is_tablet = true;
            $('#rateDrink').hide(); //Hide "Rate" Button
            $('#orderDrink').show();    //Show "Order" Button
        }

        /*
        $(mainController).on('searchresult', onSearchResult);
        */
        //$searchInput = $("#search-input");

        //$searchSubmit.on('click', onSearchSubmitClick);
        //*/

        $rateDrinkBtn = $("#rateDrink");
        $rateDrinkBtn.on('click', onRateDrinkClick);

        $rateDrinkBtn = $("#rateDrink");
        $rateDrinkBtn.on('click', onRateDrinkClick);

        $confirmOrderDrinkBtn = $("#confirmOrderDrink");
        $confirmOrderDrinkBtn.on('click', onRateDrinkClick);

        $('#modal_confirmOrder').modal('hide');
    },

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
    },

    setSimilarDrinkIds = function (pSimilarDrinkIds) {
        similarDrinkIds = pSimilarDrinkIds;
        //console.log(allDrinks);
    },

    /*---Event Handlers---*/

    onRateDrinkClick = function () {
        //!!Give id
        goToQuestionnaire();
    },

    onConfirmOrderDrinkBtn = function () {
        orderDrink();
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

    goToQuestionnaire = function () {
        window.location = 'cocktail_rating.php';
    },

    confirmOrderDrink = function () {

    }

    orderDrink = function () {
        console.log("order drink");
        console.log("Cors: ", $.support.cors);

        $.ajax({

            // The 'type' property sets the HTTP method.
            // A value of 'PUT' or 'DELETE' will trigger a preflight request.
            type: 'POST',

            // The URL to make the request to.
            url: 'localhost:8009/',

            data: 'ORDER:wodka,80',

            // The 'contentType' property sets the 'Content-Type' header.
            // The JQuery default for this property is
            // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
            // a preflight. If you set this value to anything other than
            // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
            // you will trigger a preflight request.
            contentType: 'text/plain',

            xhrFields: {
                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                // This can be used to set the 'withCredentials' property.
                // Set the value to 'true' if you'd like to pass cookies to the server.
                // If this is enabled, your server must respond with the header
                // 'Access-Control-Allow-Credentials: true'.
                withCredentials: false
            },

            headers: {
                // Set any custom headers here.
                // If you set any non-simple headers, your server must include these
                // headers in the 'Access-Control-Allow-Headers' response header.
            },

            success: function (response) {
                // Here's where you handle a successful response.
                console.log("Success!", response);
            },

            error: function (xhr, ajaxOptions, thrownError) {
                // Here's where you handle an error response.
                // Note that if the error was due to a CORS issue,
                // this function will still fire, but there won't be any additional
                // information about the error.
                console.log("Error :(", xhr);
            }
        });
    },

    /*---Public variables and methods---*/
    that.init = init;
    that.renderSimilarDrinks = renderSimilarDrinks;
    that.setSimilarDrinkIds = setSimilarDrinkIds;
    that.setAllDrinks = setAllDrinks;

    return that;
};