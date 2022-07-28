const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/category.controller')

router.get('/all', categoryController.GETlistOfAllCategories);
router.get('/:id', categoryController.GETcategoryDetailPage);
router.get('./create', categoryController.GETcreateCategoryForm);
router.post('/create', categoryController.POSTcreateCategoryForm);


module.exports = router;
