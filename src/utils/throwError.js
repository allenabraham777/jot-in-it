"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var throwError = function throwError() {
  var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Something went wrong";
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var err;
  if (error) {
    err = error;
  } else {
    err = new Error(message);
  }
  err.status = status;
  throw err;
};
var _default = throwError;
exports["default"] = _default;