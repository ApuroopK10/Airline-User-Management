const User = require("../models/User");
const asyncHandler = require("../middleware/async");

exports.signUp = asyncHandler(async (req, res) => {
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
});
