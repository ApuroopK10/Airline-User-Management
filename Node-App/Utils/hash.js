const bcrypt = require("bcryptjs");

// Encrypt password using bcrypt
exports.hashPassword = async function (enteredPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(enteredPassword, salt);
};
