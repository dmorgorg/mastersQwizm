"use strict";

var QWIZM = QWIZM || {}; // state = state || {}; // an object to hold everything that goes in localStorage

QWIZM.handlers = QWIZM.handlers || {}; // event handler for clicking the login submit button

QWIZM.handlers.validateLogin = function (e) {
  e.preventDefault();
  var uname = $('#uname')[0].value,
      uId = $('#uId')[0].value,
      valid = false,
      state = {}; // localStorage is empty at this point (until login)

  console.log(state); // reset error messages to empty string by default; don't persist messages from a previous submit

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
    state.uname = uname;
    state.uId = uId;
    state.currentView = 'instructions';
    state.thisQuiz = []; // this will hold state of entered and processed submissions

    QWIZM.methods.writeToStorage(QWIZM.QUIZ_KEY, state);
    $('#login').fadeOut(); // have to fade out so that write to localStorage is complete before reload
    // window.location.reload(true); // not sure why but this helps katex

    QWIZM.methods.loadMain(QWIZM.quiz);
  }
};

QWIZM.handlers.reset = function () {
  $('#clear').fadeOut();
  localStorage.removeItem(QWIZM.QUIZ_KEY);
  window.location.reload(); //to show login again
}; // event handler for navigation button click


QWIZM.handlers.updateView = function (e) {
  // get the button just clicked
  var btnId = e.target.id,
      state = QWIZM.methods.readFromStorage(QWIZM.QUIZ_KEY); // if the view corresponding to the click is not currently visible...

  if (state.currentView + 'Btn' !== btnId) {
    // remove .active from previous view
    $('#' + state.currentView + 'Btn').removeClass("active");
    $('#' + state.currentView).hide(); // set new view in the state

    state.currentView = btnId.replace('Btn', ''); // show that the newly clicked button is active

    $('#' + btnId).addClass("active"); //console.log(state.currentView);

    $('#' + state.currentView).fadeIn(QWIZM.DURATION);
    QWIZM.methods.writeToStorage(QWIZM.QUIZ_KEY, state);
  }
};