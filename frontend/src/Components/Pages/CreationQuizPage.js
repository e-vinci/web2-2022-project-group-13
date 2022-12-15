import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import { getAuthenticatedUser, isAuthenticated, isAdmin } from '../../utils/auths';

let currentTab = 0;

const CreationQuizPage = () => {
  if (isAuthenticated()) {
    clearPage();
    renderCreateQuizForm();
    showTab(currentTab);
  } else Navigate('/login');
};

// code pris du site https://www.w3schools.com/howto/howto_js_form_steps.asp
// début
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
  for (let i = 0; i < y.length; i++) {
    if (y[i].value === '') {
      y[i].className += ' invalid';
      valid = false;
    }
  }
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

function renderCreateQuizForm() {
  const main = document.querySelector('main');

  const wrapper = document.createElement('div');
  wrapper.style = 'padding: 25px 17% 25px; background-color: rgb(25, 28, 37);';
  // wrapper.className = 'vh-100';

  const title = document.createElement('h2');
  title.innerText = 'Create your own quiz !';
  title.style = "color: #fa9961;";
  wrapper.appendChild(title);

  const form = document.createElement('form');
  form.className = 'p-3';
  form.id = 'formulaire';

  const nameHolder = document.createElement('div');
  nameHolder.className = 'form-group col-md-7';
  const nameLabel = document.createElement('label');
  nameLabel.htmlFor = 'quizName';
  nameLabel.innerText = 'Quiz name :';
  nameLabel.style = "color: #fa9961;";
  nameHolder.appendChild(nameLabel);
  const nameInput = document.createElement('input');
  nameInput.style = "color: #fa9961;";
  nameInput.type = 'text';
  nameInput.className = 'form-control';
  nameInput.id = 'quizName';
  nameInput.placeholder = 'Quiz name';
  nameInput.setAttribute('required', 'required');
  nameHolder.appendChild(nameInput);

  form.appendChild(nameHolder);

  const difficultySelectorWrapper = document.createElement('div');
  difficultySelectorWrapper.className = 'input-group pt-3';

  const labelWrapper = document.createElement('div');
  labelWrapper.className = 'input-group-prepend';
  const label = document.createElement('label');
  label.style = "background-color: #fa9961;";
  label.className = 'input-group-text';
  label.htmlFor = 'difficulty';
  label.innerText = 'Difficulty : ';
  labelWrapper.appendChild(label);

  const select = document.createElement('select');
  select.className = 'custom-select col-md-1';
  select.id = 'difficulty';
  const facile = document.createElement('option');
  facile.value = 'easy';
  facile.innerText = 'Easy';
  select.appendChild(facile);
  const moyen = document.createElement('option');
  moyen.value = 'medium';
  moyen.innerText = 'Medium';
  select.appendChild(moyen);
  const difficile = document.createElement('option');
  difficile.value = 'hard';
  difficile.innerText = 'Hard';
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
    questionNumber.style = "color: #fa9961;";
    questionNumber.innerText = 'Question '.concat(i);
    questionWrapper.appendChild(questionNumber);

    const intituleWrapper = document.createElement('div');
    intituleWrapper.className = 'form-group col-md-8';
    const intituleLabel = document.createElement('label');
    intituleLabel.htmlFor = 'intitule-'.concat(i);
    intituleLabel.innerText = 'Title of the question :';
    intituleLabel.style = "color: #fa9961;";
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
    AnswerLabel.innerText = 'Good Answer :';
    AnswerLabel.style = "color: #fa9961;";
    AnswerWrapper.appendChild(AnswerLabel);
    const AnswerInput = document.createElement('input');
    AnswerInput.type = 'text';
    AnswerInput.className = 'form-control';
    AnswerInput.id = 'bonneReponse-'.concat(i);
    AnswerInput.placeholder = 'Good answer';
    AnswerWrapper.appendChild(AnswerInput);
    row1.appendChild(AnswerWrapper);

    const BadAnswer1Wrapper = document.createElement('div');
    BadAnswer1Wrapper.className = 'form-group col-md-6';
    const BadAnswer1Label = document.createElement('label');
    BadAnswer1Label.htmlFor = 'mauvaiseReponse1-'.concat(i);
    BadAnswer1Label.innerText = 'Bad answer 1 :';
    BadAnswer1Label.style = "color: #fa9961;";
    BadAnswer1Wrapper.appendChild(BadAnswer1Label);
    const BadAnswer1Input = document.createElement('input');
    BadAnswer1Input.type = 'text';
    BadAnswer1Input.className = 'form-control';
    BadAnswer1Input.id = 'mauvaiseReponse1-'.concat(i);
    BadAnswer1Input.placeholder = 'Bad answer 1';
    BadAnswer1Wrapper.appendChild(BadAnswer1Input);
    row1.appendChild(BadAnswer1Wrapper);

    questionWrapper.appendChild(row1);

    const row2 = document.createElement('div');
    row2.className = 'row pt-3 pb-3';

    const BadAnswer2Wrapper = document.createElement('div');
    BadAnswer2Wrapper.className = 'form-group col-md-6';
    const BadAnswer2Label = document.createElement('label');
    BadAnswer2Label.htmlFor = 'mauvaiseReponse2-'.concat(i);
    BadAnswer2Label.innerText = 'Bad answer 2 :';
    BadAnswer2Label.style = "color: #fa9961;";
    BadAnswer2Wrapper.appendChild(BadAnswer2Label);
    const BadAnswer2Input = document.createElement('input');
    BadAnswer2Input.type = 'text';
    BadAnswer2Input.className = 'form-control mauvaiseReponse2';
    BadAnswer2Input.id = 'mauvaiseReponse2-'.concat(i);
    BadAnswer2Input.placeholder = 'Bad answer 2';
    BadAnswer2Wrapper.appendChild(BadAnswer2Input);
    row2.appendChild(BadAnswer2Wrapper);

    const BadAnswer3Wrapper = document.createElement('div');
    BadAnswer3Wrapper.className = 'form-group col-md-6';
    const BadAnswer3Label = document.createElement('label');
    BadAnswer3Label.htmlFor = 'mauvaiseReponse3-'.concat(i);
    BadAnswer3Label.innerText = 'Bad answer 3 :';
    BadAnswer3Label.style = "color: #fa9961;";
    BadAnswer3Wrapper.appendChild(BadAnswer3Label);
    const BadAnswer3Input = document.createElement('input');
    BadAnswer3Input.type = 'text';
    BadAnswer3Input.className = 'form-control';
    BadAnswer3Input.id = 'mauvaiseReponse3-'.concat(i);
    BadAnswer3Input.placeholder = 'Bad answer 3';
    BadAnswer3Wrapper.appendChild(BadAnswer3Input);
    row2.appendChild(BadAnswer3Wrapper);

    questionWrapper.appendChild(row2);

    form.appendChild(questionWrapper);
    form.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });

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
  prevButton.className = 'btn orange';
  prevButton.id = 'prevBtn';
  prevButton.innerText = 'Previous';
  prevButton.style = 'margin-right: 10px;';
  prevButton.addEventListener('click', () => {
    nextPrev(-1);
  });
  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'btn orange';
  nextButton.id = 'nextBtn';
  nextButton.innerText = 'Next';
  nextButton.addEventListener('click', () => {
    nextPrev(1);
  });
  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.className = 'btn btn-success';
  submitButton.id = 'submitBtn';
  submitButton.innerText = 'Publier';
  submitButton.addEventListener('click', onSubmit);
  submitButton.addEventListener('click', onSubmit);
  buttons.appendChild(prevButton);
  buttons.appendChild(nextButton);
  buttons.appendChild(submitButton);
  buttonsWrapper.appendChild(buttons);
  form.appendChild(buttonsWrapper);

  form.appendChild(stepsWrapper);

  wrapper.appendChild(form);
  main.appendChild(wrapper);
}

async function onSubmit(e) {
  e.preventDefault();
  const quizName = document.getElementById('quizName').value;
  if (quizName === '') {
    document.getElementById('quizName').className += ' invalid';
  } else if (validateForm()) {
    const difficulty = document.getElementById('difficulty').value;
    const questionsList = document.getElementsByClassName('tab');
    const quiz = {
      creatorUsername: getAuthenticatedUser.username,
      quizName,
      difficulty,
      questions: [],
    };

    // eslint-disable-next-line
    for (let index = 1; index <= questionsList.length; index++) {
      const question = {
        number: index,
        question: document.getElementById('intitule-'.concat(index)).value,
        goodAnswer: document.getElementById('bonneReponse-'.concat(index)).value,
        falseAnswers: [
          document.getElementById('mauvaiseReponse1-'.concat(index)).value,
          document.getElementById('mauvaiseReponse2-'.concat(index)).value,
          document.getElementById('mauvaiseReponse3-'.concat(index)).value,
        ],
        isVerified: isAdmin()
      };
      quiz.questions.push(question);
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(quiz),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/api/quiz/addQuiz', options);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    // const newQuiz = response.json();
    Navigate('/');
  }
}

export default CreationQuizPage;
