"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var sendMessageSchema = _joi["default"].object().keys({
  content: _joi["default"].string().required().messages({
    "any.required": "Message content must be present"
  })
});
var sendMessageValidator = function sendMessageValidator(req, res, next) {
  var body = req.body;
  var _sendMessageSchema$va = sendMessageSchema.validate(body),
    error = _sendMessageSchema$va.error;
  if (error) {
    var err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};
var _default = {
  sendMessageValidator: sendMessageValidator
};
exports["default"] = _default;