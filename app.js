const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const path = require("path");
const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.json());

const logger = (req, res, next) => {
  console.log("Запрос залогирован!");
  next();
};

app.use(logger);

app.use((req, res, next) => {
  req.user = {
    _id: "62f54f3aabd0c551a2b57870", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/", usersRouter);
app.use("/", cardsRouter);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
