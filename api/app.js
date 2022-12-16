const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');


const corsOptions = {
  origin:['http://localhost:8080', 'https://kekmanlol.github.io/group-13-frontend-deployment-vinci']
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

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','https://kekmanlol.github.io/group-13-frontend-deployment-vinci');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next(); 
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auths', cors(corsOptions), authsRouter);
app.use('/quiz', cors(corsOptions), quizzesRouter);
app.use('/admin', cors(corsOptions),adminRouter);

module.exports = app;
