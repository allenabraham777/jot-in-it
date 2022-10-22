"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cloudinary = require("cloudinary");
var _config = _interopRequireDefault(require("../../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_cloudinary.v2.config({
  cloud_name: _config["default"].cloudinary.name,
  api_key: _config["default"].cloudinary.apiKey,
  api_secret: _config["default"].cloudinary.secret
});
var _default = _cloudinary.v2;
exports["default"] = _default;