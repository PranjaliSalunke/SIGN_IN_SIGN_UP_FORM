const User = require("../models/User");

async function create(body) {
  const user_obj = new User(body);

  return await user_obj.save();
}

module.exports = {
  create,
};
