import { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  IconButton,
  Input,
  Spinner,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "animations/typing.json";

import "./Messages.css";
import ScrollableChat from "components/message/ScrollableChat";
import { ChevronRightIcon } from "@chakra-ui/icons";

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
      sendAction();
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

  const sendAction = () => {
    setMessage("");
    sendMessage(message);
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="flex-end"
      p={3}
      bg="#333333"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"
    >
      {loading ? (
        <Spinner
          size="xl"
          w={20}
          h={20}
          color="white"
          alignSelf="center"
          margin="auto"
        />
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
        <Flex>
          <Input
            variant="filled"
            bg="#454545"
            color="white"
            _hover={{ bg: "#444444" }}
            _placeholder={{ color: "#aaaaaa" }}
            placeholder="Enter a message..."
            onChange={typingHandler}
            value={message}
            mr="10px"
          />
          <IconButton
            borderRadius="full"
            icon={<ChevronRightIcon fontSize="30px" fontWeight="bold" />}
            onClick={sendAction}
            colorScheme="whatsapp"
          />
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Messages;
