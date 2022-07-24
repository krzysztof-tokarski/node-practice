const express = require('express');
const router = express.Router();

// mocked data
const messages = [
  {
    text: 'Hi there!',
    author: 'Amando',
    date: new Date(),
  },
  {
    text: 'Hello World!',
    author: 'Charles',
    date: new Date(),
  },
];

router.get('/', function(req, res, next) {
  res.render('index', {messages: messages});
});

module.exports = {router, messages};
