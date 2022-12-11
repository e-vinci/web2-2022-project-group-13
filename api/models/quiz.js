const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/quiz.json');


async function addOneQuiz(quizName, difficulty, questions) {
  const quizzes = parse(jsonDbPath, []);
  const isVerified = false;

  const newQuiz = {
    id: quizzes.length + 1,
    quizName,
    difficulty,
    questions,
    isVerified,
  };

  quizzes.push(newQuiz);

  serialize(jsonDbPath, quizzes);

  return newQuiz;
}

function readAllQuizzes() {
  const quizzes = parse(jsonDbPath, []);
  const quizzesVerified = [...quizzes].filter(quiz => quiz.isVerified === true);
  return quizzesVerified.reverse();
}

function readOneQuiz(id){
  const idQuiz = parseInt(id,10);
  const quizzes = parse(jsonDbPath, defaultQuizzes);
  const quizVerified = [...quizzes].filter(quiz => quiz.isVerified === true && quiz.id === idQuiz);
  if (quizVerified.length === 0) return undefined;
  return quizVerified;
}

function searchQuiz(title) {
  const QuizFilterBegins = escape(title);
  let QuizzesNameBeginWith = null;
  const quizzes = parse(jsonDbPath, []);
  if (QuizFilterBegins) {
    QuizzesNameBeginWith = [...quizzes]
      .filter((quiz) => quiz.quizName.includes(QuizFilterBegins) && quiz.isVerified === true);
  }
  const allQuizzesSearch = QuizzesNameBeginWith.reverse();
  return allQuizzesSearch;
}

function readUnverifiedQuizzes() {
  const quizzes = parse(jsonDbPath,   );
  const quizzesUnverified = [...quizzes].filter(quiz => quiz.isVerified === false);
  return quizzesUnverified.reverse();
}

function deleteQuiz(id){
  const quizList = parse(jsonDbPath, []);
    const foundIndex = quizList.findIndex(quiz => parseInt(quiz.id, 10) === parseInt(id, 10));
    // if(foundIndex<0){
    //     return res.sendStatus(404);
    // }
    quizList.splice(foundIndex, 1);
    serialize(jsonDbPath, quizList);
}

function getQuiz(id){
  const quizList = parse(jsonDbPath, []);
  const foundIndex = quizList.filter(quiz => parseInt(quiz.id, 10) === parseInt(id, 10));
  return foundIndex;
}

function validateQuiz(id){
  const quizList = parse(jsonDbPath, []);
  const foundIndex = quizList.findIndex(quiz => parseInt(quiz.id, 10) === parseInt(id, 10));
  // foundIndex.isVerified = true;
  quizList[foundIndex].isVerified = true;
  serialize(jsonDbPath, quizList);
}

module.exports = {
  addOneQuiz,
  searchQuiz,
  readAllQuizzes,
  readOneQuiz,
  readUnverifiedQuizzes,
  deleteQuiz,
  getQuiz,
  validateQuiz,
};
