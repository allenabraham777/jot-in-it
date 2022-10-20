import axios from "axios";

const uploadSingleImageToCloud = (file) => {
  const data = new FormData();
  data.append("pic", file);
  return axios.post("/api/upload", data);
};

export default { uploadSingleImageToCloud };
