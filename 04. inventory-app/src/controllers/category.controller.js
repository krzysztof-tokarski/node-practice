const Category = require('../models/category.model');

exports.GETlistOfAllCategories = (request, response, next) => {
  Category.find({})
  .sort({name: 1})
  .exec((error, results) => {
    if (error) return next(error);

    console.log(response);
    response.render('', {
      // categoriesList: results.categor
    })
  })
}

exports.GETcategoryDetailPage = (request, respons, next) => {
  // Category.findById(request.params.id).exec((error, response) => {
  //   if (error) return next(error);
  //   if (response.category === null) {
  //     const error404 = new Error('Could not find a category with the provided id.');
  //     error404.status = 404;
  //     return next(error404);
  //   }

  //   console.log(response);
  //   response.render('', {
  //     category: "",
  //   })
  // })
}

exports.GETcreateCategoryForm = (request, response, next) => {
  response.render('category-form');
}

exports.POSTcreateCategoryForm = (request, response) => {

}

exports.POSTdeleteCategoryForm = (request, response) => {

}

exports.GETupdateCategoryForm = (request, response) => {

}

exports.POSTupdateCategoryForm = (request, response) => {

}
