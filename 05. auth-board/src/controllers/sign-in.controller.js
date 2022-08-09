const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


const signInForm = 'sign_in_form';

exports.getSignInForm = (req, res, next) => {
  res.render(signInForm)
}

exports.postSignInForm = (req, res, next ) => {

    const formValue = req.body;
    const plainPassword = formValue.password;

    User.findOne({username: formValue.username}, (err, user) => {
      if (err) {
        // TODO
        return console.log('ERROR FINDING USER!')
      }

      bcrypt.compare(plainPassword, user.passwordHash, (err, result) => {
        if (err) {
          // TODO
          return console.log(err);
        }

        if (result) {
          console.log('AUTH COMPLETE');
        } else {
          console.log('PASSWORD MISMATCH')
        }

        res.redirect('/');
      })
    })

    }

