const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const hashUtils = require("../Utils/hash");

// @desc      Signup user
// @route     POST authenticate/signUp
// @access    Private
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

// @desc      Login user
// @route     POST authenticate/login
// @access    Private
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

// Generate token from model schema and send response
const sendTokenResponse = (user, statusCode, res) => {
  const { name, email, role, children, _id } = user;
  // Create token
  const token = user.generateJWT();

  res.status(statusCode).json({
    success: true,
    token,
    data: { name, email, role, children, _id },
    expiresIn: 600,
  });
};
