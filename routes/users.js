const router = require("express").Router(); // создали роутер
const { createUser, getUser, getAllUsers, updateUser, updateAvatar } = require("../contollers/users");

router.get("/users", getAllUsers); // возвращает всех пользователей

router.get("/users/:userId", getUser); // возвращает пользователя по _id

router.post("/users", createUser); // создает нового пользователя

router.patch("/users/me", updateUser); // обновление профиля

router.patch("/users/me/avatar", updateAvatar); // обновление аватара

module.exports = router; // экспортировали роутер
