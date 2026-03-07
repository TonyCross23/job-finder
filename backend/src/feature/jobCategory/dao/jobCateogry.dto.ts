export type JobCategoryDto = {
  industry: string;
  description?: string;
};

export type UpdateJobCategoryDto = Partial<JobCategoryDto>;