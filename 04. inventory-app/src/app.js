const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const process = require("process");
const dotenv = require("dotenv").config("../");


// DB connection
const mongoose = require("mongoose");
const mongoDBConnectionString = process.env.CONNECTION_STRING;
mongoose.connect(mongoDBConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "./public/views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/index.route");
const categoryRouter = require("./routes/category.route");
const productRouter = require("./routes/product.route");
const manufacturerRouter = require("./routes/manufacturer.route");
// TODO routers

app.use("/", indexRouter);
app.use("/catalog/category", categoryRouter);
app.use("/catalog/product", productRouter);
app.use("/catalog/manufacturer", manufacturerRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
