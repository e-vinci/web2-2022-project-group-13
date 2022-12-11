/* eslint-disable */

// import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

// var currentTab = 0;
const AdminPage = async () => {
  clearPage();
  const response = await fetch('/api/admin');
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const quizUnverified = await response.json();
  console.log(quizUnverified);
  // const response2 = await fetch('/api/admin/all');
  // if (!response2.ok) throw new Error(`fetch error : ${response2.status} : ${response2.statusText}`);
  // const quizVerified = await response2.json();
  renderAdminUI(quizUnverified);
  // renderQuizList(quizUnverified);
  // renderUnverifiedQuizList(quizUnverified);
  // showTab(currentTab);
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
  // let quizUnverified = await getUnverifiedList();
  // getVerifiedList();
  // let quizVerified = await getVerifiedList();
  let quizList = quizDefault;
  const main = document.querySelector('main');

  const wrapper = document.createElement('div');
  wrapper.style = 'padding: 25px 10%; background-color: lightgrey;';
  // wrapper.className = 'vh-100';
  wrapper.classList.add('container-fluid', 'w-100');

  const row = document.createElement('div');
  row.classList.add('row');

  const leftTab = document.createElement('div');
  leftTab.classList.add('col-2', 'p-0');
  const rightTab = document.createElement('div');
  rightTab.classList.add('col-10', 'list-group', 'rightTab');

  const btnGroup = document.createElement('div');
  btnGroup.classList.add('btn-group-toggle', 'btn-group-vertical', 'w-100', 'text-center');
  // btnGroup.dataset.toggle="buttons";
  const aVerifier = document.createElement('button');
  aVerifier.classList.add('btn', 'btn-primary', 'active');
  aVerifier.textContent = 'à vérifier';
  const tousLesQuiz = document.createElement('button');
  tousLesQuiz.classList.add('btn', 'btn-primary');
  tousLesQuiz.textContent = 'tous les quiz';

  btnGroup.appendChild(aVerifier);
  btnGroup.appendChild(tousLesQuiz);
  leftTab.appendChild(btnGroup);
  row.appendChild(leftTab);
  row.appendChild(rightTab);
  wrapper.appendChild(row);
  main.appendChild(wrapper);

  renderQuizList(quizList);

  aVerifier.addEventListener('click', async () => {
    clearRightTab();
    quizList = await getUnverifiedList();
    // quizList = quizUnverified;
    renderQuizList(quizList);
  });
  tousLesQuiz.addEventListener('click', async () => {
    clearRightTab();
    quizList = await getVerifiedList();
    // quizList = quizVerified;
    renderQuizList(quizList);
  });
}

function renderQuizList(quizList) {
  const rightTab = document.querySelector('.rightTab');
  quizList.forEach((element) => {
    // element.isVerified = false;
    const quizLink = document.createElement('a');
    // quizLink.className = "btn btn-primary"
    quizLink.href = '';
    const pointer = parseInt(element.id);
    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btn', 'btn-danger', 'float-right', 'w-25');
    btnRemove.textContent = 'remove';

    console.log('pointer ' + pointer);
    btnRemove.addEventListener('click', async (e) => {
      // e.preventDefault();
      // const pointer = element.id-1;
      console.log('pointer event ' + pointer);
      const options = {
        method: 'POST',
        // body: JSON.stringify(quiz),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`/api/admin/remove/${pointer}`, options);
      if (!response.ok)
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      console.log('delete ' + JSON.stringify(response.url));
      // Navigate('/admin');
    });
    const quizElement = document.createElement('div');
    const quizElementTitle = document.createElement('p');
    quizElement.classList.add('card', 'list-group-item', 'd-flex', 'flex-row');
    quizElementTitle.textContent = element.quizName;
    quizElementTitle.classList.add('w-75', 'text-center', 'm-auto');

    quizElement.appendChild(quizElementTitle);
    quizElement.appendChild(btnRemove);
    quizLink.appendChild(quizElement);
    rightTab.appendChild(quizLink);
    console.log('question: ' + element.isVerified);
  });
  console.log('quiz2 ' + JSON.stringify(quizList));
}

// function renderUnverifiedQuizList(quiz) {
//   const main = document.querySelector('main');

//   const wrapper = document.createElement('div');
//   wrapper.style = 'padding: 25px 10%; background-color: lightgrey;';
//   wrapper.classList.add('container-fluid', 'w-100');

//   const row = document.createElement('div');
//   row.classList.add('row');

//   const leftTab = document.createElement('div');
//   leftTab.classList.add('col-2', 'p-0');
//   const rightTab = document.createElement('div');
//   rightTab.classList.add('col-10', 'list-group');

//   const btnGroup = document.createElement('div');
//   btnGroup.classList.add('btn-group-toggle', 'btn-group-vertical', 'w-100', 'text-center');
//   const aVerifier = document.createElement('button');
//   aVerifier.classList.add('btn', 'btn-primary', 'active');
//   aVerifier.textContent = 'à vérifier';
//   const tousLesQuiz = document.createElement('button');
//   tousLesQuiz.classList.add('btn', 'btn-primary');
//   tousLesQuiz.textContent = 'tous les quiz';

//   quiz.forEach((element) => {
//     const quizLink = document.createElement('a');
//     quizLink.href = '';
//     const pointer = element.id;
//     const btnRemove = document.createElement('button');
//     btnRemove.classList.add('btn', 'btn-danger', 'float-right', 'w-25');
//     btnRemove.textContent = 'remove';

//     console.log('pointer ' + pointer);
//     btnRemove.addEventListener('click', async () => {
//       const pointer = element.id;
//       await fetch(`/api/admin/remove/${pointer}`);
//       console.log();
//       Navigate('/admin');
//     });
//     const quizElement = document.createElement('div');
//     const quizElementTitle = document.createElement('p');
//     quizElement.classList.add('card', 'list-group-item', 'd-flex', 'flex-row');
//     quizElementTitle.textContent = element.quizName;
//     quizElementTitle.classList.add('w-75', 'text-center', 'm-auto');

//     quizElement.appendChild(quizElementTitle);
//     quizElement.appendChild(btnRemove);
//     quizLink.appendChild(quizElement);
//     rightTab.appendChild(quizLink);
//     console.log('question: ' + element.isVerified);
//   });
//   console.log('quiz2 ' + JSON.stringify(quiz));

//   btnGroup.appendChild(aVerifier);
//   btnGroup.appendChild(tousLesQuiz);
//   leftTab.appendChild(btnGroup);
//   row.appendChild(leftTab);
//   row.appendChild(rightTab);
//   wrapper.appendChild(row);
//   main.appendChild(wrapper);
// }

const clearRightTab = () => {
  const rightTab = document.querySelector('.rightTab');
  rightTab.innerHTML = '';
};

export default AdminPage;
