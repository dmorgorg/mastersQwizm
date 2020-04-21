let QWIZM = QWIZM || {};
QWIZM.state = QWIZM.state || {}; // an object to hold everything that goes in localStorage
QWIZM.handlers = QWIZM.handlers || {};

$('body').on("keyup", "#uname", e => e.target.value = utils.makeInputAlpha(e.target.value));
$('body').on("keyup", "#uId", e => e.target.value = utils.makeInputInteger(e.target.value));
$('body').on("click", "#login-button", QWIZM.handlers.validateLogin);