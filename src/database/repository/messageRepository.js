"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = require("../models");
var _utils = require("../../utils");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var MessageRepository = /*#__PURE__*/function () {
  function MessageRepository() {
    _classCallCheck(this, MessageRepository);
    this.model = _models.Message;
    this.userModel = _models.User;
    this.chatModel = _models.Chat;
  }
  _createClass(MessageRepository, [{
    key: "createMessage",
    value: function createMessage(_ref) {
      var _this = this;
      var sender = _ref.sender,
        content = _ref.content,
        chat = _ref.chat;
      return this.model.create({
        sender: sender,
        content: content,
        chat: chat
      }).then(function (message) {
        return message.populate("sender", "name pic");
      }).then(function (message) {
        return message.populate("chat");
      }).then(function (message) {
        return _this.userModel.populate(message, {
          path: "chat.users",
          select: "name pic email"
        });
      });
    }
  }, {
    key: "findMessageByChatId",
    value: function findMessageByChatId(chatId) {
      return this.model.find({
        chat: chatId
      }).populate("sender", "name pic email").populate("chat");
    }
  }]);
  return MessageRepository;
}();
var _default = MessageRepository;
exports["default"] = _default;