const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_TOKEN } = require('../config');
const {
  userNotFound,
  userCreateSuccessfully,
  thisEmailFound,
  authError,
} = require('../constants/constants');
const {
  NotFoundError,
  BadRequest,
  AuthError,
} = require('../errorsCatch/errorsCatch');

module.exports.getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        throw new NotFoundError(userNotFound);
      }
      return res.send({ data: { email: user.email, name: user.name } });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return bcrypt.hash(password, 10).then(hash => {
          User.create({
            email,
            password: hash,
            name,
          })
            .then(() =>
              res.status(201).send({ message: userCreateSuccessfully })
            )
            .catch(next);
        });
      }
      throw new BadRequest(thisEmailFound);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, JWT_TOKEN, {
        expiresIn: '7d',
      });
      res
        .cookie('jwt', token, {
          maxAge: 604800000,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch(() => {
      throw new AuthError(authError);
    })
    .catch(next);
};
