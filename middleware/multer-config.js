const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    let name = file.originalname.split(" ").join("_");
    name =
      name.lastIndexOf(".") != -1
        ? name.substring(0, name.lastIndexOf("."))
        : name;
    //console.log("in the muletr middleware, the file ",file);
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
