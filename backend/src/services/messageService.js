import {
  MessageRepository,
  ChatRepository,
  NotificationRepository,
} from "repository";
import { formatData, throwError } from "utils";

class MessageService {
  constructor() {
    this.repository = new MessageRepository();
    this.chatRepository = new ChatRepository();
    this.notificationRepository = new NotificationRepository();
  }
  async sendMessage(sender, chat, content) {
    try {
      const newMessage = {
        sender,
        chat,
        content,
      };
      const message = await this.repository.createMessage(newMessage);
      const _chat = await this.chatRepository.updateLatestMessage(
        chat,
        message
      );
      for (const user of _chat.users) {
        if (`${sender}` === `${user}`) continue;
        const notification =
          await this.notificationRepository.findNotificationsByUserId(
            user,
            true
          );
        if (!!notification) {
          const doMessageExists = notification.notifications.find((n) => {
            return `${n.chat._id}` === `${chat}`;
          });
          if (!doMessageExists) {
            notification.notifications = [
              ...notification.notifications,
              message._id,
            ];
            await notification.save();
          }
        } else {
          await this.notificationRepository.createNotification(user, message);
        }
      }
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
