Boris.MainController = function() {
    var that = {},
    mainModel = null,
    listView = null,
    searchView = null,
	filterView = null,
    signView = null,
    $signInButton = null,
	$searchButton = null,

    $radioTasteGroup = null,
    $radioAlcGroup = null,

    init = function() {
        console.log("controller init");
        //model initialisieren
        mainModel = Boris.MainModel();
        mainModel.init();
		
		//SearchView initialisieren
		searchView = Boris.SearchView();
		searchView.init();
		$(searchView).on('search', onSearch);

        filterView = Boris.FilterView();
        filterView.init();

        signView = Boris.SignView();
        signView.init();

        $signInButton = $("#sign-in-button");
        $signInButton.on("click", signIn);   

        //init radio groups for filtering       
        $radioTasteGroup = $(".taste");    
        $radioAlcGroup = $(".alc");
        
        //set listener to radio button groups
        setRadioListenerTaste();
        setRadioListenerAlc();
    },

    signIn = function(event) {
        
        if(mainModel.getCorrectPassword() == signView.getInputValuePassword()) {
            if(mainModel.getUsernameForDrinkList() == signView.getInputValueUsername()) {
                var myWindow = window.open("drink_list_01.php","_self"); 
            } 
            else if(mainModel.getUsernameForSettings() == signView.getInputValueUsername()) {
                //var myWindow = window.open("drink_list.html","_self"); 
                console.log("susis settings");
            }
            else {
                console.log("wrong username");
            }    
        }     
    },

    //Filter
    setRadioListenerTaste = function() {
        //reacts to change event and sends value to model
        $radioTasteGroup.change(function() {             
            mainModel.setSelectedTaste(event.target.value);
        });
    },
    setRadioListenerAlc = function() {
        //reacts to change event and sends value to model
        $radioAlcGroup.change(function() {           
            mainModel.setSelectedAlcStrength(event.target.value);
        });
    },

    //QuestionnaireListener
    setRadioListenerAlc = function() {
        //reacts to change event and sends value to model
        $radioAlcGroup.change(function() {           
            mainModel.setSelectedAlcStrength(event.target.value);
        });
    },
	
	onSearch = function(event, query) {		
		var result = {};
		result.numCocktails = mainModel.getNumCocktails();
		$.get(mainModel.getResUrl("search") + '?name=' + query, function(data) {
			if(data.data.length != 0) {
				result.name = data;
			}
			
			if(mainModel.checkIfIngredient(query)) {
				$.get(mainModel.getResUrl("search") + '?data={"ingredients":["' + query + '"]}', function(data) {
					//console.log("ingredient", data);
					result.ingredient = data;
					searchView.onSearchResult(result);
				});
			} else {
				searchView.onSearchResult(result);
			}
		});
	};
	
    that.init = init;

    return that;
};