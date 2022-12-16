const express = require('express');
const { addOneQuiz, searchQuiz, readAllQuizzes, readOneVerifiedQuiz } = require('../models/quiz');
const { authorize } = require('../utils/auths');

const router = express.Router();

router.get('/', (req, res) => {
  const allPizzasPotentiallyOrdered = readAllQuizzes();
  return res.json(allPizzasPotentiallyOrdered);
});

router.get('/id/:id', (req, res) => {
  const quizFound = readOneVerifiedQuiz(req.params.id);
  return res.json(quizFound);
});

router.post('/addQuiz', authorize, async (req, res) => {
  const quizName = req?.body?.quizName?.length !== 0 ? req.body.quizName : undefined;
  const difficulty = req?.body?.difficulty?.length !== 0 ? req.body.difficulty : undefined;
  const questions = req?.body?.questions?.length !== 0 ? req.body.questions : undefined;
  const isVerified = req?.body?.isVerified?.length !== 0 ? req.body.isVerified : undefined;

  if (!quizName || !difficulty || !questions || !isVerified) return res.sendStatus(400); // 400 Bad Request

  const newQuiz = await addOneQuiz(quizName, difficulty, questions, isVerified);

  if (!newQuiz) return res.sendStatus(409); // 409 Conflict

  return res.json(newQuiz);
});

router.get('/search', async (req, res) => {
  const titleSearch = req.query['quiz-name'];
  const newQuizzesSearch = await searchQuiz(titleSearch);
  if (!newQuizzesSearch) return res.sendStatus(409); // 409 Conflict
  return res.json(newQuizzesSearch);
});
module.exports = router;
