var Boris = {

    //hostIP : "http://localhost:8009/",

    init: function () {
        Boris.MainController().init();
    },

    getHostIP: function () {
        return hostIP;
    }
};