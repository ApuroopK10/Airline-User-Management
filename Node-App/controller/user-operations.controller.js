const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const hashUtils = require("../Utils/hash");

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
  res.status(200).json({ success: true, data: response });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const { newUser, parentUser } = req.body;

  // hash password for new user
  const password = await hashUtils.hashPassword(newUser.password);
  newUser["password"] = password;

  // save new user
  const user = await User.create(newUser);
  let parent;
  if (user) {
    // update child id in parent
    parentUser.children.push(user._id);
    parent = await User.findByIdAndUpdate(parentUser._id, parentUser, {
      new: true,
      runValidators: true,
    });
  }
  let childUsers = [];
  if (parent) {
    // return all the children
    childUsers = await User.find().where("_id").in(parent.children).exec();
  }

  res.status(200).json({
    success: true,
    data: { gridData: childUsers, parent },
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { updateUser } = req.body;
  if (!updateUser.password) {
    const user = await User.findOne({ _id: updateUser._id }).select(
      "+password"
    );
    updateUser["password"] = user.password;
  } else {
    // hash password for update user profile
    const password = await hashUtils.hashPassword(updateUser.password);
    updateUser["password"] = password;
  }

  const updatedUser = await User.findByIdAndUpdate(updateUser._id, updateUser, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: {
      updatedUser,
    },
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id, parentUser } = req.body;
  const response = await User.findByIdAndDelete(id);
  let parent;
  if (response) {
    // splice child id from parent & update parent
    parentUser.children.splice(
      parentUser.children.findIndex((parentId) => parentId === id),
      1
    );
    // get all children for the parent
    parent = await User.findByIdAndUpdate(parentUser._id, parentUser, {
      new: true,
      runValidators: true,
    });
  }
  let childUsers = [];
  if (parent) {
    // return all the children
    childUsers = await User.find().where("_id").in(parent.children).exec();
  }

  console.log("resp", response);
  res.status(200).json({
    success: true,
    data: { gridData: childUsers, parent },
  });
});
