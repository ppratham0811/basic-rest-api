const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const catchAsync = require('../utils/catchAsync');

router.route("/").get(loginController.getLogin).post(catchAsync(loginController.postLogin));

module.exports = router;
