const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["Super Admin", "Admin", "User"],
    default: "User",
  },
  children: [
    {
      type: String,
      required: true,
    },
  ],
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (
  enteredPassword,
  dbPassword
) {
  return await bcrypt.compare(enteredPassword, dbPassword);
};

// generate JWT token for the user
UserSchema.methods.generateJWT = () => {
  return jwt.sign({ id: this._id }, "secret1235486efwfwef", {
    expiresIn: 600,
  });
};

module.exports = mongoose.model("User", UserSchema);
