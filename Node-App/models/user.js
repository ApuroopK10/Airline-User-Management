const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Create Schema
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

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await enteredPassword.localeCompare(this.password);
};

UserSchema.methods.generateJWT = () => {
  return jwt.sign({ id: this._id }, "secret1235486efwfwef", {
    expiresIn: 300,
  });
};

module.exports = mongoose.model("User", UserSchema);
