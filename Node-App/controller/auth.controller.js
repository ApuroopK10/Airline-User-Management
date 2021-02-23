const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.signUp = asyncHandler(async (req, res) => {
  const { name, email, role, password, children } = req.body;
  const response = await User.create({
    name,
    email,
    password,
    role,
    children,
  });

  res.status(201).json({
    success: true,
    data: response,
  });
});

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPassword(password);

    if (isMatch !== 0) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
};
