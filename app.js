const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./contollers/users');
const auth = require('./middlewares/auth');

const app = express();

const { errorStatus } = require('./errors/errors');

const { notFound } = errorStatus;
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6304b88047744c7504551a34',
//   };

//   next();
// });

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
