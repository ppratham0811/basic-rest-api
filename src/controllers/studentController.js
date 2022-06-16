const Student = require("../database/student");
const getMarks = async (req, res, next) => {
    const student = req.session.user;
    let allMarks = await Student.findById(student._id);
    res.send(`Welcome, ${student.name}\n\nAll grades:\n${allMarks}`);
};

module.exports = {
    getMarks,
};
