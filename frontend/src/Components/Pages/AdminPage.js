/* eslint-disable */

// import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';

let currentTab = 0;
const AdminPage = async () => {
  if (isAuthenticated() && getAuthenticatedUser().isAnAdmin === true) {
    clearPage();

    const response = await fetch('/api/admin');
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const quizUnverified = await response.json();

    renderAdminUI(quizUnverified);
  } else {
    Navigate('/');
  }
};

async function getUnverifiedList() {
  const response = await fetch('/api/admin');
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const quizUnverified = await response.json();
  return quizUnverified;
}

async function getVerifiedList() {
  const response2 = await fetch('/api/admin/all');
  if (!response2.ok) throw new Error(`fetch error : ${response2.status} : ${response2.statusText}`);
  const quizVerified = await response2.json();
  return quizVerified;
}

function renderAdminUI(quizDefault) {
  let quizList = quizDefault;

  const main = document.querySelector('main');

  const wrapper = document.createElement('div');
  wrapper.style = 'padding: 25px 10%;';
  wrapper.classList.add('container-fluid', 'vh-100', 'wrapperAdmin');

  const row = document.createElement('div');
  row.classList.add('row');

  // render button tab
  const leftTab = document.createElement('div');
  leftTab.classList.add('col-lg-2', 'col-md-4', 'p-0');
  // render list tab
  const rightTab = document.createElement('div');
  rightTab.classList.add('col-lg-10', 'col-md-8', 'col-xs-12', 'list-group', 'rightTab');

  const btnGroup = document.createElement('div');
  btnGroup.classList.add(
    'btn-group-toggle',
    'btn-group-vertical',
    'w-100',
    'text-center',
    'list-group',
    'list-group-flush',
    'leftTab',
  );
  const toVerify = document.createElement('button');
  toVerify.classList.add('btn', 'list-group-item', 'list-group-item-action', 'adminBtn', 'active');
  toVerify.textContent = 'To verify';
  const allQuiz = document.createElement('button');
  allQuiz.classList.add('btn', 'list-group-item', 'list-group-item-action', 'adminBtn');
  allQuiz.textContent = 'All quiz';

  btnGroup.appendChild(toVerify);
  btnGroup.appendChild(allQuiz);
  leftTab.appendChild(btnGroup);
  row.appendChild(leftTab);
  row.appendChild(rightTab);
  wrapper.appendChild(row);
  main.appendChild(wrapper);

  renderQuizList(quizList);

  // add active on button
  toVerify.addEventListener('click', async () => {
    clearRightTab();

    const activeItem = document.querySelector('.active');
    activeItem.classList.remove('active');
    toVerify.classList.add('active');

    quizList = await getUnverifiedList();

    renderQuizList(quizList);
  });
  allQuiz.addEventListener('click', async () => {
    clearRightTab();

    const activeItem = document.querySelector('.active');
    activeItem.classList.remove('active');
    allQuiz.classList.add('active');

    quizList = await getVerifiedList();

    renderQuizList(quizList);
  });
}

function renderQuizList(quizList) {
  const rightTab = document.querySelector('.rightTab');
  quizList.forEach((element) => {
    const quizLink = document.createElement('div');
    quizLink.classList.add('list-group-item', 'list-group-item-action', 'text-light', 'quizLink');

    // quiz id
    const pointer = parseInt(element.id);

    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btn', 'btn-danger', 'float-right', 'w-25', 'btnRemove');
    btnRemove.textContent = 'remove';

    // delete event
    btnRemove.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('pointer event ' + pointer);
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`/api/admin/remove/${pointer}`, options);
      if (!response.ok)
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      console.log('delete ' + JSON.stringify(response.url));
      Navigate('../admin');
    });

    // render quiz tile
    const quizElement = document.createElement('div');
    const quizElementTitle = document.createElement('a');
    quizElement.classList.add('d-flex', 'flex-row');
    quizElementTitle.textContent = element.quizName;
    quizElementTitle.classList.add('w-75', 'text-center', 'm-auto');
    quizElementTitle.href = '';

    // go on quiz page event
    quizElementTitle.addEventListener('click', async (e) => {
      e.preventDefault();
      clearPage();
      const response = await fetch(`/api/admin/quiz/${pointer}`);
      if (!response.ok)
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      const quiz = await response.json();
      renderCreateQuizForm(quiz[0]);
      showTab(currentTab);
    });

    quizElement.appendChild(quizElementTitle);
    quizElement.appendChild(btnRemove);
    quizLink.appendChild(quizElement);
    rightTab.appendChild(quizLink);
  });
}

