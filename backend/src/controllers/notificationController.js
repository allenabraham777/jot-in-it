import asyncHandler from "express-async-handler";
import { NotificationService } from "services";

const notificationService = new NotificationService();

const removeNotification = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const notificationId = req.params.notificationId;
  const { data } = await notificationService.removenotification(
    userId,
    notificationId
  );
  res.status(200).json(data);
});

const getAllNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { data } = await notificationService.getAllNotifications(userId);
  res.status(200).json(data);
});

export default {
  getAllNotifications,
  removeNotification,
};
