/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
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
  titleQuiz.className = 'titleQuiz';

  const textWrapper = document.createElement('span');
  textWrapper.className = 'text-wrapper';

  const lettersWrapper = document.createElement('span');
  lettersWrapper.id = 'letters';
  lettersWrapper.innerText = 'Quiz : '.concat(quiz.quizName);

  const difficulty = document.createElement('h5');
  difficulty.innerText = 'Difficulty : '.concat(quiz.difficulty);

  const start = document.createElement('button');
  start.className = 'btn purple';
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
  const onClick = () => {
    start.removeEventListener('click', onClick);
    const score = 0;
    const index = 0;
    const delay = 1250;
    animationTransition1();
    setTimeout(() => {
      renderQuestions(quiz.questions, index, score);
    }, delay);
  };

  start.addEventListener('click', onClick);
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

  const main = document.querySelector('main');

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
  nextButton.className = 'btn purple disabled';
  nextButton.id = 'nextButton';
  nextButton.innerText = 'Next';
  divNext.appendChild(nextButton);

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
  banner.appendChild(divQuestion);
  main.appendChild(banner);

  // if there are still questions, call renderQuestions() for the next question. Otherwise call function renderScore()
  nextButton.addEventListener('click', () => {
    if (currentIndex === questions.length - 1) {
      renderScore(currentScore);
    } else {
      currentIndex++;
      renderQuestions(questions, currentIndex, currentScore);
    }
  });

  const tableAnswers = ['answer1', 'answer2', 'answer3', 'answer4'];
  tableAnswers.forEach((element) => {
    const answer = document.getElementById(element);
    answer.addEventListener('click', (e) => {
      const isCorrectAnswer = checkAnswer(e);
      animationMessageAnswer(isCorrectAnswer);
    });
  });

  if (currentIndex === 0) {
    animationTransition2();
  }

  // check the chosen answer
  function checkAnswer(e) {

    let isCorrectAnswer;
    const messageAnswer = document.getElementById('message');

    // if correct answer, increments score and update score message
    if (e.target.innerHTML === questions[indexArray].goodAnswer) {
      currentScore++;
      messageAnswer.innerText = 'Good job !';
      isCorrectAnswer = true;
      const newScore = document.getElementById('score');
      newScore.innerText = 'Score : '.concat(currentScore.toString()).concat('/10');
    } else {
      messageAnswer.innerText = 'Too bad';
      isCorrectAnswer = false;
    }
    messageAnswer.style.visibility = 'visible';
    disableButtons(e.target.innerHTML, questions[indexArray].goodAnswer);
    return isCorrectAnswer;
  }

  // disable buttons after choosing and activate the next button
  function disableButtons(givenAnswer, goodAnswer) {
    for (let i = 0; i < tableAnswers.length; i++) {
      const answerToDisable = document.getElementById(tableAnswers[i]);
      answerToDisable.removeEventListener('click', checkAnswer);
      answerToDisable.className = answerToDisable.className.concat('disabled');

      if (answerToDisable.innerHTML === givenAnswer && answerToDisable.innerHTML !== goodAnswer) {
        answerToDisable.className = answerToDisable.className.replace('btn-primary', 'btn-danger');
      }
      if (answerToDisable.innerHTML === goodAnswer) {
        answerToDisable.className = answerToDisable.className.replace('btn-primary', 'btn-success');
      }
    }
    const nextEnable = document.getElementById('nextButton');
    nextEnable.className = nextEnable.className.replace('disabled', '');
  }
}

/**
 * render score
 * @param {Number} score
 */
function renderScore(score) {
  clearPage();

  const main = document.querySelector('main');

  const div1 = document.createElement('div');
  div1.className = 'container-fluid banner text-center text-light p-4 vh-100';

  const divScoreMsg = document.createElement('div');
  divScoreMsg.className = 'p-5 mt-5 border border-dark rounded-4';

  // show message depending on score
  const scoreMsg = document.createElement('h1');
  scoreMsg.innerText =
    score === 10
      ? 'Perfect'
      : score >= 7
      ? 'Good'
      : score >= 3
      ? 'You can do better than that'
      : 'Oof';

  // show score
  const divScore = document.createElement('div');
  divScore.className = 'p-3 m-3 border border-dark rounded-4';
  const finalScoreMsg = document.createElement('h2');
  finalScoreMsg.innerText = score.toString().concat('/10');

  const divButtons = document.createElement('div');
  divButtons.className = 'row justify-content-around';

  const button1 = document.createElement('button');
  const button2 = document.createElement('button');
  button1.className = 'btn btn-primary col-2 m-3 ';
  button2.className = 'btn btn-primary col-2 m-3 ';
  button1.innerText = 'Retry';
  button2.innerText = 'Return to HomePage';

  divScoreMsg.appendChild(scoreMsg);
  divScore.appendChild(finalScoreMsg);
  divButtons.appendChild(button1);
  divButtons.appendChild(button2);
  div1.appendChild(divScoreMsg);
  div1.appendChild(divScore);
  div1.appendChild(divButtons);
  main.appendChild(div1);

  // Retry the quiz
  button1.addEventListener('click', () => {
    QuizPage(idCurrentQuiz);
  });

  // Return to HomePage
  button2.addEventListener('click', () => {
    Navigate('/');
  });
}

// code taken from the site https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animationQuizPage() {
  const title = document.querySelector('.titleQuiz #letters');
  title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime({
    targets: '.titleQuiz .letter',
    translateY: [100, 0],
    duration: 750,
    easing: 'easeOutExpo',
    delay: (el, i) => 50 * i
  });
}

function animationTransition1() {
  const div = document.getElementById('divQuiz');

  anime({
    targets: div,
    opacity: { value: 0, duration: 1000 },
    easing: 'linear',
  });
}

function animationTransition2() {
  const div = document.getElementById('divQuestion');

  const tl = anime.timeline();

  tl.add({
    targets: div,
    opacity: { value: 0 },
    easing: 'steps(1)',
  });

  tl.add({
    targets: div,
    opacity: { value: 1, duration: 750 },
    easing: 'easeInOutExpo',
  });
}

function animationMessageAnswer(isCorrect){
  const msg = document.getElementById('message');

  if (isCorrect){
    anime({
    targets: msg,
    scale: [0,1.5],
    easing: 'easeInOutExpo'
    });
  } else {
    anime({
      targets: msg,
      opacity: [0,1],
      translateY: [-100,0],
      easing: 'linear',
    });
  }
  
}

export default QuizPage;