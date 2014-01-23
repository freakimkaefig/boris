Boris.MainController = function() {
    var that = {},
    mainModel = null,
    listView = null,
    searchView = null,
	filterView = null,
    signView = null,
    signView = null,
    $signInButton = null,
	$searchButton = null,

    $radioTasteGroup = null,
    $radioAlcGroup = null,

    //-----------Questionnaire--------------
    //Likert Scales
    $radioBitterLikert = null,
    $radioSweetLikert = null,
    $radioSourLikert = null,
    $radioFruityLikert = null,
    $radioStrongLikert = null,
    //age field
    $ageInput = null,
    //gender radios group
    $radioGenderGroup = null,
    //-----------Questionnaire_end--------------


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

        detailView = Boris.DetailView();
        detailView.init();

        $signInButton = $("#sign-in-button");
        $signInButton.on("click", signIn);   

        //init radio groups for filtering       
        $radioTasteGroup = $(".taste");    
        $radioAlcGroup = $(".alc");
        
        //set listener to radio button groups
        setRadioListenerTaste();
        setRadioListenerAlc();

        $radioBitterLikert = $(".likertHerb");
        $radioSweetLikert = $(".likertSüß");
        $radioSourLikert = $(".likertSauer");
        $radioFruityLikert = $(".likertFruchtig");
        $radioStrongLikert = $(".likertStark");

        //!!!age input methoden fehlen noch
        $ageInput = $("#age-questionnaire");
        $radioGenderGroup = $(".genderRadios");

        setRadioListenerBitterLikert();
        setRadioListenerSweetLikert();
        setRadioListenerSourLikert();
        setRadioListenerFruityLikert();
        setRadioListenerStrongLikert();

        setRadioGender();


    },

    signIn = function(event) {
        
        if(mainModel.getCorrectPassword() == signView.getInputValuePassword()) {
            if (mainModel.getUsernameForDrinkList() == signView.getInputValueUsername()) {
                $.cookie('tablet', 'true', { expires: 2, path: '/' });
                var myWindow = window.open("drink_list.php","_self"); 
            } 
            else if(mainModel.getUsernameForSettings() == signView.getInputValueUsername()) {
                //var myWindow = window.open("drink_list.html","_self"); 
                //hier eig settings seite
                //zum testen erst mal cocktail rating
                var myWindow = window.open("cocktail_rating.php","_self"); 
            }
            else {
                alert("wrong username");
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

    //------------------QuestionnaireListener-----------------
    setRadioListenerBitterLikert = function() {

        $radioBitterLikert.change(function() {           
        
            mainModel.setLikertBitterVal(event.target.value);

        });
    },

    setRadioListenerSweetLikert = function() {
        $radioSweetLikert.change(function() {  
                
            mainModel.setLikertSweetVal(event.target.value);
        });
    },

    setRadioListenerSourLikert = function() {
        $radioSourLikert.change(function() {  
               
            mainModel.setLikertSourVal(event.target.value);
        });
    },

    setRadioListenerFruityLikert = function() {
        $radioFruityLikert.change(function() {  
              
            mainModel.setLikertFruityVal(event.target.value);
        });
    },

    setRadioListenerStrongLikert = function() {
        $radioStrongLikert.change(function() {    
            
            mainModel.setLikertStrongVal(event.target.value);
        });
    },

    setRadioGender = function() {
        $radioGenderGroup.change(function() {    
            mainModel.setGenderVal(event.target.value);
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