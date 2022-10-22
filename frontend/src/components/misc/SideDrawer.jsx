import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import NotificationBadge, { Effect } from "react-notification-badge";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { chatState } from "ChatProvider";
import { ProfileModal, ChatLoading } from "components/misc";
import { UserListItem } from "components/UserAvatar";
import { useHistory } from "react-router-dom";
import { chatApi as api, notificationApi as _api } from "apis";
import { chatUtils } from "utils";

const SideDrawer = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const history = useHistory();
  const { isOpen, onOpen, onClose: close } = useDisclosure();
  const btnRef = useRef();
  const searchRef = useRef();
  const toast = useToast();

  const {
    user,
    setUser,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = chatState();

  const chatApi = api(user);
  const notificationApi = _api(user);

  const onClose = () => {
    setSearchResult([]);
    setLoading(false);
    close();
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    history.push("/");
  };

  const handleSearch = async () => {
    const search = searchRef.current.value;
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await chatApi.searchUsers(search);
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.error ||
        error.message ||
        "Something went wrong!";
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    setLoading(false);
  };

  const accessChat = async (userId) => {
    setLoadingChat(true);
    try {
      const { data } = await chatApi.accessChat(userId);
      const doChatExist = chats.find((chat) => chat._id === data._id);
      if (!doChatExist) {
        setChats((prevChats) => [data, ...prevChats]);
      }
      setSelectedChat(data);
      onClose();
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.error ||
        error.message ||
        "Something went wrong!";
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    setLoadingChat(false);
  };

  const openChat = (n) => {
    setSelectedChat(n.chat);
    setNotification(notification.filter((_n) => _n._id !== n._id));
    notificationApi.removeNotification(n._id);
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        width="100%"
        padding="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant={"ghost"} ref={btnRef} onClick={onOpen}>
            <SearchIcon />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl">Jot-In-It</Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList px={2}>
              {!notification.length && "No New Messages"}
              {notification.map((n) => (
                <MenuItem key={n._id} onClick={() => openChat(n)}>
                  {n.chat.isGroupChat
                    ? `New message in ${n.chat.chatName}`
                    : `New message from ${chatUtils.getSender(
                        n.sender,
                        n.chat.users
                      )}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                name={user?.name}
                size="sm"
                fontWeight="bold"
                cursor="pointer"
                src={user?.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input placeholder="Name or Email" mr={2} ref={searchRef} />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  onClick={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
