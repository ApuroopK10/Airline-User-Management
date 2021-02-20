const routes = require("express").Router();
const {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user-operations.controller");

routes.post("/getUser", getUser);
routes.post("/getAllUsers", getAllUsers);
routes.post("/createUser", createUser);
routes.post("/updateUser", updateUser);
routes.post("/deleteUser", deleteUser);

module.exports = routes;
