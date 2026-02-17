import { prisma } from "../../database/prisma";
import { supabase } from "../../database/supabase";
import { ResumeRepository } from "./infrastructure/resume.repository";
import { ResumeController } from "./resume.controller";
import { ResumeService } from "./useCase/resume.service";

const resumeRepo = new ResumeRepository(prisma, supabase)
const resumeService = new ResumeService(resumeRepo)
const resumeController = new ResumeController(resumeService)

export const container = {resumeController}