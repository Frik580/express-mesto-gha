const router = require("express").Router(); // создали роутер
const { createCard, deleteCard, getAllCards, likeCard, dislikeCard } = require("../contollers/cards");

router.get("/cards", getAllCards); // возвращает все карточки

router.delete("/cards/:cardId", deleteCard); // удаляет карточку по _id

router.post("/cards", createCard); // создает новую карточку

router.put("/cards/:cardId/likes", likeCard); // добавление лайка карточке

router.delete("/cards/:cardId/likes", dislikeCard); // удаление лайка карточке

module.exports = router; // экспортировали роутер
