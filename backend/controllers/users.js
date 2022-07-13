const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/notFoundErr');
const ValidationError = require('../utils/errors/validationErr');
const AuthError = require('../utils/errors/authorizedErr');
const UserAlreadyExists = require('../utils/errors/userAlreadyExists');

const { JWT_SECRET, NODE_ENV } = process.env;

const saltRounds = 10;

// запрос всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

// Запрос пользователя по id
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw next(new NotFoundError({ message: 'Запрашиваемый пользователь не найден' }));
      }
      return res.send({ user });
    })
    .catch(next);
};

// информация о текущем пользователе
module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      }
      return res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

// Создание пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!password || !email) {
    throw new ValidationError('почта или пароль должны быть заполнены');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new UserAlreadyExists('Такой пользователь уже существует');
      } else {
        bcrypt.hash(password, saltRounds)
          .then((hash) => User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          }))
          .then((userData) => res.send({
            name: userData.name,
            about: userData.about,
            avatar: userData.avatar,
            id: userData._id,
            email: userData.email,
          }))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new ValidationError('Некорректные данные при создании пользователя'));
            }
            if (err.code === 11000) {
              next(new UserAlreadyExists('Такой пользователь уже существует'));
            }
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// редактирование профиля
module.exports.putchUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Введены некорректные данные');
      }
      next(err);
    });
};

// редактирование аватара
module.exports.putchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Введены некорректные данные');
      }
      next(err);
    });
};

// Аутентификация пользователя

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log('email: ', email, ', password: ', password);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log('NODE_ENV user:', NODE_ENV);
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY',
        { expiresIn: '7d' },
      );
      const { name, avatar } = user;
      res.send({ token, name, avatar });
    })
    .catch(() => {
      next(new AuthError('Ошибка доступа'));
    });
};