const clearRightTab = () => {
  const rightTab = document.querySelector('.rightTab');
  rightTab.innerHTML = '';
};

function showTab(n) {
  const x = document.getElementsByClassName('tab');
  x[n].style.display = 'block';
  if (n === 0) {
    document.getElementById('prevBtn').style.display = 'none';
  } else {
    document.getElementById('prevBtn').style.display = 'inline';
  }
  if (n === x.length - 1) {
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'inline';
  } else {
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'inline';
  }
  fixStepIndicator(n);
}

const validateForm = () => {
  const x = document.getElementsByClassName('tab');
  const y = x[currentTab].getElementsByTagName('input');
  let valid = true;

  // eslint-disable-next-line
  if (valid) {
    document.getElementsByClassName('step')[currentTab].className += ' finish';
  }
  return valid;
};

const nextPrev = (n) => {
  const x = document.getElementsByClassName('tab');
  if (n === 1 && !validateForm()) return false;
  x[currentTab].style.display = 'none';
  currentTab += n;
  if (currentTab >= x.length) {
    document.getElementById('formulaire').submit();
    return false;
  }
  showTab(currentTab);
  return true;
};

function fixStepIndicator(n) {
  const x = document.getElementsByClassName('step');

  // eslint-disable-next-line
  for (let i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(' active', '');
  }
  x[n].className += ' active';
}
// fin

