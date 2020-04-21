"use strict";

var QWIZM = QWIZM || {};
$(document).ready(function () {
  QWIZM.builder = function (Qq) {
    $('#header').html(QWIZM.methods.writeHeader(Qq));
    QWIZM.methods.loadMain(Qq);
  }(QWIZM.quiz);
});