Boris.QuestionnaireView = function() {
    var that = {},
    

    init = function() {
        console.log("QuestionnaireView view init");

    },

    displayAlert = function(string) {
    	alert(string);
    };

    that.init = init;
    that.displayAlert = displayAlert;

    return that;
};