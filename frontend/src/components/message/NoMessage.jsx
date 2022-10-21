import { Box, Text } from "@chakra-ui/react";
import React from "react";

const NoMessage = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" h="100%">
      <Text fontSize="3xl" pb={3} fontFamily="Work sans">
        Click on a user to start chatting
      </Text>
    </Box>
  );
};

export default NoMessage;
