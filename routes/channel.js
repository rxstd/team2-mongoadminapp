var express = require("express");
var router = express.Router();

const db = require("../models/index");

const { Op } = require("sequelize");

/* 
-routes\channel.js - 채팅방 정보관리 라우팅 기능 제공
ㄴrouter.get('/list'),views\channel\list.ejs
ㄴrouter.get('/create'),views\channel\create.ejs
ㄴrouter.post('/create'),목록페이지 이동처리 
ㄴrouter.get('/modify'),views\channel\modify.ejs
ㄴrouter.post('/modify'),목록페이지 이동처리
ㄴrouter.get('/delete'),목록페이지 이동처리 
*/

router.get("/list", async function (req, res, next) {
  let result = await db.Channel.findAll();

  console.log(result);

  res.render("channel/list", {
    channelList: result,
    schOption: { title: "", isDisplay: "", boardTypeCode: "" },
  });
});

router.post("/list", async function (req, res, next) {
  const schOption = {
    channel_state_code: req.body.channel_state_code,
    channel_name: req.body.channel_name,
    channel_desc: req.body.channel_desc,
  };

  // LIKE Search
  let result = await db.Channel;

  where = {};

  if (schOption.channel_state_code != "") {
    where.channel_state_code = schOption.channel_state_code;
  }

  if (schOption.channel_name != "") {
    where.channel_name = { [Op.like]: "%" + schOption.channel_name + "%" };
  }

  if (schOption.channel_desc != "") {
    where.channel_desc = { [Op.like]: "%" + schOption.channel_desc + "%" };
  }

  result = await db.Channel.findAll({
    where: where,
  });

  res.render("channel/list", {
    channelList: result,
    schOption: schOption,
  });
});

router.get("/create", async function (req, res, next) {
  res.render("channel/create");
});

router.post("/create", async function (req, res, next) {
  const createData = {
    community_id: 1,
    channel_state_code: req.body.channel_state_code,
    category_code: req.body.category_code,
    channel_name: req.body.channel_name,
    user_limit: req.body.user_limit,
    channel_img_path: req.body.channel_img_path,
    channel_desc: req.body.channel_desc,
    reg_date: Date.now(),
    reg_member_id: 1,
    edit_date: Date.now(),
    edit_member_id: 1,
  };

  await db.Channel.create(createData);

  res.redirect("/channel/list");
});

router.get("/modify/:cid", async function (req, res, next) {
  let result = await db.Channel.findOne({
    where: { channel_id: req.params.cid },
  });

  res.render("channel/modify", { channel: result });
});

router.post("/modify/:cid", async function (req, res, next) {
  const modifiedData = {
    channel_state_code: req.body.channel_state_code,
    category_code: req.body.category_code,
    channel_name: req.body.channel_name,
    user_limit: req.body.user_limit,
    channel_img_path: req.body.channel_img_path,
    channel_desc: req.body.channel_desc,
  };

  const where = {
    channel_id: req.params.cid,
  };

  await db.Channel.update(modifiedData, { where: where });

  res.redirect("/channel/list");
});

router.get("/delete/:cid", async function (req, res, next) {
  db.Channel.destroy({
    where: { channel_id: req.params.cid },
  });

  res.redirect("/channel/list");
});

module.exports = router;
