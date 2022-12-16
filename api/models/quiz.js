const path = require('node:path');
const escape = require('escape-html');
// eslint-disable-next-line import/no-unresolved
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
  {
    id: 3,
    quizName: 'Super Smash Bros',
    questions: [
      {
        question: 'Who is the favorite character of the creator of the game series ?',
        falseAnswers: ['Mario', 'Link', 'Marth'],
        goodAnswer: 'Kirby',
      },
      {
        question: 'Which game in the series introduced Roy as a playable character ?',
        falseAnswers: [
          'Super Smash Bros Brawl',
          'Super Smash Bros For Wii U',
          'Super Smash Bros Ultimate',
        ],
        goodAnswer: 'Super Smash Bros Melee',
      },
      {
        question: 'Which item gives you a Final Smash ?',
        falseAnswers: ['Assist Trophy', 'Master Ball', 'Super Star'],
        goodAnswer: 'Smash Ball',
      },
      {
        question: "Who is Master Hand's left hand counterpart ?",
        falseAnswers: ['Master Glove', 'Big Hand', 'Great Hand'],
        goodAnswer: 'Crazy Hand',
      },
      {
        question: 'What franchise is Ness from ?',
        falseAnswers: ['Fire Emblem', 'StarBound', 'Mario'],
        goodAnswer: 'EarthBound',
      },
      {
        question: 'What does Samus do in her Final Smash ?',
        falseAnswers: ['PK Starstorm', 'Triforce Slash', 'Blue Falcon'],
        goodAnswer: 'Zero Laser',
      },
      {
        question: 'Which button(s) do you need to press to do a Falcon Punch with Captain Falcon ?',
        falseAnswers: ['Side B', 'UP Smash', 'Neutral Air'],
        goodAnswer: 'Neutral B',
      },
      {
        question: 'Which game introduced the Final Smash ?',
        falseAnswers: ['Super Smash Bros', 'Super Smash Bros Melee', 'Super Smash Bros Ultimate'],
        goodAnswer: 'Super Smash Bros Brawl',
      },
      {
        question: 'In which game can you use the Wavedash technique ?',
        falseAnswers: [
          'Super Smash Bros Brawl',
          'Super Smash Bros Ultimate',
          'Super Smash Bros For Wii U',
        ],
        goodAnswer: 'Super Smash Bros Melee',
      },
      {
        question: 'Which game got a 3DS port ?',
        falseAnswers: ['Super Smash Bros', 'Super Smash Bros Ultimate', 'Super Smash Bros Brawl'],
        goodAnswer: 'Super Smash Bros For Wii U',
      },
    ],
    difficulty: 'Medium',
    isVerified: true,
  },
  {
    id: 4,
    quizName: 'Football',
    questions: [
      {
        question: 'Which club has won the most Champions League titles?',
        falseAnswers: ['Barcelona', 'Manchester United', 'Juventus'],
        goodAnswer: 'Real Madrid',
      },
      {
        question: 'Which player scored the fastest hat-trick in the Premier League.',
        falseAnswers: [
          'Robert Lewandowski',
          'Kylian Mbappé',
          'Lionel Messi',
        ],
        goodAnswer: 'Sadio Mané',
      },
      {
        question: 'Which team won the first Premier League.',
        falseAnswers: ['Arsenal', 'Manchester City', 'Real Madrid'],
        goodAnswer: 'Manchester United',
      },
      {
        question: "Which country has won the most World Cup ?",
        falseAnswers: ['Spain', 'Italia', 'England'],
        goodAnswer: 'Brazil',
      },
      {
        question: 'Where is playing Antonio Rudiger?',
        falseAnswers: ['Chelsea', 'Dortmund', 'Bayern Munich'],
        goodAnswer: 'Real Madrid',
      },
      {
        question: 'Messi has won a record number of Ballon d Or awards - how many? ',
        falseAnswers: ['5', '4', '6'],
        goodAnswer: '7',
      },
      {
        question: 'Ronaldo is synonymous with the No.7, but what other number did he wear at Real Madrid?',
        falseAnswers: ['14', '10', '11'],
        goodAnswer: '9',
      },
      {
        question: 'Which Portuguese island off the coast of Africa, which also shares its name with a cake, is Ronaldo from?',
        falseAnswers: ['Canary Islands', 'Tenerife', 'Cape Verde'],
        goodAnswer: 'Madeira',
      },
      {
        question: 'Which score happened in semi-final of the world cup 2014?',
        falseAnswers: [
          'France 4 - 0 Croatia',
          'Netherlands 6 - 2 Argentina',
          'Brazil 5 - 1 Netherlands',
        ],
        goodAnswer: 'Brazil 1 - 7 Germany',
      },
      {
        question: 'Where is playing Robert Lewandowski?',
        falseAnswers: ['Bayern Munich', 'Manchester City', 'Dortmund'],
        goodAnswer: 'Barcelona',
      },
    ],
    difficulty: 'Medium',
    isVerified: true,
  }
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
