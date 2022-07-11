require('dotenv').config();
const express = require('express');
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
const handleErrors = require('./middlewares/handleErrors');
const auth = require('./middlewares/auth');
// const handleErrors = require('./middlewares/handleErrors'); посмотреть что там
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allowedCors = require('./utils/utils');

const app = express();
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());

// app.use(helmet());
// app.use(bodyParser.urlencoded({ extended: false }));


// app.use(allowedCors);

app.use(requestLogger);
app.use(cors({
  credentials: true, origin: ['https://api.marina.nomoredomains.sbs', 'http://api.marina.nomoredomains.sbs', 'http://marina.nomoredomains.sbs', 'https://marina.nomoredomains.sbs', 'http://localhost:3001', 'http://localhost:3000', 'https://localhost:3001', 'https://localhost:3000', 'https://web.postman.co']
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

app.use(auth);

// app.use(require('./routes/users'));
// app.use(require('./routes/cards)'));

app.use('/', auth, userRouter);
app.use('/cards', auth, cardRouter);
// Обработчик 404-ошибки
// app.use(auth, (req, res, next) => next(new NotFoundError('Cтраница не найдена')));

app.all('*', () => {
  throw new NotFoundError('Страница не найдена');
});

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, family: 4 });

app.use(errorLogger);
app.use(errors());
// app.use(putError);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App слушает порт ${PORT}`);
});
