Boris.MainModel = function() {
    var that = {},
    correctUsername = "testuser",
    correctPW = "0000",
    taste = null,
    alcStrength = null;

    init = function() {
        console.log("model init");
        
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
    that.getCorrectUsername = getCorrectUsername;
    that.getCorrectPassword = getCorrectPassword;
    that.getSelectedTaste = getSelectedTaste;
    that.getSelectedAlcStrength = getSelectedAlcStrength;
    that.setSelectedTaste = setSelectedTaste;
    that.setSelectedAlcStrength = setSelectedAlcStrength;

    return that;
};