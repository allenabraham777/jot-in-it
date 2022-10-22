import { authHandler } from "middlewares";
import { notificationController } from "controllers";

const notificationRoutes = (app) => {
  app.get(
    "/api/notification",
    authHandler.isAuthenticated,
    notificationController.getAllNotifications
  );
  app.put(
    "/api/notification/:notificationId",
    authHandler.isAuthenticated,
    notificationController.removeNotification
  );
};

export default notificationRoutes;
