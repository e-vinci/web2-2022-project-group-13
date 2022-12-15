/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
// import anime from 'animejs/lib/anime.es';
import anime from 'animejs';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

// save current quiz id if the user wants to retry
let idCurrentQuiz;

const QuizPage = async (id) => {
  clearPage();
  window.scrollTo(0, 0);

  if (!id) Navigate('/');

  idCurrentQuiz = id;
  const response = await fetch('/api/quiz/id/'.concat(id));

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const quiz = await response.json();

  renderQuizPage(quiz[0]);
};

/**
 * render quiz page
 * @param {Object} quiz
 */
function renderQuizPage(quiz) {
  // render quiz title and start button
  const main = document.querySelector('main');

  const banner = document.createElement('div');
  banner.className = 'banner';

  const divQuiz = document.createElement('div');
  divQuiz.id = 'divQuiz';
  divQuiz.className = 'container-fluid text-center text-light p-4 vh-100';

  const titleContainer = document.createElement('div');
  titleContainer.className = 'p-5 mt-5';

  const titleQuiz = document.createElement('h1');
  titleQuiz.className = 'quizh1';

  const textWrapper = document.createElement('span');
  textWrapper.className = 'text-wrapper';

  const lettersWrapper = document.createElement('span');
  lettersWrapper.id = 'letters';
  lettersWrapper.innerText = 'Quiz : '.concat(quiz.quizName);

  const difficulty = document.createElement('h5');
  difficulty.innerText = 'Difficulty : '.concat(quiz.difficulty);

  const start = document.createElement('button');
  start.className = 'btn orange';
  start.id = 'start';
  start.innerText = 'Start';

  textWrapper.appendChild(lettersWrapper);
  titleQuiz.appendChild(textWrapper);
  titleContainer.appendChild(titleQuiz);
  titleContainer.appendChild(difficulty);
  divQuiz.appendChild(titleContainer);
  divQuiz.appendChild(start);

  banner.appendChild(divQuiz);
  main.appendChild(banner);

  // deactive start button, initialize score and index to browse quiz
  const onClickStart = () => {
    start.removeEventListener('click', onClickStart);
    const score = 0;
    const index = 0;
    const delay = 1500;
    animationTransition1();
    setTimeout(() => {
      renderQuestions(quiz.questions, index, score);
    }, delay);
  };

  start.addEventListener('click', onClickStart);
  animationQuizPage();
}

/**
 * render each question from questions
 * @param {Array} questions
 * @param {Number} indexArray
 * @param {Number} score
 */