function renderCreateQuizForm(quiz) {
  const main = document.querySelector('main');

  const wrapper = document.createElement('div');
  wrapper.style = 'padding: 25px 17% 25px; background-color: lightgrey;';
  // wrapper.className = 'vh-100';

  const title = document.createElement('h2');
  title.innerText = 'Crée ton propre quiz !';
  wrapper.appendChild(title);

  const form = document.createElement('form');
  form.className = 'p-3 bg-white';
  form.id = 'formulaire';
  main.setAttribute('tabindex', '-1');

  const rowNameReturn = document.createElement('div');
  rowNameReturn.classList.add('row');

  const nameHolder = document.createElement('div');
  nameHolder.className = 'form-group col-md-7';
  const nameLabel = document.createElement('label');
  nameLabel.htmlFor = 'quizName';
  nameLabel.innerText = 'Nom du quiz :';
  nameHolder.appendChild(nameLabel);
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'form-control';
  nameInput.id = 'quizName';
  nameInput.placeholder = quiz.quizName;
  nameHolder.appendChild(nameInput);

  form.appendChild(nameHolder);

  const difficultySelectorWrapper = document.createElement('div');
  difficultySelectorWrapper.className = 'input-group pt-3';

  const labelWrapper = document.createElement('div');
  labelWrapper.className = 'input-group-prepend';
  const label = document.createElement('label');
  label.className = 'input-group-text';
  label.htmlFor = 'difficulty';
  label.innerText = 'Difficulté : ';
  labelWrapper.appendChild(label);

  const select = document.createElement('select');
  select.className = 'custom-select col-md-1';
  select.id = 'difficulty';
  const facile = document.createElement('option');
  facile.value = 'facile';
  facile.innerText = 'Facile';
  select.appendChild(facile);
  const moyen = document.createElement('option');
  moyen.value = 'moyen';
  moyen.innerText = 'Moyen';
  select.appendChild(moyen);
  const difficile = document.createElement('option');
  difficile.value = 'difficile';
  difficile.innerText = 'Difficile';
  select.appendChild(difficile);
  for (var i, j = 0; (i = select.options[j]); j++) {
    if (i.value == quiz.difficulty) {
      select.selectedIndex = j;
      break;
    }
  }
  select.setAttribute('disabled', '');

  difficultySelectorWrapper.appendChild(labelWrapper);
  difficultySelectorWrapper.appendChild(select);
  form.appendChild(difficultySelectorWrapper);

  const stepsWrapper = document.createElement('div');
  stepsWrapper.className = 'text-center float-right';

  quiz.questions.forEach((element) => {
    const questionWrapper = document.createElement('div');
    questionWrapper.className = 'tab p-4';
    const questionNumber = document.createElement('h5');
    questionNumber.innerText = 'Question '.concat(element.number);
    questionWrapper.appendChild(questionNumber);

    const intituleWrapper = document.createElement('div');
    intituleWrapper.className = 'form-group col-md-8';
    const intituleLabel = document.createElement('label');
    intituleLabel.htmlFor = 'intitule-'.concat(element.number);
    intituleLabel.innerText = 'Intitulé de la question :';
    intituleWrapper.appendChild(intituleLabel);
    const intituleInput = document.createElement('input');
    intituleInput.type = 'text';
    intituleInput.className = 'form-control';
    intituleInput.id = 'intitule-'.concat(element.number);
    intituleInput.placeholder = element.question;
    intituleWrapper.appendChild(intituleInput);
    questionWrapper.appendChild(intituleWrapper);

    const row1 = document.createElement('div');
    row1.className = 'row pt-3';

    const AnswerWrapper = document.createElement('div');
    AnswerWrapper.className = 'form-group col-md-6';
    const AnswerLabel = document.createElement('label');
    AnswerLabel.htmlFor = 'bonneReponse-'.concat(element.number);
    AnswerLabel.innerText = 'Bonne réponse :';
    AnswerWrapper.appendChild(AnswerLabel);
    const AnswerInput = document.createElement('input');
    AnswerInput.type = 'text';
    AnswerInput.className = 'form-control';
    AnswerInput.id = 'bonneReponse-'.concat(element.number);
    AnswerInput.placeholder = element.goodAnswer;
    AnswerWrapper.appendChild(AnswerInput);
    row1.appendChild(AnswerWrapper);

    const BadAnswer1Wrapper = document.createElement('div');
    BadAnswer1Wrapper.className = 'form-group col-md-6';
    const BadAnswer1Label = document.createElement('label');
    BadAnswer1Label.htmlFor = 'mauvaiseReponse1-'.concat(element.number);
    BadAnswer1Label.innerText = 'Mauvaise réponse 1 :';
    BadAnswer1Wrapper.appendChild(BadAnswer1Label);
    const BadAnswer1Input = document.createElement('input');
    BadAnswer1Input.type = 'text';
    BadAnswer1Input.className = 'form-control';
    BadAnswer1Input.id = 'mauvaiseReponse1-'.concat(element.number);
    BadAnswer1Input.placeholder = element.falseAnswers[0];
    BadAnswer1Wrapper.appendChild(BadAnswer1Input);
    row1.appendChild(BadAnswer1Wrapper);

    questionWrapper.appendChild(row1);

    const row2 = document.createElement('div');
    row2.className = 'row pt-3 pb-3';

    const BadAnswer2Wrapper = document.createElement('div');
    BadAnswer2Wrapper.className = 'form-group col-md-6';
    const BadAnswer2Label = document.createElement('label');
    BadAnswer2Label.htmlFor = 'mauvaiseReponse2-'.concat(element.number);
    BadAnswer2Label.innerText = 'Mauvaise réponse 2 :';
    BadAnswer2Wrapper.appendChild(BadAnswer2Label);
    const BadAnswer2Input = document.createElement('input');
    BadAnswer2Input.type = 'text';
    BadAnswer2Input.className = 'form-control mauvaiseReponse2';
    BadAnswer2Input.id = 'mauvaiseReponse2-'.concat(element.number);
    BadAnswer2Input.placeholder = element.falseAnswers[1];
    BadAnswer2Wrapper.appendChild(BadAnswer2Input);
    row2.appendChild(BadAnswer2Wrapper);

    const BadAnswer3Wrapper = document.createElement('div');
    BadAnswer3Wrapper.className = 'form-group col-md-6';
    const BadAnswer3Label = document.createElement('label');
    BadAnswer3Label.htmlFor = 'mauvaiseReponse3-'.concat(element.number);
    BadAnswer3Label.innerText = 'Mauvaise réponse 3 :';
    BadAnswer3Wrapper.appendChild(BadAnswer3Label);
    const BadAnswer3Input = document.createElement('input');
    BadAnswer3Input.type = 'text';
    BadAnswer3Input.className = 'form-control';
    BadAnswer3Input.id = 'mauvaiseReponse3-'.concat(element.number);
    BadAnswer3Input.placeholder = element.falseAnswers[2];
    BadAnswer3Wrapper.appendChild(BadAnswer3Input);
    row2.appendChild(BadAnswer3Wrapper);

    questionWrapper.appendChild(row2);

    form.appendChild(questionWrapper);

    const step = document.createElement('span');
    step.className = 'step';
    stepsWrapper.appendChild(step);
  });

  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.style = 'overflow:auto;';
  buttonsWrapper.classList.add(
    'd-flex',
    'justify-content-md-between',
    'justify-content-center',
    'mx-auto',
    'flex-md-row',
    'flex-column',
  );

  const returnWrapper = document.createElement('div', 'col-xs-12');
  returnWrapper.classList.add('order-1', 'justify-content-center');
  const returnButton = document.createElement('button');
  returnButton.classList.add('btn', 'btn-secondary', 'align-self-center');
  returnButton.textContent = 'Back to Admin page';

  returnButton.addEventListener('click', () => {
    Navigate('/admin');
  });
  returnWrapper.appendChild(returnButton);
  buttonsWrapper.appendChild(returnWrapper);

  const buttons = document.createElement('div');
  buttons.classList.add('order-2', 'justify-content-center');
  const prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.className = 'btn btn-success';
  prevButton.id = 'prevBtn';
  prevButton.innerText = 'Précédent';
  prevButton.style = 'margin-right: 10px;';
  prevButton.addEventListener('click', () => {
    nextPrev(-1);
  });
  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'btn btn-success';
  nextButton.id = 'nextBtn';
  nextButton.innerText = 'Suivant';
  nextButton.addEventListener('click', () => {
    nextPrev(1);
  });
  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.className = 'btn btn-success';
  submitButton.id = 'submitBtn';
  submitButton.value = 'Valider';
  const quizIndex = quiz.id;
  submitButton.addEventListener('click', async () => {
    await validateQuiz(quizIndex);
  });

  buttons.appendChild(prevButton);
  buttons.appendChild(nextButton);
  buttons.appendChild(submitButton);
  buttonsWrapper.appendChild(buttons);
  form.appendChild(buttonsWrapper);

  form.appendChild(stepsWrapper);

  wrapper.appendChild(form);
  main.appendChild(wrapper);
  let inputList = document.querySelectorAll('input[type="text"]');
  inputList.forEach((element) => {
    element.setAttribute('disabled', '');
  });
  console.log('all input ' + JSON.stringify(inputList));

  // switch tab on arrowkey press event
  main.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      const prevBtn = document.getElementById('prevBtn');
      if (prevBtn.style.display !== 'none') {
        nextPrev(-1);
      }
    }
    if (e.key === 'ArrowRight') {
      const nextBtn = document.getElementById('nextBtn');
      if (nextBtn.style.display !== 'none') {
        nextPrev(1);
      }
    }
  });
}

async function validateQuiz(quiz) {
  const options = {
    method: 'POST',
    // body: JSON.stringify(quiz),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`/api/admin/validate/${quiz}`, options);
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  Navigate('/admin');
}

export default AdminPage;
