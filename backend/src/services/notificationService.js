import { NotificationRepository } from "repository";
import { formatData, throwError } from "utils";

class NotificationService {
  constructor() {
    this.repository = new NotificationRepository();
  }

  async removenotification(userId, notificationId) {
    try {
      const notifications = await this.repository.findNotificationsByUserId(
        userId
      );
      if (notifications?.notifications?.length) {
        notifications.notifications = notifications.notifications.filter(
          (n) => `${n}` !== notificationId
        );
        await notifications.save();
      }
      return formatData({ success: true });
    } catch (error) {
      throw error;
    }
  }

  async getAllNotifications(userId) {
    try {
      const notifications = await this.repository.findNotificationsByUserId(
        userId,
        true
      );
      if (!notifications?.notifications?.length) {
        return formatData([]);
      }
      return formatData(notifications.notifications);
    } catch (error) {
      throw error;
    }
  }
}

export default NotificationService;
