require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Thing = require("./models/thing");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => {
    console.log("Connected successfully to mongo");
  })
  .catch((error) => {
    console.log("Unable to connect to mongo");
    console.log(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:4200");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.delete("/api/stuff/:id", (req, res) => {
  const id = req.params.id;
  Thing.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({ message: "deleted Successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

app.put("/api/stuff/:id", (req, res, next) => {
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
});

app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/stuff/:id", (req, res) => {
  const id = req.params.id;
  Thing.findOne({ _id: id })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
});

app.post("/api/stuff", (req, res, next) => {
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
});

module.exports = app;
