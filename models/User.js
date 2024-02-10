const mongoose = require("mongoose");
const User = mongoose.model("User", {
  username: String,
  password: String,
  name: String,
  email: String,
  role: String,
  //image: String,
});

module.exports = User;
