import { MessageRepository, ChatRepository } from "repository";
import { formatData, throwError } from "utils";

class MessageService {
  constructor() {
    this.repository = new MessageRepository();
    this.chatRepository = new ChatRepository();
  }
  async sendMessage(sender, chat, content) {
    try {
      const newMessage = {
        sender,
        chat,
        content,
      };
      const message = await this.repository.createMessage(newMessage);
      await this.chatRepository.updateLatestMessage(chat, message);
      return formatData(message);
    } catch (error) {
      throw error;
    }
  }
  async getAllMessages(userId, chatId) {
    try {
      const chatDetails = await this.chatRepository.findChatByChatIdAndUserId(
        chatId,
        userId
      );
      if (!chatDetails) {
        throwError(null, "Couldn't find chat", 400);
      }
      const messages = await this.repository.findMessageByChatId(chatId);
      return formatData(messages);
    } catch (error) {
      throw error;
    }
  }
}

export default MessageService;
