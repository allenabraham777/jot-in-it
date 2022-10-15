import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  useEffect(() => {
    fetchChats();
  }, []);

  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("http://localhost :3001/api/chat");
    setChats(data);
  };

  return (
    <div>
      {chats.map((chat, index) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
