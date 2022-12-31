const express = require("express");
const { route } = require("../app");
const {
  register,
  login,
  logout,
  updatePassword,
} = require("../controllers/userControler");

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/password/update").post(updatePassword);
module.exports = router;
