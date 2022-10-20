import { uploadController } from "controllers";
import { userValidator } from "validators";
import { uploadHandler } from "middlewares";

const uploadRoute = (app) => {
  app.post(
    "/api/upload",
    uploadHandler.uploadSingleFile("pic"),
    uploadController.upload
  );
};

export default uploadRoute;
