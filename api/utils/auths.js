
const jwt = require('jsonwebtoken');
const { readOneUserFromUsername, jwtSecret } = require('../models/users');

// const jwtSecret = 'youhoulazone';

const authorize = (req, res, next) => {
  const token = req.get('authorization');
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, jwtSecret);
    // console.log('decoded', decoded);
    const { username } = decoded;

    const existingUser = readOneUserFromUsername(username);

    if (!existingUser) return res.sendStatus(401);

    req.user = existingUser; // request.user object is available in all other middleware functions
    return next();
  } catch (err) {
    // console.error('authorize: ', err);
    return res.sendStatus(401);
  }
};

const isAdmin = (req, res, next) => {
  const isAnAdmin1 = req.user.isAdmin;

  if (isAnAdmin1 !== true) return res.sendStatus(403);
  return next();
};

module.exports = { authorize, isAdmin };