Boris.DrinkModel = function () {
    var that = {},

	mainController,
    $allDrinks,
    $drink,
    $drinkModel,
    drinkId,
    similarIds,
    unavailableIds,
    drinkStatuses,

    init = function () {
        console.log("drink modle init");
        mainController = Boris.MainController();
        $drinkModel = $(Boris.DrinkModel);
    },

    /*---Methods---*/

    getDrink = function () {
        return $drink;
    },

    setDrinkId = function (pDrinkId) {
        drinkId = pDrinkId;
        $drink = $allDrinks[pDrinkId];
    },

    getDrinkId = function () {
        return drinkId;
    },

    getIngredients = function () {
        return $drink.recipe;
    },

    setAllDrinks = function (pAllDrinks) {
        console.log(pAllDrinks);
        $allDrinks = pAllDrinks;
    },

    getAllDrinks = function () {
        return $allDrinks;
    },

    setSimilarIds = function (pSimilarIds) {
        similarIds = pSimilarIds;
    },

    getSimilarIds = function () {
        return similarIds;
    },

    setDrinkStatus = function (drink, status) {
        //$drinkStatuses[0]
        console.log("drink: " + drink + ", status: " + status);
        $drinkModel.trigger("setDrinkStatus", status);
    };

    /*---Public variables and methods---*/
    that.init = init;
    that.setDrinkId = setDrinkId;
    that.getDrink = getDrink;
    that.getDrinkId = getDrinkId;
    that.setAllDrinks = setAllDrinks;
    that.getAllDrinks = getAllDrinks;
    that.getIngredients = getIngredients;
    that.setSimilarIds = setSimilarIds;
    that.getSimilarIds = getSimilarIds;
    that.setDrinkStatus = setDrinkStatus;

    return that;
};