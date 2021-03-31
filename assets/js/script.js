var scoreList = document.querySelector("#score-list");
var viewScores = document.querySelector("#view-scores");
var highScores = document.querySelector("#high-scores");
var startButton = document.querySelector("#start-button");
var submitButton = document.querySelector("#submit-button");
var backButton = document.querySelector("#go-back");
var clearButton = document.querySelector("#clear");
var timer = document.querySelector("#timer");
var questions = document.querySelector("#questions");
var answers = document.querySelector("#answers");
var end = document.querySelector("#end");
var timeInterval;
var scoreSheet = [];

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
    {
        question: "Question1",
        options: ["One", "Two", "Three", "Four"],
        answer: "One"
    },
]

var questionCount = 0;
var timeLeft = questionList.length * 10;

function startQuiz() {
    var intro = document.querySelector("#intro");
    intro.setAttribute("class", "hidden");
    end.setAttribute("class", "hidden");
    questions.removeAttribute("class");
    questionCount = 0;
    timeLeft = questionList.length * 10;
    countdown();
    nextQuestion();
}

function countdown() {
    timer.textContent = "Time Left: " + timeLeft;
  
    timeInterval = setInterval(function () {
      timeLeft--;
      timer.textContent = "Time Left: " + timeLeft;
      
      if (timeLeft <= 0 || questionCount > questionList.length ) {
        endGame();
      }
  
    }, 1000);
  }

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
        window.alert("Correct!");
        console.log("Timer plus");
        timeLeft += 10;
        
    } else {
        window.alert("Wrong!");
        console.log("Timer minus");
        if (timeLeft <= 10) {
            timeLeft = 1;
        } else {
            timeLeft -= 10;
        }
    }

    for (var i = 0; i < questionList[questionCount].options.length; i++) {
        answers.removeChild(answers.firstChild);
    }

    questionCount++;

    if (questionCount >= questionList.length) {
        endGame();
    } else {
        nextQuestion();
    }
}

function endGame() {
    var score = timeLeft;
    var scoreDisplay = document.querySelector("#score");
    timer.textContent = "Time Left: " + timeLeft;

    scoreDisplay.innerHTML = "You scored: " + score;
    clearInterval(timeInterval);

    questions.setAttribute("class", "hidden");
    end.removeAttribute("class");
}

function submitScore(event) {
    event.preventDefault();
    var initials = document.querySelector("#initials");

    var scoreItems = {
        initials: initials.value,
        score: timeLeft
      };

    scoreSheet.push(scoreItems);
    scoreSheet.sort(function(a, b) {
        return b.score - a.score;
    });

    localStorage.setItem("Score", JSON.stringify(scoreSheet));
    alert("Thank you, " + initials.value + "! Your score of " + timeLeft + " has been logged.");
}

function getScores(event) {
    event.preventDefault();
    highScores.removeAttribute("class");
    intro.setAttribute("class", "hidden");
    questions.setAttribute("class", "hidden");
    end.setAttribute("class", "hidden");
    var scoreItems = JSON.parse(localStorage.getItem("Score"));

    if (scoreItems !== null) {
        scoreSheet = scoreItems;
    }

    for (var i = 0; i < scoreSheet.length; i++) {
        var scoreListItem = document.createElement("li");
        
        scoreListItem.textContent = i + 1 + ". " + scoreSheet[i].initials + " - " + scoreSheet[i].score;
        
        scoreList.appendChild(scoreListItem);
    }
}

function goBack() {
    highScores.setAttribute("class", "hidden");
    intro.removeAttribute("class");

    for (var i = 0; i < scoreSheet.length; i++) {
        scoreList.removeChild(scoreList.lastChild);
    }

    location.reload();
}

function clearScores() {
    localStorage.clear();
    
    while (scoreList.firstChild) {
        scoreList.removeChild(scoreList.firstChild);
    }

    scoreSheet = [];
}

viewScores.addEventListener("click", getScores);
submitButton.addEventListener("click", submitScore);
startButton.addEventListener("click", startQuiz);
backButton.addEventListener("click", goBack);
clearButton.addEventListener("click", clearScores);