const mongoose = require("mongoose");
const Product = require("../models/product.model");
const Manufacturer = require('../models/manufacturer.model');
const { body, validationResult } = require("express-validator");

const createProductFormPath = "./product/create_product_form";
const productDetailPagePath = "./product/product_details";
const productListPagePath = "./product/product_list";
const index = "/";

exports.GETlistOfAllProducts = (request, response, next) => {
  // TODO move to func
  Product.find({})
    .sort({ name: 1 })
    .exec((error, results) => {
      if (error) return next(error);

      response.render(productListPagePath, {
        productsList: results,
      });
    });
};

exports.GETproductDetailPage = (request, response, next) => {
  const id = mongoose.Types.ObjectId(request.params.id);

  Product.findById(id).exec((error, result) => {
    if (error) {
      return response.redirect(index);
    }
    // TODO below
    if (result.product === null) {
      const error404 = new Error(
        "Could not find a product with the provided id."
      );
      error404.status = 404;
      return next(error404);
    }

    response.render(productDetailPagePath, {
      product: result,
    });
  });
};

exports.GETcreateProductForm = (request, response, next) => {
  // TODO move to func
  Manufacturer.find({})
    .sort({ name: 1 })
    .exec((error, results) => {
      if (error) return next(error);

      response.render(createProductFormPath, {
        manufacturerList: results
      })
    });
};

// TODO
exports.POSTcreateProductForm = [
  body("name", "Product name is required")
    .trim()
    .isLength({ min: 1 }).withMessage(),
  body('price', 'Price is required').isNumeric().withMessage('Price must be a number'),
  body('description', 'Description is required').trim().isLength({min: 1}),
  body('manufacuter', 'Manufacturer is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
    });

    if (!errors.isEmpty()) {
      return res.render(createProductFormPath, {
        product: product,
        errors: errors.array(),
      });
    } else {
      Product.findOne({ name: req.body.name }).exec((err, found) => {
        if (err) {
          return console.log("1");
        }

        if (found) {
          return console.log("2");
        }

        product.save((err) => {
          if (err) {
            return console.log(err);
          }

          res.redirect(product.url);
        });
      });
    }
  },
];

// TODO
exports.POSTdeleteCategoryForm = [
  body("category-id", "Category ID is required")
    .trim()
    .isLength({ min: 24, max: 24 })
    .withMessage("Category ID shall equal 24 characters")
    .isAlphanumeric()
    .withMessage("Category ID may only contains alphanumerics"),

  (req, res, next) => {
    Category.findByIdAndRemove(req.body['category-id']).exec((error, response) => {
      if (error) {
        return res.redirect(index);
      }

      // TODO
      if (response === null) {
        // const error404 = new Error(
        //   "Could not find a category with the provided id."
        // );
        // error404.status = 404;
        // return next(error404);
      }

      return res.redirect(index);
    });
  },
];

exports.GETupdateCategoryForm = (request, response) => {};

exports.POSTupdateCategoryForm = (request, response) => {};
