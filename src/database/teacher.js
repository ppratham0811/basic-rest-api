const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const teacherSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
});

teacherSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    if (foundUser) {
        const isValid = await bcrypt.compare(password, foundUser.password);
        return isValid ? foundUser : false;
    } else {
        return false;
    }
};

teacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const Teacher = model("Teacher", teacherSchema);
module.exports = Teacher;
