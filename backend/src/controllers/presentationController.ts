import { NextFunction, Request, Response } from "express";
import { PresentationService } from "../services/presentationService";
import { Presentation } from "../models/Presentation";
import BadRequestError from "../errors/BadRequestError";
import { createTxtWIthContent, readTxt } from "../utils/txtFiles";
import { uniqueFileName } from "../utils/uniqueFileName";
import { CustomRequestPayload } from "../interfaces/IPayloadInReq";
import UnauthorizedError from "../errors/UnauthorizedError";
import { BASE_IMG_URL, PATH_TO_STATICS_TXT } from "../constants/paths";
import { IPresentation } from "../interfaces/IPresentation";

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
      createTxtWIthContent(content, `${PATH_TO_STATICS_TXT}${txtName}`);

      await this.presentationService.createPresentation(email, title, txtName, imageName || "default.jpg");
      res.status(201).json({ message: "Presentation created" });
    } catch (err) {
      next(err);
    }
  };

  getPresentations = async (req: Request, res: Response) => {
    const presentations: Presentation[] = await this.presentationService.getPresentations();
    const presentationsResponse: IPresentation[] = await Promise.all(
      presentations.map(async ({ idPresentation, title, txtName, imageName, creationDate }) => {
        return {
          idPresentation: idPresentation,
          title: title,
          content: await readTxt(PATH_TO_STATICS_TXT + txtName),
          imageURL: `${BASE_IMG_URL}${imageName}`,
          creationDate: creationDate,
        };
      })
    );
    res.status(200).json({ presentations: presentationsResponse });
  };
}
