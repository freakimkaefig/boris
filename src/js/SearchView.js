Boris.SearchView = function () {
    var that = {},
		mainController,
        $drinklist,
		$searchInput,
		$searchSubmit,
        $searchOutput,
        $searchOutputText,
        $searchOutputClose,

    init = function () {
        console.log("search view init");

        mainController = Boris.MainController();
        $(mainController).on('searchresult', onSearchResult);

        mainModel = Boris.MainModel();
        drinkModel = Boris.DrinkModel();

        $drinklist = $('.drink-list-container');

        $searchInput = $("#search-input");
        $searchSubmit = $("#search-submit");

        $searchSubmit.on('click', onSearchSubmitClick);
        $searchInput.on('keypress', function (e) {
            if (e.which == 13) {
                $searchSubmit.click();
            }
        });

        $searchOutput = $('#search-output');
        $searchOutputText = $('#search-output .output-line #output');
        $searchOutputClose = $('#search-output .output-line #close');
        $searchOutputClose.on('click', onSearchOutputClose);
    },

	getSearchInput = function () {
	    return $searchInput.val();
	},

	onSearchSubmitClick = function () {
	    $(that).trigger('search', getSearchInput());
	},

    onSearchOutputClose = function () {
        $searchOutput.fadeOut(300);
        $searchOutputText.text("");
        reshowAllCocktails();
    },

    onSearchResult = function (result) {
        console.log("searchResult", result);

        $searchOutputText.text(getSearchInput());
        $searchOutput.fadeIn(300);

        if (result.name && !result.ingredient) {
            //	Name & !Zutat
            console.log("Name & !Zutat");
            //console.log("search name id", result.name.data);
            hideCocktailsById(getCocktailsWithoutSearchedName(result.numCocktails, result.name.data));
        } else if (!result.name && result.ingredient) {
            //	!Name & Zutat
            console.log("!Name & Zutat");
            hideCocktailsById(getCocktailsWithoutSearchedIngredient(result.numCocktails, result.ingredient.data));
        } else if (!result.name && !result.ingredient) {
            //	!Name & !Zutat
            console.log("!Name & !Zutat");
            hideAllCocktails();
            $drinklist.append("<div class='no-results'>Sorry, no results for <i>'" + getSearchInput() + "'</i></div>");
        } else if (result.name && result.ingredient) {
            //	Name & Zutat
            console.log("Name & Zutat");
            hideCocktailsById(combinedSearch(result.numCocktails, result.name.data, result.ingredient.data));
        }


    },

    getCocktailsWithoutSearchedName = function (allIds, resultObject) {
        var cocktailIdsToHide = new Array();
        var tempArr = $.map(resultObject, function (value, index) {
            //console.log("map", value, index);
            return [parseInt(index)];
        });
        //Prüfen, welche ID nicht in tempArr enthalten!!!
        for (var i = 1; i <= allIds.length; i++) {
            if (tempArr.indexOf(i) == -1) {
                //console.log("hide", i);
                cocktailIdsToHide.push(i);
            }
        }
        return cocktailIdsToHide;
    },

    getCocktailsWithoutSearchedIngredient = function (allIds, resultObject) {
        var cocktailIdsToHide = new Array();
        var tempArr = $.map(resultObject, function (value, index) {
            //console.log("map", value, index);
            return [parseInt(index)];
        });
        //Prüfen, welche ID nicht in tempArr enthalten!!!
        for (var i = 1; i <= allIds.length; i++) {
            if (tempArr.indexOf(i) == -1) {
                //console.log("hide", i);
                cocktailIdsToHide.push(i);
            }
        }
        return cocktailIdsToHide;
    },

    combinedSearch = function (allIds, nameArray, ingredientArray) {
        var cocktailIdsToHide = new Array();
        var tempArr1 = $.map(nameArray, function (value, index) {
            //console.log("map", value, index);
            return [parseInt(index)];
        });
        var tempArr2 = $.map(ingredientArray, function (value, index) {
            //console.log("map", value, index);
            return [parseInt(index)];
        });

        for (var i = 1; i <= allIds.length; i++) {
            if (tempArr1.indexOf(i) == -1 && tempArr2.indexOf(i) == -1) {
                cocktailIdsToHide.push(i);
            }
        }
        return cocktailIdsToHide;
    },

    hideCocktailsById = function (arrayIds) {
        console.log("hide", arrayIds);

        reshowAllCocktails();

        for (var i = 0; i < arrayIds.length; i++) {
            $('.drink-list-container .row.row-' + arrayIds[i]).parent().fadeOut(300);
        }
    },

    hideAllCocktails = function () {
        $('.drink-list-container .row').parent().fadeOut(300);
    };

    reshowAllCocktails = function () {
        /*var rows = $('.drink-list-container .row').not('.row-1');*/
        $('.drink-list-container .row').not('.row-1').parent().fadeIn(300);
    },

    checkAvailability = function () {
        mainController.checkAvailability();
        /*
        console.log("reshow");
        var inavailableDrinks = new Array();
        inavailableDrinks.push(1);
        inavailableDrinks.push(2);
        inavailableDrinks.push(3);

        var cocktails = drinkModel.getAllDrinks();
        console.log("SearhcView: cocktails: ", cocktails);

        hideCocktailsById(inavailableDrinks);
        */
    };

    that.init = init;
    that.onSearchResult = onSearchResult;
    that.hideCocktailsById = hideCocktailsById;
    that.reshowAllCocktails = reshowAllCocktails;


    return that;
};