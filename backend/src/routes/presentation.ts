import { Router } from "express";
import path from "path";
import express from "express";
import { addPayloadToReq, guardRole } from "../middlewares/authMiddleware";
import { User, UserRole } from "../models/User";
import { PresentationController } from "../controllers/presentationController";
import { PresentationService } from "../services/presentationService";
import { AppDataSource } from "../config/data-source";
import { Presentation } from "../models/Presentation";
import { uploadFile } from "../middlewares/uploadFile";
const presentationRouter: Router = Router();
const presentationRepository = AppDataSource.getRepository(Presentation);
const userRepository = AppDataSource.getRepository(User);
const presentationService = new PresentationService(presentationRepository, userRepository);
const presentationController = new PresentationController(presentationService);

// create presentation
presentationRouter.post(
  "/api/presentation",
  addPayloadToReq,
  guardRole(UserRole.ADMIN),
  uploadFile.single("img"),
  presentationController.createPresentation
);

// get presentations
presentationRouter.get("/api/presentation", addPayloadToReq, guardRole(UserRole.VIEWER), presentationController.getPresentations);

// get single presentation
presentationRouter.get(
  "/api/presentation/:id",
  addPayloadToReq,
  guardRole(UserRole.VIEWER),
  presentationController.getSinglePresentation
);

// static images
presentationRouter.use(express.static(path.join("static", "presentations")));

export { presentationRouter };
