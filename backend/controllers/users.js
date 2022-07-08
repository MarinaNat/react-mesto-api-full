const bcrypt = require('bcrypt');

// const { genToken } = require('../middlewares/auth');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/not-found-err');
const ValidationError = require('../utils/errors/validation-err');
const AuthError = require('../utils/errors/authorized-err');
const UserAlreadyExists = require('../utils/errors/user-already-exists');
const user = require('../models/user');

const { JWT_SECRET, NODE_ENV } = process.env;

const saltRounds = 10;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

// запрос всех пользователей
const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Запрашиваемый пользователь не найден' });
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

// Запрос пользователя по id
const getUserProfile = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

// Создание пользователя
const createUser = (req, res, next) => {
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

  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          const resUser = {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          };
          res.send({ data: resUser });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('Некорректные данные при создании пользователя'));
          }
          if (err.code === 11000) {
            return next(new UserAlreadyExists('Такой пользователь уже существует'));
          }
          return next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

const putchUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { id } = req.user;

  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Переданы некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};

const putchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { id } = req.user;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Переданы некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};

// Аутентификация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new AuthError('Неправильные Email или пароль');
  }
  return User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'some',
      { expiresIn: '7d' },
    );
    const { name, userEmail, avatar } = user;
   
    return res.send({
      name, userEmail, avatar, token,
    });
  })
  .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  getUserProfile,
  putchUserProfile,
  putchUserAvatar,
  login,
};
