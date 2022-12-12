import { getRememberMe, setAuthenticatedUser, setRememberMe } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderLoginForm();
};

function renderLoginForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const formDiv = document.createElement('div');
  formDiv.id = 'formDiv';
  const title = document.createElement('h1');
  title.innerHTML = 'Login';
  title.id = 'titleForm';
  title.className = 'text-center';
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = 'Username';
  username.required = true;
  username.className = 'form-control mb-3';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'Password';
  password.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.id = 'submitButton';
  submit.value = 'Login';
  submit.type = 'submit';
  submit.className = 'btn btn-primary';

  const formCheckWrapper = document.createElement('div');
  formCheckWrapper.className = 'mb-3 form-check';

  const rememberme = document.createElement('input');
  rememberme.type = 'checkbox';
  rememberme.className = 'form-check-input';
  rememberme.id = 'rememberme';
  const remembered = getRememberMe();
  rememberme.checked = remembered;
  rememberme.addEventListener('click', onCheckboxClicked);

  const checkLabel = document.createElement('label');
  checkLabel.id = 'labelForCheckbox';
  checkLabel.htmlFor = 'rememberme';
  checkLabel.className = 'form-check-label';
  checkLabel.textContent = 'Remember me';

  const errorMessage = document.createElement('p');
  errorMessage.id = 'errorMessage';
  errorMessage.innerHTML = '';

  formCheckWrapper.appendChild(rememberme);
  formCheckWrapper.appendChild(checkLabel);

  form.appendChild(title);
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(formCheckWrapper);
  form.appendChild(submit);
  form.appendChild(errorMessage);
  formDiv.appendChild(form);
  main.appendChild(formDiv);
  form.addEventListener('submit', onLogin);
}

function onCheckboxClicked(e) {
  setRememberMe(e.target.checked);
}

async function onLogin(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let authenticatedUser = null;
  let response = null;
  try {
    response = await fetch('/api/auths/login', options);

    authenticatedUser = await response.json();
  } catch (error) {
    if (response.status === 400) {
      document.querySelector('#errorMessage').innerHTML = 'A field is missing';
    } else if (response.status === 401) {
      document.querySelector('#errorMessage').innerHTML = 'No user found or wrong password';
    }
    throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  }

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}

export default LoginPage;
