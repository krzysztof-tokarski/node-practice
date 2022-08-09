const process = require("process");
const dotenv = require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// DB connection
const mongoose = require("mongoose");
const mongoDbConnectionString = process.env.CONNECTION_STRING;
mongoose.connect(mongoDbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const signUpForm = require('./src/routes/sign-up-form');
const signInForm = require('./src/routes/sign-in-form');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, './src/public/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './src/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sign-up', signUpForm);
app.use('/sign-in', signInForm);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
