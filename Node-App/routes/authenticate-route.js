const routes = require("express").Router();
const { signUp } = require("../controller/auth.controller");

routes.post("/signup", signUp);
// routes.post("/login", authenticateCtrl.login);

module.exports = routes;
