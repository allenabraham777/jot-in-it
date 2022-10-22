"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _config = _interopRequireDefault(require("../../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var errorHandler = function errorHandler(err, req, res, next) {
  var message = err.message,
    _err$status = err.status,
    status = _err$status === void 0 ? 500 : _err$status;
  console.error(err);
  return res.status(status).json({
    error: message,
    stack: _config["default"].application.env !== "production" ? err.stack : null
  });
};
var _default = errorHandler;
exports["default"] = _default;