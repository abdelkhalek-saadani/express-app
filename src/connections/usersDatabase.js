const mongoose = require("mongoose");


const MONGO_URI = process.env.MONGOOSE_CONNECTION_STRING_USERDB;

const userDB = mongoose.createConnection(MONGO_URI);
userDB.on("connected", () => {
  console.log("Connected to the UserDB");
});

userDB.on("error", (error) => {
  console.error("Error connecting to UserDB:", error);
});

module.exports = userDB;
