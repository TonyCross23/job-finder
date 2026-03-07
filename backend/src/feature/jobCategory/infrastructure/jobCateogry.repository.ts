import { JobCategory, PrismaClient } from "../../../generated/prisma/client";
import { JobCategoryDto, UpdateJobCategoryDto } from "../dao/jobCateogry.dto";
import { IJobCategoryRepository } from "./jobCateogry.Irepository";

export class JobCategoryRepository implements IJobCategoryRepository {
    constructor( private prisma: PrismaClient) {}
    async create(data: JobCategoryDto): Promise<JobCategory> {
        return await this.prisma.jobCategory.create({data})
    }
    async findAll(): Promise<JobCategory[]> {
        return await this.prisma.jobCategory.findMany()
    }
    async findById(id: string): Promise<JobCategory | null> {
        return await this.prisma.jobCategory.findUnique({
            where: {id}
        })
    }
    async update(id: string, data: UpdateJobCategoryDto): Promise<JobCategory> {
        return await this.prisma.jobCategory.update({
            where: {id},
            data
        })
    }
    async delete(id: string): Promise<void> {
         await this.prisma.jobCategory.delete({
            where: {id}
        })
    }

}