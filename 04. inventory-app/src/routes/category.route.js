const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller')

router.get('/create', categoryController.GETcreateCategoryForm);
router.post('/create', categoryController.POSTcreateCategoryForm);
router.get('/all', categoryController.GETlistOfAllCategories);
router.get('/:id', categoryController.GETcategoryDetailPage);



module.exports = router;
