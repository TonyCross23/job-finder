import { Request, Response } from "express";
import catchAsync from "../../config/catchAsync";
import { SocialMediaService } from "./useCase/social.service";
import { AppError } from "../../errors/httpErrors";
import { HTTP_STATUS } from "../../config/httpStatusCode";

export class SocialMediaController {
    constructor(private socialService: SocialMediaService) { }

    updateSocialMedia = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id
        if (!userId) {
            throw new AppError("User not found", 404)
        }
        const { socialMedias } = req.body;
        const result = await this.socialService.syncSocialMedia(userId, socialMedias)
        res.status(HTTP_STATUS.OK).json(result)
    })

    getSocialMedia = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) throw new AppError("User not found", 404);

        const rawData = await this.socialService.getSocialMedia(userId);
        const formattedData = rawData.map(item => ({
            link: item.link
        }));
        res.status(HTTP_STATUS.OK).json({result: formattedData});
    });
}