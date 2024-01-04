var express = require("express");
var router = express.Router();

const Member = require("../schemas/member");

/* 
-routes\member.js - 사용자 계정 정보(사용자 사이트에서 가입한 사용자정보) 관리 라우팅 기능 제공
ㄴrouter.get('/list'),views\member\list.ejs
ㄴrouter.get('/create'),views\member\create.ejs
ㄴrouter.post('/create'),목록페이지 이동처리 
ㄴrouter.get('/modify'),views\member\modify.ejs
ㄴrouter.post('/modify'),목록페이지 이동처리
ㄴrouter.get('/delete'),목록페이지 이동처리  
*/

router.get("/list", async function (req, res, next) {
  const memberList = await Member.find().sort("-reg_date");

  console.log("memberList", memberList);

  res.render("member/list", {
    memberList,
    schOption: { title: "", isDisplay: "", boardTypeCode: "" },
  });
});

router.post("/list", function (req, res, next) {
  res.render("member/list", {
    schOption: {
      title: req.body.boardTypeCode,
      isDisplay: req.body.title,
      boardTypeCode: req.body.isDisplay,
    },
  });
});

router.get("/create", function (req, res, next) {
  res.render("member/create");
});

router.post("/create", async function (req, res, next) {
  try {
    const memberData = {
      email: req.body.email,
      member_password: req.body.member_password,
      name: req.body.name,
      profile_img_path: req.body.profile_img_path,
      telephone: req.body.telephone,
      entry_type_code: req.body.entry_type_code,
      use_state_code: req.body.use_state_code,
      birth_date: req.body.birth_date,
      reg_member_id: 1,
      edit_member_id: 1,
    };

    console.log("memberData", memberData);

    const member = new Member(memberData);

    await member.save();

    res.redirect("/member/list");
  } catch (err) {
    console.error(err);
    res.send("Error");
  }
});

router.get("/modify/:mid", async function (req, res, next) {
  const mid = req.params.mid;

  const member = await Member.findOne({ _id: mid });

  res.render("member/modify", { member });
});

router.post("/modify/:mid", async function (req, res, next) {
  try {
    const mid = req.params.mid;

    const memberData = {
      email: req.body.email,
      member_password: req.body.member_password,
      name: req.body.name,
      profile_img_path: req.body.profile_img_path,
      telephone: req.body.telephone,
      entry_type_code: req.body.entry_type_code,
      use_state_code: req.body.use_state_code,
      birth_date: req.body.birth_date,
      edit_member_id: 1,
    };

    const updateMember = await Member.updateOne(
      { _id: mid },
      { $set: memberData }
    );

    console.log("updateMember", updateMember);

    res.redirect("/member/list");
  } catch (err) {
    console.error(err);
    res.send("Error");
  }
});

router.get("/delete/:mid", async function (req, res, next) {
  const mid = req.params.mid;

  await Member.deleteOne({ _id: mid });

  res.redirect("/member/list");
});

module.exports = router;
