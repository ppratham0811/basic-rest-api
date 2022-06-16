const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { isLoggedIn, teacherLoggedIn } = require("../middlewares");
const catchAsync = require("../utils/catchAsync");

router.get("/", isLoggedIn, teacherLoggedIn, teacherController.greetTeacher);

router
    .route("/students")
    .get(
        isLoggedIn,
        teacherLoggedIn,
        catchAsync(teacherController.getAllStudents)
    );

router.post(
    "/students/:studentId",
    isLoggedIn,
    teacherLoggedIn,
    teacherController.createScoreCard
);

module.exports = router;
