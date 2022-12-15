import anime from 'animejs/lib/anime.es';
import { clearPage } from '../../utils/render';
import RedirectQuiz from '../Router/Redirect';

let quizzes;
const HomePage = async () => {
  try {
    clearPage();
    const response = await fetch('/api/quiz');
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    quizzes = await response.json();
    renderHomePage(quizzes);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('HomePage::error: ', err);
  }
};

function goToQuizButton() {
  const buttonToQuiz = document.getElementById('refToQuiz');
  buttonToQuiz.addEventListener('click', () => {
    document.getElementById('quizName').scrollIntoView();
  });
}
function renderHomePage(Allquiz) {
  const bomb = bombDisplay();
  const menuTableAsString = getQuizDivseAsString(Allquiz);
  const main = document.querySelector('main');

  // home

  const divHome = document.createElement('div');
  const sectionHome = document.createElement('section');
  sectionHome.className = 'container-fluid headline';
  divHome.className = 'container-fluid banner';
  const titleHome = document.createElement('h2');
  const descriptionHome = document.createElement('h3');

  // button href to quiz display
  const buttonToQuiz = document.createElement('a');
  buttonToQuiz.id = 'refToQuiz';
  buttonToQuiz.className = 'btn orange';
  buttonToQuiz.textContent = 'Start';

  titleHome.textContent = 'Time to Quiz !';
  titleHome.className = 'title-home';
  descriptionHome.textContent = 'Have fun, learn and create your own quiz by registering.';
  sectionHome.appendChild(titleHome);
  sectionHome.innerHTML += bomb;
  sectionHome.appendChild(descriptionHome);
  sectionHome.appendChild(buttonToQuiz);
  divHome.appendChild(sectionHome);

  // creation input for search
  const quizName = document.createElement('input');

  const divInputs = document.createElement('div');
  const divCenter = document.createElement('div');
  const submitButton = document.createElement('button');
  divCenter.className = 'form-row';
  divInputs.className = 'input-group mx-auto mb-3';
  divInputs.style = 'width: 50%; padding : 50px';
  divInputs.id = 'refQuiz';
  submitButton.id = 'buttonSearch';
  submitButton.type = 'submit';
  submitButton.className = 'btn orange';
  submitButton.textContent = 'Go';
  quizName.type = 'text';
  quizName.className = 'form-control';
  quizName.id = 'quizName';
  quizName.name = 'quiz-name';
  quizName.placeholder = 'Search';
  quizName.required = true;

  // dom add

  divInputs.appendChild(quizName);
  divInputs.appendChild(submitButton);
  divCenter.appendChild(divInputs);
  main.appendChild(divHome);
  main.appendChild(divCenter);

  main.innerHTML += menuTableAsString;

  // event listening for search

  const inputQuiz = main.querySelector('#quizName');
  inputQuiz.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      await searchBar();
      document.getElementById('quizName').scrollIntoView();
    }
  });
  const buttonSearch = main.querySelector('#buttonSearch');
  buttonSearch.addEventListener('click', async (e) => {
    e.preventDefault();
    await searchBar();
    document.getElementById('quizName').scrollIntoView();
  });

  // animations and buttons

  goToQuizButton();
  animationQuizHoverHome();
  animationHome();
  attachOnClickEventsToRenderQuiz(quizzes);
}

async function searchBar() {
  try {
    const quizName = document.querySelector('#quizName').value;
    const response = await fetch(`/api/quiz/search?quiz-name=${quizName}`);
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    quizzes = await response.json();
    clearPage();
    renderHomePage(quizzes);
    attachOnClickEventsToRenderQuiz(quizzes);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('HomePage::error: ', err);
  }
}
function getQuizDivseAsString(Allquiz) {
  const DivsQuizzes = getAllDivsLinesAsString(Allquiz);
  const QuizzesSection = addLinesToSectionGet(DivsQuizzes);
  return QuizzesSection;
}
function addLinesToSectionGet(divsLines) {
  const QuizzzesSection = `
  <section class="layout" id="homeLayout">
     ${divsLines}
  </section>
  `;
  return QuizzzesSection;
}

function getAllDivsLinesAsString(allQuiz) {
  let quizzesDivsLines = '';

  allQuiz?.forEach((quiz) => {
    quizzesDivsLines += `<div class= "quizContainer" id="quiz_${quiz.id}">
      <p>${quiz.quizName}</p>
    </div>`;
  });

  return quizzesDivsLines;
}

function attachOnClickEventsToRenderQuiz(allQuiz) {
  allQuiz?.forEach((quiz) => {
    const idQuiz = 'quiz_'.concat(quiz.id);
    const currentQuiz = document.getElementById(idQuiz);

    currentQuiz.addEventListener('click', () => {
      RedirectQuiz(quiz.id);
    });
  });
}

// bomb code inspired by Gabriele Corti : https://codepen.io/borntofrappe/pen/LwZRON
function bombDisplay() {
  const bombHtml = `
  <svg viewBox="-1 -1 40 120" width="110" height="110">
        <path
            id="motion-path"
            fill="none"
            stroke="none"
            d="M 0 0 v 5 a 10 10 0 0 1 -20 0 a 18 18 0 0 0 -36 0 v 30">
        </path>
        <g>
       
        <g transform="translate(-9 65)">
            <path
            id="textBoom"
            fill="none"
            d="M0,0 60,0 0,0 Q0,0 0,0 Q0,0 0,0 Q0,0 0,0 Q60,0" />
            <text>
            <textPath href="#textBoom" fill= "#FA9961">BOOM!</textPath>
            </text>
        </g>
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

  `;
  return bombHtml;
}

// animation hover by Alex Chan : https://codepen.io/alexchantastic/pen/XgXbgz

function animateButton(el, targetsX, scaleX, elasticityX) {
  anime.remove(el);
  anime({
    targets: el,
    scale: targetsX,

    duration: scaleX,

    elasticity: elasticityX,
  });
}

function enterButton(el) {
  animateButton(el, 1.1, 800, 400);
}

function leaveButton(el) {
  animateButton(el, 1.0, 600, 300);
}
function animationQuizHoverHome() {
  const quizzesContainer = document.getElementsByClassName('quizContainer');
  for (let i = 0; i < quizzesContainer.length; i += 1) {
    quizzesContainer[i].addEventListener(
      'mouseenter',
      (e) => {
        enterButton(e.target);
      },
      false,
    );

    quizzesContainer[i].addEventListener(
      'mouseleave',
      (e) => {
        leaveButton(e.target);
      },
      false,
    );
  }
}

function animationHome() {
  anime({
    targets: '.title-home',

    rotate: '1turn',
    duration: 2000,
  });

  const animation = anime.timeline({
    duration: 5000,
  });

  animation.add({
    targets: '#fuse',
    strokeDashoffset: (target) => -target.getTotalLength(),
    duration: 5000,

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
      duration: 5000,
      easing: 'linear',
    },
    '-=5000',
  );

  animation.add(
    {
      targets: '#ember',
      transform: Array(21)
        .fill('scale(2.1)')
        .map((scale, index) => (index % 2 === 0 ? 'scale(1.4)' : scale)),
      duration: 5000,
      easing: 'easeInOutSine',
      direction: 'alternate',
    },
    '-=5000',
  );

  animation.add(
    {
      targets: '#sparkles',
      transform: Array(21)
        .fill('scale(1)')
        .map((scale, index) => (index % 2 === 0 ? 'scale(0)' : scale)),
      duration: 5000,
      easing: 'easeInOutSine',
      direction: 'alternate',
    },
    '-=5000',
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

export default HomePage;
