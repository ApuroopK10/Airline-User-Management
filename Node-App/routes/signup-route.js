const routes = require("express").Router();
const authenticateCtrl = require("../controller/signup.controller");

routes.post("/signup", authenticateCtrl.signUpCtrl);

module.exports = routes;
