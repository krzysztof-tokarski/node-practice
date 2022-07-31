const mongoose = require("mongoose");
const Category = require("../models/category.model");
const { body, validationResult } = require("express-validator");

const createCategoryFormPath = "./category/create_category_form";
const categoryDetailPagePath = "./category/category_details";
const categoryListPagePath = "./category/category_list";
const index = "/";

exports.GETlistOfAllCategories = (request, response, next) => {
  Category.find({})
    .sort({ name: 1 })
    .exec((error, results) => {
      if (error) return next(error);

      response.render(categoryListPagePath, {
        categoriesList: results,
      });
    });
};

exports.GETcategoryDetailPage = (request, response, next) => {
  const id = mongoose.Types.ObjectId(request.params.id);

  Category.findById(id).exec((error, result) => {
    if (error) {
      return response.redirect(index);
    }
    // TODO below
    if (result.category === null) {
      const error404 = new Error(
        "Could not find a category with the provided id."
      );
      error404.status = 404;
      return next(error404);
    }

    response.render(categoryDetailPagePath, {
      category: result,
    });
  });
};

exports.GETcreateCategoryForm = (request, response, next) => {
  response.render(createCategoryFormPath);
};

exports.POSTcreateCategoryForm = [
  body("name", "Category name is required")
    .trim()
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage("Category name must be alphabet letters only."),

  (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      return res.render(createCategoryFormPath, {
        category: category,
        errors: errors.array(),
      });
    } else {
      Category.findOne({ name: req.body.name }).exec((err, foundCategory) => {
        if (err) {
          return console.log("1");
        }

        if (foundCategory) {
          return console.log("2");
        }

        category.save((err) => {
          if (err) {
            return console.log(err);
          }

          // res.redirect(category.url);
        });
      });
    }
  },
];

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
