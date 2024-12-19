const mongoose = require("mongoose");
const userDB = require("../connections/usersDatabase");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = {
  User: userDB.model("User", userSchema),
};
