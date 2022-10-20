import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import createError from "http-errors";

import { errorHandler } from "middlewares";
import connectDB from "./database/connection";
import { userRoute, uploadRoute } from "routes";

dotenv.config();

const app = express();

connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

userRoute(app);
uploadRoute(app);

app.use((req, res, next) => {
  next(createError(404));
});
app.use(errorHandler);

export default app;
