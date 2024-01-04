var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let randomNumber = Math.random();
  res.render("evans", { randomNumber: randomNumber });
});

module.exports = router;
