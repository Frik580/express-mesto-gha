/* eslint-disable max-classes-per-file */
class ApplicationError extends Error {
  constructor(status = 500, message = 'Internal server error') {
    super();
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class UserNotFound extends ApplicationError {
  constructor() {
    super(404, 'Пользователь с указанным _id не найден');
  }
}

class CardNotFound extends ApplicationError {
  constructor() {
    super(404, 'Карточка с указанным _id не найдена');
  }
}

class IdNotFound extends ApplicationError {
  constructor() {
    super(404, 'Передан несуществующий _id карточки');
  }
}

const errorStatus = {
  notCorrect: '400',
  notFound: '404',
  serverError: '500',
};

module.exports = {
  UserNotFound, CardNotFound, IdNotFound, errorStatus,
};
