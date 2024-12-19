const { Thing } = require("../models/thing");
//const fs = require("fs");
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
  req.body.thing = JSON.parse(req.body.thing);
  const userId = req.auth.userId;
  const url = req.protocol + "://" + req.get("host");
  const id = req.params.id;
  Thing.findById(id)
    .then((thing) => {
      if (thing && thing.userId != userId) {
        return res
          .status(401)
          .json({ message: "U dont have the right to update this item" });
      }
      const imageUrl = req.file
        ? url + "/images/" + req.file.filename
        : req.body.thing.imageUrl;

      // if ((req.file || req.body.thing.imageUrl) && thing.imageUrl) {
      //   const oldImagePath = thing.imageUrl.replace(url, ".");
      //   fs.unlink(oldImagePath, (err) => {
      //     if (err) {
      //       console.log(`${oldImagePath} was not deleted: ${err.message}`);
      //     } else {
      //       console.log(`${thing.imageUrl} was deleted`);
      //     }
      //   });
      // }
      //this has security issue

      const updatedThing = new Thing({
        _id: req.params.id,
        title: req.body.thing.title,
        description: req.body.thing.description,
        imageUrl: imageUrl,
        price: req.body.thing.price,
        userId: userId,
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
  req.body.thing = JSON.parse(req.body.thing);
  const userId = req.auth.userId;
  const url = req.protocol + "://" + req.get("host");
  const thing = new Thing({
    title: req.body.thing.title,
    description: req.body.thing.description,
    imageUrl: url + "/images/" + req.file.filename,
    price: req.body.thing.price,
    userId: userId,
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
