const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const adminController = require("../controllers/adminController");
const { isLoggedIn, adminLoggedIn } = require("../middlewares");

router.use(isLoggedIn, adminLoggedIn);
// router.use(adminLoggedIn);
// common middleware for all routes

router.get("/", adminController.greetAdmin);

router
    .route("/students")
    .get(catchAsync(adminController.getStudents))
    .post(catchAsync(adminController.addStudent));

router
    .route("/teachers")
    .get(catchAsync(adminController.getTeachers))
    .post(catchAsync(adminController.addTeacher));

router.route("/classes").get(catchAsync(adminController.getAllClasses));

router
    .delete("/students/:studentId", catchAsync(adminController.deleteStudent))
    .delete("/teachers/:teacherId", catchAsync(adminController.deleteTeacher))
    .delete("/classes/:classId", catchAsync(adminController.deleteClass))
    .post("/class", catchAsync(adminController.addClass))
    .put(
        "/student/:studentId/class/:classId",
        catchAsync(adminController.mapStudent)
    )
    .put(
        "/teacher/:teacherId/class/:classId",
        catchAsync(adminController.mapTeacher)
    );

module.exports = router;
