"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _middlewares = require("../middlewares");
var _controllers = require("../controllers");
var _validators = require("../middlewares/validators");
var messageRoutes = function messageRoutes(app) {
  app.route("/api/message/:chatId").post(_middlewares.authHandler.isAuthenticated, _validators.messageValidator.sendMessageValidator, _controllers.messageController.sendMessage).get(_middlewares.authHandler.isAuthenticated, _controllers.messageController.getAllMessages);
};
var _default = messageRoutes;
exports["default"] = _default;