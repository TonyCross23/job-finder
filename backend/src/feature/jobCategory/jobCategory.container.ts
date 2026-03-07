import { prisma } from "../../database/prisma";
import { JobCateogoryController } from "./controller/jobCateogry.controller";
import { JobCategoryRepository } from "./infrastructure/jobCateogry.repository";
import { JobCategoryService } from "./useCase/jobCateogry.service";


const jobCategoryRepository = new JobCategoryRepository(prisma);
const jobCategoryService = new JobCategoryService(jobCategoryRepository);
const jobCategoryController = new JobCateogoryController(jobCategoryService);

export const container = { jobCategoryController };