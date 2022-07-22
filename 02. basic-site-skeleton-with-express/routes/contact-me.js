const express = require('express');
const router = express.Router();

router.get('/contact-me', function(req, res, next) {
  res.render('contact-me');
});

module.exports = router;
