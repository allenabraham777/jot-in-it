import { chatState } from "ChatProvider";
import { Messages, MessageHeader, NoMessage } from "components/message";
import { useEffect, useState } from "react";
import SocketClient from "socket";
import { messageApi as api, notificationApi as _api } from "apis";
import { useToast } from "@chakra-ui/react";

const Socket = SocketClient();
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, notification, setNotification } = chatState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();

  const messageApi = api(user);
  const notificationApi = _api(user);

  useEffect(() => {
    if (user) {
      socket = Socket.connect(user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }
  }, [user]);

  useEffect(() => {
    fetchAllMessages();
    selectedChatCompare = selectedChat;
    if (selectedChat) {
      const _notif = notification.find((n) => n.chat._id === selectedChat._id);
      if (_notif) {
        setNotification(notification.filter((n) => n._id !== _notif._id));
        notificationApi.removeNotification(_notif._id);
      }
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (
          !notification.find((n) => n.chat._id === newMessageReceived.chat._id)
        ) {
          setNotification([newMessageReceived, ...notification]);
        }
      } else {
        notificationApi.removeNotification(newMessageReceived._id);
        setMessages([...messages, newMessageReceived]);
      }
      setFetchAgain(!fetchAgain);
    });
  });

  const fetchAllMessages = async () => {
    if (!selectedChat) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await messageApi.getAllMessages(selectedChat._id);
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setLoading(false);
  };

  const sendMessage = async (message) => {
    try {
      if (message) {
        const { data } = await messageApi.sendMessage(
          selectedChat._id,
          message
        );
        stopTyping();
        socket.emit("new message", data);
        setFetchAgain(!fetchAgain);
        setMessages((oldMessages) => [...oldMessages, data]);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const stopTyping = () => {
    setTyping(false);
    socket.emit("stop typing", selectedChat._id);
  };

  const startTyping = () => {
    setTyping(true);
    socket.emit("typing", selectedChat._id);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <MessageHeader
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
          <Messages
            fetchAgain={fetchAgain}
            socket={socket}
            setFetchAgain={setFetchAgain}
            stopTyping={stopTyping}
            startTyping={startTyping}
            sendMessage={sendMessage}
            messages={messages}
            loading={loading}
            typing={typing}
            isTyping={isTyping}
            socketConnected={socketConnected}
          />
        </>
      ) : (
        <NoMessage />
      )}
    </>
  );
};

export default SingleChat;
