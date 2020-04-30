let QWIZM = QWIZM || {};

$(document).ready(() => {
    QWIZM.builder = ((Qq) => {
        QWIZM.quiz.questions.unshift(''); // make arrays indices line up with question numbers
        $('#header').html(QWIZM.methods.writeHeader(Qq));
        QWIZM.methods.loadMain(Qq);
    })(QWIZM.quiz);

})