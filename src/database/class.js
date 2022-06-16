const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const classSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    teachers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
        },
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
});

const Class = model("Class", classSchema);
module.exports = Class;
