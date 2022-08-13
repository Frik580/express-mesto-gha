const { ApplicationError } = require('./errors');

class CardNotFound extends ApplicationError {
  constructor() {
    super(404, 'Карточка с указанным _id не найдена');
  }
}

module.exports = { CardNotFound };
