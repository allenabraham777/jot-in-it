import axios from "axios";

const registerUser = ({ name, email, password, confirmPassword, pic }) =>
  axios.post("/api/user/register", {
    name,
    email,
    password,
    confirmPassword,
    pic,
  });

const loginUser = ({ email, password }) =>
  axios.post("/api/user/login", {
    email,
    password,
  });

export default {
  registerUser,
  loginUser,
};