function renderQuestions(questions, indexArray, score) {
  clearPage();

  let currentScore = score;
  let currentIndex = indexArray;
  let timeLeft = 10;

  const main = document.querySelector('main');
  const bombHTML = bombDisplay();

  const banner = document.createElement('div');
  banner.className = 'banner';

  const divQuestion = document.createElement('div');
  divQuestion.className = 'container-fluid text-center text-light p-4 vh-100';
  divQuestion.id = 'divQuestion';

  const divQuestionScore = document.createElement('div');
  divQuestionScore.className = 'my-3 mx-5 d-flex justify-content-between';

  // render number of the question, message and score
  const numberQuestion = document.createElement('h4');
  numberQuestion.innerText = 'Question n°'.concat(indexArray + 1);
  const message = document.createElement('h1');
  message.id = 'message';
  message.innerText = 'Text';
  message.style.visibility = 'hidden';
  const showScore = document.createElement('h4');
  showScore.id = 'score';
  showScore.innerText = 'Score : '.concat(currentScore.toString()).concat('/10');

  // render title
  const divTitle = document.createElement('div');
  divTitle.className = 'm-5 p-5 bg-secondary border border-dark rounded-4 justify-content-center';

  const title = document.createElement('h2');
  title.innerText = questions[indexArray].question;

  // render answers
  const answers = document.createElement('div');
  answers.className = 'container text-center mt-5';

  const divAnswers = document.createElement('div');
  divAnswers.id = 'divAnswers';

  const colAnswers1 = document.createElement('div');
  colAnswers1.className = 'row justify-content-around';
  const answer1 = document.createElement('button');
  const answer2 = document.createElement('button');
  colAnswers1.appendChild(answer1);
  colAnswers1.appendChild(answer2);

  const colAnswers2 = document.createElement('div');
  colAnswers2.className = 'row justify-content-around';
  const answer3 = document.createElement('button');
  const answer4 = document.createElement('button');
  colAnswers2.appendChild(answer3);
  colAnswers2.appendChild(answer4);

  answer1.className = 'btn btn-primary col-2 m-3 ';
  answer1.id = 'answer1';
  answer2.className = 'btn btn-primary col-2 m-3 ';
  answer2.id = 'answer2';
  answer3.className = 'btn btn-primary col-2 m-3 ';
  answer3.id = 'answer3';
  answer4.className = 'btn btn-primary col-2 m-3 ';
  answer4.id = 'answer4';

  // create array with answers from the question
  const arrayAnswers = [
    questions[indexArray].goodAnswer,
    questions[indexArray].falseAnswers[0],
    questions[indexArray].falseAnswers[1],
    questions[indexArray].falseAnswers[2],
  ];

  // create array with buttons
  const arrayButtons = [answer1, answer2, answer3, answer4];
  const arrayAnswersLength = arrayAnswers.length;

  // randomize the distribution of answers in buttons
  for (let j = 0; j < arrayAnswersLength; j++) {
    const number = getRndInteger(0, arrayAnswers.length - 1);
    arrayButtons[j].innerText = arrayAnswers[number];
    arrayAnswers.splice(number, 1);
  }

  const divNext = document.createElement('div');
  divNext.className = 'd-flex flex-row-reverse';
  const nextButton = document.createElement('button');
  nextButton.className = 'btn orange disabled';
  nextButton.id = 'nextButton';
  nextButton.innerText = 'Next';
  divNext.appendChild(nextButton);

  const divBomb = document.createElement('div');
  divBomb.innerHTML += bombHTML;

  divAnswers.appendChild(colAnswers1);
  divAnswers.appendChild(colAnswers2);
  answers.appendChild(divAnswers);
  answers.appendChild(divNext);
  divQuestionScore.appendChild(numberQuestion);
  divQuestionScore.appendChild(message);
  divQuestionScore.appendChild(showScore);
  divTitle.appendChild(title);
  divQuestion.appendChild(divQuestionScore);
  divQuestion.appendChild(divTitle);
  divQuestion.appendChild(answers);
  divQuestion.appendChild(divBomb);
  banner.appendChild(divQuestion);
  main.appendChild(banner);

  // onClickNext for removing nextButton eventListener
  const onClickNext = () => {
    nextButton.removeEventListener('click', onClickNext);
    animationNextLeft();
    const delay = 800;

    // if there are still questions, recursive call renderQuestions() for the next question. Otherwise call function renderScore()
    // functions with setTimeOut for smooth animation
    if (currentIndex === questions.length - 1) {
      setTimeout(() => {
        renderScore(currentScore);
      }, delay);
    } else {
      currentIndex++;
      setTimeout(() => {
        renderQuestions(questions, currentIndex, currentScore);
      }, delay);
    }
  };

  nextButton.addEventListener('click', onClickNext);

  // addEventListener for each buttons answers
  arrayButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const isCorrectAnswer = checkAnswer(e);
      animationMessageAnswer(isCorrectAnswer);
    });
  });

  if (currentIndex === 0) {
    animationTransition2();
  } else {
    animationNextRight();
  }

  // set timer and bomb animation
  let timerPage = setTimeout(countdown, 1000);
  animationBombQuiz();

  // check the chosen answer
  function checkAnswer(e) {
    clearTimeout(timerPage);
    let isCorrectAnswer;
    const messageAnswer = document.getElementById('message');

    if (e.target.innerHTML !== questions[indexArray].goodAnswer) {
      messageAnswer.innerText = 'Too bad';
      isCorrectAnswer = false;
    }
    // if correct answer, increments score and update score message
    else {
      currentScore++;
      messageAnswer.innerText = 'Good job !';
      isCorrectAnswer = true;

      const newScore = document.getElementById('score');
      newScore.innerText = 'Score : '.concat(currentScore.toString()).concat('/10');
    }

    messageAnswer.style.visibility = 'visible';
    disableButtons(e.target.innerHTML, questions[indexArray].goodAnswer);
    return isCorrectAnswer;
  }

  // disable buttons after choosing and activate the next button for the next question
  function disableButtons(givenAnswer, goodAnswer) {
    arrayButtons.forEach((button) => {
      const buttonToDisable = button;
      buttonToDisable.removeEventListener('click', checkAnswer);
      buttonToDisable.className = buttonToDisable.className.concat('disabled');

      // if wrong answer chosen, shows only the answer choice in red and the correct answer in green
      if (buttonToDisable.innerHTML === givenAnswer && buttonToDisable.innerHTML !== goodAnswer) {
        buttonToDisable.className = buttonToDisable.className.replace('btn-primary', 'btn-danger');
      }
      // if correct answer chosen, shows only the answer in green
      if (buttonToDisable.innerHTML === goodAnswer) {
        buttonToDisable.className = buttonToDisable.className.replace('btn-primary', 'btn-success');
      }
    });

    const nextEnable = document.getElementById('nextButton');
    nextEnable.className = nextEnable.className.replace('disabled', '');
  }

  function countdown() {
    // decrements time left if not zero
    timeLeft--;
    if (timeLeft > 0) {
      timerPage = setTimeout(countdown, 1000);
    }
    // else disable buttons and shows the right answer
    else {
      const messageAnswer = document.getElementById('message');
      messageAnswer.innerText = 'Too bad';
      messageAnswer.style.visibility = 'visible';
      disableButtons(questions[indexArray].goodAnswer, questions[indexArray].goodAnswer);
      animationMessageAnswer(false);
    }
  }
}

