import io from "socket.io-client";

const ENDPOINT = "http://localhost:3001";

const SocketClient = () => {
  let socket;
  return {
    connect(user) {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      return socket;
    },
  };
};

export default SocketClient;
