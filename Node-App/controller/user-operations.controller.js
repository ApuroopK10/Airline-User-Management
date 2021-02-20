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

exports.getAllUsers = asyncHandler(async (req, res, next) => {
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
  const { newUser, parentUser } = req.body;
  const user = await User.create(newUser);
  console.log("user-", user);
  let parent;
  if (user) {
    parentUser.children.push(user._id);
    parent = await User.findByIdAndUpdate(parentUser._id, parentUser, {
      new: true,
      runValidators: true,
    });
  }

  let childUsers = [];
  if (parent) {
    childUsers = await User.find().where("_id").in(parent._id).exec();
  }

  res.status(201).json({
    success: true,
    data: childUsers,
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
  const response = await User.findByIdAndDelete(req.body.id);
  console.log("resp", response);
  res.status(200).json({
    success: true,
    data: {},
  });
});
