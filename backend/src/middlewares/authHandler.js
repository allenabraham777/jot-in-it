import jwt from "jsonwebtoken";
import config from "config";
import { throwError } from "utils";
import asyncHandler from "express-async-handler";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, config.application.secret);

      req.user = { _id: decoded._id };

      next();
    } catch (error) {
      throwError(null, "Not authorized, token failed", 401);
    }
  }

  if (!token) {
    throwError(null, "Not authorized, no token", 401);
  }
});

export default {
  isAuthenticated,
};
