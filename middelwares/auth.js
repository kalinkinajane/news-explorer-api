const jwt = require('jsonwebtoken');
const Unauthorized = require('../error/UnauthorizedError');
const { NODE_ENV, JWT_SECRET } = require('../configs/index');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
  } catch (err) {
    throw new Unauthorized('С токеном что-то не так');
  }

  req.user = payload;

  next();
};
