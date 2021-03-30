var view = document.querySelector("#view-scores");
var highScores = document.querySelector("#score-sheet");

view.addEventListener("click", hide);

function hide() {
    highScores.removeAttribute("class", "hidden");
}