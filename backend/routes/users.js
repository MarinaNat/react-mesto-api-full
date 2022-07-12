const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { Reg } = require('../utils/const');

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

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), putchUserProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(Reg),
  }),
}), putchUserAvatar);

module.exports = router;
