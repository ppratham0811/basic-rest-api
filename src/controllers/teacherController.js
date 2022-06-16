const Student = require("../database/student");
const Teacher = require("../database/teacher");

const greetTeacher = (req, res, next) => {
    res.send(`Welcome, ${req.session.user.username} - ${req.session.user._id}`);
};

const getAllStudents = async (req, res, next) => {
    const loggedTeacher = await Teacher.findById(req.session.user._id);
    const allStudents = await Student.find();
    let studentList = [];
    for (let student of allStudents) {
        if (loggedTeacher.classId.equals(student.classId)) {
            studentList.push({
                id: student._id,
                name: student.name,
                roll: student.roll,
                scoreCard: student.scoreCard,
            });
        }
    }
    studentList.sort(function (a, b) {
        let A = a.name,
            B = b.name;
        if (A < B) return -1;
        if (A > B) return 1;
        return 0;
    });
    res.send(studentList);
};

const createScoreCard = async (req, res, next) => {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    const teacherId = req.session.user._id;
    const { subjectName, examDate, scoreDate, score, comments } = req.body;
    const scoreCard = {
        studentName: student.name,
        subjectName,
        examDate,
        scoreDate,
        score,
        comments,
        studentId,
        teacherId,
    };
    student.scoreCard.push(scoreCard);
    await student.save();
    res.redirect("/teacher/students");
};

// function to get list of student in descending order of ranks
const getRanks = async (req, res, next) => {
    const students = await Student.find().populate("classId", "name");
    const teacherId = req.session.user._id;
    const loggedTeacher = await Teacher.findById(teacherId).populate(
        "classId",
        "name"
    );
    let studentList = [];
    for (let student of students) {
        if (loggedTeacher.classId.name === student.classId.name) {
            let numSubs = student.scoreCard.length;
            if (numSubs > 0) {
                let sum = 0;
                let percentage;
                for (let score of student.scoreCard) {
                    sum += score.score;
                }
                if (numSubs > 1) {
                    percentage = parseFloat((sum / numSubs) * 100);
                } else {
                    percentage = parseFloat(sum / numSubs);
                }
                const studentReport = {
                    name: student.name,
                    roll: student.roll,
                    percentage,
                };
                studentList.push(studentReport);
            } else {
                continue;
            }
        } else {
            continue;
        }
    }
    studentList.sort(function (a, b) {
        let A = a.percentage,
            B = b.percentage;
        if (A < B) return -1;
        if (A > B) return 1;
        return 0;
    });
    studentList.reverse();
    res.send(studentList);
};

module.exports = {
    greetTeacher,
    getAllStudents,
    createScoreCard,
    getRanks,
};
