var scoreList = document.querySelector("#score-list");
var pageTop = document.querySelector("#page-top");
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

// Object that contains list of questions that will be asked, as well as user options and correct answer
var questionList = [
    {
        question: "What tag would you use to create a hyperlink in HTML?",
        options: ["<p>", "<link>", "<h1>", "<a>"],
        answer: "<a>"
    },
    {
        question: "In Javascript, what needs to be declared before use?",
        options: ["Intentions", "Variables", "War", "Rights"],
        answer: "Variables"
    },
    {
        question: "In CSS, what can you use to make elements on a page flex?",
        options: ["Flexgrid", "Flexprism", "Flexroom", "Flexbox"],
        answer: "Flexbox"
    },
    {
        question: "The buttons on this page are arranged in a:",
        options: ["Column", "Tower", "Stack", "Group"],
        answer: "Column"
    },
    {
        question: "Which method attaches an event handler to a specific element?",
        options: [".makeEventListener()", ".createEventListener()", ".addEventListener()", ".appendEventListener()"],
        answer: ".addEventListener()"
    },
    {
        question: "What object is used to store multiple values in a single variable?",
        options: ["Number", "Boolean", "String", "Array"],
        answer: "Array"
    },
    {
        question: "Identify which of the following CSS selectors would be used for an id:",
        options: [".element", "#element", "!element", "?element"],
        answer: "#element"
    },
    {
        question: "What can be included inside of an HTML element to provide additional information?",
        options: ["Index", "Glossary", "Reference", "Attribute"],
        answer: "Attribute"
    },
    {
        question: "In Javascript, what do you call a block of code designed to perform a particular task?",
        options: ["System", "Function", "Duty", "Mission"],
        answer: "Function"
    },
    {
        question: "In CSS, which property can you use to alter the color of a font?",
        options: ["font-color", "style-type", "color", "rgb"],
        answer: "color"
    },
]

var questionCount = 0;
var timeLeft = questionList.length * 10;

// Hides all page elements not associated with the quiz portion. Resets the time left and current question number, then begins the timer and question functions.
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

// Begins the timer. Will move to the endGame function upon time expiring.
function countdown() {
    timer.textContent = "Time Left: " + timeLeft;
  
    timeInterval = setInterval(function () {
      timeLeft--;
      timer.textContent = "Time Left: " + timeLeft;
      
      if (timeLeft <= 0) {
        endGame();
      }
  
    }, 1000);
  }

// Obtains the next question in the array and then appends buttons that include options for the user to click.
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

// Compares the users choice to the correct answer. Time will be added or subtracted based on answer, and user will be alerted with the result.
// If no questions are left the endGame function will be called, otherwise nextQuestion will be called again.
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
            timeLeft = 0;
            clearInterval(timeInterval);
        } else {
            timeLeft -= 10;
        }
    }
    
    // Removes the buttons to prepare for the next question.
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

// Adds the user's score to the page and stops the timer. The questions element is hidden and the end element is revealed.
function endGame() {
    var score = timeLeft;
    var scoreDisplay = document.querySelector("#score");
    timer.textContent = "Time Left: " + timeLeft;

    scoreDisplay.innerHTML = "You scored: " + score;
    clearInterval(timeInterval);

    questions.setAttribute("class", "hidden");
    end.removeAttribute("class");
}

// Will parse any scores in local storage.
// If no scores are in local storage, the current score will be pushed into the array.
// If local storage already contains scores, they will be parsed and then added to the array before the new score is pushed.
// Any scores in the array are then sorted before being pushed to local storage. The user is then alerted and the page reloads.
function submitScore(event) {
    event.preventDefault();
    var initials = document.querySelector("#initials");
    var scoreParse = JSON.parse(localStorage.getItem("Score"));

    if (scoreParse !== null) {
        scoreSheet = scoreParse;
    }

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
    location.reload();
}

// Hides all elements other than the high scores section.
// The timer is halted if the user clicks while already taking the quiz.
// The scores in local storager are then parsed and a for loop creates list items to append the scores to the page.
// If no scores exist, the page will tell the user "This is empty!".
function getScores(event) {
    event.preventDefault();
    clearInterval(timeInterval);
    var scoreLabel = document.querySelector("#score-label");
    highScores.removeAttribute("class");
    pageTop.setAttribute("class", "hidden");
    intro.setAttribute("class", "hidden");
    questions.setAttribute("class", "hidden");
    end.setAttribute("class", "hidden");
    console.log("clicked");

    var scoreItems = JSON.parse(localStorage.getItem("Score"));

    if (scoreItems == null) {
        scoreLabel.textContent = "This is empty!";
    } else {
        scoreLabel.textContent = "Highscores!";
        for (var i = 0; i < scoreItems.length; i++) {
            var scoreListItem = document.createElement("li");
            
            scoreListItem.textContent = i + 1 + ". " + scoreItems[i].initials + " - " + scoreItems[i].score;
            
            scoreList.appendChild(scoreListItem);
            console.log("Added item");
        }
    } 
}

// Hides the high scores section and then reveals the header and start page. The entire page is then reloaded.
function goBack() {
    highScores.setAttribute("class", "hidden");
    intro.removeAttribute("class");
    pageTop.removeAttribute("class");

    location.reload();
}

// Clears all items within local storage, removes all scores listed in the high scores section, then empties the array of scores stored in the scoreSheet variable.
function clearScores() {
    localStorage.clear();
    
    while (scoreList.firstChild) {
        scoreList.removeChild(scoreList.firstChild);
    }

    scoreSheet = [];
}

// Triggers added to buttons found on the page that call separate functions.
viewScores.addEventListener("click", getScores);
submitButton.addEventListener("click", submitScore);
startButton.addEventListener("click", startQuiz);
backButton.addEventListener("click", goBack);
clearButton.addEventListener("click", clearScores);