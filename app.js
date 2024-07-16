require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");

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

app.get("/api/products", (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  Product.findOne({ _id: id })
    .then((product) => {
      res.status(200).json({ product });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
});

app.post("/api/products", (req, res, next) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  });
  newProduct
    .save()
    .then((product) => {
      res.status(201).json({ product });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

app.put("/api/products/:id", (req, res, next) => {
  id = req.params.id;
  const productUpdates = new Product({
    _id: id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  });
  Product.updateOne({ _id: id }, productUpdates)
    .then(() => {
      res.status(201).json({ message: "Modified!" });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  Product.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({ message: "Deleted!" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});
module.exports = app;
