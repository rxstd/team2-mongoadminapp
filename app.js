var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var layout = require("express-ejs-layouts"); // 2023 - 12 - 19 express-ejs-layouts define

const connect = require("./schemas/index");
connect();

var indexRouter = require("./routes/index");

// 2023 - 12 - 12 Admin Webpage Integration Start
//var adminRouter = require("./routes/admin");
var memberRouter = require("./routes/member");

//var articleRouter = require("./routes/article");
var channelRouter = require("./routes/channel");
var messageRouter = require("./routes/message");

var expressLayouts = require("express-ejs-layouts");
const session = require("express-session"); //added packeages to use req.session variables

var app = express(); //express run

app.use(
  //added to use req.session variables
  session({
    secret: "ormcamp",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note: In production, set this to true and use HTTPS
  })
);

// 2023 - 12 - 12 Admin Webpage Integration End

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 2023 - 12 - 19 express-ejs-layouts define start
app.use("/", indexRouter);

app.use(layout);
app.set("layout", "layout");
app.set("layout extractScripts", true);
// 2023 - 12 - 19 express-ejs-layouts define end

// 2023 - 12 - 12 Admin Webpage Integration Start

//app.use("/admin", adminRouter);
//app.use("/article", articleRouter);

app.use("/member", memberRouter);
app.use("/channel", channelRouter);
app.use("/message", messageRouter);

// 2023 - 12 - 12 Admin Webpage Integration End

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
