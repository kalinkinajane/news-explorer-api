const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NODE_ENV, JWT_SECRET } = require('../configs/index');
const BadRequestError = require('../error/BadRequestError');
const ConflictError = require('../error/ConflictError');
const Unauthorized = require('../error/UnauthorizedError');

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 8)
    .then((hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          if (!user) {
            throw new BadRequestError('Переданны невалидные данные');
          }
          res.send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданны невалидные данные'));
            return;
          } if (err.code === 11000) {
            next(new ConflictError('На данный email раннее был зарегистрирован'));
          }
          next(err);
        });
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.status === 401) {
        next(new Unauthorized('Неправильные почта или пароль'));
      }
      next(err);
    });
};
