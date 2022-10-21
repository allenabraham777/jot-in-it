import axios from "axios";

const chatApi = (user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  return {
    sendMessage(chatId, content) {
      return axios.post(`/api/message/${chatId}`, { content }, config);
    },
    getAllMessages(chatId) {
      return axios.get(`/api/message/${chatId}`, config);
    },
  };
};

export default chatApi;
