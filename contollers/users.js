const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { errorStatus } = require('../errors/errors');
const { UserNotFound } = require('../errors/usernotfound');
const { getJwtToken } = require('../utils/jwt');

const { notCorrect, serverError } = errorStatus;

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    return res
      .status(notCorrect)
      .send({ message: 'Email или пароль не млгут быть пустыми' });
  }
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        res.status(409).send({
          message: 'Такой пользователь уже существует', // ConflictError
        });
      } else if (err.name === 'ValidationError') {
        res.status(notCorrect).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      } else {
        res
          .status(serverError)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(notCorrect)
      .send({ message: 'Email или пароль не млгут быть пустыми' });
  }
  return User.findOne({ email })
    .orFail(() => {
      throw new Error('Неправильные почта или пароль');
    })
    .then((user) => bcrypt.compare(password, user.password)
      .then((isValidPassword) => {
        if (!isValidPassword) {
          throw new Error('Неправильные почта или пароль');
        }
        const token = getJwtToken(user.id);
        res.status(200).send({ token });
      }))
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getCurrentUser = (req, res) => {
  console.log(req.user._id);
  User.findById(req.user._id)
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'UserNotFound') {
        res.status(err.status).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(notCorrect).send({
          message: 'Передан некорректный _id',
        });
      } else {
        res
          .status(serverError)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'UserNotFound') {
        res.status(err.status).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(notCorrect).send({
          message: 'Передан некорректный _id',
        });
      } else {
        res
          .status(serverError)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => {
      res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'UserNotFound') {
        res.status(err.status).send({ message: err.message });
      } else if (err.name === 'ValidationError') {
        res.status(notCorrect).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      } else {
        res
          .status(serverError)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'UserNotFound') {
        res.status(err.status).send({ message: err.message });
      } else if (err.name === 'ValidationError') {
        res.status(notCorrect).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      } else {
        res
          .status(serverError)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
