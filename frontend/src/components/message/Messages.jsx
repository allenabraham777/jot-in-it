import { useState } from "react";
import { chatState } from "ChatProvider";
import { Box, FormControl, Input, Spinner, useToast } from "@chakra-ui/react";
import { messageApi as api } from "apis";
import { useEffect } from "react";

import "./Messages.css";
import ScrollableChat from "./ScrollableChat";

const Messages = ({ fetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = chatState();

  useEffect(() => {
    fetchAllMessages();
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

  const typingHandler = (e) => {
    setMessage(e.target.value);
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
