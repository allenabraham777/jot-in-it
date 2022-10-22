"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userLoginSchema = _joi["default"].object().keys({
  email: _joi["default"].string().email().required().messages({
    "any.required": "Email is required"
  }),
  password: _joi["default"].string().required().messages({
    "any.required": "Password is required"
  })
});
var userSignupSchema = _joi["default"].object().keys({
  name: _joi["default"].string().required().messages({
    "any.required": "Name is required"
  }),
  email: _joi["default"].string().email().required().messages({
    "any.required": "Email is required"
  }),
  password: _joi["default"].string().required().messages({
    "any.required": "Password is required"
  }),
  pic: _joi["default"].string().allow("").allow(null).optional(),
  confirmPassword: _joi["default"].string().required().valid(_joi["default"].ref("password")).messages({
    "any.only": "Password and Confirm password must match",
    "any.required": "Confirm password is required"
  })
});
var loginValidator = function loginValidator(req, res, next) {
  var body = req.body;
  var _userLoginSchema$vali = userLoginSchema.validate(body),
    error = _userLoginSchema$vali.error;
  if (error) {
    var err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};
var signupValidator = function signupValidator(req, res, next) {
  var body = req.body;
  var _userSignupSchema$val = userSignupSchema.validate(body),
    error = _userSignupSchema$val.error;
  if (error) {
    var err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};
var _default = {
  loginValidator: loginValidator,
  signupValidator: signupValidator
};
exports["default"] = _default;