const Thing = require("../models/thing");

exports.deleteOneThing = (req, res) => {
  const id = req.params.id;
  Thing.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({ message: "deleted Successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.updateOneThing =  (req, res, next) => {
  const updatedThing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  Thing.updateOne({ _id: req.params.id }, updatedThing)
    .then(() => {
      res.status(201).json({
        message: "Thing updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
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

exports.createOneThing = (req, res, next) => {
  const newThing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    price: req.body.price,
  });
  newThing
    .save()
    .then(() => {
      console.log("thing created successfully");
      res.status(201).json({ newThing });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
