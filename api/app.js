const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');

const allowlist = ['http://localhost:8080', 'https://kekmanlol.github.io/group-13-frontend-deployment-vinci']
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

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

app.use('/auths', cors(corsOptionsDelegate), authsRouter);
app.use('/quiz', cors(corsOptionsDelegate), quizzesRouter);
app.use('/admin', cors(corsOptionsDelegate),adminRouter);

module.exports = app;
