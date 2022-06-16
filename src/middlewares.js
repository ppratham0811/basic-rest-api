const bcrypt = require("bcrypt");
const AppError = require("./utils/AppError");
const Admin = require("./database/admin");
const Teacher = require("./database/teacher");
const Student = require("./database/student");

const isLoggedIn = async (req, res, next) => {
    if (!req.session.loggedUser && !req.session.user) {
        next(new AppError("Unauthorized Access", 401));
    } else {
        next();
    }
};

const needsLogin = async (req, res, next) => {
    const { username, password } = req.body;
    const foundAdmin =
        (await Admin.findAndValidate(username, password)) || null;
    const foundTeacher =
        (await Teacher.findAndValidate(username, password)) || null;
    const foundStudent =
        (await Student.findAndValidate(username, password)) || null;
    if (foundAdmin) {
        req.session.user = foundAdmin;
        req.session.loggedUser = "Admin";
        res.redirect("/admin/");
    } else if (foundTeacher) {
        req.session.user = foundTeacher;
        req.session.loggedUser = "Teacher";
        res.redirect("/teacher/");
    } else if (foundStudent) {
        req.session.user = foundStudent;
        req.session.loggedUser = "Student";
        res.redirect("/student/");
    } else {
        next(new AppError("Invalid Credentials", 401));
    }
};

const adminLoggedIn = (req, res, next) => {
    if (req.session.loggedUser === "Admin") {
        next();
    } else {
        next(new AppError("Unauthorized access", 401));
    }
};

const teacherLoggedIn = (req, res, next) => {
    if (req.session.loggedUser === "Teacher") {
        next();
    } else {
        next(new AppError("Unauthorized access", 401));
    }
};

const studentLoggedIn = (req, res, next) => {
    if (req.session.loggedUser === "Student") {
        next();
    } else {
        next(new AppError("Unauthorized access", 401));
    }
};

const authTeacher = async (req, res, next) => {
    const { teacherId, studentId } = req.params;
    const foundTeacher = await Teacher.findById(teacherId).populate(
        "classId",
        "name"
    );
    const foundStudent = await Student.findById(studentId).populate(
        "classId",
        "name"
    );
    if (foundTeacher.classId.name === foundStudent.classId.name) {
        next();
    } else {
        next(
            new AppError(
                "Unauthorized class access or either the teacher or the student are not mapped to the same classId",
                401
            )
        );
    }
};

module.exports = {
    isLoggedIn,
    needsLogin,
    adminLoggedIn,
    teacherLoggedIn,
    studentLoggedIn,
    authTeacher,
};
