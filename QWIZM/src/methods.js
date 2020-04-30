let QWIZM = QWIZM || {};
QWIZM.methods = QWIZM.methods || {};

// some constants
QWIZM.DURATION = 1000;
QWIZM.QUIZ_KEY = "quiz_" + QWIZM.quiz.id;
QWIZM.DELTA = 1e-9;

QWIZM.methods.loadMain = o => {
    let quizId = `quiz_${o.id}`;

    if (localStorage.getItem(quizId) === null) {
        QWIZM.methods.writeLoginForm();
        $('#uname').focus();
    } else {

        let state = QWIZM.methods.readFromStorage(quizId);

        $('main').html(loadViews());

        $('footer').html(QWIZM.methods.writeFooter());
        // set all views to display:none;. Do that here rather than initializing all views to hidden so that when they are shown, display: flex (or whatever) is maintained
        $('.view').hide();
        $('#' + state.currentView + 'Btn').addClass("active");
        $('#' + state.currentView).fadeIn(QWIZM.DURATION);
    }

    function loadViews() {
        // get number of questions for this quiz
        let nQ = QWIZM.quiz.questions.length,
            html = '';

        html += `<section id='instructions' class='view'>${QWIZM.quiz.instructions}</section>
                <section id='clear' class='card view' > ${QWIZM.methods.writeClearView()}</section>`;

        for (let i = 1; i < nQ; i++) {
            // QWIZM.quiz.questions[i] is a function where i is the question number
            // We need to pass the question number into this function
            html += `<section id='Q${i}' class='view'>`
            html += `Q` + i;
            html += `</section>`;

            // console.log(QWIZM.quiz.questions[i](i));
        }

        html += `<section id='summary' class='view'>Summary</section>`;
        return html;
    }


}

QWIZM.methods.readFromStorage = (key) => {
    let value = localStorage.getItem(key);
    return value && JSON.parse(value);
};

QWIZM.methods.writeToStorage = (key, value) => {
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

QWIZM.methods.writeClearView = () => {
    let html = `<h2>Warning!</h2>
                <p> Clicking the <span class = "highlight"> Clear Quiz </span> button below will reset the quiz, requiring you to log in again.</p >
                <p><span class="highlight"> All your input answers, currently stored in the browser, will be lost!</span></p>
                <p> Only click the <span class = "highlight"> Clear Quiz </span> button below if this is really what you intend.</p >
                <p>(Generally, the only reason to clear the quiz from the browser is if you plan to enter a fictitious ID to practise the quiz with a different set of question values.)</p>
                <button id="clear-button" type="submit">Clear Quiz</button>`;
    return html;
}

QWIZM.methods.writeFooter = () => {
    let state = QWIZM.methods.readFromStorage(QWIZM.QUIZ_KEY),
        // number of questions in this quiz
        len = QWIZM.quiz.questions.length,
        html = `
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
            </nav>`;
};