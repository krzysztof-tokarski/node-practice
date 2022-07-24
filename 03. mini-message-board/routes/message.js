const express = require('express');
const router = express.Router();
const indexModule = require('./index');
const Message = require('../models/message.class');

router.get('/new', function(req, res, next) {
  res.render('form');
});

router.post('/new', function(req, res, next) {
  const {author, text} = req.body;
  const newMessage = new Message(author, text);
  indexModule.messages.push(newMessage);
  res.redirect('/');
});

module.exports = router;
