import { getRememberMe, setAuthenticatedUser, setRememberMe } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const Swal = require('sweetalert2');

const RegisterPage = () => {
  clearPage();
  renderRegisterForm();
};

function renderRegisterForm() {
  // Get main
  const main = document.querySelector('main');

  // Create form
  const form = document.createElement('form');
  form.className = 'p-5';

  // Create global div
  const formDiv = document.createElement('div');
  formDiv.id = 'formDiv';

  // Create title
  const title = document.createElement('h1');
  title.innerHTML = 'Register';
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

  // Create input for confirm password
  const confirmPassword = document.createElement('input');
  confirmPassword.type = 'password';
  confirmPassword.id = 'confirmPassword';
  confirmPassword.required = true;
  confirmPassword.placeholder = 'Confirm your password';
  confirmPassword.className = 'form-control mb-3';

  // Create input for submit button
  const submit = document.createElement('input');
  submit.id = 'submitButton';
  submit.value = 'Register';
  submit.type = 'submit';
  submit.className = 'btn btn-primary';

  // Create div wrapper for checkbox + his label
  const formCheckWrapper = document.createElement('div');
  formCheckWrapper.className = 'mb-3 form-check';
  formCheckWrapper.id = 'checkBoxWrapper';

  // Create checkbox input
  const rememberme = document.createElement('input');
  rememberme.type = 'checkbox';
  rememberme.className = 'form-check-input';
  rememberme.id = 'rememberme';
  const remembered = getRememberMe();
  rememberme.checked = remembered;
  rememberme.addEventListener('click', onCheckboxClicked);

  // Create label for the checkbox
  const checkLabel = document.createElement('label');
  checkLabel.id = 'labelForCheckbox';
  checkLabel.htmlFor = 'rememberme';
  checkLabel.className = 'form-check-label';
  checkLabel.textContent = 'Remember me';

  const rgpd = `<p id="rgpd">
  By registering, you confirm that you have read, understood and accept the <div id = "termOfUse"><p>
  Privacy policy<p></div>
  </p>`;
  // Create paragraph for error message
  const errorMessage = document.createElement('p');
  errorMessage.id = 'errorMessage';
  errorMessage.innerHTML = '';

  // Appenchild remember me + his label to the wrapper
  formCheckWrapper.appendChild(rememberme);
  formCheckWrapper.appendChild(checkLabel);
  formCheckWrapper.innerHTML += rgpd;

  // Appenchild all field from the form to the form
  form.appendChild(title);
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(confirmPassword);
  form.appendChild(formCheckWrapper);
  form.appendChild(submit);
  form.appendChild(errorMessage);

  // Appenchild form to global div
  formDiv.appendChild(form);

  // Appenchild div to main
  main.appendChild(formDiv);
  const rgpdDoc = document.getElementById('termOfUse');
  const textRgpd = `<strong>ARTICLE 1: PREAMBLE</strong ><br>
  Information to minors: We keep the information you declare to us (a nickname) in order to be able to communicate with you about your account, solve security problems that could affect your account. When you create your account, we ask you to enter an account name and a password: this account name and password will allow you to access and create a new quiz. Please note: this account name and password must remain secret.
  You do not have the right to access and rectify your data. To exercise this right and obtain communication or deletion of your information, write to us, with the help of your parents, by email, quizTimerGame@gmail.com.<br>
   <strong>ARTICLE 2: DATA RETENTION</strong><br>  
   We keep your personal data for as long as necessary for the fulfilment of the purposes set out herein, in compliance with the legislation in force. To know your rights to erasure, please consult the article 'Your rights'.<br>
   <strong>ARTICLE 3: SECURITY</strong><br>
   The Company implements the appropriate technical and organizational measures, with regard to the nature of the data and the risks presented by the processing, to guarantee a high level of data security and, in particular, to prevent them from being distorted, damaged or accessed by unauthorized third parties.
   
   To this end, md5 technology is used for the encryption of certain data, physical and logical data backup procedures are implemented and a protocol is used to secure access through data encryption (HTTPS).
   
   The Company reserves the right to take legal action against any person who attempts to access personal information that does not belong to the Company.`;
  rgpdDoc.addEventListener('click', () => {
    Swal.fire({
      title: 'Privacy policy',
      html: textRgpd,
    });
  });

  form.addEventListener('submit', onRegister);
}

function onCheckboxClicked(e) {
  setRememberMe(e.target.checked);
}

async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;
  const errorMessage = document.querySelector('#errorMessage');

  if (password !== confirmPassword) {
    errorMessage.innerHTML = 'Confirmation password does not match';
    throw new Error(`Confirmation error`);
  }

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
    response = await fetch('/api/auths/register', options);
    authenticatedUser = await response.json();
  } catch (error) {
    if (response.status === 400) {
      errorMessage.innerHTML = 'A field is missing';
    } else if (response.status === 409) {
      errorMessage.innerHTML = 'This username is already taken';
    }
    throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  }

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}

export default RegisterPage;
