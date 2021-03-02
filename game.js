const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

// Timer - set it up incase i wanted more than 1 minute.
const startingMinutes = 1;
let time = startingMinutes * 60;

const countdownEl = document.getElementById("countdown");

setInterval(updateCountdown, 1000);

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  countdownEl.innerHTML = "Time Left: " + time + "s";

  time--;
  time = time < 0 ? 0 : time;

  // I cannot figure how to subtract time from timer when answer is incorrect.

  const incorrectAns = document.getElementsByClassName("incorrect");
  if (incorrectAns === "incorrect") {
    time - 5;
  }
}

// List of questions from w3 schools javascript quiz
let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choice1: "The <head> section",
    choice2: "Both the <head> and <body> section are correct",
    choice3: "The <body> section",
    choice4: "In a <div> section",
    answer: 3,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
  {
    question: "How do you create a function in JavaScript?",
    choice1: "function = myFunction()",
    choice2: "function myFunction()",
    choice3: "function: myFunction();",
    choice4: "function 'myFunction()';",
    answer: 1,
  },
  {
    question: "How do call a function named myFunction?",
    choice1: "call myFunction()",
    choice2: "hello myFunction();",
    choice3: "myFunction();",
    choice4: "callFunction myFunction();",
    answer: 3,
  },
];

// number of points each question is worth.
const CORRECT_BONUS = 10;
// max number of questions
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  // stores array of question using a spread operator
  availableQuesions = [...questions];
  getNewQuestion();
};
// when out of question it will redirect to endpage
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // saves score
    localStorage.setItem("mostRecentScore", score);
    // to the end page
    return window.location.assign("end.html");
  }
  // when game starts it starts at 1
  questionCounter++;
  // updates progress of questions
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // Grabs and displays questions
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;
  // grabs and displays choices associated with question
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // gets rid of questions that are used
  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};
// javascript to recognize when a choice is clicked.
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    // pairs the question with the correct answer via data-number
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      // if answer is correct - apply css to show it is green
      // if answer is incorrect - apply css to show it is red
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      // will remove class at the end of answering question then move on to next question
      selectedChoice.parentElement.classList.remove(classToApply);
      // After question is answered, it gets a new question.

      getNewQuestion();
      //  1 second delay before transitioning to next question
    }, 1000);
  });
});
// totals out score throughout the game
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
