const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


const signUpFormPath = 'sign_up_form';

exports.getSignUpForm = (req, res, next) => {
  res.render(signUpFormPath)
}

exports.postSignUpForm = [
  (req, res, next ) => {

    const formValue = req.body;
    const plainPassword = formValue.password;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainPassword, saltRounds);

    const newUser = new User({
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      username: formValue.username,
      passwordHash: salt,
      passwordSalt: hash,
      active: false,
    });

    console.log(newUser)

    newUser.save((err) => {
      if (err) {
        return console.log(err);
      }

      res.redirect('/')
    })
  }
]

