var highScores = document.querySelector("#score-sheet");
var startButton = document.querySelector("#start-button");
var timer = document.querySelector("#timer");
var questions = document.querySelector("#questions");
var answers = document.querySelector("#answers");

var questionList = [
    {
        question: "Question1",
        options: ["One", "Two", "Three", "Four"],
        answer: "One"
    },
    {
        question: "Question1",
        options: ["One", "Two", "Three", "Four"],
        answer: "One"
    },
    {
        question: "Question1",
        options: ["One", "Two", "Three", "Four"],
        answer: "One"
    },
]

var questionCount = 0;
var timeLeft = questionList.length * 15;

function startQuiz() {
    var intro = document.querySelector("#intro");
    intro.setAttribute("class", "hidden");
    questions.removeAttribute("class");
    questionCount = 0;
    nextQuestion();
}

startButton.addEventListener("click", startQuiz);

function nextQuestion() {
    var currentQuestion = questionList[questionCount];
    var question = document.querySelector("#question-text");
    question.textContent = currentQuestion.question;

    for (var i = 0; i < currentQuestion.options.length; i++) {
        var optionButton = document.createElement("button");
        optionButton.setAttribute("class", "choice");
        optionButton.setAttribute("value", currentQuestion.options[i]);
        optionButton.textContent = currentQuestion.options[i];
        optionButton.addEventListener("click", checkAnswer);
        answers.appendChild(optionButton);
    }

}

function checkAnswer() {
    var correctAnswer = questionList[questionCount].answer;
    var target = this.textContent;
    console.log(correctAnswer);

    if (target == correctAnswer) {
        window.alert("True!");
        console.log("Timer plus");
        
    } else {
        window.alert("False!");
        console.log("Timer minus");
        
    }

    for (var i = 0; i <= 3; i++) {
        answers.removeChild(answers.firstChild);
    }

    questionCount++;

    if (questionCount >= questionList.length) {
        return;
        // END and go to score screen
    } else {
        nextQuestion();
    }

}





