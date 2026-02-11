import { prisma } from "../../database/prisma";
import { SocialMediaRepository } from "./infrastructure/social.repository";
import { SocialMediaController } from "./social.controller";
import { SocialMediaService } from "./useCase/social.service";

const socialRepo = new SocialMediaRepository(prisma)
const socialService = new SocialMediaService(socialRepo)
const socialController = new SocialMediaController(socialService)

export const container = {socialController}