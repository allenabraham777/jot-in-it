"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _controllers = require("../controllers");
var _validators = require("../middlewares/validators");
var _middlewares = require("../middlewares");
var chatRoutes = function chatRoutes(app) {
  app.route("/api/chat").post(_middlewares.authHandler.isAuthenticated, _validators.chatValidator.accessChatValidator, _controllers.chatController.accessChat).get(_middlewares.authHandler.isAuthenticated, _controllers.chatController.fetchChats);
  app.post("/api/chat/group", _middlewares.authHandler.isAuthenticated, _validators.chatValidator.createGroupChatValidator, _controllers.chatController.createGroupChat);
  app.put("/api/chat/group/rename/:groupId", _middlewares.authHandler.isAuthenticated, _validators.chatValidator.renameGroupChatValidator, _controllers.chatController.renameGroup);
  app.put("/api/chat/group/:groupId/add", _middlewares.authHandler.isAuthenticated, _validators.chatValidator.addToGroupValidator, _controllers.chatController.addToGroup);
  app.put("/api/chat/group/:groupId/remove/:userId", _middlewares.authHandler.isAuthenticated, _controllers.chatController.removeFromGroup);
};
var _default = chatRoutes;
exports["default"] = _default;