const mongoose = require("mongoose");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }

  //몽고DB연결정보를 설정합니다.
  mongoose.connect(
    "mongodb://evans:qweqwe123@localhost:27017/admin",
    {
      dbName: "modu_chat",
    },
    (error) => {
      if (error) {
        console.log("몽고디비 연결 에러", error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    }
  );
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});

mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

//회원정보 콜렉션 모델을 참조합니다.
require("./member.js");

//게시글 ODM모델 추가
require("./article.js");
require("./admin.js");

//채널정보 콜렉션 모델을 참조합니다.
require("./channel.js");

//채널메시지 콜렉션 모델을 참조합니다.
require("./channelMsg.js");

module.exports = connect;
