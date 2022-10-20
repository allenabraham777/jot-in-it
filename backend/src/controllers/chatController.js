import asyncHandler from "express-async-handler";
import { ChatService } from "services";

const chatService = new ChatService();

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const _id = req.user._id;
  const { data } = await chatService.accessChat(_id, userId);
  res.status(200).json(data);
});

const fetchChats = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const { data } = await chatService.fetchChats(_id);
  res.status(200).json(data);
});

const createGroupChat = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const { users, name } = req.body;
  const { data } = await chatService.createGroupChat(_id, name, users);
  res.status(200).json(data);
});

const renameGroup = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const { name } = req.body;
  const { groupId } = req.params;
  const { data } = await chatService.renameGroup(groupId, name, _id);
  res.status(200).json(data);
});

const addToGroup = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const { user } = req.body;
  const { groupId } = req.params;
  const { data } = await chatService.addUserToGroup(groupId, user, _id);
  res.status(200).json(data);
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const { groupId, userId } = req.params;
  const { data } = await chatService.removeUserFromGroup(groupId, userId, _id);
  res.status(200).json(data);
});

export default {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
