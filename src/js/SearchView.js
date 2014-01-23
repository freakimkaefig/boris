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
	        //console.log(result.ingredient);
	        var cocktailIdsToHide = new Array();
	        var tempArr = $.map(result.ingredient.data, function (value, index) {
	            //console.log("map", value, index);
	            return [parseInt(index)];
	        });
	        console.log("cocktailIds", result.numCocktails);
	        console.log("tempArr", tempArr);

	        //Prüfen, welche ID nicht in tempArr enthalten!!!

	        for (var i = 1; i <= result.numCocktails.length; i++) {
	            if (tempArr.indexOf(i) == -1) {
	                console.log("hide", i);
	            }
	        }

	        //console.log("hide", cocktailIdsToHide);
	        //hideCocktailsById();

	    } else if (!result.name && !result.ingredient) {
	        //	!Name & !Zutat
	        console.log("!Name & !Zutat");

	    } else if (result.name && result.ingredient) {
	        //	Name & Zutat
	        console.log("Name & Zutat");

	    }
	},

	hideCocktailsById = function (arrayIds) {

	};


    that.init = init;
    that.onSearchResult = onSearchResult;


    return that;
};