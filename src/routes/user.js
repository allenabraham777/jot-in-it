"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _controllers = require("../controllers");
var _validators = require("../middlewares/validators");
var _middlewares = require("../middlewares");
var userRoutes = function userRoutes(app) {
  app.post("/api/user/register", _validators.userValidator.signupValidator, _middlewares.uploadHandler.uploadSingleFile("pic"), _controllers.userController.register);
  app.post("/api/user/login", _validators.userValidator.loginValidator, _controllers.userController.login);
  app.get("/api/user", _middlewares.authHandler.isAuthenticated, _controllers.userController.getAllUsers);
};
var _default = userRoutes;
exports["default"] = _default;