Boris.MainModel = function() {
    var that = {},
    normalUsername = "normaluser",
    settingsUsername = "settingsuser",
    correctPW = "0000",
    taste = null,
    alcStrength = null,
	phpRepo = null,

    init = function() {
        console.log("model init");
        initPhpRepo();
    },
	
	initPhpRepo = function() {
		phpRepo = {};
		console.log(document.baseURI.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, ''));
		//var baseUrl = "http://localhost/boris/src/php/
		phpRepo.search = "php/search.php"
	},

    //sign in stuff
    getUsernameForDrinkList = function() {
        return normalUsername;
    },
    getUsernameForSettings = function() {
        return settingsUsername;
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
    that.getUsernameForDrinkList = getUsernameForDrinkList;
    that.getUsernameForSettings = getUsernameForSettings;
    that.getCorrectPassword = getCorrectPassword;
    that.getSelectedTaste = getSelectedTaste;
    that.getSelectedAlcStrength = getSelectedAlcStrength;
    that.setSelectedTaste = setSelectedTaste;
    that.setSelectedAlcStrength = setSelectedAlcStrength;

    return that;
};