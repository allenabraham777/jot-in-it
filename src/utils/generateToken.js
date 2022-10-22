"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var generateToken = function generateToken(_id) {
  var secret = _config["default"].application.secret;
  return _jsonwebtoken["default"].sign({
    _id: _id
  }, secret, {
    expiresIn: "30d"
  });
};
var _default = generateToken;
exports["default"] = _default;