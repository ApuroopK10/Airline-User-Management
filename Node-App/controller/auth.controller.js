const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

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
