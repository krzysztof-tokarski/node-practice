const express = require("express");
const router = express.Router();
const manufacturerController = require("../controllers/manufacturer.controller");

router.get("/create", manufacturerController.GETcreateManufacturerForm);
router.post("/create", manufacturerController.POSTcreateManufacturerForm);

router.post("/delete", manufacturerController.POSTdeleteManufacturerForm);

router.get("/all", manufacturerController.GETlistOfAllManufacturers);
router.get("/:id", manufacturerController.GETmanufacturerDetailPage);

module.exports = router;
