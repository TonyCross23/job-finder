import { Router } from "express";
import { container } from "./applicantProfile.container";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authLimiter } from "../../middlewares/authRateLimit";

export const applicantProfileRoute = Router()
const {applicantProfileController} = container

applicantProfileRoute.post("/", authMiddleware.authenticate, applicantProfileController.create)
applicantProfileRoute.put("/:id", authMiddleware.authenticate, applicantProfileController.update)

export default applicantProfileRoute