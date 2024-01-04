const userAuthorizations = [
  {
    nickName: "Admin",
    userName: "admin",
    userPassword: "admin",
  },
  {
    nickName: "오름캠프 데모",
    userName: "ormcamp",
    userPassword: "demo1234",
  },
];

function authorizeUser(userName, userPassword) {
  console.log("AuthorizeUser Excution", userName, userPassword);
  // userName이 일치할경우
  const userAuth = userAuthorizations.find(
    (user) => user.userName === userName
  );
  console.log(userAuth);
  if (!userAuth) {
    return { status: "-1", error: "존재하지 않는 유저입니다.", data: null };
  } else if (userAuth.userPassword !== userPassword) {
    return { status: "-2", error: "비밀번호가 일치하지 않습니다.", data: null };
  }
  return { status: "1", error: null, data: userAuth };
}

module.exports = {
  authorizeUser,
};
