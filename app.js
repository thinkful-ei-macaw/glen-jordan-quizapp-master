/* eslint-disable no-undef */
/* eslint-disable strict */
/**
 * Example store structure
 */

//Display score along side question number
//show correct answer if you get it wrong

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What does wubba lubba dub dub mean?',
      answers: [
        'Please leave',
        "I'm a genius",
        "Let's Party",
        "I'm in great pain"
      ],
      correctAnswer: "I'm in great pain",
      imgUrl: './Images/peaceful.jpg',
      questionGIF: './Images/happy.gif',
    },
    {
      question: ' Name the song Rick uses to save the earth',
      answers: [
        'Rock Hortz',
        'Get Schwifty',
        'Do the Bingortz',
        'Stop, Drop, and Slitz'
      ],
      correctAnswer: 'Get Schwifty',
      imgUrl:'./Images/schwifty.gif',
      questionGIF: './Images/happy.gif',
    },
    {
      question: 'Which implement does Rick use to travel between dimensions?',
      answers: ['Rift Ray', 'Jump Laser', 'Interdimensional Ray', 'Portal Gun'],
      correctAnswer: 'Portal Gun',
      imgUrl: './Images/portal.gif',
      questionGIF: './Images/happy.gif',
    },
    {
      question:
        'Morty does accidentally have a child who is half alien. What species is his non-human half?',
      answers: ['Smarkian', 'Cromulan', 'Gazorpazorp', 'Gromflomite'],
      correctAnswer: 'Gazorpazorp',
      imgUrl: './Images/Gazorpazorp.gif',
      questionGIF: './Images/happy.gif',
    },
    {
      question: "What is Scary Terry's catchphrase?",
      answers: [
        "I'm your worst nightmare!",
        'Welcome to your nightmare, bitch!',
        'This is your nightmare!',
        "You can run, but you'll still die!"
      ],
      correctAnswer: 'Welcome to your nightmare, bitch!',
      imgUrl: './Images/terry.gif',
      questionGIF: './Images/happy.gif',
    }
  ],
  correctOrNot: [
    { correct: 'GET SCHWIFTY!', incorrect: 'NOPE!' },

    { correct: 'THE RICKEST OF RICKS!', incorrect: 'HA HA NO...' },

    { correct: 'TURBULENT JUICE!', incorrect: 'THE GODS ARE LAUGHING AT YOU' },

    { correct: 'YOU GET REAL FAKE DOORS!', incorrect: 'NO EYEHOLES FOR YOU' },

    {
      correct: 'THE CITIDEL OF RICKS WELCOMES YOU!',
      incorrect: 'CONSPIRING WITH A ROGUE SUMMER I SEE...'
    }
  ],
  score: 0,
  wrong: 0,
  num: 0,
  quizStart: false
};

//click event listener for renderQuestion function
function clickMe() {
  $('main').on('click', '#js-start-btn', function() {
    $(location).attr('href', renderQuestion);
  });
}

//FUNCTIONS FOR CURRENT QUESTION IN STORE OBJECT
function getCurrentQuestion() {
  const questionArr = store.questions;
  let currentQuestion = questionArr[store.num];
  return currentQuestion;
}

function renderQuestion() {
  let currentQuestion = getCurrentQuestion();
  let html = generateQuestion(currentQuestion);
  $('main').html(html).addClass('quiz');
}

function generateQuestion(question) {
  return `
  <header>
    <ul>
      <li>
          Question ${store.num + 1} of ${store.questions.length}
      </li> 
      <li>
          Your Current Score is ${store.score}
      </li>
    <ul>
  </header>
  <div class="question-box">
  <h2>${question.question}</h2>
  <figure>
    <img class="question-circle-img"
    src =${store.questions[store.num].questionGIF} alt="A Rick gif displayed on question"/>
  </figure>
      <form>  
        ${question.answers
          .map((e, index) => {
            return `
            <label  id="btnAnswers" for="answer${index}">
            <input id="answer${index}" name="questionDisplay" type="radio" value="${e}" required/>
            <span style="padding-left: 5px">${e}</span>
            </label>
            `;
          })
          .join('')}
          <button type="submit" id="submit-button">Submit</button>     
      </form>
      </div>`;
}

//RENDER WRONG ANSWER RESPONSE

function renderWrong(question, answer) {
  let html = generateWrong(question, answer);
  $('main').html(html);
}

