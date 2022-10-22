import { useState } from "react";
import { Box, FormControl, Input, Spinner } from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "animations/typing.json";

import "./Messages.css";
import ScrollableChat from "./ScrollableChat";

let lastActive;

const Messages = ({
  startTyping,
  stopTyping,
  messages,
  loading,
  typing,
  socketConnected,
  isTyping,
  sendMessage,
}) => {
  const [message, setMessage] = useState("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const sendMessageHandler = async (e) => {
    if (e.key == "Enter" && message) {
      setMessage("");
      sendMessage(message);
    }
  };

  const typingHandler = (e) => {
    setMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      startTyping();
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
      <FormControl onKeyDown={sendMessageHandler} isRequired mt={3}>
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
