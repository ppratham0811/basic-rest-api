const Student = require("../database/student");
const getMarks = async (req, res, next) => {
    const studentId = req.session.user._id;
    let student = await Student.findById(studentId);
    res.send(
        `Welcome, ${student.name}\nRoll no.: ${student.roll}\n\nAll grades:\n${student.scoreCard}`
    );
};

module.exports = {
    getMarks,
};
