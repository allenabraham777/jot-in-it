"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = require("../models");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var UserRepository = /*#__PURE__*/function () {
  function UserRepository() {
    _classCallCheck(this, UserRepository);
    this.model = _models.User;
  }
  _createClass(UserRepository, [{
    key: "findUserByEmail",
    value: function findUserByEmail(email) {
      return this.model.findOne({
        email: email
      }).select("-__v -createdAt -updatedAt");
    }
  }, {
    key: "createUser",
    value: function createUser(name, email, password, pic) {
      var payload = {
        name: name,
        email: email,
        password: password
      };
      if (pic) {
        payload.pic = pic;
      }
      return this.model.create(payload);
    }
  }, {
    key: "findUserWithKeyword",
    value: function findUserWithKeyword() {
      var keyword = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var query = keyword ? {
        $or: [{
          name: {
            $regex: keyword,
            $options: "i"
          }
        }, {
          email: {
            $regex: keyword,
            $options: "i"
          }
        }]
      } : {};
      var excludeQuery = exclude ? {
        _id: {
          $ne: exclude
        }
      } : {};
      return this.model.find(query).find(excludeQuery).select("-password -createdAt -updatedAt -__v");
    }
  }]);
  return UserRepository;
}();
var _default = UserRepository;
exports["default"] = _default;