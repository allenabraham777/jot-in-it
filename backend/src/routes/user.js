import { userController } from "controllers";
import { userValidator } from "validators";
import { uploadHandler, authHandler } from "middlewares";

const userRoutes = (app) => {
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

  app.get("/api/user", authHandler.isAuthenticated, userController.getAllUsers);
};

export default userRoutes;
