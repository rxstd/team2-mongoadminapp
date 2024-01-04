var express = require("express");
var router = express.Router();

const db = require("../models/index");

const { Op } = require("sequelize");

/* 
channel_msg_id :: 채널 메시지 고유번호
channel_id :: 채널 고유번호
member_id :: 회원 고유번호
nick_name :: 닉네임
msg_type_code :: 메시지 유형 코드
connection_id :: 연결 ID
message :: 메시지 내용
ip_address :: IP 주소
top_channel_msg_id :: 상위 채널 메시지 ID
msg_state_code :: 메시지 상태 코드
msg_date :: 메시지 등록 일시
edit_date :: 메시지 수정 일시
del_date :: 메시지 삭제 일시
*/

router.get("/list", async function (req, res, next) {
  const channelList = await db.Channel.findAll();

  let result = await db.ChannelMsg.findAll();

  console.log(result);

  res.render("message/list", {
    channelList: channelList,
    messageList: result,
    schOption: { title: "", isDisplay: "", boardTypeCode: "" },
  });
});

router.post("/list", async function (req, res, next) {
  const channelList = await db.Channel.findAll();

  const schOption = {
    channel_id: req.body.channel_id,
    msg_type_code: req.body.msg_type_code,
    message: req.body.message,
    ip_address: req.body.ip_address,
  };

  console.log(schOption);

  // LIKE Search
  let result = await db.ChannelMsg;

  where = {};

  if (schOption.channel_id != "") {
    where.channel_id = schOption.channel_id;
  }

  if (schOption.msg_type_code != "") {
    where.msg_type_code = schOption.msg_type_code;
  }

  if (schOption.message != "") {
    where.message = { [Op.like]: "%" + schOption.message + "%" };
  }

  if (schOption.ip_address != "") {
    where.ip_address = { [Op.like]: "%" + schOption.ip_address + "%" };
  }

  result = await db.ChannelMsg.findAll({
    where: where,
  });

  res.render("message/list", {
    channelList: channelList,
    messageList: result,
    schOption: schOption,
  });
});

router.get("/create", async function (req, res, next) {
  const channelList = await db.Channel.findAll();

  res.render("message/create", { channelList: channelList });
});

router.post("/create", async function (req, res, next) {
  const createData = {
    channel_id: req.body.channel_id,
    msg_type_code: req.body.msg_type_code,
    nick_name: req.body.nick_name,
    message: req.body.message,
    member_id: 1,
    connection_id: 1,
    ip_address: req.ip,
    top_channel_msg_id: 1,
    msg_state_code: 1,
    msg_date: new Date(),
    edit_date: new Date(),
  };

  await db.ChannelMsg.create(createData);

  res.redirect("/message/list");
});

router.get("/modify/:mid", async function (req, res, next) {
  const channelList = await db.Channel.findAll();

  let result = await db.ChannelMsg.findOne({
    where: { channel_msg_id: req.params.mid },
  });

  res.render("message/modify", { channelList, message: result });
});

router.post("/modify/:mid", async function (req, res, next) {
  const modifiedData = {
    channel_id: req.body.channel_id,
    msg_type_code: req.body.msg_type_code,
    nick_name: req.body.nick_name,
    message: req.body.message,
  };

  const where = {
    channel_msg_id: req.params.mid,
  };

  const message = await db.ChannelMsg.findOne({ where: where });

  message.update(modifiedData);

  res.redirect("/message/list");
});

router.get("/delete/:mid", async function (req, res, next) {
  const where = {
    channel_msg_id: req.params.mid,
  };

  const message = await db.ChannelMsg.findOne({ where: where });

  message.destroy();

  res.redirect("/message/list");
});

module.exports = router;
