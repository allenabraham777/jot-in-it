import config from "config";
import mongoose from "mongoose";
import { throwError } from "utils";

const ChatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

ChatSchema.pre("save", function (next) {
  const userMap = {};
  this.users = this.users.filter((user) => {
    if (userMap[user._id]) {
      return false;
    }
    userMap[user._id] = user;
    return true;
  });
  if (this.users.length > config.application.chats.group.limit) {
    throwError(null, "Maximum user limit reached!", 400);
  }
  next();
});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
