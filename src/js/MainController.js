Boris.MainController = function () {
    var that = {},
    mainModel = null,
    listView = null,
    searchView = null,
	filterView = null,
    signView = null,
    questionnaireView = null,
    $signInButton = null,
	$searchButton = null,

    $radioTasteGroup = null,
    $radioAlcGroup = null,

    //-----------Questionnaire--------------
    //Likert Scales
    $radioTaste = null,
    $radoiLooking = null,

    $radioBitterLikert = null,
    $radioSweetLikert = null,
    $radioSourLikert = null,
    $radioFruityLikert = null,
    $radioStrongLikert = null,
    //age field
    $ageInput = null,
    //gender radios group
    $radioGenderGroup = null,
    $buttonSendRating = null,

    $checkbox = null,
    //-----------Questionnaire_end--------------


    init = function () {
        console.log("controller init");
        //model initialisieren
        if (Boris.MainModel != null) {
            mainModel = Boris.MainModel();
            mainModel.init();
        }

        //SearchView initialisieren
        if (Boris.SearchView != null) {
            searchView = Boris.SearchView();
            searchView.init();
            $(searchView).on('search', onSearch);
        }

        if (Boris.FilterView != null) {
            filterView = Boris.FilterView();
            filterView.init(searchView);
        }

        if (Boris.SignView != null) {
            signView = Boris.SignView();
            signView.init();
        }

        if (Boris.BorisModel != null) {
            borisModel = Boris.BorisModel();
            borisModel.init();
        }

        if (Boris.DrinkModel != null) {
            drinkModel = Boris.DrinkModel();
            drinkModel.init();
        }

        if (Boris.DetailView != null) {
            detailView = Boris.DetailView();
            detailView.init(drinkModel, borisModel);
        }

        if (Boris.CommunicationHandler != null) {
            communicationHandler = Boris.CommunicationHandler();
            communicationHandler.init(borisModel);
        }

        if (Boris.QuestionnaireView != null) {
            questionnaireView = Boris.QuestionnaireView();
            questionnaireView.init();
        }

        $signInButton = $("#sign-in-button");
        $signInButton.on("click", onSignIn);
        $('#sing-in-form').keypress(function (e) {
            if (e.which == 13) {
                $signInButton.click();
            }
        });

        //init radio groups for filtering       
        $radioTasteGroup = $(".taste");
        $radioAlcGroup = $(".alc");

        //set listener to radio button groups
        setRadioListenerTaste();
        setRadioListenerAlc();

        $radioTaste = $(".likertTaste");
        $radioLooking = $(".likertLook");

        $radioBitterLikert = $(".likertHerb");
        $radioSweetLikert = $(".likertSüß");
        $radioSourLikert = $(".likertSauer");
        $radioFruityLikert = $(".likertFruchtig");
        $radioStrongLikert = $(".likertStark");

        //!!!age input methoden fehlen noch
        $ageInput = $("#age-questionnaire");
        $radioGenderGroup = $(".genderRadios");

        $buttonSendRating = $("#send-rating");
        $buttonSendRating.on("click", onSendRating);

        $checkbox = $(".checkbox-input");

        setTasteLikert();
        setLookingLikert();

        setRadioListenerBitterLikert();
        setRadioListenerSweetLikert();
        setRadioListenerSourLikert();
        setRadioListenerFruityLikert();
        setRadioListenerStrongLikert();

        setRadioGender();
    },

    onSignIn = function (event) {

        if (mainModel.getCorrectPassword() == signView.getInputValuePassword()) {
            if (mainModel.getUsernameForDrinkList() == signView.getInputValueUsername()) {
                $.cookie('tablet', 'true', { expires: 1, path: '/' });
                var myWindow = window.open("drink_list.php", "_self");
            }
            else if (mainModel.getUsernameForSettings() == signView.getInputValueUsername()) {
                $.cookie('service', 'true', { expires: 1, path: '/' });
                var myWindow = window.open("service_menu.php", "_self");
            }
            else {
                alert("wrong username");
            }
        }
    },

    //Filter
    setRadioListenerTaste = function () {
        //reacts to change event and sends value to model
        $radioTasteGroup.change(function () {
            mainModel.setSelectedTaste(event.target.value);
        });
    },
    setRadioListenerAlc = function () {
        //reacts to change event and sends value to model
        $radioAlcGroup.change(function () {
            mainModel.setSelectedAlcStrength(event.target.value);
        });
    },

    setTasteLikert = function() {
        $radioTaste.change(function () {

            mainModel.setLikertTasteVal(event.target.value);

        });
    },

    setLookingLikert = function() {
        $radioLooking.change(function () {

            mainModel.setLikertLookVal(event.target.value);

        });
    },


    setRadioListenerBitterLikert = function () {

        $radioBitterLikert.change(function () {

            mainModel.setLikertBitterVal(event.target.value);

        });
    },

    setRadioListenerSweetLikert = function () {
        $radioSweetLikert.change(function () {

            mainModel.setLikertSweetVal(event.target.value);
        });
    },

    setRadioListenerSourLikert = function () {
        $radioSourLikert.change(function () {

            mainModel.setLikertSourVal(event.target.value);
        });
    },

    setRadioListenerFruityLikert = function () {
        $radioFruityLikert.change(function () {

            mainModel.setLikertFruityVal(event.target.value);
        });
    },

    setRadioListenerStrongLikert = function () {
        $radioStrongLikert.change(function () {

            mainModel.setLikertStrongVal(event.target.value);
        });
    },

    setRadioGender = function () {
        $radioGenderGroup.change(function () {
            mainModel.setGenderVal(event.target.value);
        });
    },

    handleCheckboxes = function () {
        $checkbox.each(function (i, obj) {
            if (obj.checked) {
                mainModel.setActiveCheckboxes(obj.id);
            }
        });
    },

    onSendRating = function (event) {

        console.log("MainController.js::onSendRating");

        //mit dieser Methode kann der komplette fragebogen ausgelesen werden

        //vorher wird geprüft ob werte fehlen oder ungültige werte eingetragen wurden

        handleCheckboxes();

        //age input ausgefüllt?
        if ($ageInput.val() > 0 && $ageInput.val() < 120) {
            //gender angegeben?
            if (mainModel.getGenderVal() != null) {
                //mindestens eine checkbox angekreuzt?
                if (mainModel.getActiveCheckboxes().length != 0) {
                    //likertsakalen verwendet?
                    if (mainModel.getLikertBitterVal() != null &&
                        mainModel.getLikertSweetVal() != null &&
                        mainModel.getLikertSourVal() != null &&
                        mainModel.getLikertFruityVal() != null &&
                        mainModel.getLikertStrongVal() != null &&
                        mainModel.getLikertTasteVal() != null &&
                        mainModel.getLikertLookVal()) {

                        //get userid (-1 if not set)
                        var userid = $.cookie("uid");
                        if(userid == null || userid == undefined || userid.length == 0){
                            userid = -1;
                        }

                        // create url and add parameters
                        var url = "php/rate.php?"
                        + "userid="+userid
                        + "&age="+$ageInput.val()
                        + "&sex="+mainModel.getGenderVal()
                        + "&cocktail="+cocktailid
                        + "&bitter="+mainModel.getLikertBitterVal()
                        + "&sweet="+mainModel.getLikertSweetVal()
                        + "&fruity="+mainModel.getLikertFruityVal()
                        + "&strong="+mainModel.getLikertStrongVal()
                        + "&taste="+mainModel.getLikertTasteVal()
                        + "&look="+mainModel.getLikertLookVal();

                        // add tags
                        var tags = mainModel.getActiveCheckboxes();
                        for(var i=0; i<tags.length; i++){
                            url += "&"+tags[i];
                        }

                        $.get(url,function(result){
                            // save my userid to use it later when rating other cocktails
                            if(result["userid"]){
                                $.cookie("uid",result["userid"]);
                            }
                            window.location = "drink_list.php";
                        });

                    } else {
                        //displayDialog("likertskala nicht komplett");  
                        questionnaireView.displayAlert("likertskala nicht komplett");
                        //alert("likertskala nicht komplett");  
                    }
                } else {
                    //displayDialog("keine checkbox");   
                    questionnaireView.displayAlert("keine checkbox");
                    //alert("keine checkbox");   
                }
            } else {
                //displayDialog("Bitte Geschlecht auswählen");    
                questionnaireView.displayAlert("Bitte Geschlecht auswählen");
                //alert("Bitte Geschlecht auswählen");    
            }
        } else {
            //displayDialog("Ungültiger Wert für Alter");
            questionnaireView.displayAlert("Ungültiger Wert für Alter");
            //alert("Ungültiger Wert für Alter");
        }


    },

    displayDialog = function (text) {
        //bootbox is a library which makes it easier to display dialogs
        bootbox.alert(text, function () {
            //Example.show("Hello world callback");      
        });
    },

	onSearch = function (event, query) {
	    var result = {};
	    result.numCocktails = mainModel.getNumCocktails();
	    $.get(mainModel.getResUrl("search") + '?name=' + query, function (data) {
	        if (data.data.length != 0) {
	            result.name = data;
	        }

	        if (mainModel.checkIfIngredient(query)) {
	            $.get(mainModel.getResUrl("search") + '?data={"ingredients":["' + query + '"]}', function (data) {
	                //console.log("ingredient", data);
	                result.ingredient = data;
	                searchView.onSearchResult(result);
	            });
	        } else {
	            searchView.onSearchResult(result);
	        }
	    });
	},

    orderDrink = function (drink) {
        communicationHandler.orderDrink(drink);
    }, 
    
    checkAvailability = function () {
        communicationHandler.checkDrink(drink);
    };


    that.init = init;
    that.orderDrink = orderDrink;

    return that;
};