import { chatState } from "ChatProvider";
import { Messages, MessageHeader, NoMessage } from "components/message";
import { useEffect, useState } from "react";
import SocketClient from "socket";

const Socket = SocketClient();
let socket;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat } = chatState();
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (user) {
      socket = Socket.connect(user);
      socket.on("connected", () => setSocketConnected(true));
    }
  }, [user]);
  return (
    <>
      {selectedChat ? (
        <>
          <MessageHeader
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
          <Messages fetchAgain={fetchAgain} socket={socket} />
        </>
      ) : (
        <NoMessage />
      )}
    </>
  );
};

export default SingleChat;
