import { Router } from "express";
import { container } from "./social.container";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { syncSocialMediaSchema } from "../../schemas/social/social.schema";

const socialRoute = Router()
const {socialController} = container

socialRoute.post("/sync", authMiddleware.authenticate, validation(syncSocialMediaSchema), socialController.updateSocialMedia)
socialRoute.get("/", authMiddleware.authenticate, socialController.getSocialMedia);

export default socialRoute