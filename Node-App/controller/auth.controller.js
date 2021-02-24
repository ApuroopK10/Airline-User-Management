const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.signUp = asyncHandler(async (req, res) => {
  const { name, email, role, password, children } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
    children,
  });

  // token generation

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    data: user,
    token,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (isMatch !== 0) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // token generation

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    data: user,
    token,
  });
});
