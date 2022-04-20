const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyUserT,
  loginUser,
} = require("../controllers/authController");
const { userAuth } = require("../middlewares");

router.post("/", createUser);

router.get("/verify/:userid/:otp", verifyUserT);

router.post("/login", loginUser);

module.exports = router;
