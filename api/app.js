const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');

const authsRouter = require('./routes/auths');
const quizzesRouter = require('./routes/quizzes');
const adminRouter = require('./routes/admin');

const app = express();

const expiryDateIn3Months = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 3);
const cookieSecreteKey = 'youhoulazone';
app.use(
  cookieSession({
    name: 'user',
    keys: [cookieSecreteKey],
    httpOnly: true,
    cookie: {
      expires: expiryDateIn3Months,
    },
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auths', authsRouter);
app.use('/quiz', quizzesRouter);
app.use('/admin', adminRouter);

module.exports = app;
