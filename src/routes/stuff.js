const express = require("express");
const router = express.Router();
const stuffController = require("../controllers/stuff");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer-middleware");

router.delete("/:id", auth, stuffController.deleteOneThing);
router.put("/:id", auth, upload, stuffController.updateOneThing);
router.get("/", stuffController.getAllThings);
router.get("/:id", stuffController.getOneThing);
router.post("/", auth, upload, stuffController.createOneThing);

module.exports = router;
