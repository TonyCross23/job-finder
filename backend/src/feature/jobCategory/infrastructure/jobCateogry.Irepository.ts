import { JobCategory } from "../../../generated/prisma/client";
import { JobCategoryDto, UpdateJobCategoryDto } from "../dao/jobCateogry.dto";

export interface IJobCategoryRepository {
  create(data: JobCategoryDto): Promise<JobCategory>;
  findAll(): Promise<JobCategory[]>;
  findById(id: string): Promise<JobCategory | null>;
  update(id: string, data: UpdateJobCategoryDto): Promise<JobCategory>;
  delete(id: string): Promise<void>;
}