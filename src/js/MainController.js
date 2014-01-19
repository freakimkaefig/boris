Boris.MainController = function() {
    var that = {},
    mainModel = null,
    listView = null,
    signView = null,
    $signInButton = null,

    init = function() {
        console.log("controller init");
        //model initialisieren
        mainModel = Boris.MainModel();
        mainModel.init();

        // view initialisieren
        listView = Boris.ListView();
        listView.init();

        signView = Boris.SignView();
        signView.init();

        $signInButton = $("#sign-in-button");
        $signInButton.on("click", signIn);
        

    },

    signIn = function(event) {
        
        if(mainModel.getCorrectUsername() == signView.getInputValueUsername()
            && mainModel.getCorrectPassword() == signView.getInputValuePassword()) {
            var myWindow = window.open("drink_list.html","_self");
            
        } else {
            console.log("wrong pw");
        }
        
    }

    that.init = init;

    return that;
};