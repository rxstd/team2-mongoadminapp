var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var layout = require("express-ejs-layouts"); // 2023 - 12 - 19 express-ejs-layouts define

var sequelize = require("./models/index").sequelize;

// DB연결
sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
var indexRouter = require("./routes/index");
var gownRouter = require("./routes/gown");
var evansRouter = require("./routes/evans");
var welcomeRouter = require("./routes/welcome");

// 2023 - 12 - 12 Admin Webpage Integration Start
var adminRouter = require("./routes/admin"); // 작업자 - 추원혁

var memberRouter = require("./routes/member"); // 작업자 - 한고운
var articleRouter = require("./routes/article"); // 작업자 - 한고운

var channelRouter = require("./routes/channel"); // 작업자 - 이환영
var messageRouter = require("./routes/message"); // 작업자 - 이환영
var expressLayouts = require("express-ejs-layouts");
const session = require("express-session"); //added packeages to use req.session variables

var app = express(); //express run
sequelize.sync();
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

// app.use("/welcome", welcomeRouter);
// app.use("/gown", gownRouter);
// app.use("/evans", evansRouter);

// 2023 - 12 - 12 Admin Webpage Integration Start

app.use("/admin", adminRouter); // 1차 작업자 - 추원혁 // 2차 작업자 - 이환영
app.use("/member", memberRouter); // 1차 작업자 - 한고운 // 2차 작업자 - 한고운
app.use("/article", articleRouter); // 1차 작업자 - 한고운 // 2차 작업자 - 추원혁
app.use("/channel", channelRouter); // 1차 작업자 - 이환영 // 2차 작업자 - 추원혁
app.use("/message", messageRouter); // 1차 작업자 - 이환영 // 2차 작업자 - 추원혁

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
