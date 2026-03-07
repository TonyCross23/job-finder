import { AppError } from "../../../errors/httpErrors";
import { JobCategory } from "../../../generated/prisma/client";
import { JobCategoryDto, UpdateJobCategoryDto } from "../dao/jobCateogry.dto";
import { IJobCategoryRepository } from "../infrastructure/jobCateogry.Irepository";

export class JobCategoryService  {
    constructor( private repo: IJobCategoryRepository) {}

    async create(data: JobCategoryDto): Promise<JobCategory> {
        return this.repo.create(data)
    }

    async findAll(): Promise<JobCategory[]> {
        return this.repo.findAll()
    }

    async findById(id: string): Promise<JobCategory | null> {
        const jobCategory = await this.repo.findById(id)
        
        if(jobCategory) {
            throw new AppError("Job Category not found", 404)
        }

        return jobCategory
    }

    async updateJobCategory(id: string, data: UpdateJobCategoryDto): Promise<JobCategory> {
        return this.repo.update(id, data)
    }

    async deleteJobCategory(id: string): Promise<void> {
        return this.repo.delete(id)
    }
}