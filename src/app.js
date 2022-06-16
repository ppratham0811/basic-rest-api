require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const AppError = require("./utils/AppError");
const session = require("express-session");
// process.env.DB_URL ||
const DBURL = "mongodb://localhost:27017/sch-mgmt";
const secret = process.env.SECRET || "thisisthesecretcode";

const sessionInfo = {
    name: "schmgmtsession",
    secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};

mongoose
    .connect(DBURL)
    .then(() => {
        console.log("db connected successfully");
    })
    .catch((e) => {
        console.log("db connectin error", e);
    });

app.use(express.urlencoded({ extended: true }));
app.use(session(sessionInfo));

const loginRoutes = require("./routes/loginRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Logout route
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/auth/login');
})
app.use("/auth/login", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);

// Home page route
app.get("/", (req, res) => {
    res.send("School management REST API");
});

// Handling 404 error
app.all("*", (req, res, next) => {
    next(new AppError("Page Not Found", 404));
});

// Handling other error
// This uses the ./utils/AppError.js file for handling errors
app.use((err, req, res, next) => {
    const { message = "Something went wrong", statusCode = 500 } = err;
    res.status(statusCode).send(message);
});

app.listen(port, () => {
    console.log("app listening on port", port);
});
