"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ = require("./");
var formatData = function formatData(data) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Data Not found!";
  if (data) {
    return {
      data: data
    };
  } else {
    (0, _.throwError)(null, message, 500);
  }
};
var _default = formatData;
exports["default"] = _default;