import { chatController } from "controllers";
import { chatValidator } from "validators";
import { uploadHandler, authHandler } from "middlewares";

const chatRoutes = (app) => {
  app
    .route("/api/chat")
    .post(
      authHandler.isAuthenticated,
      chatValidator.accessChatValidator,
      chatController.accessChat
    )
    .get(authHandler.isAuthenticated, chatController.fetchChats);
  app.post(
    "/api/chat/group",
    authHandler.isAuthenticated,
    chatValidator.createGroupChatValidator,
    chatController.createGroupChat
  );
  app.put(
    "/api/chat/group/rename/:groupId",
    authHandler.isAuthenticated,
    chatValidator.renameGroupChatValidator,
    chatController.renameGroup
  );
  app.put(
    "/api/chat/group/:groupId/add",
    authHandler.isAuthenticated,
    chatValidator.addToGroupValidator,
    chatController.addToGroup
  );
  app.put(
    "/api/chat/group/:groupId/remove/:userId",
    authHandler.isAuthenticated,
    chatController.removeFromGroup
  );
};

export default chatRoutes;
