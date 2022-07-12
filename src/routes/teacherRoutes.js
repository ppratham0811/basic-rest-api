const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { isLoggedIn, teacherLoggedIn, authTeacher } = require("../middlewares");
const catchAsync = require("../utils/catchAsync");

router.use(isLoggedIn,teacherLoggedIn);
// router.use(teacherLoggedIn);
// common middleware for all routes

router.get("/", teacherController.greetTeacher);

router.route("/students").get(catchAsync(teacherController.getAllStudents));

router.get("/students/ranks", catchAsync(teacherController.getRanks));

router.put(
    "/:teacherId/students/:studentId",
    authTeacher,
    teacherController.createScoreCard
);

module.exports = router;
