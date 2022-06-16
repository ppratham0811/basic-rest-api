const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const catchAsync = require("../utils/catchAsync");

const { isLoggedIn, studentLoggedIn } = require("../middlewares");

router.get(
    "/",
    isLoggedIn,
    studentLoggedIn,
    catchAsync(studentController.getMarks)
);

module.exports = router;
