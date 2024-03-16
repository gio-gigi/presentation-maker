import { NextFunction, Request, Response } from "express";
import { PresentationService } from "../services/presentationService";
import { Presentation } from "../models/Presentation";
import BadRequestError from "../errors/BadRequestError";
import { createTxtWIthContent } from "../utils/txtFiles";
import { uniqueFileName } from "../utils/uniqueFileName";
import { CustomRequestPayload } from "../interfaces/IPayloadInReq";
import UnauthorizedError from "../errors/UnauthorizedError";

const pathToStatic = "static/presentations/txt/";

export class PresentationController {
  private presentationService: PresentationService;
  constructor(presentationService: PresentationService) {
    this.presentationService = presentationService;
  }
  createPresentation = async (req: CustomRequestPayload, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return next(new BadRequestError({ message: "Email, title and content are required" }));
    }
    try {
      const txtName = uniqueFileName(".txt");
      const imageName = req.file?.filename;
      const email = req.payload?.email;
      if (!email) return next(new UnauthorizedError());
      createTxtWIthContent(content, `${pathToStatic}${txtName}`);

      await this.presentationService.createPresentation(email, title, txtName, imageName || "default.jpg");
      res.status(201).json({ message: "Presentation created" });
    } catch (err) {
      next(err);
    }
  };

  getPresentations = async (req: Request, res: Response) => {
    const presentations: Presentation[] = await this.presentationService.getPresentations();
    res.status(200).json({ presentations });
  };
}
