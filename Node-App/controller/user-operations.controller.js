const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

exports.getUser = asyncHandler(async (req, res, next) => {
  const response = await User.findById(req.body.id);

  if (!response) {
    return next(
      new ErrorResponse(`User not found with id ${req.body.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: response });
});

exports.getAllUser = asyncHandler(async (req, res, next) => {
  const response = await User.find().where("_id").in(req.body.ids).exec();

  if (!response) {
    return next(
      new ErrorResponse(`User not found with id ${req.body.id}`, 404)
    );
  }
  // return response;
  res.status(200).json({ success: true, data: response });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.body.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
