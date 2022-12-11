/* eslint-disable no-plusplus */
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

let idCurrentQuiz;

const QuizPage = async (id) => {
  clearPage();

  if (!id) Navigate('/');

  idCurrentQuiz = id;
  const response = await fetch('/api/quiz/'.concat(id));

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const quiz = await response.json();

  renderQuizPage(quiz[0]);
};

function renderQuizPage(quiz) {
  const main = document.querySelector('main');
  const divQuiz = document.createElement('div');
  divQuiz.className = 'container-fluid text-center p-4 bg-secondary bg-opacity-25 ';
  const titleContainer = document.createElement('div');
  titleContainer.className = 'p-5 mt-5 bg-secondary text-dark border border-dark rounded-4';
  const title = document.createElement('h2');
  title.innerText = quiz.quizName;
  titleContainer.appendChild(title);
  const start = document.createElement('button');
  start.className = 'btn btn-primary m-5 px-5 py-2';
  start.id = 'start';
  start.innerText = 'Start';
  divQuiz.appendChild(titleContainer);
  divQuiz.appendChild(start);
  main.appendChild(divQuiz);

  start.addEventListener('click', () => {
    renderQuestions(quiz);
  });
}

function renderQuestions(quiz) {
  const score = 0;
  const arrayQuestions = quiz.questions;
  const index = 0;
  renderOneQuestion(arrayQuestions, index, score);
}

function renderOneQuestion(questions, indexArray, score) {
  clearPage();

  let currentScore = score;
  let currentIndex = indexArray;

  const arrayAnswers = [
    questions[indexArray].goodAnswer,
    questions[indexArray].falseAnswers[0],
    questions[indexArray].falseAnswers[1],
    questions[indexArray].falseAnswers[2],
  ];
  const main = document.querySelector('main');

  const divQuestion = document.createElement('div');
  divQuestion.className = 'container-fluid text-center p-4 bg-secondary bg-opacity-25';

  const divQuestionScore = document.createElement('div');
  divQuestionScore.className = 'mt-5 ms-2 d-flex justify-content-between';

  const numberQuestion = document.createElement('h4');
  numberQuestion.innerText = 'Question n°'.concat(indexArray + 1);
  const showScore = document.createElement('h4');
  showScore.id = 'score';
  showScore.innerText = 'Score : '.concat(currentScore.toString()).concat('/10');

  const divTitle = document.createElement('div');
  divTitle.className = 'p-5 bg-secondary text-dark border border-dark rounded-4';

  const title = document.createElement('h2');
  title.innerText = questions[indexArray].question;

  const answers = document.createElement('div');
  answers.className = 'container text-center mt-5';

  const divAnswerMsg = document.createElement('div');
  divAnswerMsg.className = 'row justify-content-around';
  divAnswerMsg.id = 'AnswerMsg';

  const divAnswers1 = document.createElement('div');
  divAnswers1.className = 'row justify-content-around';
  const answer1 = document.createElement('button');
  const answer2 = document.createElement('button');
  divAnswers1.appendChild(answer1);
  divAnswers1.appendChild(answer2);

  const divAnswers2 = document.createElement('div');
  divAnswers2.className = 'row justify-content-around';
  const answer3 = document.createElement('button');
  const answer4 = document.createElement('button');
  divAnswers2.appendChild(answer3);
  divAnswers2.appendChild(answer4);

  answer1.className = 'btn btn-primary col-2 m-3 ';
  answer1.id = 'answer1';
  answer2.className = 'btn btn-primary col-2 m-3 ';
  answer2.id = 'answer2';
  answer3.className = 'btn btn-primary col-2 m-3 ';
  answer3.id = 'answer3';
  answer4.className = 'btn btn-primary col-2 m-3 ';
  answer4.id = 'answer4';

  const arrayButtons = [answer1, answer2, answer3, answer4];
  const arrayAnswersLength = arrayAnswers.length;

  // eslint-disable-next-line no-plusplus
  for (let j = 0; j < arrayAnswersLength; j++) {
    const number = getRndInteger(0, arrayAnswers.length - 1);
    arrayButtons[j].innerText = arrayAnswers[number];
    arrayAnswers.splice(number, 1);
  }

  const divNext = document.createElement('div');
  divNext.className = 'd-flex flex-row-reverse';
  const nextButton = document.createElement('button');
  nextButton.className = 'btn btn-success col-1 disabled';
  nextButton.id = 'nextButton';
  nextButton.innerText = 'Next';
  divNext.appendChild(nextButton);

  answers.appendChild(divAnswerMsg);
  answers.appendChild(divAnswers1);
  answers.appendChild(divAnswers2);
  answers.appendChild(divNext);
  divQuestionScore.appendChild(numberQuestion);
  divQuestionScore.appendChild(showScore);
  divTitle.appendChild(title);
  divQuestion.appendChild(divQuestionScore);
  divQuestion.appendChild(divTitle);
  divQuestion.appendChild(answers);
  main.appendChild(divQuestion);

  answer1.addEventListener('click', disableFunction);
  answer2.addEventListener('click', disableFunction);
  answer3.addEventListener('click', disableFunction);
  answer4.addEventListener('click', disableFunction);

  nextButton.addEventListener('click', () => {
    if (currentIndex === 9) {
      renderScore(currentScore);
    } else {
      currentIndex++;
      renderOneQuestion(questions, currentIndex, currentScore);
    }
  });

  function disableFunction(e) {

    const divMsgAnswer = document.getElementById('AnswerMsg');
    const msg = document.createElement('h2');

    if (e.target.innerHTML === questions[indexArray].goodAnswer) {
      currentScore++;
      msg.innerText = 'Bien joué !';

      const newScore = document.getElementById('score');
      newScore.innerText = 'Score : '.concat(currentScore.toString()).concat('/10');

    } else {
      msg.innerText = 'Dommage';
    }
    divMsgAnswer.appendChild(msg);
    disableButtons(e.target.innerHTML,questions[indexArray].goodAnswer);
  }

  function disableButtons(givenAnswer,goodAnswer) {

    const tableAnswers = ['answer1', 'answer2', 'answer3', 'answer4'];

    for (let i = 0; i < tableAnswers.length; i++) {

      const answerToDisable = document.getElementById(tableAnswers[i]);
      answerToDisable.removeEventListener('click', disableFunction);
      answerToDisable.className = answerToDisable.className.concat('disabled');

      if (answerToDisable.innerHTML === givenAnswer && answerToDisable.innerHTML !== goodAnswer) {
        answerToDisable.className = answerToDisable.className.replace('btn-primary','btn-danger');
      }
      if (answerToDisable.innerHTML === goodAnswer)  {
        answerToDisable.className = answerToDisable.className.replace('btn-primary','btn-success');
      }
    }
    const nextEnable = document.getElementById('nextButton');
    nextEnable.className = nextEnable.className.replace('disabled', '');
  }
}

