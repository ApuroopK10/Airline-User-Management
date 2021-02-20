const routes = require("express").Router();
const authenticateCtrl = require("../controller/signup.controller");

routes.get("/signup", async (req, res, next) => {
  try {
    const response = await authenticateCtrl.signUpCtrl(req, res);
    console.log("response", response);
    res.status(201).json({
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

module.exports = routes;
