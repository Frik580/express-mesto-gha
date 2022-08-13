const { ApplicationError } = require('./errors');

class IdNotFound extends ApplicationError {
  constructor() {
    super(404, 'Передан несуществующий _id карточки');
  }
}

module.exports = { IdNotFound };
