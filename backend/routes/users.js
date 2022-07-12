const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../utils/error');

const {
  getUsers,
  getUser,
  putchUserProfile,
  putchUserAvatar,
  getUserProfile,
} = require('../controllers/users');

router.get('/users', getUsers);
// информация о текущем пользователе
router.get('/users/me', getUserProfile);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  putchUserProfile,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  putchUserAvatar,
);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);

module.exports.userRouter = router;
