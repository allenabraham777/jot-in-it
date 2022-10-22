"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _controllers = require("../controllers");
var _validators = require("../middlewares/validators");
var _middlewares = require("../middlewares");
var uploadRoutes = function uploadRoutes(app) {
  app.post("/api/upload", _middlewares.uploadHandler.uploadSingleFile("pic"), _controllers.uploadController.upload);
};
var _default = uploadRoutes;
exports["default"] = _default;