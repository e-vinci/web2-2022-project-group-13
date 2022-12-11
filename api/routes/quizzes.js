const express = require('express');
const 
{ addOneQuiz,
  searchQuiz,
  readAllQuizzes,
  readOneQuiz,
} = require('../models/quiz');

const router = express.Router();

router.get('/', (req, res) => {
  const allPizzasPotentiallyOrdered = readAllQuizzes();
  return res.json(allPizzasPotentiallyOrdered);
});

router.get('/:id', (req, res) => {
  const quizFound = readOneQuiz(req.params.id);
  return res.json(quizFound);
});

router.post('/addQuiz', async (req, res) => {
  const quizName = req?.body?.quizName?.length !== 0 ? req.body.quizName : undefined;
  const difficulty = req?.body?.difficulty?.length !== 0 ? req.body.difficulty : undefined;
  const questions = req?.body?.questions?.length !== 0 ? req.body.questions : undefined;

  if (!quizName || !difficulty || !questions) return res.sendStatus(400); // 400 Bad Request

  const newQuiz = await addOneQuiz(quizName, difficulty, questions);

  if (!newQuiz) return res.sendStatus(409); // 409 Conflict

  return res.json(newQuiz);
});

router.get('/search', (req, res) => {
  const titleSearch = req.query['quiz-name'];
  return res.json(searchQuiz(titleSearch));
});
module.exports = router;
