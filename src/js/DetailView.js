Boris.DetailView = function () {
    var that = {},
		mainController,
        drinkModel,
        searchInput,
        searchSubmit,
        similarDrinkIds,
        is_tablet = false,
        alcPercentage,
        borisModel,

    init = function (pDrinkModel, pBorisModel) {
        console.log("detail view init");

        mainController = Boris.MainController();
        drinkModel = pDrinkModel;
        borisModel = pBorisModel;

        $borisModel = $(Boris.BorisModel);

        //Check if tablet
        if ($.cookie('tablet') == "true") {
            is_tablet = true;
            $('#rateDrink').hide(); //Hide "Rate" Button
            //$('#orderDrink').show();    //Show "Order" Button
        } else {
            is_tablet = false;
            $('#rateDrink').show(); //Hide "Rate" Button
            $('#orderDrink').hide();    //Show "Order" Button
        }

        $rateDrinkBtn = $("#rateDrink");
        $rateDrinkBtn.on('click', onRateDrinkClick);

        $orderDrinkBtn = $("#orderDrink");

        $confirmOrderDrinkBtn = $("#confirmOrderDrink");
        $confirmOrderDrinkBtn.on('click', onConfirmOrderDrinkBtn);

        $('#modal_confirmOrder').modal('hide');

        $borisModel.on("setMixStatus", onSetMixStatus);
        $borisModel.on("setDrinkStatus", onCheckedAvailability);
    },

    setDrink = function (drink) {
        currentDrink = drink;
    },

    //Get similar drinks and render them
    renderSimilarDrinks = function () {
        console.log("renderSimilarDrinks");

        //var count = Object.keys($allDrinks).length;
        var count = Object.keys(drinkModel.getAllDrinks()).length;
        var gridRatio = 0;

        //Calculate which ratio for the columns has to be used, dependent from the number of similar cocktails
        if (count <= 1) { gridRatio = 12; }
        else if (count == 2) { gridRatio = 6; }
        else { gridRatio = 4; }

        //Loop through similar drinks, max. 3 times and insert them into the belonging template
        for (var i = 0; i < 3 && i < count; i++) {
            var similarDrinkId = drinkModel.getSimilarIds()[i];
            var similarDrink = drinkModel.getAllDrinks()[similarDrinkId];

            var drinkName = similarDrink.name;
            var drinkImgSrc = "drink_example1.jpg"; //!!similarDrink.image;
            var drinkRating = similarDrink.rating.taste.average;

            $("#similar_drinks").append(
                '<a href="drink_detail.php?id=' + similarDrinkId + '"><div class="col-xs-' + gridRatio + ' text-center">' +
                '<img src="img/' + drinkImgSrc + '" alt="' + drinkName + '" class="img-responsive center-block" />' +
                renderRating(similarDrink.rating.taste.average) + "<br />" +
                '<strong>' + drinkName + '</strong>' +
                '</div></a>');
        };
    },

    /*---Event Handlers---*/

    onRateDrinkClick = function () {
        goToQuestionnaire();
    },

    onConfirmOrderDrinkBtn = function (drinkId) {
        confirmOrderDrink();
        $('#modal_confirmOrder').modal('hide');
    },

    onSetMixStatus = function (event, text) {
        console.log("onSetMixStatus{0}{1}", event, event);
        updateStatusVisibility(true);
        updateStatusContent();
    },

    onCheckedAvailability = function (drink, status) {
        console.log("onCheckedAvailability, status: ", status);
        if (status == 0) {
            $orderDrinkBtn.show();
            $orderDrinkBtn.prop('disabled', true);
            $("#orderHint").text("Insufficient ingredients");
        }
        else {
            $orderDrinkBtn.show();
        }
    },

    /*---Methods---*/

    checkAvailability = function () {
        mainController.checkAvailability(drinkModel.getDrink());
    },

    renderRating = function (rating) {
        //Round rating
        roundedRating = Math.round(rating);

        var filledContent = '<div class="glyphicon glyphicon-star"></div>';
        var emptyContent = '<div class="glyphicon glyphicon-star-empty"></div>';

        var renderedResult = "";

        //Render
        for (var i = 1; i <= 5; i++) {
            if (i <= roundedRating) { renderedResult += filledContent; }
            else { renderedResult += emptyContent; }
        }
        return renderedResult;
    },

    goToQuestionnaire = function () {
        window.location = 'cocktail_rating.php?id=' + drinkModel.getDrinkId();
    },

    calculatePostData = function (drinId) {

    },

    confirmOrderDrink = function () {
        mainController.orderDrink(drinkModel.getDrink());
    },

    updateStatusVisibility = function (isVisible) {
        var box = $("#mixStatusBox");

        if (isVisible == true) $("#mixStatusBox").show();
        else $("#mixStatusBox").hide();
    },

    updateStatusContent = function () {
        var box = $("#mixStatusValue");
        console.log("DetailView: getMixStatus", borisModel.getMixStatus());
        box.html(borisModel.getMixStatus());
    };

    /*---Public variables and methods---*/
    that.init = init;
    that.renderSimilarDrinks = renderSimilarDrinks;
    that.checkAvailability = checkAvailability;

    return that;
};