/**
 * render score
 * @param {Number} score
 */
function renderScore(score) {
  clearPage();

  const main = document.querySelector('main');

  const banner = document.createElement('div');
  banner.className = 'banner';

  const div1 = document.createElement('div');
  div1.className = 'container-fluid text-center text-light p-4 vh-100';

  const divScoreMsg = document.createElement('div');
  divScoreMsg.className = 'p-5 mt-5';

  // show message depending on score
  const scoreMsg = document.createElement('h1');
  scoreMsg.className = 'quizh1';

  const textWrapper = document.createElement('span');
  textWrapper.className = 'text-wrapper';

  const wordsWrapper = document.createElement('span');
  wordsWrapper.id = 'words';
  wordsWrapper.innerText =
    score === 10
      ? 'Perfect'
      : score >= 7
      ? 'Good'
      : score >= 3
      ? 'You can do better than that'
      : 'Oof';

  // show score
  const divScore = document.createElement('div');
  divScore.className = 'p-3 m-3 mb-5';
  divScore.id = 'divScore';
  const finalScoreMsg = document.createElement('h2');
  finalScoreMsg.innerText = 'Your score : '.concat(score.toString().concat('/10'));

  const divButtons = document.createElement('div');
  divButtons.id = 'divButtons';
  divButtons.className = 'row justify-content-around';

  const button1 = document.createElement('button');
  const button2 = document.createElement('button');
  button1.className = 'btn btn-primary col-2 m-3 ';
  button2.className = 'btn btn-primary col-2 m-3 ';
  button1.innerText = 'Retry';
  button2.innerText = 'Return to HomePage';

  textWrapper.appendChild(wordsWrapper);
  scoreMsg.appendChild(textWrapper);
  divScoreMsg.appendChild(scoreMsg);
  divScore.appendChild(finalScoreMsg);
  divButtons.appendChild(button1);
  divButtons.appendChild(button2);
  div1.appendChild(divScoreMsg);
  div1.appendChild(divScore);
  div1.appendChild(divButtons);
  banner.appendChild(div1);
  main.appendChild(banner);

  // Retry the quiz
  button1.addEventListener('click', () => {
    QuizPage(idCurrentQuiz);
  });

  // Return to HomePage
  button2.addEventListener('click', () => {
    Navigate('/');
  });

  animationScorePage();
}

