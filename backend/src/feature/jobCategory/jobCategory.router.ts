import { Router } from "express";
import { container } from "./jobCategory.container";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { jobCategoryCreateSchema } from "../../schemas/jobCategory/jobCategory";


const jobCategoryRoute = Router();
const { jobCategoryController } = container;

jobCategoryRoute.post("/", authMiddleware.authenticate, validation(jobCategoryCreateSchema), jobCategoryController.create)

export default jobCategoryRoute