const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../config');
const { AuthError } = require('../errorsCatch/errorsCatch');
const { authError } = require('../constants/constants');

module.exports = (req, res, next) => {
  let playload;
  try {
    playload = jwt.verify(req.cookies.jwt, JWT_TOKEN);
  } catch (err) {
    const error = new AuthError(authError);
    next(error);
  }

  req.user = playload;
  next();
};
