const User = require("../models/User");

exports.signUp = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const response = await User.create({
      name,
      email,
      password,
      role,
    });

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
};
