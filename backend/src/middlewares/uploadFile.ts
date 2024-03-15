import multer from "multer";
import { Request } from "express";
import BadRequestError from "../errors/BadRequestError";
import path from "path";
import { uniqueFileName } from "../utils/uniqueFileName";
const pathToStatic = "static/presentations/img";
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, done) => {
    done(null, pathToStatic);
  },
  filename: (req: Request, file, done) => {
    const extention = path.extname(file.originalname);
    done(null, `${uniqueFileName(extention)}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, done: any) => {
  const original = file.originalname;
  if (original.endsWith("jpg") || original.endsWith("png") || original.endsWith("jpeg")) {
    return done(null, true);
  }
  done(new BadRequestError({ message: "Solo se permiten imagenes" }), false);
};

export const uploadFile = multer({ storage, fileFilter });
