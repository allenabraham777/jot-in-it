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
} from "@chakra-ui/react";
import { userApi, uploadApi } from "apis";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const toast = useToast();

  const handleClick = () => setShow((prevState) => !prevState);

  const postDetails = async (file) => {
    setLoading(true);
    if (!file) {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (file.type === "image/jpeg" || file.type === "image/png") {
      try {
        const { data } = await uploadApi.uploadSingleImageToCloud(file);
        setPic(data.file);
      } catch (err) {
        toast({
          title: "Error uploading the file",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } else {
      toast({
        title: "Unsupported file type!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setLoading(false);
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      if (!name || !email || !password || !confirmPassword) {
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
      if (password !== confirmPassword) {
        toast({
          title: "Password missmatch!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
      const { data } = await userApi.registerUser({
        name,
        email,
        password,
        confirmPassword,
        pic,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      location.reload();
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.error || error.message || "Cannot create user";
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

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={({ target: { value } }) => {
            setName(value);
          }}
        />
      </FormControl>
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
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={({ target: { value } }) => {
              setConfirmPassword(value);
            }}
            type={show ? "text" : "password"}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/jpeg,image/png"
          onChange={({ target: { files } }) => {
            postDetails(files[0]);
          }}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
