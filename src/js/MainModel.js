Boris.MainModel = function() {
    var that = {},
    correctUsername = "testuser",
    correctPW = "0000";

    init = function() {
        console.log("model init");
        
    },

    getCorrectUsername = function() {
        return correctUsername
    },

    getCorrectPassword = function() {
        return correctPW
    };

    that.init = init;
    that.getCorrectUsername = getCorrectUsername;
    that.getCorrectPassword = getCorrectPassword;

    return that;
};