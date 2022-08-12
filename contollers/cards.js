const Card = require("../models/card");
const { CardNotFound, IdNotFound } = require("../errors/errors");

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const deleteCard = (req, res) => {
  console.log(req.params.cardId);
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new CardNotFound();
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "CardNotFound") {
        res.status(err.status).send({ message: err.message });
      } else if (err.name === "CastError") {
        res
          .status(400)
          .send({
            message: "Передан некорректный _id",
          });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      res.status(500).send({ message: "Ошибка сервера" });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    {
      new: true,
    }
  )
    .orFail(() => {
      throw new IdNotFound();
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.log(err);
      if (err.name === "IdNotFound") {
        res.status(err.status).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(400).send({
          message: "Переданы некорректные данные для постановки лайка",
        });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    {
      new: true,
    }
  )
    .orFail(() => {
      throw new IdNotFound();
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.log(err);
      if (err.name === "IdNotFound") {
        res.status(err.status).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(400).send({
          message: "Переданы некорректные данные для снятия лайка",
        });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};


module.exports = { createCard, deleteCard, getAllCards, likeCard, dislikeCard };
