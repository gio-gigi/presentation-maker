import multer from "multer";
import { Request } from "express";
import BadRequestError from "../errors/BadRequestError";
import path from "path";
import { uniqueFileName } from "../utils/uniqueFileName";
import { PATH_TO_STATICS_IMG } from "../constants/paths";
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, done) => {
    done(null, PATH_TO_STATICS_IMG);
  },
  filename: (req: Request, file, done) => {
    const extention = path.extname(file.originalname);
    done(null, `${uniqueFileName(extention)}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, done: any) => {
  const original = file.originalname;
  const availableExtensions = ["jpg", "png", "jpeg"];
  if (availableExtensions.some((ext) => original.endsWith(ext))) {
    return done(null, true);
  }
  done(new BadRequestError({ message: "Solo se permiten imagenes" }), false);
};

export const uploadFile = multer({ storage, fileFilter });
