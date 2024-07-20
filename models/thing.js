const { default: mongoose } = require("mongoose");
const thingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = {
  Thing: mongoose.connections[parseInt(process.env.THINGDB_INDEX)].model(
    "Thing",
    thingSchema
  ),
};
