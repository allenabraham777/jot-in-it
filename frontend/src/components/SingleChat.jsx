import { chatState } from "ChatProvider";
import { Messages, MessageHeader, NoMessage } from "components/message";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = chatState();
  return (
    <>
      {selectedChat ? (
        <>
          <MessageHeader
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
          <Messages fetchAgain={fetchAgain} />
        </>
      ) : (
        <NoMessage />
      )}
    </>
  );
};

export default SingleChat;
