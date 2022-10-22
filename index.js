"use strict";

require("core-js/stable");
require("regenerator-runtime/runtime");
require("colors");
var _config = _interopRequireDefault(require("./config"));
var _socket = _interopRequireDefault(require("./socket"));
var _http = _interopRequireDefault(require("http"));
var _app = _interopRequireDefault(require("./src/app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Module dependencies.
 */

/**
 * Normalize a port into a number, string, or false.
 */
var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(_config["default"].port || 3001);
_app["default"].set("port", port);

/**
 * Create HTTP server.
 */

var server = _http["default"].createServer(_app["default"]);

/**
 * Event listener for HTTP server "error" event.
 */
var onError = function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string" ? "Pipe ".concat(port) : "Port ".concat(port);

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error("".concat(bind, " requires elevated privileges"));
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("".concat(bind, " is already in use"));
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe ".concat(addr) : "port ".concat(addr.port);
  console.log("Listening on ".concat(bind).yellow.bold);
};

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
(0, _socket["default"])(server);
server.on("error", onError);
server.on("listening", onListening);