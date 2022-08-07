const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const signUpFormPath = 'sign_up_form';

exports.getSignUpForm = (req, res, next) => {
  res.render(signUpFormPath)
}

exports.postSignUpForm = (req, res, next) => {
  console.log(req)
  console.log('xD')
}

