import asyncHandler from "express-async-handler";
import { throwError } from "utils";

const upload = asyncHandler(async (req, res) => {
  if (!req?.file?.path) {
    throwError(null, "File not uploaded. Please try again later.", 500);
  }
  res.status(201).json({ file: req.file.path });
});

export default {
  upload,
};
