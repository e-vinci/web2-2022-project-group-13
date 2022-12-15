import { getRememberMe, setAuthenticatedUser, setRememberMe } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderLoginForm();
};

function renderLoginForm() {
  // Get main
  const main = document.querySelector('main');

  // Create form
  const form = document.createElement('form');
  form.className = 'p-5';

  // Creat global div
  const formDiv = document.createElement('div');
  formDiv.id = 'formDiv';

  // Create title
  const title = document.createElement('h1');
  title.innerHTML = 'Login';
  title.id = 'titleForm';
  title.className = 'text-center';

  // Create input for username
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = 'Username';
  username.required = true;
  username.className = 'form-control mb-3';

  // Create input for password
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'Password';
  password.className = 'form-control mb-3';

  // Create input for submit button
  const submit = document.createElement('input');
  submit.id = 'submitButton';
  submit.value = 'Login';
  submit.type = 'submit';
  submit.className = 'btn btn-primary';

  // Create div for remember me label + checkbox
  const formCheckWrapper = document.createElement('div');
  formCheckWrapper.id = 'checkBoxWrapper';
  formCheckWrapper.className = 'mb-3 form-check';

  // Create input checkbox for remember me
  const rememberme = document.createElement('input');
  rememberme.type = 'checkbox';
  rememberme.className = 'form-check-input';
  rememberme.id = 'rememberme';
  const remembered = getRememberMe();
  rememberme.checked = remembered;
  rememberme.addEventListener('click', onCheckboxClicked);

  // Create label for checkbox
  const checkLabel = document.createElement('label');
  checkLabel.id = 'labelForCheckbox';
  checkLabel.htmlFor = 'rememberme';
  checkLabel.className = 'form-check-label';
  checkLabel.textContent = 'Remember me';

  // Create paragraph for error message
  const errorMessage = document.createElement('p');
  errorMessage.id = 'errorMessage';
  errorMessage.innerHTML = '';

  // Appenchild wrapper to dom
  formCheckWrapper.appendChild(rememberme);
  formCheckWrapper.appendChild(checkLabel);

  // Appenchild fields of the forms in form
  form.appendChild(title);
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(formCheckWrapper);
  form.appendChild(submit);
  form.appendChild(errorMessage);

  // Appenchild form to global div
  formDiv.appendChild(form);

  // Appenchild global div to main
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
