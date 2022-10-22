import { Notification } from "models";

class NotificationRepository {
  constructor() {
    this.model = Notification;
  }
  createNotification(userId, notification) {
    return this.model.create({ user: userId, notifications: [notification] });
  }

  async findNotificationsByUserId(userId, populate = false) {
    const notification = await this.model.findOne({ user: userId });

    if (notification && populate) {
      return notification
        .populate("notifications")
        .then((notification) =>
          notification.populate("notifications.sender", "-password")
        )
        .then((notification) => notification.populate("notifications.chat"))
        .then((notification) =>
          notification.populate("notifications.chat.users", "-password")
        );
    } else {
      return notification;
    }
  }
}
export default NotificationRepository;
