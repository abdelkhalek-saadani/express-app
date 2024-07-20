const { default: mongoose } = require("mongoose");

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

module.exports = {
  User: mongoose.connections[parseInt(process.env.USERDB_INDEX)].model(
    "User",
    userSchema
  ),
};