function renderScore(score) {
  clearPage();
  const finalScore = score.toString();

  const main = document.querySelector('main');

  const div1 = document.createElement('div');
  div1.className = 'container-fluid text-center p-4 bg-secondary bg-opacity-25';

  const divScoreMsg = document.createElement('div');
  divScoreMsg.className = 'p-5 mt-5 border border-dark rounded-4';
  const scoreMsg = document.createElement('h1');
  scoreMsg.innerText =
    // eslint-disable-next-line no-nested-ternary
    score === 10 ? 'Parfait' : score >= 7 ? 'Bien' : score >= 3 ? 'Tu peux mieux faire' : 'Aie aie aie';

  const divScore = document.createElement('div');
  divScore.className = 'p-3 m-3 border border-dark rounded-4';
  const finalScoreMsg = document.createElement('h2');
  finalScoreMsg.innerText = finalScore.concat('/10');

  const divButtons = document.createElement('div');
  divButtons.className = 'row justify-content-around';

  const button1 = document.createElement('button');
  const button2 = document.createElement('button');
  button1.className = 'btn btn-primary col-2 m-3 ';
  button2.className = 'btn btn-primary col-2 m-3 ';
  button1.innerText = 'Réessayer';
  button2.innerText = "Retourner à la page d'accueil";

  divScoreMsg.appendChild(scoreMsg);
  divScore.appendChild(finalScoreMsg);
  divButtons.appendChild(button1);
  divButtons.appendChild(button2);
  div1.appendChild(divScoreMsg);
  div1.appendChild(divScore);
  div1.appendChild(divButtons);
  main.appendChild(div1);

  button1.addEventListener('click', () => {
    QuizPage(idCurrentQuiz);
  });

  button2.addEventListener('click', () => {
    Navigate('/');
  });
}

// code pris du site https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default QuizPage;
