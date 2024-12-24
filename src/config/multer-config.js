const multer = require("multer");
const InvalidFileTypeError = require("../errors/InvalidFileTypeError");

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
    
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const limits = {
  fields: 5, //Number of non-file fields
  fileSize: 1024 * 1024 * 5, //File size in bytes. Here, 5 MB
  files: 1, //Number of file fields
};


const fileFilter = (req, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true); 
  } else {
    callback(new InvalidFileTypeError(file.fieldname)); 
  }
};

module.exports = { storage, fileFilter, limits };
