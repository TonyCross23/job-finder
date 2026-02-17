import { Router } from "express";
import { container } from "./resume.container";
import { uploadMiddleware } from "../../middlewares/upload";
import { authMiddleware } from "../../middlewares/auth.middleware";

const resumeRouter = Router()
const {resumeController} = container

resumeRouter.post("/upload", authMiddleware.authenticate, uploadMiddleware.single('file'), resumeController.upload)
resumeRouter.delete("/:id", authMiddleware.authenticate, resumeController.delete)

export default resumeRouter 