import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { chatState } from "ChatProvider";
import { chatUtils } from "utils";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = chatState();
  return (
    <ScrollableFeed>
      {messages?.map((message, i) => (
        <div key={message._id} style={{ display: "flex" }}>
          {(chatUtils.isSameSender(messages, message, i, user._id) ||
            chatUtils.isLastMessage(messages, i, user._id)) && (
            <Tooltip
              label={message.sender.name}
              placement="bottom-start"
              hasArrow
            >
              <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={message.sender.name}
                src={message.sender.pic}
              />
            </Tooltip>
          )}
          <span
            style={{
              backgroundColor:
                message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
              borderRadius: "20px",
              padding: "5px 15px",
              maxWidth: "75%",
              marginLeft: chatUtils.isSameSenderMargin(
                messages,
                message,
                i,
                user._id
              ),
              marginTop: chatUtils.isSameUser(messages, message, i) ? 4 : 12,
            }}
          >
            {message.content}
          </span>
        </div>
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
