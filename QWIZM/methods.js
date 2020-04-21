"use strict";

var QWIZM = QWIZM || {};
QWIZM.methods = QWIZM.methods || {};
QWIZM.state = QWIZM.state || {}; // some constants

QWIZM.DURATION = 400; // QWIZM.NEGATIVE = -42;

QWIZM.QUIZ_KEY = "quiz_" + QWIZM.quiz.id;
QWIZM.DELTA = 1e-9;

QWIZM.methods.loadMain = function (o) {
  var quizId = "quiz_".concat(o.id);

  if (localStorage.getItem(quizId) === null) {
    QWIZM.methods.writeLoginForm();
    $('#uname').focus();
  } else {
    console.log('in else');
    console.log(JSON.parse(localStorage.getItem(quizId)));
    QWIZM.state = QWIZM.methods.readState(quizId);
    QWIZM.state.thisQuiz.push(99);
    console.log(QWIZM.state);
    $('main').html(loadViews());
  }

  function loadViews() {
    // get number of questions for this quiz
    var nQ = QWIZM.quiz.questions.length,
        html = '';
    html += "<section id='instructions' class='view'>\n                ".concat(QWIZM.quiz.instructions, "</section>");
    return html;
  }
};

QWIZM.methods.readState = function (key) {
  var value = localStorage.getItem(key);
  return value && JSON.parse(value);
};

QWIZM.methods.writeState = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

QWIZM.methods.writeHeader = function (o) {
  return "<h1> ".concat(o.subject, "</h1> \n            <div class='rightblock'>\n                <h3> ").concat(o.topic, " </h3> \n                <h3> ").concat(o.subtopic, " </h3> \n            </div>");
};

QWIZM.methods.writeLoginForm = function () {
  $('main').html("<div id=\"login\" class=\"card view\">\n            <h2> Please Log In </h2>\n            <form>\n            <ul class = \"login-list\">\n                <li>\n                    <label for=\"uname\">Username:</label>\n                    <input type=\"text\" id=\"uname\" autocomplete=\"off\" placeholder=\"Alphabetical characters only, e.g. johnSmith\" />\n                </li> \n                <li id=\"unameError\"></li>\n                <li>\n                    <label for=\"uId\">ID number:</label>\n                    <input type = \"text\" id = \"uId\" autocomplete=\"off\" placeholder = \"Numerical characters only, e.g. 402235\" />\n                </li> \n                <li id = \"uIdError\"></li>\n                <li><button id=\"login-button\" type=\"submit\">Submit</button></li>\n            </ul>\n            </form>\n        </div>");
};

QWIZM.methods.writeFooter = function () {
  var state = QWIZM.methods.readState(QWIZM.QUIZ_KEY),
      // number of questions in this quiz
  len = QWIZM.quiz.questions.length,
      html = "<footer>\n                <nav class='navbar'>\n                    <ul class='nav-links'>\n                        <li class = \"nav-item\" id=\"instructionsBtn\" > Instructions </li>\n                        <li class = \"nav-item\" id=\"clearBtn\" > Clear </li>";

  for (var i = 1; i < len; i++) {
    html += "<li class=\"nav-item\" id=\"Q".concat(i, "Btn\">Q").concat(i, "</li>");
  }

  return html + "<li class = \"nav-item\" id=\"summaryBtn\">Summary </li>\n                </ul>                                          \n                <div class='uname'>".concat(state.uname, "</div>                     \n            </nav>                     \n        </footer>");
};