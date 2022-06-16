const Student = require("../database/student");

const greetTeacher = (req, res, next) => {
    res.send(`Welcome, ${req.session.user.username}`);
};

const getAllStudents = async (req, res, next) => {
    const allStudents = await Student.find();
    allStudents.name.sort();
    res.send(allStudents.name);
};

const createScoreCard = async (req, res, next) => {
    const { body } = req;
    const scoreCard = {
        name: body.subjectName,
        dateOfExam: body.examDate,
        dateScoreCard: body.scoreDate,
        score: body.score,
        comments: body.comments,
    };
};

module.exports = {
    greetTeacher,
    getAllStudents,
    createScoreCard,
};
