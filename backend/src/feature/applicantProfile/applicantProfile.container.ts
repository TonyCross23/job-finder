import { prisma } from "../../database/prisma";
import { ApplicantProfileController } from "./applicantProfile.controller";
import { ApplicantProfileRepository } from "./infrastructure/applicantProfile.repository";
import { ApplicantProfileService } from "./useCase/applicantProfile.service";


const applicantProfileRepo = new ApplicantProfileRepository(prisma)
const applicantProfileService = new ApplicantProfileService(applicantProfileRepo)
const applicantProfileController = new ApplicantProfileController(applicantProfileService)

export const container = {applicantProfileController}