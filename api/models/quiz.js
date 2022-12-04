const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/quiz.json');
const defaultQuizzes = [
  {
    id : 1,
    quizName : "Animals",
    questions : 
    [{question : "Who is the tallest animals ?", falseAnswers : ["Wolf", "Elephant", "Dog"], goodAnswer : "Giraffe"}, 
     {question : "Who is the best friends of the human ?", falseAnswers : ["Monkey", "Cat", "Turtle"], goodAnswer : "Dog"},
     {question : "Which of these animals breath underwater ?", falseAnswers : ["Wolf", "Elephant", "Dog"], goodAnswer : "Anglerfish"},
     {question : "The cow belongs to which family ?", falseAnswers : ["Mammals", "Amphibians", "Reptiles"], goodAnswer : "Bovine"},
     {question : "who is the smallest animals ?", falseAnswers : ["Wolf", "Elephant", "Dog"], goodAnswer : "Paedophryne amauensis Frog"},
     {question : "what's the average speed of a tiger ?", falseAnswers : ["100 – 130 km/h", "20 – 50 km/h", "120 – 160 km/h"], goodAnswer : "49 – 65 km/h"},
     {question : "what can't dogs eat ?", falseAnswers : ["Chicken", "Fish", "Beef"], goodAnswer : "mushrooms"},
     {question : "What's the favorite food of a bat ?", falseAnswers : ["Fruits", "Pollens", "Fishes"], goodAnswer : "Insects"},
     {question : "What height can jump a kangaroo ?", falseAnswers : ["4,2 feet", "5,3 feet", "3 feet"], goodAnswer : "6 feet"},
     {question : "Who is the smartest animals ?", falseAnswers : ["Rat", "Chimpanzees", "Dog"], goodAnswer : "Orangutans"},
    ],
    isVerified : true
  },
  {
    id : 2,
    quizName : "Videos Games",
    questions : [],
    isVerified : false
  }
];

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

function readAllQuizzes() {
  const quizzes = parse(jsonDbPath, defaultQuizzes);
  const quizzesVerified = [...quizzes].filter(quiz => quiz.isVerified === true);
  return quizzesVerified.reverse();
}
function searchQuiz(title) {
  const QuizFilterBegins = escape(title);
  let QuizzesNameBeginWith = null;
  const quizzes = parse(jsonDbPath, defaultQuizzes);
  if (QuizFilterBegins) {
    QuizzesNameBeginWith = [...quizzes]
      .filter((quiz) => quiz.quizName.includes(QuizFilterBegins) && quiz.isVerified === true);
  }
  const allQuizzesSearch = QuizzesNameBeginWith.reverse();
  return allQuizzesSearch;
}

module.exports = {
  addOneQuiz,
  searchQuiz,
  readAllQuizzes
};
