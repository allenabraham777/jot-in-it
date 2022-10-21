import asyncHandler from "express-async-handler";
import { MessageService } from "services";

const messageService = new MessageService();

const sendMessage = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;
  const { content } = req.body;
  const userId = req.user._id;
  const { data } = await messageService.sendMessage(userId, chatId, content);
  res.status(201).json(data);
});

const getAllMessages = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const chatId = req.params.chatId;
  const { data } = await messageService.getAllMessages(userId, chatId);
  res.status(200).json(data);
});

export default {
  sendMessage,
  getAllMessages,
};
