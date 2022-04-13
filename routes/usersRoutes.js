const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyUserT,
  loginUser,
} = require("../controllers/authController");
const { userAuth } = require("../middlewares");

router.post("/", createUser);

router.post("/verify", userAuth, verifyUserT);

router.post("/login", loginUser);

module.exports = router;
