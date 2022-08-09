const express = require('express');
const router = express.Router();
const signInController = require('../controllers/sign-in.controller')

router.get('/', signInController.getSignInForm);
router.post('/', signInController.postSignInForm);

module.exports = router;
