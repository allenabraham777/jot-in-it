import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const history = useHistory();
  useEffect(() => {
    setUserInfo();
  }, [history]);

  const setUserInfo = async () => {
    let userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      history.push("/");
    } else {
      userInfo = await JSON.parse(userInfo);
      setUser(userInfo);
    }
  };

  const value = {
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const chatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
