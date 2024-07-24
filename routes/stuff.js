const express = require("express");
const router = express.Router();
const stuffController = require("../controllers/stuff");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.delete("/:id", auth, stuffController.deleteOneThing);
router.put("/:id", auth, multer, stuffController.updateOneThing);
router.get("/", stuffController.getAllThings);
router.get("/:id", stuffController.getOneThing);
router.post("/", auth, multer, stuffController.createOneThing);

module.exports = router;
