const routes = require("express").Router();
const { signUp, login } = require("../controller/auth.controller");

routes.post("/signup", signUp);
routes.post("/login", login);

module.exports = routes;
