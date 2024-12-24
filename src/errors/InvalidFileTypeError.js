const multer = require("multer");

class InvalidFileTypeError extends multer.MulterError {
    constructor(field) {
      super("INVALID_FILE_MIMETYPE", field);
      this.message = "Invalid file type. Only .png, .jpg, and .jpeg format allowed! in field: " + field;
    }
  }

module.exports = InvalidFileTypeError;