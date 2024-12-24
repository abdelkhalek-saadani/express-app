const multer = require("multer");
const { storage, limits, fileFilter } = require("../config/multer-config");

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).single("image");

const uploadWithErrors = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message, code: err.code });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    } else {
      next();
    }
  });
};

module.exports = uploadWithErrors;
