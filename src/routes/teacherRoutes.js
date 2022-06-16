const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { isLoggedIn, teacherLoggedIn, authTeacher } = require("../middlewares");
const catchAsync = require("../utils/catchAsync");

router.get("/", isLoggedIn, teacherLoggedIn, teacherController.greetTeacher);

router
    .route("/students")
    .get(
        isLoggedIn,
        teacherLoggedIn,
        catchAsync(teacherController.getAllStudents)
    );

router.get(
    "/students/ranks",
    isLoggedIn,
    teacherLoggedIn,
    catchAsync(teacherController.getRanks)
);

router.put(
    "/:teacherId/students/:studentId",
    isLoggedIn,
    teacherLoggedIn,
    authTeacher,
    teacherController.createScoreCard
);

module.exports = router;
