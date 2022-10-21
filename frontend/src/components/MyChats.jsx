import { Box, Button } from "@chakra-ui/react";
import { chatState } from "ChatProvider";
import { GroupChatModal } from "components/misc";
import { ChatList } from "components/chat";
import { AddIcon } from "@chakra-ui/icons";

const MyChats = ({ fetchAgain }) => {
  const { selectedChat } = chatState();

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <ChatList fetchAgain={fetchAgain} />
    </Box>
  );
};

export default MyChats;
