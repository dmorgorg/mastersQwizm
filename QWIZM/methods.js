"use strict";

var QWIZM = QWIZM || {};
QWIZM.methods = QWIZM.methods || {}; // some constants

QWIZM.DURATION = 1000;
QWIZM.QUIZ_KEY = "quiz_" + QWIZM.quiz.id;
QWIZM.DELTA = 1e-9;

QWIZM.methods.loadMain = function (o) {
  var quizId = "quiz_".concat(o.id);

  if (localStorage.getItem(quizId) === null) {
    QWIZM.methods.writeLoginForm();
    $('#uname').focus();
  } else {
    var state = QWIZM.methods.readFromStorage(quizId);
    $('main').html(loadViews());
    $('footer').html(QWIZM.methods.writeFooter()); // set all views to display:none;. Do that here rather than initializing all views to hidden so that when they are shown, display: flex (or whatever) is maintained

    $('.view').hide();
    $('#' + state.currentView + 'Btn').addClass("active");
    $('#' + state.currentView).fadeIn(QWIZM.DURATION);
  }

  function loadViews() {
    // get number of questions for this quiz
    var nQ = QWIZM.quiz.questions.length,
        html = '';
    html += "<section id='instructions' class='view'>".concat(QWIZM.quiz.instructions, "</section>\n                <section id='clear' class='card view' > ").concat(QWIZM.methods.writeClearView(), "</section>");

    for (var i = 1; i < nQ; i++) {
      // QWIZM.quiz.questions[i] is a function where i is the question number
      // We need to pass the question number into this function
      html += "<section id='Q".concat(i, "' class='view'>");
      html += "Q" + i;
      html += "</section>"; // console.log(QWIZM.quiz.questions[i](i));
    }

    html += "<section id='summary' class='view'>Summary</section>";
    return html;
  }
};

QWIZM.methods.readFromStorage = function (key) {
  var value = localStorage.getItem(key);
  return value && JSON.parse(value);
};

QWIZM.methods.writeToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

QWIZM.methods.writeHeader = function (o) {
  return "<h1> ".concat(o.subject, "</h1> \n            <div class='rightblock'>\n                <h3> ").concat(o.topic, " </h3> \n                <h3> ").concat(o.subtopic, " </h3> \n            </div>");
};

QWIZM.methods.writeLoginForm = function () {
  $('main').html("<div id=\"login\" class=\"card view\">\n            <h2> Please Log In </h2>\n            <form>\n            <ul class = \"login-list\">\n                <li>\n                    <label for=\"uname\">Username:</label>\n                    <input type=\"text\" id=\"uname\" autocomplete=\"off\" placeholder=\"Alphabetical characters only, e.g. johnSmith\" />\n                </li> \n                <li id=\"unameError\"></li>\n                <li>\n                    <label for=\"uId\">ID number:</label>\n                    <input type = \"text\" id = \"uId\" autocomplete=\"off\" placeholder = \"Numerical characters only, e.g. 402235\" />\n                </li> \n                <li id = \"uIdError\"></li>\n                <li><button id=\"login-button\" type=\"submit\">Submit</button></li>\n            </ul>\n            </form>\n        </div>");
};

QWIZM.methods.writeClearView = function () {
  var html = "<h2>Warning!</h2>\n                <p> Clicking the <span class = \"highlight\"> Clear Quiz </span> button below will reset the quiz, requiring you to log in again.</p >\n                <p><span class=\"highlight\"> All your input answers, currently stored in the browser, will be lost!</span></p>\n                <p> Only click the <span class = \"highlight\"> Clear Quiz </span> button below if this is really what you intend.</p >\n                <p>(Generally, the only reason to clear the quiz from the browser is if you plan to enter a fictitious ID to practise the quiz with a different set of question values.)</p>\n                <button id=\"clear-button\" type=\"submit\">Clear Quiz</button>";
  return html;
};

QWIZM.methods.writeFooter = function () {
  var state = QWIZM.methods.readFromStorage(QWIZM.QUIZ_KEY),
      // number of questions in this quiz
  len = QWIZM.quiz.questions.length,
      html = "\n                <nav class='navbar'>\n                    <ul class='nav-links'>\n                        <li class = \"nav-item\" id=\"instructionsBtn\" > Instructions </li>\n                        <li class = \"nav-item\" id=\"clearBtn\" > Clear </li>";

  for (var i = 1; i < len; i++) {
    html += "<li class=\"nav-item\" id=\"Q".concat(i, "Btn\">Q").concat(i, "</li>");
  }

  return html + "<li class = \"nav-item\" id=\"summaryBtn\">Summary </li>\n                </ul>                                          \n                <div class='uname'>".concat(state.uname, "</div>                     \n            </nav>");
};