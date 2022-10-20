import asyncHandler from "express-async-handler";
import { UserService } from "services";

const userService = new UserService();

const register = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const { data } = await userService.registerUser({
    name,
    email,
    password,
    pic,
  });
  res.status(201).json(data);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { data } = await userService.loginUser({
    email,
    password,
  });
  res.status(200).json(data);
});

export default {
  register,
  login,
};
