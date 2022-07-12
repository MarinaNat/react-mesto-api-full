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
    } catch (err) {
      next(res.status(401).send({ message: 'Вы не прошли авторизацию' }));
    }

    req.user = payload;
    next();
  }
};

module.exports = auth;

// const JWT_SECRET = '111';
// const genToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

// const Authorized = (req, res, next) => {
//   const { auth } = req.headers;

//   if (!auth || !auth.startsWith('Bearer ')) {
//     throw new AuthError('Необходима авторизация');
//   }

//   const extractToken = (header) => header.replace('Bearer ', '')
//   const token = extractToken(auth);
//   let payload;

//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY');
//   } catch (e) {
//     const err = new AuthError('jwt toten не валиден, авторизируйтесь');
//     return next(err)
//   }
//   req.user = payload;
//   return next();
// };

// module.exports = {
//   Authorized,
// };
