let QWIZM = QWIZM || {};

$(document).ready(() => {
    QWIZM.builder = ((Qq) => {
        $('#header').html(QWIZM.methods.writeHeader(Qq));
        QWIZM.methods.loadMain(Qq);
    })(QWIZM.quiz);

})