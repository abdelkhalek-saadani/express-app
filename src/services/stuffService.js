const { Thing } = require("../models/thing");

const deleteOneThing = async ({ thingId, userId }) => {
  const thing = await Thing.findOne({ _id: thingId });

  if (thing && thing.userId != userId) {
    throw new Error("You're not permitted'to delete this item");
  }
  const deleteState = await Thing.deleteOne({ _id: thingId });
  console.log(deleteState);
  return deleteState;
};

const updateOneThing = async ({ thingId, userId, thing, url, file }) => {
  thing = JSON.parse(thing);

  if ((await Thing.findOne({ _id: thingId }))?.userId != userId) {
    throw new Error("U dont have the right to update this item");
  }

  const imageUrl = file ? url + "/images/" + file.filename : thing.imageUrl;

  const updatedThing = new Thing({
    _id: thingId,
    title: thing.title,
    description: thing.description,
    imageUrl: imageUrl,
    price: thing.price,
    userId: userId,
  });
  await Thing.updateOne({ _id: userId }, updatedThing);
};

const createOneThing = async ({ userId, thing, url, file }) => {
  const imageUrl = file ? url + "/images/" + file.filename : '';
  const newThing = new Thing({
    title: thing.title,
    description: thing.description,
    imageUrl: imageUrl,
    price: thing.price,
    userId: userId,
  });
  await newThing.save();
};

module.exports = { deleteOneThing, updateOneThing, createOneThing };
