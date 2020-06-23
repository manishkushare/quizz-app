console.log("working");
// data
// title of question
// option of question
// correct answer

// methods
// 1. isCorrect() = to cheack whether the anser given by user is correct ot not
let hero = document.querySelector(".hero-flex");
let components = document.querySelector(".components");
components.style.display = "none";
let start = document.querySelector(".start");
start.addEventListener("click", () => {
  console.log("man");
  hero.style.display = "none";
  components.style.display = "block";
});

// let quizList= document.querySelector(".quiz-option-list");
// quizList.addEventListener("click", () => {
//     event.target.style.backgroundColor = "#56B2FB"
// });

class Question {
  constructor(title, options, correctAnswerIndex) {
    this.title = title;
    this.options = options;
    this.correctAnswerIndex = correctAnswerIndex;
  }
  isCorrect(answer) {
    return this.correctAnswerIndex === answer;
  }
  getCorrectAnswer() {
    return this.options[this.correctAnswerIndex];
  }

  render() {
    // let root = document.getElementById("root");
    return `
        <header class="heading ">
            <div class="container">
                <nav class="flex nav-position">
                    <h1 class="logo"><a href="#"><strong>html</strong>Quizz</a></h1>
                   
                </nav>
            </div>
        </header>
  
        <main>

            <article class="container quizz-body">
                <div class="border">
                    <h2 class="quiz-title">
                    ${this.title}
                    </h2>
                    <div class="option-body">
                        
                            ${this.options
                              .map(
                                (option, index) => `
                            <div class="quizz-option-list odd-list">
                            <input class="radio-btn" type="radio" name=${this.title} id="optionOne" value= ${index}>
                            <label for="optionOne">${option}</label>
                            </div>`
                              )
                              .join("")}
                            
                        
                    </div>
                    
                </div>
            </article>
        </main>
  `;
  }
}

let question1 = new Question(
  "What is the tag used for heading?",
  ["h1", "h2", "h3", "h4"],
  0
);

let question2 = new Question("which of the following tag is used to mark a begining of paragraph ?", ["TD", "br", "p", "TR"], 2);

let question3 = new Question(
  "Which HTML element is used for displaying the biggest heading?",
  ["h1", "h2", "h4", "h6"],
  0
);

let question4 = new Question(
  "Which element is used to emphasize text?",
  ["i", "em", "italic", "italics"],
  1
);

let question5 = new Question(
  "How many heading elements are there in HTML5?",
  ["1", "2", "6", "7"],
  3
);

let question6 = new Question(
  "Which tag is used to link pages?",
  ["link", "a", "href", "ref"],
  2
);

let question7 = new Question(
    "HTML stands for?",
    ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None of these"],
    0
  );

let question8 = new Question(
    "The attribute of <form> tag",
    ["Method", "Action", "Both (a)&(b)", "None of these"],
    1
  );

let question9 = new Question(
    "Markup tags tell the web browser",
    ["How to organise the page", "How to display the page", "How to display message box on page", "None of these"],
    1
  );

let question10 = new Question(
    "Web pages starts with which ofthe following tag?",
    ["body", "title", "HTML", "form"],
    2
  );

  
console.log(question1);
console.log(question1.isCorrect("<h1>"));
console.log(question1.isCorrect("<h4>"));
console.log(question1.getCorrectAnswer());
question1.render();
question2.render();
question3.render();
question4.render();
question5.render();
question6.render();

let root = document.getElementById("root");
let nextBtn = document.querySelector(".btn");
let notification = document.querySelector(".notification");
let retakeQuizz = document.querySelector(".restart");
let finalScore = document.querySelector("final-score");

class Quiz {
  constructor(rootElem, nextElem, finalScore, questions) {
    this.questions = questions;
    this.nextElem = nextElem;
    this.rootElem = rootElem;
    this.finalScore = finalScore;
    this.activeQuestionIndex = 0;
    this.score = 0;
    this.handleFunction = this.handleFunction();
    
  }

  handleFunction() {
    console.log("test");
    // this.nextElem.addEventListener("click", (e) => this.nextQuestion());
    this.nextElem.addEventListener("click", () => {
      let inputs = document.querySelectorAll(".radio-btn");
      let selectedInput = [...inputs].filter((input) => {
        return input.checked;
      });
      if (!selectedInput[0]) {
        notification.innerText = "Select an Answer to go forward!";
        return;
      }
      var currentQuestion = this.questions[this.activeQuestionIndex];
      // console.log(currentQuestion, selectedInput[0].value)
      console.log(currentQuestion.isCorrect(+selectedInput[0].value));
      if (currentQuestion.isCorrect(+selectedInput[0].value)) {
        this.score++;
        this.activeQuestionIndex++;
        // localStorage.setItem('activeQuestionIndex', this.activeQuestionIndex); 
      }
      else {
          this.activeQuestionIndex++;
      }

      this.nextQuestion(this.activeQuestionIndex);
    });
    this.rootUI();
  }
  nextQuestion() {
    notification.innerText = "";
    // finalScore.innerText = "";
    retakeQuizz.style.display = "none";
    // localStorage.setItem(this.currentQuestion)
    // this.activeQuestionIndex++;
    // localStorage;
    if (this.activeQuestionIndex > this.questions.length - 1) {
      root.style.display = "none";
      nextBtn.style.display = "none";
      document.querySelector(
        ".final-score"
      ).innerText = `Final Score is ${this.score}`;
      console.log(this.score);
      retakeQuizz.style.display = "block";
      retakeQuizz.innerText = "Retake the Quiz";
      retakeQuizz.addEventListener("click", this.restartQuizz);
      return;
    }
    this.rootUI();
  }

  restartQuizz() {
    let quizone = new Quiz(root, nextBtn, finalScore, [question1, question2]);
    quizone.rootUI();

    document.querySelector(".final-score").innerText = "";

    root.style.display = "block";
    nextBtn.style.display = "block";
    nextBtn.classList.add("btn", "input-btn");
  }

  rootUI() {
    retakeQuizz.style.display = "none";
    // finalScore.innerText= "";

    this.rootElem.innerHTML = this.questions[this.activeQuestionIndex].render();
  }
}

let quizOne = new Quiz(root, nextBtn, finalScore, [question1, question2]);
quizOne.rootUI();
