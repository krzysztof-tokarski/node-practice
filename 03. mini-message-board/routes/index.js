const express = require('express');
const router = express.Router();

// mocked data
const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    date: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    date: new Date(),
  },
];

router.get('/', function(req, res, next) {
  res.render('index', {messages: messages});
});

module.exports = router;
