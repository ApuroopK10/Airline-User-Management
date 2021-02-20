const mongoose = require("mongoose");

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  children: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
