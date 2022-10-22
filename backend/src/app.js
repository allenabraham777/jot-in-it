import express from "express";
import logger from "morgan";
import cors from "cors";
import createError from "http-errors";

import { errorHandler } from "middlewares";
import connectDB from "database/connection";
import {
  userRoutes,
  uploadRoutes,
  chatRoutes,
  messageRoutes,
  notificationRoutes,
} from "routes";

const app = express();

connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

userRoutes(app);
uploadRoutes(app);
chatRoutes(app);
messageRoutes(app);
notificationRoutes(app);

app.use((req, res, next) => {
  next(createError(404));
});
app.use(errorHandler);

export default app;
