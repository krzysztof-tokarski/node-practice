const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/create", productController.GETcreateProductForm);
router.post("/create", productController.POSTcreateCategoryForm);

router.post("/delete", productController.POSTdeleteCategoryForm);

router.get("/all", productController.GETlistOfAllProducts);
router.get("/:id", productController.GETproductDetailPage);

module.exports = router;
