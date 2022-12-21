"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = require("../models");
var _utils = require("../../utils");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ChatRepository = /*#__PURE__*/function () {
  function ChatRepository() {
    _classCallCheck(this, ChatRepository);
    this.model = _models.Chat;
  }
  _createClass(ChatRepository, [{
    key: "createChat",
    value: function createChat(_ref) {
      var _ref$chatName = _ref.chatName,
        chatName = _ref$chatName === void 0 ? "Untitled" : _ref$chatName,
        _ref$isGroupChat = _ref.isGroupChat,
        isGroupChat = _ref$isGroupChat === void 0 ? false : _ref$isGroupChat,
        _ref$users = _ref.users,
        users = _ref$users === void 0 ? [] : _ref$users;
      if (!users.length) {
        (0, _utils.throwError)(null, "Chat users required", 400);
      }
      return this.model.create({
        chatName: chatName,
        isGroupChat: isGroupChat,
        users: users
      });
    }
  }, {
    key: "findChatByChatId",
    value: function findChatByChatId(chatId) {
      return this.model.findOne({
        _id: chatId
      }).populate("users", "-password -__v -createdAt -updatedAt").populate("latestMessage").then(function (chats) {
        return _models.User.populate(chats, {
          path: "latestMessage.sender",
          select: "name pic email",
          strictPopulate: false
        });
      });
    }
  }, {
    key: "findChatByChatIdAndUserId",
    value: function findChatByChatIdAndUserId(chatId, userId) {
      return this.model.findOne({
        $and: [{
          _id: {
            $eq: chatId
          }
        }, {
          users: {
            $elemMatch: {
              $eq: userId
            }
          }
        }]
      });
    }
  }, {
    key: "findOrCreateEndToEndChatByUsers",
    value: function findOrCreateEndToEndChatByUsers(id, userId) {
      return this.model.find({
        isGroupChat: false,
        $and: [{
          users: {
            $elemMatch: {
              $eq: id
            }
          }
        }, {
          users: {
            $elemMatch: {
              $eq: userId
            }
          }
        }]
      }).populate("users", "-password -__v -createdAt -updatedAt").populate("latestMessage").then(function (chats) {
        return _models.User.populate(chats, {
          path: "latestMessage.sender",
          select: "name pic email",
          strictPopulate: false
        });
      });
    }
  }, {
    key: "findChatsByUserId",
    value: function findChatsByUserId(id) {
      return this.model.find({
        users: {
          $elemMatch: {
            $eq: id
          }
        }
      }).populate("users", "-password -__v -createdAt -updatedAt").populate("groupAdmin", "-password -__v -createdAt -updatedAt").populate("latestMessage").sort({
        updatedAt: -1
      }).then(function (chats) {
        return _models.User.populate(chats, {
          path: "latestMessage.sender",
          select: "name pic email",
          strictPopulate: false
        });
      });
    }
  }, {
    key: "createGroupChat",
    value: function createGroupChat(groupAdmin, chatName, users) {
      users.push(groupAdmin);
      return this.model.create({
        chatName: chatName,
        users: users,
        isGroupChat: true,
        groupAdmin: groupAdmin
      });
    }
  }, {
    key: "findGroupChatByGroupId",
    value: function findGroupChatByGroupId(chatId, currentUser, requireAdmin) {
      var payload = {
        _id: chatId
      };
      if (requireAdmin) {
        groupAdmin: currentUser;
      }
      return this.model.findOne(payload).populate("users", "-password -__v -createdAt -updatedAt").populate("groupAdmin", "-password -__v -createdAt -updatedAt").populate("latestMessage");
    }
  }, {
    key: "updateLatestMessage",
    value: function updateLatestMessage(chatId, latestMessage) {
      return this.model.findByIdAndUpdate(chatId, {
        latestMessage: latestMessage
      });
    }
  }]);
  return ChatRepository;
}();
var _default = ChatRepository;
exports["default"] = _default;