const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../contollers/users');

router.get('/users', getAllUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/https?:\/\/(w{3}\.)?([\w-]{1,}\.)+[\w._~:/?#[\]@!$&'()*+,;=]*#?/i),
  }),
}), updateAvatar);

module.exports = router;
