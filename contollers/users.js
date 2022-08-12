const User = require("../models/user");

const createUser = (req, res) => {
  return User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: `Error validating user ${err}` });
      } else {
        res.status(500).send({ message: `Internal server error ${err}` });
      }
    });
};

const getUser = (req, res) => {};

const getAllUsers = (req, res) => {};

module.exports = { createUser, getUser, getAllUsers };
