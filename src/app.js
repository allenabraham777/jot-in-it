"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _path = _interopRequireDefault(require("path"));
var _middlewares = require("./middlewares");
var _connection = _interopRequireDefault(require("./database/connection"));
var _routes = require("./routes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _connection["default"])();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: false
}));
(0, _routes.userRoutes)(app);
(0, _routes.uploadRoutes)(app);
(0, _routes.chatRoutes)(app);
(0, _routes.messageRoutes)(app);
(0, _routes.notificationRoutes)(app);
var dirname = _path["default"].resolve();
if (process.env.NODE_ENV === "production") {
  app.use(_express["default"]["static"](_path["default"].join(dirname, "frontend/dist")));
  app.get("*", function (req, res) {
    res.sendFile(_path["default"].resolve(dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", function (req, res) {
    res.json({
      message: "API running successfully"
    });
  });
}
app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
});
app.use(_middlewares.errorHandler);
var _default = app;
exports["default"] = _default;