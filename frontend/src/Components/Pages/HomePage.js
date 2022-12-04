import anime from 'animejs/lib/anime.es';
import { clearPage } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
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
}
function renderQuizzesFromString(Allquiz) {
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
  quizName.name = "quizName";
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
    
    Navbar();
    clearPage();
    
    if (quizzes.length === 0){
      Navigate('/');
      response = await fetch('/api/quiz');
      if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      quizzes = await response.json();
  
      renderQuizzesFromString(quizzes);
    }
    else{
      Navigate(`/quiz/search?quiz-name=${quizName}`);
      renderQuizzesFromString(quizzes);
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
  
export default HomePage;
