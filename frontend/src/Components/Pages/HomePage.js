/* eslint-disable func-names */
import anime from 'animejs/lib/anime.es';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

let quizzes;
const HomePage = async () => {
  try {
    clearPage();
    const response = await fetch('/api/quiz');
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    quizzes = await response.json();
    
    renderQuizzesFromString(quizzes);
    const form = document.querySelector('form');
    form.addEventListener('submit', searchBar);
    animationHome();
    goToQuizButton();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('HomePage::error: ', err);
  }
};
function animationHome(){
  anime({
    targets: '.title-home',

    rotate: '1turn',
    duration: 2000  
  });

  const animation = anime.timeline({
    duration: 5000
  });
  
  animation.add({
    targets: '#fuse',
    strokeDashoffset: (target) => -target.getTotalLength(),
    duration: 5000,
  
    begin: (ani) => {
      const {target} = ani.animatables[0];
      const length = target.getTotalLength();
      target.setAttribute('stroke-dasharray', length);
    },
    easing: 'linear',
  });
  
  const motionPath = document.querySelector('#motion-path');
  const path = anime.path(motionPath);
  animation.add({
    targets: '#spark',
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    duration: 5000,
    easing: 'linear',
  }, '-=5000');
  
  animation.add({
    targets: '#ember',
    transform: Array(21).fill('scale(2.1)').map((scale, index) => index % 2 === 0 ? 'scale(1.4)': scale),
    duration: 5000,
    easing: 'easeInOutSine',
    direction: 'alternate',
  }, '-=5000');
  
  animation.add({
    targets: '#sparkles',
    transform: Array(21).fill('scale(1)').map((scale, index) => index % 2 === 0 ? 'scale(0)': scale),
    duration: 5000,
    easing: 'easeInOutSine',
    direction: 'alternate',
  }, '-=5000');
  
  animation.add({
    targets: '#spark',
    scale: 4.5,
    opacity: 0,
    duration: 250,
    easing: 'easeInOutSine',
  });
  animation.add({
    targets: '#bomb',
    scale: 1.5,
    opacity: 0,
    duration: 300,
    delay: 50,
    easing: 'easeInOutSine',
  }, '-=250');
}
function renderSearch(quiz){
  const menuTableAsString = getMenuTableAsString(quiz);
  const main = document.querySelector('main');

  const titleHome = document.createElement('h2');
  titleHome.textContent = "Search";

  const form = document.createElement('form');
  form.className = 'p-5 justify-content-center';
  const quizName = document.createElement('input');
  const divInputs = document.createElement('div');
  const divCenter = document.createElement('div');
  const submitButton = document.createElement('button');
  form.style = 'margin: auto; max-width:400px height:500px'
  divInputs.className = 'input-group'
  divInputs.id = 'refQuiz';
  submitButton.type = 'submit';
  submitButton.className = 'btn purple';
  submitButton.textContent = 'Go';
  quizName.type = 'text';  
  quizName.id = "quizName";
  quizName.name = "quiz-name";
  quizName.placeholder = 'Search';
  quizName.required = true;
  
  // dom add 
  main.appendChild(titleHome);
  divInputs.appendChild(quizName);
  divInputs.appendChild(submitButton);
  divCenter.appendChild(divInputs);
  form.appendChild(divCenter)
  main.appendChild(form);
  main.innerHTML += menuTableAsString;
}
function goToQuizButton(){
  const buttonToQuiz = document.getElementById('refToQuiz');
  buttonToQuiz.onclick = function(){document.getElementById('refQuiz').scrollIntoView()};
}
function renderQuizzesFromString(Allquiz) {
  const bomb = bombDisplay();
  const menuTableAsString = getMenuTableAsString(Allquiz);
  const main = document.querySelector('main');

  // home
  
  const divHome = document.createElement('div');
  const sectionHome = document.createElement('section');
  sectionHome.className = 'headline';
  divHome.className = 'container-fluid banner'
  const titleHome = document.createElement('h2');
  const descriptionHome = document.createElement('h3');
  const buttonToQuiz = document.createElement('a');

  buttonToQuiz.id = "refToQuiz"
  buttonToQuiz.className = 'btn purple';
  buttonToQuiz.textContent = 'Start';
  titleHome.textContent = "Time to Quiz !";
  titleHome.className = "title-home"
  descriptionHome.textContent = "Have fun and learn.";
  sectionHome.appendChild(titleHome);
  sectionHome.innerHTML += bomb;
  sectionHome.appendChild(descriptionHome);
  sectionHome.appendChild(buttonToQuiz);
  divHome.appendChild(sectionHome);

  // form search quizName

  const form = document.createElement('form');
  
  form.className = 'p-5 justify-content-center';
  const quizName = document.createElement('input');
  const divInputs = document.createElement('div');
  const divCenter = document.createElement('div');
  const submitButton = document.createElement('button');
  form.style = 'margin: auto; max-width:400px'
  divInputs.className = 'input-group'
  divInputs.id = 'refQuiz';
  submitButton.type = 'submit';
  submitButton.className = 'btn purple';
  submitButton.textContent = 'Go';
  quizName.type = 'text';  
  quizName.id = "quizName";
  quizName.name = "quiz-name";
  quizName.placeholder = 'Search';
  quizName.required = true;
  
  // dom add 

  divInputs.appendChild(quizName);
  divInputs.appendChild(submitButton);
  divCenter.appendChild(divInputs);
  form.appendChild(divCenter)
  main.appendChild(divHome);
  main.appendChild(form);

  main.innerHTML += menuTableAsString;
}

async function searchBar(e) {
  e.preventDefault();
  try {
    const quizName = document.querySelector('#quizName').value;
    let response = await fetch(`/api/quiz/search?quiz-name=${quizName}`);
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    quizzes = await response.json();

    if (quizzes.length === 0){
      clearPage();
      response = await fetch('/api/quiz');
      if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      quizzes = await response.json();
      Navigate('/');

      renderSearch(quizzes);
    }
    else{
      clearPage();

      renderSearch(quizzes);
      
 
    }
  
  
    
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('HomePage::error: ', err);
  }
}
function getMenuTableAsString(Allquiz) {
  const menuTableLines = getAllTableLinesAsString(Allquiz);
  const menuTable = addLinesToTableHeadersAndGet(menuTableLines);
  return menuTable;
}
function addLinesToTableHeadersAndGet(tableLines) {
  const menuTable = `
  <section class="layout">
     ${tableLines}
  </section>
  `;
  return menuTable;
}

function getAllTableLinesAsString(allQuiz) {
  let quizzesTableLines = '';
  
  allQuiz?.forEach((quiz) => {
    quizzesTableLines += `<div>
      <p>${quiz.quizName}</p>
    </div>`;
  });

  return quizzesTableLines;
}

function bombDisplay(){
  const bombHtml = 
  `
  <svg viewBox="-1 -1 40 120" width="110" height="110">
        <path
            id="motion-path"
            fill="none"
            stroke="none"
            d="M 0 0 v 5 a 10 10 0 0 1 -20 0 a 18 18 0 0 0 -36 0 v 30">
        </path>
        <g>
       
        <g transform="translate(-4.2 58)">
            <path
            id="MyPath"
            fill="none"
            d="M0,0 60,0 0,0 Q0,0 0,0 Q0,0 0,0 Q0,0 0,0 Q60,0" />
            <text>
            <textPath id="textBoom" href="#MyPath" fill= "#E2A4FE">BOOM</textPath>
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
  `
  return bombHtml;
}
export default HomePage;