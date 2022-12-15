const path = require('node:path');
const escape = require('escape-html');
const translate = require('translate-google');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/quiz.json');
const defaultQuizzes = [
  {
    id: 1,
    quizName: 'Animals',
    difficulty: 'Medium',
    questions: [
      {
        question: 'Who is the tallest animals ?',
        falseAnswers: ['Wolf', 'Elephant', 'Dog'],
        goodAnswer: 'Giraffe',
      },
      {
        question: 'Who is the best friends of the human ?',
        falseAnswers: ['Monkey', 'Cat', 'Turtle'],
        goodAnswer: 'Dog',
      },
      {
        question: 'Which of these animals breath underwater ?',
        falseAnswers: ['Wolf', 'Elephant', 'Dog'],
        goodAnswer: 'Anglerfish',
      },
      {
        question: 'The cow belongs to which family ?',
        falseAnswers: ['Mammals', 'Amphibians', 'Reptiles'],
        goodAnswer: 'Bovine',
      },
      {
        question: 'Who is the smallest animals ?',
        falseAnswers: ['Wolf', 'Elephant', 'Dog'],
        goodAnswer: 'Paedophryne amauensis Frog',
      },
      {
        question: "what's the average speed of a tiger ?",
        falseAnswers: ['100 – 130 km/h', '20 – 50 km/h', '120 – 160 km/h'],
        goodAnswer: '49 – 65 km/h',
      },
      {
        question: "what can't dogs eat ?",
        falseAnswers: ['Chicken', 'Fish', 'Beef'],
        goodAnswer: 'Mushrooms',
      },
      {
        question: "What's the favorite food of a bat ?",
        falseAnswers: ['Fruits', 'Pollens', 'Fishes'],
        goodAnswer: 'Insects',
      },
      {
        question: 'What height can jump a kangaroo ?',
        falseAnswers: ['4,2 feet', '5,3 feet', '3 feet'],
        goodAnswer: '6 feet',
      },
      {
        question: 'Who is the smartest animals ?',
        falseAnswers: ['Rat', 'Chimpanzees', 'Dog'],
        goodAnswer: 'Orangutans',
      },
    ],
    isVerified: true,
  },
  {
    id: 2,
    quizName: 'Video Games',
    questions: [],
    difficulty: 'Hard',
    isVerified: true,
  },
];

async function addOneQuiz(quizName, difficulty, questions) {
  const quizzes = parse(jsonDbPath, defaultQuizzes);
  const isVerified = false;

  const newQuiz = {
    id: quizzes.length + 1,
    quizName,
    difficulty,
    questions,
    isVerified,
  };

  const translatedQuiz = await translate(newQuiz, { except: ['id', 'difficulty', 'isVerified'] });

  quizzes.push(translatedQuiz);

  serialize(jsonDbPath, quizzes);

  return translatedQuiz;
}

function readAllQuizzes() {
  const quizzes = parse(jsonDbPath, defaultQuizzes);
  const quizzesVerified = [...quizzes].filter((quiz) => quiz.isVerified === true);
  return quizzesVerified.reverse();
}

function readOneVerifiedQuiz(id) {
  const idQuiz = parseInt(id, 10);
  const quizzes = parse(jsonDbPath, defaultQuizzes);
  const quizVerified = [...quizzes].filter(
    (quiz) => quiz.isVerified === true && quiz.id === idQuiz,
  );
  if (quizVerified.length === 0) return undefined;
  return quizVerified;
}

async function searchQuiz(title) {
  const translatedTitle = await translate(title);
  const TranslatedQuizFilterBegins = escape(translatedTitle);
  const QuizFilterBegins = escape(title);
  let QuizzesNameBeginWith = null;
  const quizzes = parse(jsonDbPath, defaultQuizzes);

  if (QuizFilterBegins) {
    QuizzesNameBeginWith = [...quizzes].filter(
      (quiz) =>
        quiz.quizName.toLowerCase().includes(TranslatedQuizFilterBegins.toLowerCase()) ||
        (quiz.quizName.toLowerCase().includes(QuizFilterBegins.toLowerCase()) &&
          quiz.isVerified === true),
    );
  }
  const allQuizzesSearch = QuizzesNameBeginWith.reverse();
  return allQuizzesSearch;
}

function readUnverifiedQuizzes() {
  const quizzes = parse(jsonDbPath);
  const quizzesUnverified = [...quizzes].filter((quiz) => quiz.isVerified === false);
  return quizzesUnverified.reverse();
}

function deleteQuiz(id) {
  const quizList = parse(jsonDbPath, defaultQuizzes);
  const foundIndex = quizList.findIndex((quiz) => parseInt(quiz.id, 10) === parseInt(id, 10));
  // if(foundIndex<0){
  //     return res.sendStatus(404);
  // }
  quizList.splice(foundIndex, 1);
  serialize(jsonDbPath, quizList);
}

function getQuiz(id) {
  const quizList = parse(jsonDbPath, []);
  const foundIndex = quizList.filter((quiz) => parseInt(quiz.id, 10) === parseInt(id, 10));
  return foundIndex;
}

function validateQuiz(id) {
  const quizList = parse(jsonDbPath, []);
  const foundIndex = quizList.findIndex((quiz) => parseInt(quiz.id, 10) === parseInt(id, 10));
  // foundIndex.isVerified = true;
  quizList[foundIndex].isVerified = true;
  serialize(jsonDbPath, quizList);
}

module.exports = {
  addOneQuiz,
  searchQuiz,
  readAllQuizzes,
  readOneVerifiedQuiz,
  readUnverifiedQuizzes,
  deleteQuiz,
  getQuiz,
  validateQuiz,
};
