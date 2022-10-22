"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var NotificationSchema = _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  notifications: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Message"
  }]
}, {
  timestamps: true
});
var Notification = _mongoose["default"].model("Notification", NotificationSchema);
var _default = Notification;
exports["default"] = _default;