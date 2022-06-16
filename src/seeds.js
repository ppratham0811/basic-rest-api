const mongoose = require("mongoose");
const Admin = require("./database/admin");
const DBURL = "mongodb://localhost:27017/sch-mgmt";

mongoose
    .connect(DBURL)
    .then(() => {
        console.log("db connected successfully");
    })
    .catch((e) => {
        console.log("error connecting db");
    });

const addNewAdmin = async function () {
    const newAdmin = new Admin({
        username: "mainAdmin",
        password: "admin123",
    });
    await newAdmin.save();
};

addNewAdmin().then(() => {
    mongoose.connection.close();
});
