const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roll: {
        type: Number,
        required: true,
    },
    scoreCard: [
        {
            studentName: {
                type: String,
            },
            subjectName: {
                type: String,
            },
            examDate: {
                type: Date,
            },
            scoreDate: {
                type: Date,
            },
            score: {
                type: Number,
            },
            comments: {
                type: String,
            },
            studentId: {
                type: Schema.Types.ObjectId,
                ref: "Student",
            },
            teacherId: {
                type: Schema.Types.ObjectId,
                ref: "Teacher",
            },
        },
    ],
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
});

studentSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    if (foundUser) {
        const isValid = await bcrypt.compare(password, foundUser.password);
        return isValid ? foundUser : false;
    } else {
        return false;
    }
};

studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const Student = model("Student", studentSchema);
module.exports = Student;
