import { Request, Response } from "express";
import catchAsync from "../../config/catchAsync";
import { LocationService } from "./location.service";
import { HTTP_STATUS } from "../../config/httpStatusCode";

export class LocationController {
    constructor(private service: LocationService) { }

    create = catchAsync(async (req: Request, res: Response) => {
        const { name, description } = req.body
        const location = await this.service.create(name, description)
        res.status(HTTP_STATUS.CREATED).json(location)
    })

    getAll = catchAsync(async (req: Request, res: Response) => {
        const locations = await this.service.getAll()
        res.status(HTTP_STATUS.OK).json(locations)
    })

    getById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params as { id: string }
        const location = await this.service.getById(id)
        res.status(HTTP_STATUS.OK).json(location)
    })

    update = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params as { id: string }
        const { name, description } = req.body
        const location = await this.service.update(id, name, description)
        res.status(HTTP_STATUS.OK).json(location)
    })

    delete = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params as { id: string }
        await this.service.delete(id)
        res.status(HTTP_STATUS.OK).json({message: "Delete Succefull"})
    })

}