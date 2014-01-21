Boris.SearchView = function() {
    var that = {},
		searchInput,
		searchSubmit,

    init = function() {
        console.log("search view init");
        $searchInput = $("#search-input");
        $searchSubmit = $("#search-submit");
		
		$searchSubmit.on('click', onSearchSubmitClick);
    },
	
	getSearchInput = function() {
		return $searchInput.val();
	},
	
	onSearchSubmitClick = function() {
		//console.log("search", getSearchInput());
		
		//Trigger Search Clicked -> Übergebe Wert aus eingabefeld
		//Controller registriert sich am event und stellt beide anfragen (name, ingredient)
	};


    that.init = init;


    return that;
};