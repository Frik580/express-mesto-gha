const User = require("../models/user");
const { UserNotFound, errorStatus } = require("../errors/errors");
const { notCorrect, serverError } = errorStatus;

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(notCorrect).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      } else {
        res
          .status(serverError)
          .send({ message: "На сервере произошла ошибка" });
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
      console.log(err.name);
      if (err.name === "UserNotFound") {
        res.status(err.status).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(notCorrect).send({
          message: "Передан некорректный _id",
        });
      } else {
        res
          .status(serverError)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

const getAllUsers = (req, res) => {
  console.log(req.user._id);
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(serverError).send({ message: "На сервере произошла ошибка" });
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
    }
  )
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "UserNotFound") {
        res.status(err.status).send({ message: err.message });
      } else if (err.name === "ValidationError") {
        res.status(notCorrect).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      } else {
        res
          .status(serverError)
          .send({ message: "На сервере произошла ошибка" });
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
    }
  )
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "UserNotFound") {
        res.status(err.status).send({ message: err.message });
      } else if (err.name === "ValidationError") {
        res.status(notCorrect).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
      } else {
        res
          .status(serverError)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports = { createUser, getUser, getAllUsers, updateUser, updateAvatar };
