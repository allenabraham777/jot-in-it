"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _socket = _interopRequireDefault(require("socket.io"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var socketServer = function socketServer(server) {
  var io = (0, _socket["default"])(server, {
    pingTimeout: 60000,
    cors: {
      origin: _config["default"].client.host
    }
  });
  io.on("connection", function (socket) {
    socket.on("setup", function (userData) {
      console.log("Socket connection successful");
      socket.join(userData._id);
      socket.emit("connected");
    });
    socket.on("join chat", function (room) {
      console.log("Joined room: " + room);
      socket.join(room);
    });
    socket.on("typing", function (room) {
      socket["in"](room).emit("typing");
    });
    socket.on("stop typing", function (room) {
      socket["in"](room).emit("stop typing");
    });
    socket.on("new message", function (newMessageReceived) {
      var chat = newMessageReceived.chat;
      if (!chat.users) return;
      chat.users.forEach(function (user) {
        if (user._id !== newMessageReceived.sender._id) {
          socket["in"](user._id).emit("message received", newMessageReceived);
        }
      });
    });
    socket.off("setup", function (userData) {
      socket.leave(userData._id);
    });
  });
};
var _default = socketServer;
exports["default"] = _default;