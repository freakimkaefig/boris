Boris.SignView = function() {
    var that = {},
    $usernameInput = null,
    $passwordInput = null,

    init = function() {
        console.log("sign view init");
        $usernameInput = $("#username");
        $passwordInput = $("#password");
    },

    getInputValueUsername = function() {
    	return $usernameInput.val();
    },

    getInputValuePassword = function() {
    	return $passwordInput.val();
    };

    that.init = init;
    that.getInputValueUsername = getInputValueUsername;
    that.getInputValuePassword = getInputValuePassword;


    return that;
};