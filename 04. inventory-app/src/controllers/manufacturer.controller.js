const mongoose = require("mongoose");
const Manufacturer = require("../models/manufacturer.model");
const { body, validationResult } = require("express-validator");

const createManufacturerFormPath = "./manufacturer/create_manufacturer_form";
const manufacturerDetailPagePath = "./manufacturer/manufacturer_details";
const manufacturerListPagePath = "./manufacturer/manufacturer_list";
const index = "/";

exports.GETlistOfAllManufacturers = (request, response, next) => {
  Manufacturer.find({})
    .sort({ name: 1 })
    .exec((error, results) => {
      if (error) return next(error);

      response.render(manufacturerListPagePath, {
        manufacturersList: results,
      });
    });
};

exports.GETmanufacturerDetailPage = (request, response, next) => {
  const id = mongoose.Types.ObjectId(request.params.id);

  Manufacturer.findById(id).exec((error, result) => {
    if (error) {
      return response.redirect(index);
    }
    // TODO below
    if (result.manufacturer === null) {
      const error404 = new Error(
        "Could not find a manufacturer with the provided id."
      );
      error404.status = 404;
      return next(error404);
    }

    response.render(manufacturerDetailPagePath, {
      product: result,
    });
  });
};

exports.GETcreateManufacturerForm = (request, response, next) => {
  response.render(createManufacturerFormPath);
};

// TODO
exports.POSTcreateManufacturerForm = [
  body("name", "Manufacturer name is required")
    .trim()
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage("Manufacturer name must be alphabet letters only."),
    // TODO

  (req, res, next) => {
    const errors = validationResult(req);
    const manufacturer = new Manufacturer({ name: req.body.name })
    // TODO;

    if (!errors.isEmpty()) {
      return res.render(createManufacturerFormPath, {
        manufacturer: manufacturer,
        errors: errors.array(),
      });
    } else {
      // TODO
      Manufacturer.findOne({ name: req.body.name }).exec((err, found) => {
        if (err) {
          return console.log("1");
        }

        if (found) {
          return console.log("2");
        }

        manufacturer.save((err) => {
          if (err) {
            return console.log(err);
          }

          res.redirect(manufacturer.url);
        });
      });
    }
  },
];

// TODO
exports.POSTdeleteManufacturerForm = [
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
