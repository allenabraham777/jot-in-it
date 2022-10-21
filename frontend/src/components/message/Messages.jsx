import { useState } from "react";
import { chatState } from "ChatProvider";
import { Box, FormControl, Input, Spinner, useToast } from "@chakra-ui/react";
import { messageApi as api } from "apis";
import { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "animations/typing.json";

import "./Messages.css";
import ScrollableChat from "./ScrollableChat";

let selectedChatCompare, lastActive;

const Messages = ({ fetchAgain, socket }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();
  const { user, selectedChat } = chatState();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (socket) {
      socket.on("message received", (newMessageReceived) => {
        if (
          !selectedChatCompare ||
          selectedChatCompare._id !== newMessageReceived.chat._id
        ) {
        } else {
          setMessages([...messages, newMessageReceived]);
        }
      });

      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }
  }, [socket]);

  useEffect(() => {
    fetchAllMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat, fetchAgain]);

  const messageApi = api(user);

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

  const sendMessage = async (e) => {
    try {
      if (e.key == "Enter" && message) {
        setMessage("");
        const { data } = await messageApi.sendMessage(
          selectedChat._id,
          message
        );
        stopTyping();
        socket.emit("new message", data);
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

  const typingHandler = (e) => {
    setMessage(e.target.value);
    if (!socket) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    lastActive = new Date().getTime();
    setTimeout(() => {
      const timeNow = new Date().getTime();
      if (timeNow - lastActive >= 3000) {
        stopTyping();
      }
    }, 3000);
  };
  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="flex-end"
      p={3}
      bg="#E8E8E8"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"
    >
      {loading ? (
        <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
      ) : (
        <div className="messages">
          <ScrollableChat messages={messages} />
        </div>
      )}
      <FormControl onKeyDown={sendMessage} isRequired mt={3}>
        {isTyping ? (
          <Lottie
            type={typing}
            width={70}
            style={{ marginLeft: 0, marginBottom: 15 }}
            options={defaultOptions}
          />
        ) : (
          <></>
        )}
        <Input
          variant="filled"
          bg="#E0E0E0"
          placeholder="Enter a message..."
          onChange={typingHandler}
          value={message}
        />
      </FormControl>
    </Box>
  );
};

export default Messages;
