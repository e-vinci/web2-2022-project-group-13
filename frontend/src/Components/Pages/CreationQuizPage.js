/* eslint-disable */

// import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

var currentTab = 0;

const CreationQuizPage = () => {
  clearPage();
  renderCreateQuizForm();
  showTab(currentTab);
};

function renderCreateQuizForm() {
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
  nameInput.placeholder = 'Nom du quiz';
  nameInput.setAttribute('required', 'required');
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

  difficultySelectorWrapper.appendChild(labelWrapper);
  difficultySelectorWrapper.appendChild(select);
  form.appendChild(difficultySelectorWrapper);

  const stepsWrapper = document.createElement('div');
  stepsWrapper.className = 'text-center float-right';

  // eslint-disable-next-line
  for (let i = 1; i <= 10; i++) {
    const questionWrapper = document.createElement('div');
    questionWrapper.className = 'tab p-4';
    const questionNumber = document.createElement('h5');
    questionNumber.innerText = 'Question '.concat(i);
    questionWrapper.appendChild(questionNumber);

    const intituleWrapper = document.createElement('div');
    intituleWrapper.className = 'form-group col-md-8';
    const intituleLabel = document.createElement('label');
    intituleLabel.htmlFor = 'intitule-'.concat(i);
    intituleLabel.innerText = 'Intitulé de la question :';
    intituleWrapper.appendChild(intituleLabel);
    const intituleInput = document.createElement('input');
    intituleInput.type = 'text';
    intituleInput.className = 'form-control';
    intituleInput.id = 'intitule-'.concat(i);
    intituleInput.placeholder = 'Question';
    intituleWrapper.appendChild(intituleInput);
    questionWrapper.appendChild(intituleWrapper);

    const row1 = document.createElement('div');
    row1.className = 'row pt-3';

    const AnswerWrapper = document.createElement('div');
    AnswerWrapper.className = 'form-group col-md-6';
    const AnswerLabel = document.createElement('label');
    AnswerLabel.htmlFor = 'bonneReponse-'.concat(i);
    AnswerLabel.innerText = 'Bonne réponse :';
    AnswerWrapper.appendChild(AnswerLabel);
    const AnswerInput = document.createElement('input');
    AnswerInput.type = 'text';
    AnswerInput.className = 'form-control';
    AnswerInput.id = 'bonneReponse-'.concat(i);
    AnswerInput.placeholder = 'Bonne réponse';
    AnswerWrapper.appendChild(AnswerInput);
    row1.appendChild(AnswerWrapper);

    const BadAnswer1Wrapper = document.createElement('div');
    BadAnswer1Wrapper.className = 'form-group col-md-6';
    const BadAnswer1Label = document.createElement('label');
    BadAnswer1Label.htmlFor = 'mauvaiseReponse1-'.concat(i);
    BadAnswer1Label.innerText = 'Mauvaise réponse 1 :';
    BadAnswer1Wrapper.appendChild(BadAnswer1Label);
    const BadAnswer1Input = document.createElement('input');
    BadAnswer1Input.type = 'text';
    BadAnswer1Input.className = 'form-control';
    BadAnswer1Input.id = 'mauvaiseReponse1-'.concat(i);
    BadAnswer1Input.placeholder = 'Mauvaise réponse 1';
    BadAnswer1Wrapper.appendChild(BadAnswer1Input);
    row1.appendChild(BadAnswer1Wrapper);

    questionWrapper.appendChild(row1);

    const row2 = document.createElement('div');
    row2.className = 'row pt-3 pb-3';

    const BadAnswer2Wrapper = document.createElement('div');
    BadAnswer2Wrapper.className = 'form-group col-md-6';
    const BadAnswer2Label = document.createElement('label');
    BadAnswer2Label.htmlFor = 'mauvaiseReponse2-'.concat(i);
    BadAnswer2Label.innerText = 'Mauvaise réponse 2 :';
    BadAnswer2Wrapper.appendChild(BadAnswer2Label);
    const BadAnswer2Input = document.createElement('input');
    BadAnswer2Input.type = 'text';
    BadAnswer2Input.className = 'form-control';
    BadAnswer2Input.id = 'mauvaiseReponse2-'.concat(i);
    BadAnswer2Input.placeholder = 'Mauvaise réponse 2';
    BadAnswer2Wrapper.appendChild(BadAnswer2Input);
    row2.appendChild(BadAnswer2Wrapper);

    const BadAnswer3Wrapper = document.createElement('div');
    BadAnswer3Wrapper.className = 'form-group col-md-6';
    const BadAnswer3Label = document.createElement('label');
    BadAnswer3Label.htmlFor = 'mauvaiseReponse3-'.concat(i);
    BadAnswer3Label.innerText = 'Mauvaise réponse 3 :';
    BadAnswer3Wrapper.appendChild(BadAnswer3Label);
    const BadAnswer3Input = document.createElement('input');
    BadAnswer3Input.type = 'text';
    BadAnswer3Input.className = 'form-control';
    BadAnswer3Input.id = 'mauvaiseReponse3-'.concat(i);
    BadAnswer3Input.placeholder = 'Mauvaise réponse 3';
    BadAnswer3Wrapper.appendChild(BadAnswer3Input);
    row2.appendChild(BadAnswer3Wrapper);

    questionWrapper.appendChild(row2);

    form.appendChild(questionWrapper);

    const step = document.createElement('span');
    step.className = 'step';
    stepsWrapper.appendChild(step);
  }

  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.style = 'overflow:auto;';
  const buttons = document.createElement('div');
  buttons.style = 'float:right;';
  const prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.className = 'btn btn-success';
  prevButton.id = 'prevBtn';
  prevButton.innerText = 'Previous';
  prevButton.style = 'margin-right: 10px;';
  prevButton.addEventListener('click', () => {
    nextPrev(-1);
  });
  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'btn btn-success';
  nextButton.id = 'nextBtn';
  nextButton.innerText = 'Next';
  nextButton.addEventListener('click', () => {
    nextPrev(1);
  });
  buttons.appendChild(prevButton);
  buttons.appendChild(nextButton);
  buttonsWrapper.appendChild(buttons);
  form.appendChild(buttonsWrapper);

  form.appendChild(stepsWrapper);

  form.addEventListener('submit', onSubmit);
  wrapper.appendChild(form);
  main.appendChild(wrapper);
}

function showTab(n) {
  let x = document.getElementsByClassName('tab');
  x[n].style.display = 'block';
  if (n === 0) {
    document.getElementById('prevBtn').style.display = 'none';
  } else {
    document.getElementById('prevBtn').style.display = 'inline';
  }
  if (n === x.length - 1) {
    document.getElementById('nextBtn').innerHTML = 'Submit';
  } else {
    document.getElementById('nextBtn').innerHTML = 'Next';
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  let x = document.getElementsByClassName('tab');
  if (n === 1 && !validateForm()) return false;
  x[currentTab].style.display = 'none';
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById('formulaire').submit();
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName('tab');
  y = x[currentTab].getElementsByTagName('input');
  for (i = 0; i < y.length; i++) {
    if (y[i].value == '') {
      y[i].className += ' invalid';
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName('step')[currentTab].className += ' finish';
  }
  return valid;
}

function fixStepIndicator(n) {
  var i,
    x = document.getElementsByClassName('step');
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(' active', '');
  }
  x[n].className += ' active';
}

async function onSubmit(e) {
  e.preventDefault();
}

export default CreationQuizPage;
