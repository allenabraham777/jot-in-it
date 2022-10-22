"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var config = {
  port: process.env.PORT,
  client: {
    host: process.env.CLIENT_HOST
  },
  db: {
    url: process.env.DB_URL
  },
  application: {
    env: process.env.NODE_ENV || "development",
    secret: process.env.SECRET,
    chats: {
      group: {
        limit: 250
      }
    }
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    secret: process.env.CLOUDINARY_SECRET,
    apiKey: process.env.CLOUDINARY_KEY
  }
};
var _default = config;
exports["default"] = _default;