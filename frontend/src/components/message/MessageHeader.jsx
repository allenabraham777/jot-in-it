import { useRef, useState } from "react";
import { chatState } from "ChatProvider";
import { IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { chatUtils } from "utils";
import { ProfileModal, UpdateGroupChatModal } from "components/misc";

const MessageHeader = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = chatState();
  return (
    <Text
      fontSize={{ base: "28px", md: "32px" }}
      pb={3}
      px={2}
      w="100%"
      display="flex"
      justifyContent={{ base: "space-between" }}
      alignItems="center"
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        icon={<ArrowBackIcon />}
        onClick={() => setSelectedChat(null)}
      />
      {!selectedChat.isGroupChat ? (
        <>
          {chatUtils.getSender(user, selectedChat.users)}
          <ProfileModal
            user={chatUtils.getSenderFull(user, selectedChat.users)}
          />
        </>
      ) : (
        <>
          {selectedChat.chatName.toUpperCase()}
          <UpdateGroupChatModal
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
        </>
      )}
    </Text>
  );
};

export default MessageHeader;
