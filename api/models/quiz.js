const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/quiz.json');

async function addOneQuiz(quizName, difficulty, questions) {
  const quizzes = parse(jsonDbPath, []);

  const newQuiz = {
    id: quizzes.length + 1,
    quizName,
    difficulty,
    questions,
  };

  quizzes.push(newQuiz);

  serialize(jsonDbPath, quizzes);

  return newQuiz;
}

module.exports = {
  addOneQuiz,
};
