let QWIZM = QWIZM || {};
QWIZM.methods = QWIZM.methods || {};
QWIZM.state = QWIZM.state || {};

// some constants
QWIZM.DURATION = 400;
// QWIZM.NEGATIVE = -42;
QWIZM.QUIZ_KEY = "quiz_" + QWIZM.quiz.id;
QWIZM.DELTA = 1e-9;

QWIZM.methods.loadMain = o => {
    let quizId = `quiz_${o.id}`;


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
        let nQ = QWIZM.quiz.questions.length,
            html = '';
        html += `<section id='instructions' class='view'>
                ${QWIZM.quiz.instructions}</section>`

        return html;
    }


}

QWIZM.methods.readState = (key) => {
    let value = localStorage.getItem(key);
    return value && JSON.parse(value);
};

QWIZM.methods.writeState = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

QWIZM.methods.writeHeader = o => {
    return `<h1> ${o.subject}</h1> 
            <div class='rightblock'>
                <h3> ${o.topic} </h3> 
                <h3> ${o.subtopic} </h3> 
            </div>`;
};

QWIZM.methods.writeLoginForm = () => {
    $('main').html(`<div id="login" class="card view">
            <h2> Please Log In </h2>
            <form>
            <ul class = "login-list">
                <li>
                    <label for="uname">Username:</label>
                    <input type="text" id="uname" autocomplete="off" placeholder="Alphabetical characters only, e.g. johnSmith" />
                </li> 
                <li id="unameError"></li>
                <li>
                    <label for="uId">ID number:</label>
                    <input type = "text" id = "uId" autocomplete="off" placeholder = "Numerical characters only, e.g. 402235" />
                </li> 
                <li id = "uIdError"></li>
                <li><button id="login-button" type="submit">Submit</button></li>
            </ul>
            </form>
        </div>`);
};

QWIZM.methods.writeFooter = () => {
    let state = QWIZM.methods.readState(QWIZM.QUIZ_KEY),
        // number of questions in this quiz
        len = QWIZM.quiz.questions.length,
        html = `<footer>
                <nav class='navbar'>
                    <ul class='nav-links'>
                        <li class = "nav-item" id="instructionsBtn" > Instructions </li>
                        <li class = "nav-item" id="clearBtn" > Clear </li>`;

    for (let i = 1; i < len; i++) {
        html += `<li class="nav-item" id="Q${i}Btn">Q${i}</li>`;
    }

    return html + `<li class = "nav-item" id="summaryBtn">Summary </li>
                </ul>                                          
                <div class='uname'>${state.uname}</div>                     
            </nav>                     
        </footer>`;
};