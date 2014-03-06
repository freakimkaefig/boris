Boris.BorisModel = function () {
    var that = {},

	mainController,
    glassVolume,
    $borisModel,
    mixStatus,

    init = function (pBorisModel) {
        console.log("boris model init");
        mainController = Boris.MainController();
        $borisModel = $(pBorisModel);
    },

    /*---Methods---*/

    getGlassVolume = function () {
        return $drink;
    },

    setGlassVolume = function (pGlassVolume) {
        glassVolume = pGlassVolume;
        $borisModel.trigger("setGlassVolume", glassVolume);
    },

    setMixStatus = function (pMixStatus) {
        mixStatus = pMixStatus;
        $borisModel.trigger("setMixStatus");
    },

    getMixStatus = function (pGlassVolume) {
        return mixStatus;
    };

    /*---Public variables and methods---*/
    that.init = init;
    that.getGlassVolume = getGlassVolume;
    that.setGlassVolume = setGlassVolume;
    that.setMixStatus = setMixStatus;
    that.getMixStatus = getMixStatus;

    return that;
};