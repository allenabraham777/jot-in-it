import socketIO from "socket.io";
import config from "config";

const socketServer = (server) => {
  const io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
      origin: config.client.host,
    },
  });

  io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
    });

    socket.on("typing", (room) => {
      socket.in(room).emit("typing");
    });

    socket.on("stop typing", (room) => {
      socket.in(room).emit("stop typing");
    });

    socket.on("new message", (newMessageReceived) => {
      const chat = newMessageReceived.chat;
      if (!chat.users) return;
      chat.users.forEach((user) => {
        if (user._id !== newMessageReceived.sender._id) {
          socket.in(user._id).emit("message received", newMessageReceived);
        }
      });
    });

    socket.off("setup", (userData) => {
      socket.leave(userData._id);
    });
  });
};

export default socketServer;
