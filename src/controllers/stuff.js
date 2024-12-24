const { Thing } = require("../models/thing");
const stuffService = require("../services/stuffService");

exports.deleteOneThing = async (req, res) => {
  const thingId = req.params.id;
  const userId = req.auth.userId;

  try {
    const deleteState = await stuffService.deleteOneThing({ thingId, userId });
    if (!deleteState.deletedCount) {
      return res.status(200).json({ message: "item already deleted" });
    }
    return res.status(200).json({ message: "deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.updateOneThing = async (req, res, next) => {
  try {
    const thing = JSON.parse(req.body.thing);
    const userId = req.auth.userId;
    const url = req.protocol + "://" + req.get("host");
    const thingId = req.params.id;
    await stuffService.updateOneThing({ thingId, userId, thing, url, file });

    res.status(201).json({
      message: "Thing updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneThing = (req, res) => {
  const id = req.params.id;
  Thing.findOne({ _id: id })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.createOneThing = async (req, res, next) => {
  const thing = req.body;
  const userId = req.auth.userId;
  const url = req.protocol + "://" + req.get("host");
  const file = req.file;
  if (!file) {
    return res.status(400).json({
      error: "Please provide an image",
    });
  }
  try {
    await stuffService.createOneThing({ userId, thing, url, file });
    res.status(201).json({
      message: "Post saved successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
