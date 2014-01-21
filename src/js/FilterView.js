Boris.FilterView = function() {
    var that = {},
    $checkboxOne = null,
    $checkboxTwo = null,
    $checkboxThree = null,
    $checkboxFour = null,
    

    init = function() {
        console.log("filter view init");

        $checkboxOne = $("#checkbox-1");
        $checkboxTwo = $("#checkbox-2");
        $checkboxThree = $("#checkbox-3");
        $checkboxFour = $("#checkbox-4");
    };

    that.init = init;

    return that;
};