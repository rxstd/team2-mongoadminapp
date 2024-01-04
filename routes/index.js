var express = require("express");
var router = express.Router();

/*
-routes\index.js - 공통기능 제공(관리자 사이트 로그인/메인-대시보드)
ㄴrouter.get('/login'),views\login.ejs - 로그인 웹페이지 요청 및 응답 
ㄴrouter.post('/login') -로그인 처리 요청 및 응답,로그인 완료 후 메인 페이지 이동처리
ㄴrouter.get('/'),views\index.ejs - 로그인 후 접속할 메인 페이지 요청 및 응답 
*/

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.redirect("/login");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", function (req, res, next) {
  res.redirect("/dashboard");
});

router.get("/dashboard", function (req, res, next) {
  res.render("dashboard");
});

module.exports = router;
