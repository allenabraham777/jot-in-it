import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  db: {
    url: process.env.DB_URL,
  },
  application: {
    env: process.env.NODE_ENV || "development",
    secret: process.env.SECRET,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    secret: process.env.CLOUDINARY_SECRET,
    apiKey: process.env.CLOUDINARY_KEY,
  },
};

export default config;
