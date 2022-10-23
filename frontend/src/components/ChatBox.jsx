import { chatState } from "ChatProvider";
import { Box } from "@chakra-ui/react";
import { SingleChat } from "components";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = chatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      bg="#101010"
      color="white"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
