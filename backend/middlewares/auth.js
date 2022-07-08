const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/authorized-err');

const { JWT_SECRET } = process.env; // секрутный ключ
// const JWT_SECRET = '111';
const genToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

const Authorized = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new AuthError('Необходима авторизация');
  }
  const token = auth.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthError('jwt toten не валиден, авторизируйтесь'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  Authorized,
  genToken,
};
