Boris.SearchView = function () {
    var that = {},
		mainController,
		searchInput,
		searchSubmit,

    init = function () {
        console.log("search view init");

        mainController = Boris.MainController();
        $(mainController).on('searchresult', onSearchResult);

        $searchInput = $("#search-input");
        $searchSubmit = $("#search-submit");

        $searchSubmit.on('click', onSearchSubmitClick);
    },

	getSearchInput = function () {
	    return $searchInput.val();
	},

	onSearchSubmitClick = function () {
	    $(that).trigger('search', getSearchInput());
	},

	onSearchResult = function (result) {
	    console.log("searchResult", result);

	    if (result.name && !result.ingredient) {
	        //	Name & !Zutat
	        console.log("Name & !Zutat");
	    } else if (!result.name && result.ingredient) {
	        //	!Name & Zutat
	        console.log("!Name & Zutat");
	        hideCocktailsById(getCocktailsWithoutSearchedIngredient(result.numCocktails, result.ingredient.data));
	    } else if (!result.name && !result.ingredient) {
	        //	!Name & !Zutat
	        console.log("!Name & !Zutat");
	    } else if (result.name && result.ingredient) {
	        //	Name & Zutat
	        console.log("Name & Zutat");
	        hideCocktailsById(getCocktailsWithoutSearchedIngredient(result.numCocktails, result.ingredient.data));
	    }
	},

    getCocktailsWithoutSearchedName = function () {
        
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

	hideCocktailsById = function (arrayIds) {
	    console.log("hide", arrayIds);

	    for (var i = 0; i < arrayIds.length; i++) {
	        $('.drink-list-container .row.row-' + i).parent().hide();
	    }
	},

    reshowAllCocktails = function () {
        $('.drink-list-container .row').parent().show();
    };


    that.init = init;
    that.onSearchResult = onSearchResult;


    return that;
};