import axios from "axios";

const chatApi = (user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  return {
    searchUsers(search) {
      return axios.get(`/api/user?search=${search}`, config);
    },
    accessChat(userId) {
      return axios.post("/api/chat", { userId }, config);
    },
    fetchChats() {
      return axios.get("/api/chat", config);
    },
    createGroup(name, users) {
      return axios.post(
        `/api/chat/group`,
        {
          name,
          users: users.map((user) => user._id),
        },
        config
      );
    },
    renameChat(groupId, name) {
      return axios.put(
        `/api/chat/group/rename/${groupId}`,
        {
          name,
        },
        config
      );
    },
    addUserToGroup(groupId, user) {
      return axios.put(
        `/api/chat/group/${groupId}/add`,
        {
          user,
        },
        config
      );
    },
    removeUserFromGroup(groupId, userId) {
      return axios.put(
        `/api/chat/group/${groupId}/remove/${userId}`,
        {},
        config
      );
    },
  };
};

export default chatApi;
