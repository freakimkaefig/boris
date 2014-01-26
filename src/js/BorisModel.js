Boris.BorisModel = function () {
    var that = {},

	mainController,
    glassVolume,
    $borisModel,

    init = function () {
        console.log("boris model init");
        mainController = Boris.MainController();
        $borisModel = $(Boris.BorisModel);
    },

    /*---Methods---*/

    getGlassVolume = function () {
        return $drink;
    },

    setGlassVolume = function (pGlassVolume) {
        glassVolume = pGlassVolume;
        $borisModel.trigger("setGlassVolume", glassVolume);
    };

    /*---Public variables and methods---*/
    that.init = init;
    that.getGlassVolume = getGlassVolume;
    that.setGlassVolume = setGlassVolume;

    return that;
};