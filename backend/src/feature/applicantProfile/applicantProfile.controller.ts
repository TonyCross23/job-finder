import { Request, Response } from "express";
import catchAsync from "../../config/catchAsync";
import { ApplicantProfileService } from "./useCase/applicantProfile.service";
import { AppError } from "../../errors/httpErrors";
import { HTTP_STATUS } from "../../config/httpStatusCode";

export class ApplicantProfileController {
    constructor(private applicantService: ApplicantProfileService) { }

    create = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id
        if (!userId) throw new AppError("user id not found", 404)
        const data = req.body
        const result = await this.applicantService.create(userId, data)
        res.status(HTTP_STATUS.CREATED).json(result)
    })

    update = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id
        const { id } = req.params as { id: string }
        if (!userId) throw new AppError("user id not found", 404)
        const data = req.body
        const result = await this.applicantService.update(id, userId, data)
        res.status(HTTP_STATUS.OK).json(result)
    })
}