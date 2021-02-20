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
    required: true,
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

module.exports = mongoose.model("User", UserSchema);