// code taken from the site https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function bombDisplay() {
  const buttonToQuiz = document.createElement('a');
  buttonToQuiz.id = 'refToQuiz';
  buttonToQuiz.className = 'btn orange';
  buttonToQuiz.textContent = 'Start';
  const bombHtml = `
  <svg viewBox="-1 -1 40 120" width="110" height="110">
        <path
            id="motion-path"
            fill="none"
            stroke="none"
            d="M 0 0 v 5 a 10 10 0 0 1 -20 0 a 18 18 0 0 0 -36 0 v 30">
        </path>
        <g>
            <g transform="rotate(20) translate(97 14)">
                <path
                    id="fuse"
                    fill="none"
                    stroke="#703811"
                    stroke-width="2"
                    d="M 0 0 v 5 a 10 10 0 0 1 -20 0 a 18 18 0 0 0 -36 0 v 30">
                </path>
                <!-- translate the #spark group -->
                <g id="spark">
                    <!-- scale the #ember path -->
                    <path
                        id="ember"
                        transform="scale(1.75)"
                        stroke="#F3A37C"
                        stroke-width="1.25"
                        d="M -4.5 -1.5 h 3 l 1.5 -3 l 1.5 3 h 3 l -2.5 2.5 l 1.5 3.25 l -3.5 -2 l -3.5 2 l 1.5 -3.25 l -2.5 -2.5z"
                        fill="#FFF9EE">
                    </path>
                    <!-- scale #sparkles group -->
                    <g
                        id="sparkles"
                        transform="scale(0)">
                        <g
                            fill="#F3A37C">
                            <circle
                                transform="rotate(10) translate(12 0)"
                                cx="0"
                                cy="0"
                                r="2">
                            </circle>
                            <circle
                                transform="rotate(170) translate(12 0)"
                                cx="0"
                                cy="0"
                                r="2">
                            </circle>
                            <circle
                                transform="rotate(90) translate(12 0)"
                                cx="0"
                                cy="0"
                                r="2">
                            </circle>
                            <circle
                                transform="rotate(-60) translate(13 0)"
                                cx="0"
                                cy="0"
                                r="2">
                            </circle>
                            <circle
                                transform="rotate(-120) translate(13 0)"
                                cx="0"
                                cy="0"
                                r="1.75">
                            </circle>
                        </g>
                    </g>
                </g>
            </g>
            <g transform="rotate(20) translate(41 56)"><!-- translate to modify the transform origin and scale the bomb from its center -->
                <!-- scale the #bomb group -->
                <g
                    id="bomb"
                    fill="#000000">
                    <circle
                        cx="0"
                        cy="0"
                        r="30">
                    </circle>
                    <rect
                        x="-12"
                        y="-37"
                        width="24"
                        height="10">
                    </rect>
                </g>
            </g>
        </g>
    </svg>
    <input type="range" min="0" max="100" value="0" id = "timerBomb" />
  `;
  return bombHtml;
}
async function animationBombQuiz() {
  const input = document.getElementById('timerBomb');

  // as the timeline progresses update the value of the input
  const timeline = anime.timeline({
    // eslint-disable-next-line no-return-assign
    update: ({ progress }) => (input.value = progress),
  });

  // function called following the input event
  // update the timeline to show the percentage matching the value of the input
  function handleInput() {
    const { value } = this;
    timeline.seek((timeline.duration * value) / 100);
  }

  input.addEventListener('input', handleInput);

  /* add the animations to the timeline
  ! use negative values as second argument of the .add() function to specify overlaps between animations
  */

  // animate the fuse to have the stroke-dashoffset properties match in negative the total length of the path
  // ! negative to have the shape hidden backwards
  timeline.add({
    targets: '#fuse',
    strokeDashoffset: (target) => -target.getTotalLength(),
    duration: 10000,
    // ! have the stroke-dasharray match the length of the path to create the actual dashes
    begin: (ani) => {
      const { target } = ani.animatables[0];
      const length = target.getTotalLength();
      target.setAttribute('stroke-dasharray', length);
    },
    easing: 'linear',
  });

  const animation = anime.timeline({
    duration: 10000,
  });

  animation.add({
    targets: '#fuse',
    strokeDashoffset: (target) => -target.getTotalLength(),
    duration: 10000,

    begin: (ani) => {
      const { target } = ani.animatables[0];
      const length = target.getTotalLength();
      target.setAttribute('stroke-dasharray', length);
    },
    easing: 'linear',
  });

  const motionPath = document.querySelector('#motion-path');
  const path = anime.path(motionPath);
  animation.add(
    {
      targets: '#spark',
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      duration: 10000,
      easing: 'linear',
    },
    '-=10000',
  );

  animation.add(
    {
      targets: '#ember',
      transform: Array(21)
        .fill('scale(2.1)')
        .map((scale, index) => (index % 2 === 0 ? 'scale(1.4)' : scale)),
      duration: 10000,
      easing: 'easeInOutSine',
      direction: 'alternate',
    },
    '-=10000',
  );

  animation.add(
    {
      targets: '#sparkles',
      transform: Array(21)
        .fill('scale(1)')
        .map((scale, index) => (index % 2 === 0 ? 'scale(0)' : scale)),
      duration: 10000,
      easing: 'easeInOutSine',
      direction: 'alternate',
    },
    '-=10000',
  );

  animation.add({
    targets: '#spark',
    scale: 4.5,
    opacity: 0,
    duration: 250,
    easing: 'easeInOutSine',
  });
  animation.add(
    {
      targets: '#bomb',
      scale: 1.5,
      opacity: 0,
      duration: 300,
      delay: 50,
      easing: 'easeInOutSine',
    },
    '-=250',
  );
}

