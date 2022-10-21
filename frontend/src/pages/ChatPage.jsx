import axios from "axios";
import { chatState } from "ChatProvider";
import { Box } from "@chakra-ui/react";
import { SideDrawer } from "components/misc";
import { MyChats, ChatBox } from "components";
import { useState } from "react";

const ChatPage = () => {
  const { user } = chatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width="100%"
        height={"91.5vh"}
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
