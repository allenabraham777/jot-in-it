"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var accessChatSchema = _joi["default"].object().keys({
  userId: _joi["default"].string().required().messages({
    "any.required": "userId is required"
  })
});
var createGroupSchema = _joi["default"].object().keys({
  users: _joi["default"].array().items(_joi["default"].string()).required().min(2).max(250).messages({
    "any.required": "users are required to create a group",
    "array.min": "Atleast 3 users are required to create a group",
    "array.max": "Max of 250 users allowed"
  }),
  name: _joi["default"].string().required().messages({
    "any.required": "Group name is required to create a group"
  })
});
var renameGroupSchema = _joi["default"].object().keys({
  name: _joi["default"].string().required().messages({
    "any.required": "New group name is required to rename a group"
  })
});
var addToGroupSchema = _joi["default"].object().keys({
  user: _joi["default"].string().required().messages({
    "any.required": "User required to add"
  })
});
var accessChatValidator = function accessChatValidator(req, res, next) {
  var body = req.body;
  var _accessChatSchema$val = accessChatSchema.validate(body),
    error = _accessChatSchema$val.error;
  if (error) {
    var err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};
var createGroupChatValidator = function createGroupChatValidator(req, res, next) {
  var body = req.body;
  var _createGroupSchema$va = createGroupSchema.validate(body),
    error = _createGroupSchema$va.error;
  if (error) {
    console.error(error);
    var err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};
var renameGroupChatValidator = function renameGroupChatValidator(req, res, next) {
  var body = req.body;
  var _renameGroupSchema$va = renameGroupSchema.validate(body),
    error = _renameGroupSchema$va.error;
  if (error) {
    console.error(error);
    var err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};
var addToGroupValidator = function addToGroupValidator(req, res, next) {
  var body = req.body;
  var _addToGroupSchema$val = addToGroupSchema.validate(body),
    error = _addToGroupSchema$val.error;
  if (error) {
    console.error(error);
    var err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};
var _default = {
  accessChatValidator: accessChatValidator,
  createGroupChatValidator: createGroupChatValidator,
  renameGroupChatValidator: renameGroupChatValidator,
  addToGroupValidator: addToGroupValidator
};
exports["default"] = _default;