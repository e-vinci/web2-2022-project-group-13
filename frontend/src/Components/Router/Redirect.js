import QuizPage from '../Pages/QuizPage';

const RedirectQuiz = (id) => {
  const uri = window.location.href.concat('quizPage');
  window.history.pushState({}, '', uri);

  QuizPage(id);
};

export default RedirectQuiz;
