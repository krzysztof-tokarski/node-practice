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

    User.findOne({username: formValue.username}, (err, result) => {
      if (err) {
        return console.log(err);
      }

      if (result !== null) {
        return console.log('USERNAME TAKEN')
      }

      const plainPassword = formValue.password;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(plainPassword, saltRounds);

      const newUser = new User({
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        username: formValue.username,
        passwordHash: hash,
        passwordSalt: salt,
        active: false,
      });

      newUser.save((err) => {
        if (err) {
          return console.log(err);
        }

        res.redirect('/')
      })
    })
  }
]

