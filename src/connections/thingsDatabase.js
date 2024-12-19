const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGOOSE_CONNECTION_STRING_THINGDB;

const thingDB = mongoose.createConnection(MONGO_URI);
thingDB.on("connected", () => console.log("connected to thingDB"));
thingDB.on("error", (error) =>
  console.error("Error connecting to thingDB:", error)
);

module.exports = thingDB;
