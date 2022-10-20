import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (_id) => {
  const secret = config.application.secret;

  return jwt.sign(
    {
      _id,
    },
    secret,
    { expiresIn: "30d" }
  );
};

export default generateToken;
