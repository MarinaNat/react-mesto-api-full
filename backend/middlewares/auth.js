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
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY');
      console.log('NODE_ENV auth:', NODE_ENV);
    } catch (err) {
      throw new AuthError('Не пройдена авторизация');
    }

    req.user = payload;
    next();
  }
};

module.exports = auth;
