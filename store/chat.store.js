let channelDB = [
  {
    channel_id: 1,
    community_id: 1,
    channel_code: "channel1",
    channel_name: "채널1",
    channel_img_path: "channel1.png",
    channel_desc: "채널1입니다.",
    channel_state_code: 1,
    reg_date: "2023-12-12 11:11:11",
    reg_member_id: 1,
    edit_date: "2023-12-12 11:11:11",
    edit_member_id: 1,
  },
  {
    channel_id: 2,
    community_id: 1,
    channel_code: "channel2",
    channel_name: "채널2",
    channel_img_path: "channel2.png",
    channel_desc: "채널2입니다.",
    channel_state_code: 1,
    reg_date: "2023-12-12 11:11:11",
    reg_member_id: 1,
    edit_date: "2023-12-12 11:11:11",
    edit_member_id: 1,
  },
];

let channelMemberDB = [
  {
    channel_id: 1,
    member_id: 1,
    nick_name: "멤버1",
    member_type_code: 1,
    active_state_code: 1,
    last_contact_date: "2023-12-12 11:11:11",
    member_out_date: "2023-12-12 11:11:11",
    connection_id: "connection1",
    ip_address: "1.1.1.1",
    edit_member_id: 1,
    edit_date: "2023-12-12 11:11:11",
  },
  {
    channel_id: 1,
    member_id: 2,
    nick_name: "멤버2",
    member_type_code: 1,
    active_state_code: 1,
    last_contact_date: "2023-12-12 11:11:11",
    member_out_date: "2023-12-12 11:11:11",
    connection_id: "connection2",
    ip_address: "2.2.2.2",
    edit_member_id: 1,
    edit_date: "2023-12-12 11:11:11",
  },
  {
    channel_id: 2,
    member_id: 1,
    nick_name: "멤버1",
    member_type_code: 1,
    active_state_code: 1,
    last_contact_date: "2023-12-12 11:11:11",
    member_out_date: "2023-12-12 11:11:11",
    connection_id: "connection1",
    ip_address: "3.3.3.3",
    edit_member_id: 1,
    edit_date: "2023-12-12 11:11:11",
  },
  {
    channel_id: 2,
    member_id: 2,
    nick_name: "멤버2",
    member_type_code: 1,
    active_state_code: 1,
    last_contact_date: "2023-12-12 11:11:11",
    member_out_date: "2023-12-12 11:11:11",
    connection_id: "connection2",
    ip_address: "4.4.4.4",
    edit_member_id: 1,
    edit_date: "2023-12-12 11:11:11",
  },
];

let channelMsgDB = [
  {
    channel_msg_id: 1,
    channel_id: 1,
    member_id: 1,
    nick_name: "멤버1",
    msg_type_code: 1,
    connection_id: "connection1",
    message: "멤버1님이 입장하셨습니다.",
    ip_address: "1.1.1.1",
    top_channel_msg_id: 1,
    msg_state_code: 1,
    msg_date: "2023-12-12 11:11:11",
    edit_date: "2023-12-12 11:11:11",
    del_date: "2023-12-12 11:11:11",
  },
  {
    channel_msg_id: 2,
    channel_id: 1,
    member_id: 1,
    nick_name: "멤버1",
    msg_type_code: 3,
    connection_id: "connection1",
    message: "안녕하세요. 첫 메시지입니다.",
    ip_address: "1.1.1.1",
    top_channel_msg_id: 1,
    msg_state_code: 1,
    msg_date: "2023-12-12 11:11:11",
    edit_date: "2023-12-12 11:11:11",
    del_date: "2023-12-12 11:11:11",
  },
  {
    channel_msg_id: 3,
    channel_id: 1,
    member_id: 2,
    nick_name: "멤버2",
    msg_type_code: 3,
    connection_id: "connection2",
    message: "안녕하세요. 두번째 메시지입니다.",
    ip_address: "2.2.2.2",
    top_channel_msg_id: 1,
    msg_state_code: 1,
    msg_date: "2023-12-12 11:11:11",
    edit_date: "2023-12-12 11:11:11",
    del_date: "2023-12-12 11:11:11",
  },
  {
    channel_msg_id: 4,
    channel_id: 2,
    member_id: 1,
    nick_name: "멤버1",
    msg_type_code: 3,
    connection_id: "connection1",
    message: "안녕하세요. 세번째 메시지입니다.",
    ip_address: "1.1.1.1",
    top_channel_msg_id: 1,
    msg_state_code: 1,
    msg_date: "2023-12-12 11:11:11",
    edit_date: "2023-12-12 11:11:11",
    del_date: "2023-12-12 11:11:11",
  },
  {
    channel_msg_id: 5,
    channel_id: 2,
    member_id: 2,
    nick_name: "멤버2",
    msg_type_code: 3,
    connection_id: "connection2",
    message: "안녕하세요. 네번째 메시지입니다.",
    ip_address: "2.2.2.2",
    top_channel_msg_id: 1,
    msg_state_code: 1,
    msg_date: "2023-12-12 11:11:11",
    edit_date: "2023-12-12 11:11:11",
    del_date: "2023-12-12 11:11:11",
  },
];

function getChannels() {
  return channelDB;
}

function getChannelById(id) {
  return channelDB.find((channel) => channel.id === id);
}

function getChannelByCode(code) {
  return channelDB.find((channel) => channel.code === code);
}

function updateChannel(channel) {
  let index = channelDB.findIndex((c) => c.id === channel.id);
  channelDB[index] = channel;
  return channelDB[index];
}

function addChannel(channel) {
  channel.id = channelDB[channelDB.length - 1].id + 1;
  channelDB.push(channel);
  return channel;
}

function deleteChannel(id) {
  let index = channelDB.findIndex((channel) => channel.id === id);
  channelDB.splice(index, 1);
}

function getChatMembersbyChannelId(id) {
  return channelMemberDB.filter(
    (channelMember) => channelMember.channel_id === id
  );
}

function getMessagesbyChannelId(id) {
  return channelMsgDB.filter((channelMsg) => channelMsg.channel_id === id);
}
