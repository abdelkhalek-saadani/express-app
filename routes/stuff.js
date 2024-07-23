const express = require("express");
const router = express.Router();
const stuffController = require("../controllers/stuff");
const auth = require("../middleware/auth");

router.delete("/:id", auth, stuffController.deleteOneThing);
router.put("/:id", auth, stuffController.updateOneThing);
router.get("/", stuffController.getAllThings);
router.get("/:id", stuffController.getOneThing);
router.post("/", stuffController.createOneThing);

module.exports = router;
