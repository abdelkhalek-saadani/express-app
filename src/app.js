
const express = require("express");
const multer = require("multer");

const bodyParser = require("body-parser");  
const app = express();
const path = require('path');
const upload = multer();
const routes = require("./routes/index")




app.use(express.json());



app.use(bodyParser.json());
app.use(upload.none());

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




app.use("/api",routes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
