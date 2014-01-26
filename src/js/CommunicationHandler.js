Boris.CommunicationHandler = function () {
    var that = {},
		mainController,
        commands,
        postData,
        borisModel,

    init = function (pBorisModel) {
        console.log("communication handler init");
        mainController = Boris.MainController();
        borisModel = pBorisModel;

        //!!ToDo: change to new commands
        commands = { "order": "order",
            "refill": "REFILL",
            "config": "CONFIG",
            "setGlassVol": "SETGLASSVOL",
            "getGlassVol": "GETGLASSVOL"
        };
    },

    /*---Methods---*/

    orderDrink = function (drink) {
        console.log("order drink");

        /*            
            var orderData = "";
            //Get glass centiliter
            var glassVolumeCl = 200; //!!ToDo: Get glass volume
       
            $.each(drink.recipe, function (key, ingredient) {
            if (orderData != "") { orderData += ";" }
            //Calculate ingredient centiliter
            var ingredientVolumeCl = ingredient.amount * glassVolumeCl;
            //Concatenate data
            orderData += ingredient.name + "," + ingredientVolumeCl;
            });
            postData = command + orderData;
        */
        postData = '{"order":' + drink + '}';
        sendRequest(handleOrderResponse);
    },

    handleOrderResponse = function (response) {
        console.log("Success?", response);
    },

    refill = function () {
        sendRequest(handleRefillResponse);
    },

    handleRefillResponse = function (response) {
        console.log("Success!", response);
    },

    config = function () {
        sendRequest(handleConfigResponse);
    },

    handleConfigResponse = function (response) {
        console.log("Success!", response);
    },

    setGlassVol = function () {
        sendRequest(handleSetGlassVolResponse);
    },

    handleSetGlassVolResponse = function (response) {
        console.log("Success!", response);
    },

    getGlassVol = function () {
        //!!ToDo: send Request when command is available: sendRequest(handleGetGlassVolResponse);
        handleGetGlassVolResponse();
    },

    handleGetGlassVolResponse = function (response) {
        console.log("Success!", response);
        //!!ToDo
        borisModel.setGlassVolume(200);
    },

    sendRequest = function (responseHandler) {
        $.ajax({
            // The 'type' property sets the HTTP method.
            // A value of 'PUT' or 'DELETE' will trigger a preflight request.
            type: 'POST',
            // The URL to make the request to.
            url: 'http://localhost:8009/',
            //data: 'order:wodka,100',
            data: postData,
            //data: '{"getStatus":"glassVol"}',

            // The 'contentType' property sets the 'Content-Type' header.
            // The JQuery default for this property is
            // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
            // a preflight. If you set this value to anything other than
            // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
            // you will trigger a preflight request.
            contentType: 'text/plain',
            xhrFields: {
                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                // This can be used to set the 'withCredentials' property.
                // Set the value to 'true' if you'd like to pass cookies to the server.
                // If this is enabled, your server must respond with the header
                // 'Access-Control-Allow-Credentials: true'.
                withCredentials: false
            },
            headers: {
                // Set any custom headers here.
                // If you set any non-simple headers, your server must include these
                // headers in the 'Access-Control-Allow-Headers' response header.
            },
            success: function (response) {
                // Here's where you handle a successful response.
                responseHandler(response);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // Here's where you handle an error response.
                // Note that if the error was due to a CORS issue,
                // this function will still fire, but there won't be any additional
                // information about the error.
                console.log("Error :(", xhr);
            }
        });
    };


    /*---Public variables and methods---*/
    that.init = init;
    that.orderDrink = orderDrink;
    that.refill = refill;
    that.config = config;
    that.setGlassVol = setGlassVol;
    that.getGlassVol = getGlassVol;

    return that;
};