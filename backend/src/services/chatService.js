import config from "config";
import { ChatRepository } from "repository";
import { formatData, throwError } from "utils";

class ChatService {
  constructor() {
    this.repository = new ChatRepository();
  }

  async accessChat(id, userId) {
    try {
      const chats = await this.repository.findOrCreateEndToEndChatByUsers(
        id,
        userId
      );
      if (!!chats.length) {
        return formatData(chats[0]);
      } else {
        const createdChat = await this.repository.createChat({
          chatName: "sender",
          isGroupChat: false,
          users: [id, userId],
        });
        if (!createdChat) throwError(null, "Chat not created!", 500);
        const newChat = await this.repository.findChatByChatId(createdChat._id);
        return formatData(newChat);
      }
    } catch (error) {
      throw error;
    }
  }

  async fetchChats(id) {
    try {
      const chats = await this.repository.findChatsByUserId(id);
      return formatData(chats);
    } catch (error) {
      throw error;
    }
  }

  async createGroupChat(id, name, users = []) {
    try {
      const groupChat = await this.repository.createGroupChat(id, name, users);
      const newGroupChat = await this.repository.findGroupChatByGroupId(
        groupChat._id,
        id
      );
      return formatData(newGroupChat);
    } catch (error) {
      throw error;
    }
  }

  async renameGroup(groupId, name, groupAdmin) {
    try {
      const groupChat = await this.repository.findGroupChatByGroupId(
        groupId,
        groupAdmin
      );
      if (!groupChat) throwError(null, "Group not found!", 404);
      groupChat.chatName = name;
      const updatedChat = await groupChat.save();
      return formatData(updatedChat);
    } catch (error) {
      throw error;
    }
  }

  async addUserToGroup(groupId, userId, groupAdmin) {
    try {
      const groupChat = await this.repository.findGroupChatByGroupId(
        groupId,
        groupAdmin
      );
      if (!groupChat) throwError(null, "Group not found!", 404);
      if (groupChat?.users?.length >= config.application.chats.group.limit)
        throwError(null, "Maximum user limit reached!", 400);
      groupChat.users.push(userId);
      const updatedChat = await (
        await groupChat.save()
      ).populate("users", "-password -__v -createdAt -updatedAt");
      return formatData(updatedChat);
    } catch (error) {
      throw error;
    }
  }

  async removeUserFromGroup(groupId, userId, currentUser) {
    try {
      const requireAdmin = userId === currentUser ? false : true;
      const groupChat = await this.repository.findGroupChatByGroupId(
        groupId,
        currentUser,
        requireAdmin
      );
      if (!groupChat) throwError(null, "Group not found!", 404);
      groupChat.users = groupChat.users.filter((user) => user.id !== userId);
      const updatedChat = await groupChat.save();
      return formatData(updatedChat);
    } catch (error) {
      throw error;
    }
  }
}

export default ChatService;
