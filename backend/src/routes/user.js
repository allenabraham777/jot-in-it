import { userController } from "controllers";
import { userValidator } from "validators";
import { uploadHandler } from "middlewares";

const userRoute = (app) => {
  app.post(
    "/api/user/register",
    userValidator.signupValidator,
    uploadHandler.uploadSingleFile("pic"),
    userController.register
  );
  app.post(
    "/api/user/login",
    userValidator.loginValidator,
    userController.login
  );
};

export default userRoute;
