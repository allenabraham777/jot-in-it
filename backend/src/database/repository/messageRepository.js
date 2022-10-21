import { Message, Chat, User } from "models";
import { throwError } from "utils";

class MessageRepository {
  constructor() {
    this.model = Message;
    this.userModel = User;
    this.chatModel = Chat;
  }
  createMessage({ sender, content, chat }) {
    return this.model
      .create({ sender, content, chat })
      .then((message) => message.populate("sender", "name pic"))
      .then((message) => message.populate("chat"))
      .then((message) =>
        this.userModel.populate(message, {
          path: "chat.users",
          select: "name pic email",
        })
      );
  }

  findMessageByChatId(chatId) {
    return this.model
      .find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");
  }
}
export default MessageRepository;
