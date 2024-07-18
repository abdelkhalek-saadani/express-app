require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const stuffRoutes = require('./routes/stuff');
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

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

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

app.use('/api/stuff', stuffRoutes)

module.exports = app;
