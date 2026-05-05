const express = require("express");

const router = express.Router();

const limiter = require("../middleware/rateLimiter");

const {
  registerValidation,
  loginValidation
} = require("../validation/authValidation");

const {
  registerUser,
  loginUser
} = require("../controllers/authController");

router.post(
  "/register",
  limiter,
  registerValidation,
  registerUser
);

router.post(
  "/login",
  limiter,
  loginValidation,
  loginUser
);

module.exports = router;