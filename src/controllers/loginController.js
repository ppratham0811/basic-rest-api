const { needsLogin } = require("../middlewares");

const getLogin = (req, res) => {
    res.send("Login Page");
};

const postLogin = needsLogin;

module.exports = {
    getLogin,
    postLogin,
};
