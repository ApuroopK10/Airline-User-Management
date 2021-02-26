const routes = require("express").Router();
const {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user-operations.controller");
const { protect } = require("../middleware/auth");

routes.post("/getUser", protect, getUser);
routes.post("/getAllUsers", protect, getAllUsers);
routes.post("/createUser", protect, createUser);
routes.post("/updateUser", protect, updateUser);
routes.post("/deleteUser", protect, deleteUser);

module.exports = routes;
