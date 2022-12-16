const express = require('express');
const {
  readAllQuizzes,
  readUnverifiedQuizzes,
  deleteQuiz,
  getQuiz,
  validateQuiz,
} = require('../models/quiz');
const { authorize, isAdmin } = require('../utils/auths');

const router = express.Router();

router.get('/', authorize, isAdmin, (req, res) => {
  const unverifiedQuizList = readUnverifiedQuizzes();
  return res.json(unverifiedQuizList);
});

router.get('/all', authorize, isAdmin, (req, res) => {
  const verifiedQuizList = readAllQuizzes();
  return res.json(verifiedQuizList);
});

router.delete('/remove/:id', authorize, isAdmin, (req, res) => {
  const deletedQuiz = deleteQuiz(req.params.id);
  return res.json(deletedQuiz);
});

router.get('/quiz/:id', authorize, isAdmin, (req, res) => {
  const quiz = getQuiz(req.params.id);
  if (!quiz) {
    return res.sendStatus(404);
  }
  // console.log('route getquiz '+JSON.stringify(quiz));
  return res.json(quiz);
});

router.post('/validate/:id', authorize, isAdmin, (req, res) => {
  const deletedQuiz = validateQuiz(req.params.id);
  return res.json(deletedQuiz);
});

module.exports = router;
