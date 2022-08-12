const router = require("express").Router();
const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar,
} = require("../contollers/users");

router.get("/users", getAllUsers);

router.get("/users/:userId", getUser);

router.post("/users", createUser);

router.patch("/users/me", updateUser);

router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
