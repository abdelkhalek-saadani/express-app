const { Thing } = require("../models/thing");

exports.deleteOneThing = (req, res) => {
  const id = req.params.id;
  const userId = req.auth.userId;
  Thing.findById(id)
    .then((thing) => {
      if (thing && thing.userId != userId) {
        return res
          .status(401)
          .json({ message: "U dont hav e the right to delete this item" });
      }
      Thing.deleteOne({ _id: id })
        .then((state) => {
          if (!state.deletedCount) {
            return res.status(200).json({ message: "item already deleted" });
          }
          return res.status(200).json({ message: "deleted Successfully" });
        })
        .catch((error) => {
          return res.status(400).json({ error });
        });
    })
    .catch((error) => res.status(401).json({ error }));
};

exports.updateOneThing = (req, res, next) => {
  const userId = req.auth.userId;
  const id = req.params.id;
  Thing.findById(id)
    .then((thing) => {
      if (thing && thing.userId != userId) {
        return res
          .status(401)
          .json({ message: "U dont hav e the right to update this item" });
      }
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
