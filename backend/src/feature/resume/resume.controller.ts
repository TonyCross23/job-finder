import { Request, Response } from "express"
import catchAsync from "../../config/catchAsync"
import { HTTP_STATUS } from "../../config/httpStatusCode";
import { ResumeService } from "./useCase/resume.service";

export class ResumeController {

    constructor(private resumeService: ResumeService) {}

    upload = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id
        
        if(!userId) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "user id not fund" });
        }

        const file = req.file;
        if (!file) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Please upload a file" });
        }

        const result = await this.resumeService.uploadResume(
            userId,
            file.originalname,
            file.buffer
        );

        res.status(HTTP_STATUS.CREATED).json(result)
    })

    delete = catchAsync(async(req: Request, res: Response) => {
        const id = req.params.id as string
        await this.resumeService.deleteResume(id)
        res.status(HTTP_STATUS.OK).json({message: "Delete succefully"})
    })
}