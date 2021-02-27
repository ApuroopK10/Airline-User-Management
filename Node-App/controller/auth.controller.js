const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const hashUtils = require("../Utils/hash");

exports.signUp = asyncHandler(async (req, res) => {
  const { name, email, role, children } = req.body;
  const password = await hashUtils.hashPassword(req.body.password);
  const user = await User.create({
    name,
    email,
    password,
    role,
    children,
  });

  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const dbPassword = user.password;
  const isMatch = await user.matchPassword(password, dbPassword);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.generateJWT();

  res.status(statusCode).json({
    success: true,
    token,
    data: user,
    expiresIn: 300,
  });
};
