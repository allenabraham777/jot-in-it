import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { Login, SignUp } from "components/authentication";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  useEffect(() => {
    checkUserInfo();
  }, [history]);

  const checkUserInfo = async () => {
    let userInfo = await localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/chats");
    }
  };

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="#101010"
        w="100%"
        mt="40px"
        borderRadius="lg"
        borderWidth="1px"
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        borderBottomColor="transparent"
      >
        <Text textAlign="center" fontSize="4xl" color="white" fontWeight="bold">
          Jot In It
        </Text>
      </Box>
      <Box
        p={4}
        mt={-2}
        bg="#101010"
        color="white"
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
        borderTopColor="transparent"
      >
        <Tabs variant="soft-rounded" colorScheme="whatsapp">
          <TabList mb="1em">
            <Tab w="50%" color="#888888">
              Login
            </Tab>
            <Tab w="50%" color="#888888">
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
