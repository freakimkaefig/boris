Boris.BorisModel = function () {
    var that = {},

	mainController,
    glassVolume,

    init = function () {
        console.log("boris model init");
        mainController = Boris.MainController();
    },

    /*---Methods---*/

    getGlassVolume = function () {
        return $drink;
    },

    setGlassVolume = function (pGlassVolume) {
        glassVolume = pGlassVolume;
    };

    /*---Public variables and methods---*/
    that.init = init;
    that.getGlassVolume = getGlassVolume;
    that.setGlassVolume = setGlassVolume;

    return that;
};