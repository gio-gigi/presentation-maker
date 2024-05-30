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
      const txtName = uniqueFileName(".md");
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
      presentations.map(async ({ idPresentation, title, txtName, imageName, creationDate, user }) => {
        return {
          idPresentation: idPresentation,
          title: title,
          imageURL: `${BASE_IMG_URL}${imageName}`,
          creationDate: creationDate,
          creator: {
            email: user.email,
            name: user.name,
          },
        };
      })
    );
    res.status(200).json({ presentations: presentationsResponse });
  };

  getSinglePresentation = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) return next(new BadRequestError({ message: "Id is required" }));
    try {
      const presentation: Presentation = await this.presentationService.getSinglePresentation(Number(id));
      const { title, txtName, imageName, creationDate, user } = presentation;

      const content = await readTxt(PATH_TO_STATICS_TXT + txtName);
      const presentationResponse: IPresentation = {
        idPresentation: Number(id),
        title: title,
        content: content,
        imageURL: `${BASE_IMG_URL}${imageName}`,
        creationDate: creationDate,
        creator: {
          email: user.email,
          name: user.name,
        },
      };
      res.status(200).json({ presentation: presentationResponse });
    } catch (err) {
      next(err);
    }
  };
}
