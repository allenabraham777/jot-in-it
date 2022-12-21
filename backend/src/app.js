import express from "express";
import logger from "morgan";
import cors from "cors";
import createError from "http-errors";
import path from "path"

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

const dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "API running successfully" });
  });
}

app.use((req, res, next) => {
  next(createError(404));
});
app.use(errorHandler);

export default app;
