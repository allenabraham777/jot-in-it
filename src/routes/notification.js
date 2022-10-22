"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _middlewares = require("../middlewares");
var _controllers = require("../controllers");
var notificationRoutes = function notificationRoutes(app) {
  app.get("/api/notification", _middlewares.authHandler.isAuthenticated, _controllers.notificationController.getAllNotifications);
  app.put("/api/notification/:notificationId", _middlewares.authHandler.isAuthenticated, _controllers.notificationController.removeNotification);
};
var _default = notificationRoutes;
exports["default"] = _default;