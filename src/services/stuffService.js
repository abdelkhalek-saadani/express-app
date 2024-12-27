const { Thing } = require("../models/thing");

/**
 * @typedef {Object} DeleteState
 * @property {boolean} acknowledged - Whether the delete operation was acknowledged.
 * @property {number} deletedCount - The number of documents deleted.
 */

/**
 * @typedef {Object} ThingCollection
 * @property {string} title - The title of the thing.
 * @property {string} description - The description of the thing.
 * @property {string} imageUrl - The URL of the image.
 * @property {number} price - The price of the thing.
 * @property {string} userId - The ID of the user who created the thing.
 * @property {string} _id - The ID of the thing.
 */

/**
 * @typedef {Object} ThingData
 * @property {string} title - The title of the thing.
 * @property {string} description - The description of the thing.
 * @property {number} price - The price of the thing.
 * @property {string} userId - The ID of the user who created the thing.
 */

/**
 * Deletes a thing by its ID.
 * @param {Object} params - The parameters.
 * @param {string} params.thingId - The ID of the thing to delete.
 * @param {string} params.userId - The ID of the user attempting to delete the thing.
 * @returns {Promise<DeleteState>} The result of the delete operation.
 * @throws {Error} If the user is not permitted to delete the thing.
 */

const deleteOneThing = async ({ thingId, userId }) => {
  const thing = await Thing.findOne({ _id: thingId });

  if (thing && thing.userId != userId) {
    throw new Error("You're not permitted to delete this item");
  }
  const deleteState = await Thing.deleteOne({ _id: thingId });
  return deleteState;
};

/**
 * Updates a thing by its ID.
 * @param {Object} params - The parameters.
 * @param {string} params.thingId - The ID of the thing to update.
 * @param {string} params.userId - The ID of the user attempting to update the thing.
 * @param {string} params.thing - The updated thing data.
 * @param {string} params.url - The base URL.
 * @param {Object} params.file - The file object containing the image.
 * @returns {Promise<void>}
 * @throws {Error} If the user is not permitted to update the thing.
 */
const updateOneThing = async ({ thingId, userId, thing, url, file }) => {
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

/**
 * Creates a new thing.
 * @param {Object} params - The parameters.
 * @param {string} params.userId - The ID of the user creating the thing.
 * @param {ThingData} params.thing - The thing data.
 * @param {string} params.url - The base URL for the image.
 * @param {Object} params.file - The file object containing the image.
 * @returns {Promise<void>}
 */
const createOneThing = async ({ userId, thing, url, file }) => {
  const imageUrl = file ? url + "/images/" + file.filename : "";
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
