"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var MessageSchema = _mongoose["default"].Schema({
  sender: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  content: {
    type: String,
    trim: true
  },
  chat: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Chat"
  }
}, {
  timestamps: true
});
var Message = _mongoose["default"].model("Message", MessageSchema);
var _default = Message;
exports["default"] = _default;