const Admin = require("../database/admin");
const Teacher = require("../database/teacher");
const Student = require("../database/student");
const Class = require("../database/class");
const AppError = require("../utils/AppError");

const greetAdmin = (req, res, next) => {
    res.send(`Welcome, ${req.session.user.username}`);
};

const getTeachers = async (req, res, next) => {
    const teachers = await Teacher.find();
    res.send(teachers);
};

const addTeacher = async (req, res, next) => {
    const { username, password } = req.body;
    const newTeacher = new Teacher({
        username,
        password,
    });
    await newTeacher.save();
    res.redirect("/admin/teachers");
};

const mapTeacher = async (req, res, next) => {
    const { teacherId, classId } = req.params;
    await Teacher.findByIdAndUpdate(
        teacherId,
        { classId },
        { new: true, runValidators: true }
    );
    const foundClass = await Class.findById(classId);
    for (let t of foundClass.teachers) {
        if (t.equals(teacherId)) {
            return res.redirect("/admin/classes");
        }
    }
    foundClass.teachers.push(teacherId);
    await foundClass.save();
    res.redirect("/admin/classes");
};

const deleteTeacher = async (req, res, next) => {
    const { teacherId } = req.params;
    await Teacher.findByIdAndDelete(teacherId);
    res.redirect("/admin/teachers");
};

const getStudents = async (req, res, next) => {
    const students = await Student.find();
    res.send(students);
};

const addStudent = async (req, res, next) => {
    const { name, username, password, roll } = req.body;
    const newStudent = new Student({
        name,
        username,
        password,
        roll,
    });
    await newStudent.save();
    res.redirect("/admin/students");
};

const mapStudent = async (req, res, next) => {
    const { studentId, classId } = req.params;
    await Student.findByIdAndUpdate(
        studentId,
        { classId },
        { new: true, runValidators: true }
    );
    const foundClass = await Class.findById(classId);
    for (let s of foundClass.students) {
        if (s.equals(studentId)) {
            return res.redirect("/admin/classes");
        }
    }
    foundClass.students.push(studentId);
    await foundClass.save();
    res.redirect("/admin/classes");
};

const deleteStudent = async (req, res, next) => {
    const { studentId } = req.params;
    await Student.findByIdAndDelete(studentId);
    res.send(`Student ${studentId} deleted successfully`);
};

const getAllClasses = async (req, res, next) => {
    const allClasses = await Class.find();
    res.send(allClasses);
};

const addClass = async (req, res, next) => {
    const { name } = req.body;
    const addNewClass = new Class({
        name,
    });
    await addNewClass.save();
    res.redirect("/admin/classes");
};

const deleteClass = async (req, res, next) => {
    const { classId } = req.params;
    await Class.findByIdAndDelete(classId);
    res.redirect("/admin/classes");
};

module.exports = {
    greetAdmin,
    getStudents,
    addStudent,
    mapStudent,
    deleteStudent,
    getTeachers,
    addTeacher,
    mapTeacher,
    deleteTeacher,
    getAllClasses,
    addClass,
    updateClass,
    deleteClass,
};
