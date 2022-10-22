"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "chatRoutes", {
  enumerable: true,
  get: function get() {
    return _chat["default"];
  }
});
Object.defineProperty(exports, "messageRoutes", {
  enumerable: true,
  get: function get() {
    return _message["default"];
  }
});
Object.defineProperty(exports, "notificationRoutes", {
  enumerable: true,
  get: function get() {
    return _notification["default"];
  }
});
Object.defineProperty(exports, "uploadRoutes", {
  enumerable: true,
  get: function get() {
    return _upload["default"];
  }
});
Object.defineProperty(exports, "userRoutes", {
  enumerable: true,
  get: function get() {
    return _user["default"];
  }
});
var _user = _interopRequireDefault(require("./user"));
var _upload = _interopRequireDefault(require("./upload"));
var _chat = _interopRequireDefault(require("./chat"));
var _message = _interopRequireDefault(require("./message"));
var _notification = _interopRequireDefault(require("./notification"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }