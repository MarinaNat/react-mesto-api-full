const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/authorizedErr');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw (new AuthError('Необходима авторизация'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      next(res.status(401).send({ message: 'Вы не прошли авторизацию' }));
    }

    req.user = payload;
    next();
  }
};

module.exports = auth;
