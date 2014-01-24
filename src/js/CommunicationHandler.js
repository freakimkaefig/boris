Boris.CommunicationHandler = function () {
    var that = {},
		mainController,

    init = function () {
        console.log("detail view init");

        mainController = Boris.MainController();
    },

    /*---Event Handlers---*/


    /*---Methods---*/

    orderDrink = function () {
        console.log("order drink");
        console.log("Cors: ", $.support.cors);

        $.ajax({

            // The 'type' property sets the HTTP method.
            // A value of 'PUT' or 'DELETE' will trigger a preflight request.
            type: 'POST',

            // The URL to make the request to.
            url: 'localhost:8009/',

            data: 'ORDER:wodka,80',

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
                console.log("Success!", response);
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

    return that;
};