const routes = require("express").Router();
const authenticateCtrl = require("../controller/signup.controller");

routes.get("/signup", authenticateCtrl.signUpCtrl);

module.exports = routes;
