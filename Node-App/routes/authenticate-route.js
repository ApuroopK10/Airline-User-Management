const routes = require("express").Router();
const authenticateCtrl = require("../controller/auth.controller");

routes.post("/signup", authenticateCtrl.signUp);
routes.post("/login", authenticateCtrl.login);

module.exports = routes;
