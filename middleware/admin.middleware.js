const adminAuth = (req, res, next) => {
  console.log(req.session);
  if (req.session != undefined) {
    if (!req.session.admin_id) {
      //return res.send(
      //  `<script>alert('로그인이 필요합니다.'); location.href='/login';</script>`
      //);
    }
  } else {
    //return res.send(
    //  `<script>alert('로그인이 필요합니다.'); location.href='/login';</script>`
    //);
  }
  next();
};

module.exports = adminAuth;
