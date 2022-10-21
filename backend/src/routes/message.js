import { authHandler } from "middlewares";
import { messageController } from "controllers";
import { messageValidator } from "validators";

const messageRoutes = (app) => {
  app
    .route("/api/message/:chatId")
    .post(
      authHandler.isAuthenticated,
      messageValidator.sendMessageValidator,
      messageController.sendMessage
    )
    .get(authHandler.isAuthenticated, messageController.getAllMessages);
};

export default messageRoutes;
