import { Request, Response } from "express";
import catchAsync from "../../../config/catchAsync";
import { JobCategoryService } from "../useCase/jobCateogry.service";
import { JobCategoryDto } from "../dao/jobCateogry.dto";
import { HTTP_STATUS } from "../../../config/httpStatusCode";


export class JobCateogoryController {
    constructor( private service: JobCategoryService) {}

    create = catchAsync(async(req: Request, res: Response) => {
        const data: JobCategoryDto = req.body
        const category = await this.service.create(data)
        res.status(HTTP_STATUS.CREATED).json(category)
    })

    findAll = catchAsync(async(req: Request, res: Response) => {
        const data = await this.service.findAll()
        res.status(HTTP_STATUS.OK).json(data)
    })

    findById = catchAsync(async(req: Request, res: Response) => {
        const {id} = req.params as {id: string}
        const result = await this.service.findById(id)
        res.status(HTTP_STATUS.OK).json(result)
    })

    update = catchAsync(async(req: Request, res: Response) => {
        
    })
}