const Card = require('../models/card');
const NotFoundError = require('../utils/errors/not-found-err');
const ValidationError = require('../utils/errors/validation-err');
const ForbiddenError = require('../utils/errors/forbidden-уrr');

// Запрос всех карточек
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

// Создание карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user.id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Удаление карточки
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      const owner = card.owner.toString();
      if (owner !== req.user.id) {
        throw new ForbiddenError('У вас нет прав удалять чужие карточки');
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .then(() => {
          res.send({ message: 'Карточка удалена' });
        });
    })
    .catch((err) => {
      next(err);
    });
};

// Добавления лайка
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((cardData) => {
      if (!cardData) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      next(err);
    });
};

// Снятие лайка с карточки
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((cardData) => {
      if (!cardData) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