function animationQuizPage() {
  const title = document.querySelector('.quizh1 #letters');
  title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime({
    targets: '.quizh1 .letter',
    translateY: [200, 0],
    duration: 750,
    easing: 'easeOutExpo',
    delay: (el, i) => 50 * i,
  });
}

function animationTransition1() {
  const div = document.getElementById('divQuiz');

  anime({
    targets: div,
    opacity: { value: 0, duration: 1500 },
    easing: 'linear',
  });
}

function animationTransition2() {
  const div = document.getElementById('divQuestion');

  anime({
    targets: div,
    opacity: [
      { value: 0, duration: 0 },
      { value: 1, duration: 500 },
    ],
    easing: 'linear',
  });
}

function animationMessageAnswer(isCorrect) {
  const msg = document.getElementById('message');

  if (isCorrect) {
    anime({
      targets: msg,
      scale: [0, 1.5],
      easing: 'easeInOutExpo',
    });
  } else {
    anime({
      targets: msg,
      opacity: [0, 1],
      translateY: [-100, 0],
      easing: 'linear',
    });
  }
}

function animationNextLeft() {
  const div = document.getElementById('divQuestion');

  anime({
    targets: div,
    translateX: [0, -2000],
    easing: 'easeInOutExpo',
  });
}

function animationNextRight() {
  const div = document.getElementById('divQuestion');

  anime({
    targets: div,
    translateX: [2000, 0],
    easing: 'easeInOutExpo',
  });
}

function animationScorePage() {
  const message = document.querySelector('.quizh1 #words');
  message.innerHTML = message.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  const score = document.getElementById('divScore');
  const buttons = document.getElementById('divButtons');

  const animation = anime.timeline({
    easing: 'easeOutExpo',
    duration: 500,
  });

  animation.add({
    targets: '.quizh1 .letter',
    translateY: [-200, 0],
    delay: (el, i) => 50 * i,
  });

  animation.add({
    targets: score,
    translateX: [2000, 0],
  });

  animation.add({
    targets: buttons,
    translateX: [-2000, 0],
  });
}

export default QuizPage;
