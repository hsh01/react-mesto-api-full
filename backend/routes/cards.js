const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  createCard, deleteCard, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');
const { CardInSchema, CardIdParamSchema } = require('../schemas/card');

router.get('/', getCards);
router.delete('/:cardId', celebrate(CardIdParamSchema), deleteCard);
router.post('/', celebrate(CardInSchema), createCard);
router.put('/:cardId/likes', celebrate(CardIdParamSchema), likeCard);
router.delete('/:cardId/likes', celebrate(CardIdParamSchema), dislikeCard);

module.exports = router;
