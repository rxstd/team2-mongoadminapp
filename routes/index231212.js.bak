var express = require("express");
var router = express.Router();

var user = require("../models/user.model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "갱기도", user: false });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "갱기도", error: false });
});

router.post("/login", function (req, res, next) {
  const userName = req.body.username;
  const userPassword = req.body.pass;

  const userAuth = user.authorizeUser(userName, userPassword); // user model에서 authorizeUser 함수로 유저 검증 (DB의 역할을 배열로 대체했음)

  if (userAuth.status == "-1") {
    // userName이 존재하지 않을 경우
    res.render("login", { title: "갱기도", error: userAuth.error });
  }

  if (userAuth.status == "-2") {
    // userPassword가 일치하지 않을 경우
    res.render("login", { title: "갱기도", error: userAuth.error });
  }

  if (userAuth.status == "1") {
    // 유저 검증에 성공했을 경우
    console.log(userAuth.data);
    res.render("index", { title: "갱기도", user: userAuth.data });
  }
});

module.exports = router;
