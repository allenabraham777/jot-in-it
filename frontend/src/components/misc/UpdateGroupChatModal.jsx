import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { chatState } from "ChatProvider";
import { UserBadgeItem, UserListItem } from "components/UserAvatar";
import { chatApi as api } from "apis";
import { debounce } from "utils";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = chatState();
  const { isOpen, onOpen, onClose: close } = useDisclosure();
  const [searchResult, setSearchResult] = useState([]);
  const [groupChatName, setGroupChatName] = useState("");
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();
  const searchRef = useRef();

  useEffect(() => {
    setGroupChatName(selectedChat?.chatName);
  }, [selectedChat]);

  const chatApi = api(user);

  const onClose = () => {
    setGroupChatName("");
    setSearchResult([]);
    close();
  };

  const handleSearch = async function (search) {
    if (!search) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await chatApi.searchUsers(search);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error.message ||
        "Something went wrong!";
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const performSearch = debounce(handleSearch, 1000);

  const handleRename = async () => {
    if (!groupChatName || groupChatName === selectedChat.chatName) return;

    setRenameLoading(true);
    try {
      const { data } = await chatApi.renameChat(
        selectedChat._id,
        groupChatName
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error.message ||
        "Something went wrong!";
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setGroupChatName("");
    setRenameLoading(false);
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await chatApi.addUserToGroup(
        selectedChat._id,
        user1._id
      );
      setSelectedChat(data);
      setFetchAgain((prevFetchAgain) => !prevFetchAgain);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error.message ||
        "Something went wrong!";
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    searchRef.current.value = "";
    setGroupChatName("");
    setSearchResult([]);
    setLoading(false);
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await chatApi.removeUserFromGroup(
        selectedChat._id,
        user1._id
      );
      user1._id === user._id ? setSelectedChat(null) : setSelectedChat(data);
      setFetchAgain((prevFetchAgain) => !prevFetchAgain);
      if (user1._id !== user._id) fetchMessages();
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error.message ||
        "Something went wrong!";
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    searchRef.current.value = "";
    setGroupChatName("");
    setLoading(false);
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  onClick={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                disabled={groupChatName === selectedChat.chatName}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => performSearch(e.target.value)}
                ref={searchRef}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  onClick={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
