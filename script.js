//create questions and assign to variable -- syntax referenced through sitepoint.com
let questionsArray = [
  {
    title: "Commonly used data types do NOT include:",
    options: ["a. Strings", "b. Booleans", "c. Alerts", "d. Numbers"],
    correctAnswer: "c. Alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within _____.",
    options: ["a. Quotes", "b. Curly brackets", "c. Parentheses", "d. Square brackets"],
    correctAnswer: "c. Parentheses"
  },
  {
    title: "Arrays in JavaScript can be used to store ______.",
    options: ["a. Numbers and strings", "b. Other arrays", "c. Booleans", "d. All of the above"],
    correctAnswer: "d. All of the above"
  },
  {
    title: "String values must be enclosed within _____ when being assigned to variables.",
    options: ["a. Commas", "b. Curly brackets", "c. Quotes", "d. Parenthesis"],
    correctAnswer: "c. Quotes"
  },
  {
    title: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["a. Javascript", "b. Terminal / bash", "c. For loops", "d. Console log"],
    correctAnswer: "d. Console log"
  },
];
//gets all elements we need and sets them to variable to reference later
let startButton = document.getElementById("startButton");
let questionPlace = document.getElementById("question-box");
let optionButtons = document.getElementById("option-buttons");
let questionsEl = document.getElementById("question");
let timerEl = document.querySelector(".timer-count");
let intro = document.getElementById("firstSlide");
//create a place for correct/wrong answers to appear
let showAnswer = document.createElement("div");
showAnswer.setAttribute("id", "showAnswer");

//assign start values to some variables
let secondsRemaining = 76;
let secondsPenalized = 15;
let currentQuestion = "";
let score = 0;
let questionIndex = 0;
let timerInt;


//event listener to wait for user to click start and is connected to startQuiz function
startButton.addEventListener("click", startQuiz);

//function to start the quiz, starts at first question and calls other functions
function startQuiz() {
  questionIndex = 0;
  startTimer();
  newQuestion();
}
//gets next question in the line until there are no more and it calls end
function newQuestion() {
  currentQuestion = questionsArray[questionIndex]
  showQuestion(currentQuestion)
  questionIndex++;
  if (questionIndex >= questionsArray.length) {
    displayScore();

  }
}
//sets the timer and displays it
function startTimer() {
  let timerInt = setInterval(function() {
    secondsRemaining--;
    timerEl.textContent = secondsRemaining;

    if(secondsRemaining <= 0) {
      clearInterval(timerInt);
      displayScore();
    }

  }, 1000);
}
//clears the intro text and shows questions one at a time 
function showQuestion(question) {
  intro.innerHTML = "";
  questionsEl.innerText = question.title;
  optionButtons.innerHTML = "";
  for(let i=0; i< question.options.length; i++) {
    let option = document.createElement("button");
    option.setAttribute("value", question.options[i]);
    option.textContent = question.options[i];
    option.onclick = checkAnswer;
    optionButtons.append(option)
  }
 
}
//compares userchoice to real answer and tells user if correct or not
function checkAnswer(event) {
  if (event.target.value === currentQuestion.correctAnswer) {
    showAnswer.textContent = "Correct!"
    score++
  }
  else {
    showAnswer.textContent = "Wrong"
    secondsRemaining = secondsRemaining - secondsPenalized;
  }
  if (questionIndex <questionsArray.length){
    newQuestion()
  }
  else {
    displayScore()
  }
  questionPlace.appendChild(showAnswer);
}

//displays the score based on seconds remaining
function displayScore() {
  questionPlace.innerHTML = "";
  secondsRemaining = "";

  let createHeader = document.createElement("h1");
  createHeader.setAttribute("id", "createHeader");
  createHeader.textContent = "End of Quiz!";
  questionPlace.appendChild(createHeader);

    if (secondsRemaining >= 0) {
        let createPara = document.createElement("p");
        clearInterval(timerInt);
        createPara.textContent = "Your score is: " + secondsRemaining;

        questionPlace.appendChild(createPara);
    }


}
