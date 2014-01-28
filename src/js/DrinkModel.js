Boris.DrinkModel = function () {
    var that = {},

	mainController,
    $allDrinks,
    $drink,
    drinkId,
    similarIds,

    init = function () {
        console.log("drink modle init");
        mainController = Boris.MainController();
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

    return that;
};