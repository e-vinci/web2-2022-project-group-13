import HomePage from '../Pages/HomePage';
import RegisterPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';
import CreateQuizPage from '../Pages/CreationQuizPage';
import QuizPage from '../Pages/QuizPage';
import AdminPage from '../Pages/AdminPage';
import Logout from '../Logout/Logout';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/createQuiz': CreateQuizPage,
  '/quizPage': QuizPage,
  '/admin': AdminPage,
  '/logout': Logout,
};

const Router = () => {
  onFrontendLoad();
  onNavBarClick();
  onHistoryChange();
};

function onNavBarClick() {
  const navbarWrapper = document.querySelector('#navbarWrapper');

  navbarWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    const navBarItemClicked = e.target;
    const uri = navBarItemClicked?.dataset?.uri;
    if (uri) {
      const componentToRender = routes[uri];
      if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

      componentToRender();
      window.history.pushState({}, '', uri);
    }
  });
}

function onHistoryChange() {
  window.addEventListener('popstate', () => {
    const uri = window.location.pathname;
    const componentToRender = routes[uri];
    componentToRender();
  });
}

function onFrontendLoad() {
  window.addEventListener('load', () => {
    const uri = window.location.pathname;
    const componentToRender = routes[uri];
    if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

    componentToRender();
  });
}

export default Router;
