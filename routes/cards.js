const router = require("express").Router(); // создали роутер
const { createCard, deleteCard, getAllCards } = require("../contollers/cards");

router.get("/cards", getAllCards); // возвращает все карточки

router.delete("/cards/:cardId", deleteCard); // удаляет карточку по _id

router.post("/cards", createCard); // создает новую карточку

module.exports = router; // экспортировали роутер
