const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  // takes an array of items and converts them into something else.
  .map((score) => {
    // returns the username and score as a list item
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
