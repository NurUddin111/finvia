import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import AppError from "../errorHelpers/AppError";
import { HttpStatusCodes } from "../utils/httpStatusCodes";

const imageFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        HttpStatusCodes.BAD_REQUEST,
        "Only image files are allowed (jpeg, png, webp, etc.)",
      ),
    );
  }
};

export const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: imageFilter,
});
