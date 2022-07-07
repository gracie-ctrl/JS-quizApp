/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */
start = document.querySelector("#start");
start.addEventListener("click", function (e) {
  document.querySelector("#quizBlock").style.display = "block";
  start.style.display ="none";
});
// quizArray QUESTIONS & ANSWERS
// q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
// Basic ideas from https://code-boxx.com/simple-javascript-quiz/
const quizArray = [
  // Question 1
  {
    q: "Which is the third planet from the sun?",
    o: ["Saturn", "Earth", "Pluto", "Mars"],
    a: 1, // array index 1 - so Earth is the correct answer here
  },
  // Question 2
  {
    q: "Which is the largest ocean on Earth?",
    o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    a: 3, 
  },
  // Question 3
  {
    q: "What is the capital of Australia",
    o: ["Sydney", "Canberra", "Melbourne", "Perth"],
    a: 1,
  },
  // Question 4
  {
    q: 'Which city is hosting the next summer Olympics in 2024',
    o: ['Melbourne', 'Paris', 'New York', 'Toronto'],
    a: 1, // array index 1 - so Paris is the correct answer here
  },
  // Question 5
  {
  q: 'Where do dumplings originate from',
  o: ['Prague', 'North Pole', 'China', 'Japan'],
  a: 2, // array index 2 - so China is the correct answer here
  },
];


// function to Display the quiz questions and answers from the object
const displayQuiz = () => {
  quizWrap = document.querySelector("#quizWrap");
  let quizDisplay = "";
  const myArray = quizArray.map((quizItem, index) => {
    quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
    quizWrap.innerHTML = quizDisplay;
  });
};

displayQuiz();

// Calculate the score
let finalScore = 0;
const rArray = quizArray.map((quizItem, index) => {
  for (let i = 0; i < 4; i++) {
    let r = `radio_${index}_${i}`;
    radioElement = document.querySelector("#" + r);

    // add event listener to the radio button click
    radioElement.addEventListener("click", function (e) {
      // add code to calculate the score
      if (quizItem.a == i) {
        // if the answer is correct, increment the score
        finalScore = finalScore + 1;
      }
    });
  }
});

btnSubmit = document.querySelector("#btnSubmit");
btnReset = document.querySelector("#btnReset");
score = document.querySelector("#score");
display = document.querySelector("#time");

// add EventListener to display the score on the click of submit, highlight the correct answers
btnSubmit.addEventListener("click", displayScore);
function displayScore() {
  score.innerHTML = `Your final score is ${finalScore}`;
  btnSubmit.style.display = "none";

  const rArray = quizArray.map((quizItem, index) => {
    for (let i = 0; i < 4; i++) {
      let li = `li_${index}_${i}`;
      liElement = document.querySelector("#" + li);
      if (quizItem.a == i) {
        // if the answer is correct, highlight the div
        liElement.style.backgroundColor = "#C5F5CF";
        display.textContent = "Your time is up";
      }
    }
  });
}

// reset the page with the reset button is clicked
btnReset.addEventListener("click", function (e) {
  location.reload();
});

// countdown timer
function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    // if the timer ends, display the score and reveal the answers
    if (display.textContent == "00:00") {
      displayScore();
      return;
    }
    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

// timer is set to countdown from one minute
window.onload = function () {
  let oneMinute = 60 * 1; 
  //display = document.querySelector("#time");
  startTimer(oneMinute, display);
};
