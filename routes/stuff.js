const express = require("express");
const router = express.Router();
const stuffController = require("../controllers/stuff");

router.delete("/:id", stuffController.deleteOneThing);
router.put("/:id", stuffController.updateOneThing);
router.get("/", stuffController.getAllThings);
router.get("/:id", stuffController.getOneThing);
router.post("/", stuffController.createOneThing);

module.exports = router;
