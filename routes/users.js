const router = require('express').Router();
const {
  // createUser,
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar,
  getCurrentUser,
  // login,
} = require('../contollers/users');

router.get('/users', getAllUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', getUser);

// router.post('/users', createUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

// router.post('/signup', createUser);

// router.post('/signin', login);

module.exports = router;
