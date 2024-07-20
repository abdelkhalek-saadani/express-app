require("dotenv").config();

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGOOSE_CONNECTION_STRING_USERDB;

const connectUserDB = () => {
  try {
    const userDB = mongoose.createConnection(MONGO_URI);
    userDB.on("connected", () => {
      console.log("Connected to the UserDB");
    });
    return { userDB };
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectUserDB };
