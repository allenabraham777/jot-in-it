import axios from "axios";

const notificationApi = (user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  return {
    removeNotification(notificationId) {
      return axios.put(`/api/notification/${notificationId}`, {}, config);
    },
    getAllNotifications() {
      return axios.get(`/api/notification`, config);
    },
  };
};

export default notificationApi;
