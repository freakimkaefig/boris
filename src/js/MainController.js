Boris.MainController = function() {
    var that = {},
    mainModel = null,
    listView = null,
    searchView = null,
	filterView = null,
    signView = null,
    $signInButton = null,
	$searchButton = null,

    $$radioAlcGroup = null,

    init = function() {
        console.log("controller init");
        //model initialisieren
        mainModel = Boris.MainModel();
        mainModel.init();

        // view initialisieren
        listView = Boris.ListView();
        listView.init();
		
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
        
        if(mainModel.getCorrectUsername() == signView.getInputValueUsername()
            && mainModel.getCorrectPassword() == signView.getInputValuePassword()) {
            var myWindow = window.open("drink_list.html","_self");
            
        } else {
            console.log("wrong pw");
        }
        
    },

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
	
	onSearch = function(event, query) {
		console.log("onSearch", event, query);
		
		$.get('http://localhost/boris/src/php/', function(data) {
			$outputBody.text(JSON.stringify(data));
		});
	};

    that.init = init;

    return that;
};