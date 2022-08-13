const { ApplicationError } = require('./errors');

class UserNotFound extends ApplicationError {
  constructor() {
    super(404, 'Пользователь с указанным _id не найден');
  }
}

module.exports = { UserNotFound };
