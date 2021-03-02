const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
// grabs score from game.js
const mostRecentScore = localStorage.getItem("mostRecentScore");

// converts string to array - gets array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

// displays score on end page
finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  // disables save if there is no text
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();

  // captures score and name entered
  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  // add scores to the high score list - and keeps the top 5 scores.
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  // updates local storage high scores
  localStorage.setItem("highScores", JSON.stringify(highScores));
  // navigates to go back home after saving score
  window.location.assign("index.html");
};
