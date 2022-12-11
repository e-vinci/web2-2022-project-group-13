const express = require('express');
const { readAllQuizzes, readUnverifiedQuizzes, deleteQuiz } = require('../models/quiz');

const router = express.Router();


router.get('/', (req, res)=>{
    const unverifiedQuizList = readUnverifiedQuizzes();
    return res.json(unverifiedQuizList);
});

router.get('/all', (req, res)=>{
    const verifiedQuizList = readAllQuizzes();
    return res.json(verifiedQuizList);
});

router.post('/remove/:id', (req, res) => { 
    const deletedQuiz = deleteQuiz(req.params.id);
    return res.json(deletedQuiz);
});

module.exports = router;