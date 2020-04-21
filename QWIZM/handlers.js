"use strict";

var QWIZM = QWIZM || {};
QWIZM.state = QWIZM.state || {}; // an object to hold everything that goes in localStorage

QWIZM.handlers = QWIZM.handlers || {}; // event handler for clicking the login submit button

QWIZM.handlers.validateLogin = function (e) {
  e.preventDefault();
  var uname = $('#uname')[0].value,
      uId = $('#uId')[0].value,
      valid = false; // convert uId to positive integer, if it exists
  // uId = uId.length > 0 ? parseInt(uId) : QWIZM.NEGATIVE;
  // reset error messages to empty string by default; don't persist messages from a previous submit

  $('#unameError').text("");
  $('#uIdError').text("");

  if (uname.length > 0) {
    if (uId > 0) {
      valid = true;
    } else if (uId === 0) {
      $('#uIdError').text("Please provide a non-zero id");
      $('#uId').val("");
      $('#uId').focus();
    } else {
      $('#uIdError').text("Please provide an ID number");
      $('#uId').focus();
    }
  } else if (uId > 0) {
    $('#unameError').text("Please provide a username");
    $('#uname').focus();
  } else if (uId === 0) {
    $('#unameError').text("Please provide a username");
    $('#uIdError').text("Please provide a non-zero id");
    $('#uId').val("");
    $('#uname').focus();
  } else {
    $('#unameError').text("Please provide a username");
    $('#uIdError').text("Please provide an ID number");
    $('#uname').focus();
  }

  if (valid) {
    QWIZM.state.uname = uname;
    QWIZM.state.uId = uId;
    QWIZM.state.currentView = 'instructions';
    QWIZM.state.thisQuiz = []; // this will hold state of entered and processed submissions

    QWIZM.methods.writeState(QWIZM.QUIZ_KEY, QWIZM.state);
    $('#login').fadeOut(); // have to fade out so that write to localStorage is complete before reload
    // window.location.reload(true); // not sure why but this helps katex

    QWIZM.methods.loadMain(QWIZM.quiz);
  }
};