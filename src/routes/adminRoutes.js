const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const adminController = require("../controllers/adminController");
const { isLoggedIn, adminLoggedIn } = require("../middlewares");

router.get("/", isLoggedIn, adminLoggedIn, adminController.greetAdmin);

router
    .route("/students")
    .get(isLoggedIn, adminLoggedIn, catchAsync(adminController.getStudents))
    .post(isLoggedIn, adminLoggedIn, catchAsync(adminController.addStudent));

router
    .route("/teachers")
    .get(isLoggedIn, adminLoggedIn, catchAsync(adminController.getTeachers))
    .post(isLoggedIn, adminLoggedIn, catchAsync(adminController.addTeacher));

router
    .route("/classes")
    .get(isLoggedIn, adminLoggedIn, catchAsync(adminController.getAllClasses));

router
    .delete(
        "/students/:studentId",
        isLoggedIn,
        adminLoggedIn,
        catchAsync(adminController.deleteStudent)
    )
    .delete(
        "/teachers/:teacherId",
        isLoggedIn,
        adminLoggedIn,
        catchAsync(adminController.deleteTeacher)
    )
    .delete(
        "/classes/:classId",
        isLoggedIn,
        adminLoggedIn,
        catchAsync(adminController.deleteClass)
    )
    .post(
        "/class",
        isLoggedIn,
        adminLoggedIn,
        catchAsync(adminController.addClass)
    )
    .put(
        "/student/:studentId/class/:classId",
        isLoggedIn,
        adminLoggedIn,
        catchAsync(adminController.mapStudent)
    )
    .put(
        "/teacher/:teacherId/class/:classId",
        isLoggedIn,
        adminLoggedIn,
        catchAsync(adminController.mapTeacher)
    );

module.exports = router;
