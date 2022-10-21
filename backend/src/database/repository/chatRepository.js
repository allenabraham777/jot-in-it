import { Chat, User } from "models";
import { throwError } from "utils";

class ChatRepository {
  constructor() {
    this.model = Chat;
  }

  createChat({ chatName = "Untitled", isGroupChat = false, users = [] }) {
    if (!users.length) {
      throwError(null, "Chat users required", 400);
    }
    return this.model.create({ chatName, isGroupChat, users });
  }

  findChatByChatId(chatId) {
    return this.model
      .findOne({ _id: chatId })
      .populate("users", "-password -__v -createdAt -updatedAt")
      .populate("latestMessage")
      .then((chats) => {
        return User.populate(chats, {
          path: "latestMessage.sender",
          select: "name pic email",
          strictPopulate: false,
        });
      });
  }

  findChatByChatIdAndUserId(chatId, userId) {
    return this.model.findOne({
      $and: [
        { _id: { $eq: chatId } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    });
  }

  findOrCreateEndToEndChatByUsers(id, userId) {
    return this.model
      .find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
      .populate("users", "-password -__v -createdAt -updatedAt")
      .populate("latestMessage")
      .then((chats) => {
        return User.populate(chats, {
          path: "latestMessage.sender",
          select: "name pic email",
          strictPopulate: false,
        });
      });
  }

  findChatsByUserId(id) {
    return this.model
      .find({ users: { $elemMatch: { $eq: id } } })
      .populate("users", "-password -__v -createdAt -updatedAt")
      .populate("groupAdmin", "-password -__v -createdAt -updatedAt")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then((chats) => {
        return User.populate(chats, {
          path: "latestMessage.sender",
          select: "name pic email",
          strictPopulate: false,
        });
      });
  }

  createGroupChat(groupAdmin, chatName, users) {
    users.push(groupAdmin);
    return this.model.create({
      chatName,
      users,
      isGroupChat: true,
      groupAdmin,
    });
  }

  findGroupChatByGroupId(chatId, groupAdmin) {
    return this.model
      .findOne({ _id: chatId, groupAdmin })
      .populate("users", "-password -__v -createdAt -updatedAt")
      .populate("groupAdmin", "-password -__v -createdAt -updatedAt")
      .populate("latestMessage");
  }

  updateLatestMessage(chatId, latestMessage) {
    return this.model.findByIdAndUpdate(chatId, { latestMessage });
  }
}

export default ChatRepository;