function generateWrong(question, input) {
  let currentWrong = store.correctOrNot[store.num].incorrect;
  return `
   <header>
    <ul>
      <li>
          Question ${store.num + 1} of ${store.questions.length}
      </li> 
      <li>
          Your Current Score is ${store.score}
      </li>
    <ul>
  </header>
  <div class="question-box">
  <h2>${question.question}</h2>
  <figure>
    <img class="question-circle-img"
    src="${store.questions[store.num].imgUrl}"/>
  </figure>
  <div class="answer-box">
    <form>
        <h1>${currentWrong}</h1> 
        <p>You chose "${input}"</p> 
        <p>The correct answer was "${
          store.questions[store.num].correctAnswer
        }"</p>
        <button type="button" id="next-question">Next</button>
    </form>
  </div>`;
}

//RENDER CORRECT ANSWER RESPONSE

function renderCorrect(question, answer) {
  let html = generateCorrect(question, answer);
  $('main').html(html);
}

function generateCorrect(question) {
  let currentCorrect = store.correctOrNot[store.num].correct;
  return `
   <header>
    <ul>
      <li>
          Question ${store.num + 1} of ${store.questions.length}
      </li> 
      <li>
          Your Current Score is ${store.score}
      </li>
    <ul>
  </header>
  <div class="question-box">
  <h2>${question.question}</h2>
  <figure>
    <img class ="question-circle-img"
    src="${store.questions[store.num].question} alt="Variety of Rick and Morty gif images displayed for correct answer"/>
  </figure>
  <div class="answer-box">
    <form>
      <h1>${currentCorrect}</h1>
      <p>That was correct</p>
      <button class="button" type="button" id="next-question">Next</button>
    </form>
  </div>`;
}

function generateScore() {
  if (store.score === 0) {
    return `<div class='question-box'>
    <p>Your current Score is ${store.score} YOU GOT NONE OF THEM RIGHT!!</p>
    </div>`;
  } else if (store.score > 0 && store.score < store.questions.length) {
    return `<div class='question-box'>
    <p>Your current Score is ${store.score} Not too bad, but you can do better!</p>
    </div>`;
  } else if (store.score === store.questions.length) {
    return `<div class='question-box'>
    <p>Your current Score is ${store.score} YOU ARE THE RICKEST OF RICKS!</p>
    </div>`;
  }
}

//FINAL PAGE DISPLAY FUNCTIONS

//RESET QUIZ TO BEGINNING
function resetQuiz() {
  const score = generateScore();
  $('main').html(`${score}<button id="goBack">Click Me</button>`);
  $('main').on('click', '#goBack', function() {
    store.num = 0;
    store.score = 0;
    renderFirstPage();
  });
}

function registerListeners() {
  $('main').on('submit', 'form', function(e) {
    e.preventDefault();
    let currentQuestion = getCurrentQuestion();
    let userAnswer = $('input:checked').val();

    if (userAnswer === currentQuestion.correctAnswer) {
      store.score += 1;
      $('main').append(renderCorrect(currentQuestion, userAnswer));
    } else {
      store.wrong += 1;
      $('main').append(renderWrong(currentQuestion, userAnswer));
    }

    store.num += 1;

    $('#next-question').show();
  });

  $('main').on('click', '#next-question', function(e) {
    //make a button on the last page that is a listener
    e.preventDefault();

    if (store.num === store.questions.length) {
      resetQuiz();
    } else {
      renderQuestion();
    }
  });
}

function renderFirstPage() {
  $('main').html(`
  <header id="rick-intro">
    <h1>THE RICK AND MORTY QUIZ</h1>
  </header>
  <div id="intro-info">
        <h2> The Best Rick and Morty quiz ever </h2>
        <h3>
        <p>It's time to do some Rick and Morty trivia!</p>
        <p>ONLY the Rickest of Ricks will be able to pass.</p>
    </h3>
    <div id = "schwift">
      <button id = "js-start-btn">GET SCHWIFTY</button> 
    </div>
  </div>
`).removeClass('quiz');
}

function runQuiz() {
  registerListeners();
  renderFirstPage();
  clickMe();
}

$(runQuiz);

/**
 *
 * Your app should include a render() function, that regenerates
 * the view each time the store is updated. See your course
 * material, consult your instructor, and reference the slides
 * for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 */

// Used to add sibling elements to the
// function domElementMaker(element) {
//   const newElement = document.createElement(element);
//   document.body.appendChild(newElement);
//   return newElement;
// }
