const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/sign-up.controller')

router.get('/', signUpController.getSignUpForm);
router.post('/', signUpController.postSignUpForm);

module.exports = router;
