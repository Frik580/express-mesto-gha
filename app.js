const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

const { errorStatus } = require('./errors/errors');

const { notFound } = errorStatus;

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62f54f3aabd0c551a2b57870',
  };

  next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res) => {
  res.status(notFound).send({
    message: 'Страница не найдена',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
