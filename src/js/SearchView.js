Boris.SearchView = function() {
    var that = {},
		mainController,
		searchInput,
		searchSubmit,

    init = function() {
        console.log("search view init");
		
		mainController = Boris.MainController();
		$(mainController).on('searchresult', onSearchResult);
		
        $searchInput = $("#search-input");
        $searchSubmit = $("#search-submit");
		
		$searchSubmit.on('click', onSearchSubmitClick);
    },
	
	getSearchInput = function() {
		return $searchInput.val();
	},
	
	onSearchSubmitClick = function() {
		$(that).trigger('search', getSearchInput());
	},
	
	onSearchResult = function(result) {
		console.log("searchResult", result);	
		if(result.name && !result.ingredient) {
			//	Name & !Zutat
			console.log("Name & !Zutat");
			
		} else if(!result.name && result.ingredient) {
			//	!Name & Zutat
			console.log("!Name & Zutat");
			
		} else if(!result.name && !result.ingredient) {
			//	!Name & !Zutat
			console.log("!Name & !Zutat");
			
		} else if(result.name && result.ingredient) {
			//	Name & Zutat
			console.log("Name & Zutat");
			
		}
	};


    that.init = init;
	that.onSearchResult = onSearchResult;


    return that;
};