const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const bodyParser = require('body-parser');
// const rateLimit = require('express-rate-limit'); // защиты от DDoS-атак
const cors = require('cors');


const helmet = require('helmet');
const { validateURL, putError } = require('./utils/error');

const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./utils/errors/not-found-err');
const { Authorized } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allowedCors = require('./utils/utils');
// Слушаем 3000 порт
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(allowedCors);

app.use(requestLogger);

app.use(cors({
  credentials: true, origin: [
    'https://api.marina.nomoredomains.sbs',
    'http://api.marina.nomoredomains.sbs',
    'http://marina.nomoredomains.sbs',
    'https://marina.nomoredomains.sbs',
    'http://localhost:3001',
    'http://localhost:3000',
    'https://localhost:3001',
    'https://localhost:3000',
    'https://web.postman.co']
}));

app.get('/crash-test', () => { // удалить после прохождения ревью (crash-test)
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  createUser,
);

app.use('/users', Authorized, userRouter);
app.use('/cards', Authorized, cardRouter);
// Обработчик 404-ошибки
app.use(Authorized, (req, res, next) => next(new NotFoundError('Cтраница не найдена')));

app.use(errorLogger);
app.use(errors());
app.use(putError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
