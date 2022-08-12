const router = require('express').Router();
const {
  createCard,
  deleteCard,
  getAllCards,
  likeCard,
  dislikeCard,
} = require('../contollers/cards');

router.get('/cards', getAllCards);

router.delete('/cards/:cardId', deleteCard);

router.post('/cards', createCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
