const Card = require("../models/card");
const { CardNotFound } = require("../errors/errors");

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные при создании карточки" });
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

module.exports = { createCard, deleteCard, getAllCards };
