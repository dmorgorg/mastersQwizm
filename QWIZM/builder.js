"use strict";

var QWIZM = QWIZM || {};
$(document).ready(function () {
  QWIZM.builder = function (Qq) {
    QWIZM.quiz.questions.unshift(''); // make arrays indices line up with question numbers

    $('#header').html(QWIZM.methods.writeHeader(Qq));
    QWIZM.methods.loadMain(Qq);
  }(QWIZM.quiz);
});