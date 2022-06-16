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
    // mainAdmin    password: "admin123",
    // admin2   password: "admin2123"
    const newAdmin = new Admin({
        username: "admin2",
        password: "admin2123",
    });
    await newAdmin.save();
};

addNewAdmin().then(() => {
    mongoose.connection.close();
});
