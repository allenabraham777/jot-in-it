"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _config = _interopRequireDefault(require("../../../config"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _utils = require("../../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ChatSchema = _mongoose["default"].Schema({
  chatName: {
    type: String,
    trim: true
  },
  isGroupChat: {
    type: Boolean,
    "default": false
  },
  users: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }],
  latestMessage: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Message"
  },
  groupAdmin: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});
ChatSchema.pre("save", function (next) {
  var userMap = {};
  this.users = this.users.filter(function (user) {
    if (userMap[user._id]) {
      return false;
    }
    userMap[user._id] = user;
    return true;
  });
  if (this.users.length > _config["default"].application.chats.group.limit) {
    (0, _utils.throwError)(null, "Maximum user limit reached!", 400);
  }
  next();
});
var Chat = _mongoose["default"].model("Chat", ChatSchema);
var _default = Chat;
exports["default"] = _default;