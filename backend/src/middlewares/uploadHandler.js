import multer from "multer";
import shortid from "shortid";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { throwError, cloudinary } from "utils";

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mern-chat-app/uploads",
    format: async (req, file) => {
      switch (file.mimetype) {
        case "image/jpeg":
          return "jpeg";
        case "image/png":
          return "png";
        default:
          throwError(null, "Invalid file type", 400);
      }
    }, // supports promises as well
    public_id: (req, file) => {
      const fileName = shortid.generate() + "-" + Date.now();
      return fileName;
    },
  },
});

const upload = multer({ storage: cloudinaryStorage });

const uploadSingleFile = (field) => upload.single(field);
const uploadMultipleFile = (field) => upload.array(field);

export default { uploadSingleFile, uploadMultipleFile };
