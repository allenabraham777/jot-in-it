import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { userApi } from "apis";
import { useHistory } from "react-router-dom";
import { chatState } from "ChatProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const { setUser } = chatState();

  const handleClick = () => setShow((prevState) => !prevState);

  const submitHandler = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        toast({
          title: "Please fill all required fields!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
      const { data } = await userApi.loginUser({
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      location.reload();
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.error || error.message || "Error loggin in!";
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setLoading(false);
  };

  const setGuestCredentials = () => {
    setEmail("guest@example.com");
    setPassword("123456");
  };

  return (
    <VStack spacing="5px" color="white">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={({ target: { value } }) => {
            setEmail(value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Password"
            value={password}
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
            type={show ? "text" : "password"}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" bg="#333333" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Text style={{ marginTop: 15 }} hidden={!loading}>
        Please wait, the server may be restarting due to ideal time limit of
        15minutes
      </Text>
      <Button
        colorScheme="telegram"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={setGuestCredentials}
      >
        Get User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
