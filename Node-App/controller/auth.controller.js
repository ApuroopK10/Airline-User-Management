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

  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (isMatch !== 0) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.generateJWT();

  const options = {
    expires: new Date(
      Date.now() + 1 * 1 * 5 * 60 * 1000 // will expire in 5 min
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    data: user,
    expiresIn: 3000,
  });
};
