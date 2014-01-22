Boris.MainModel = function() {
    var that = {},
    correctUsername = "testuser",
    correctPW = "0000",
    taste = null,
    alcStrength = null,
	phpRepo = null,
	ingredientsList = null,

    init = function() {
        console.log("model init");
        initPhpRepo();
    },
	
	initPhpRepo = function() {
		phpRepo = {};
		baseUrl = document.baseURI.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '') + "/";
		//var baseUrl = "http://localhost/boris/src/php/
		phpRepo.search = "php/search.php";
		phpRepo.ingredients = "php/getIngredients.php";
		//to be continued...
		
		initIngredientsList();
	},
	
	getResUrl = function(which) {
		switch(which) {
			case "search":
				return phpRepo.search;
				break;
			case "ingredients":
				return phpRepo.ingredients;
				break;
			default:
				return false;
				break;	
		}
	},
	
	initIngredientsList = function() {
		ingredientsList = new Array();
		$.get(getResUrl("ingredients"), function(data) {
			var tempArr = $.map(data.data, function(value, index) {
				return [value];
			});
			for (var i=0; i<tempArr.length; i++) {
				//console.log("arr", tempArr[i].name);
				ingredientsList.push(tempArr[i].name.toLowerCase());
			}
		});
	},
	
	checkIfIngredient = function(query) {
		for (var j=0; j<ingredientsList.length; j++) {
        	if (ingredientsList[j].match(query)) return j;
    	}
    	return false;
	},

    //sign in stuff
    getCorrectUsername = function() {
        return correctUsername;
    },
    getCorrectPassword = function() {
        return correctPW;
    },

    //getter and setter for filtering alcStrength and Taste
    getSelectedTaste = function() {
        return taste;
    },    
    getSelectedAlcStrength = function() {
        return alcStrength;
    },
    setSelectedTaste = function(flavour) {
        taste = flavour;
        console.log(taste);
    },
    setSelectedAlcStrength = function(alc) {
        alcStrength = alc;
        console.log(alcStrength);
    };

    that.init = init;
	that.getResUrl = getResUrl;
	that.checkIfIngredient = checkIfIngredient;
    that.getCorrectUsername = getCorrectUsername;
    that.getCorrectPassword = getCorrectPassword;
    that.getSelectedTaste = getSelectedTaste;
    that.getSelectedAlcStrength = getSelectedAlcStrength;
    that.setSelectedTaste = setSelectedTaste;
    that.setSelectedAlcStrength = setSelectedAlcStrength;

    return that;
};