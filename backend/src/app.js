import express from "express";
import logger from "morgan";
import cors from "cors";

import data from "./data/data";
import { errorHandler } from "utils";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is working" });
});

app.get("/api/chat", (req, res) => {
  res.json(data);
});

app.get("/api/chat/:id", (req, res) => {
  res.json(data.find((chat) => chat._id === req.params.id));
});

errorHandler(app);

export default app;
