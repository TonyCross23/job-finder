import { supabase } from "../../../database/supabase";
import { AppError } from "../../../errors/httpErrors";
import { Resume } from "../dto/create.resume";
import { IResumeRepository } from "../infrastructure/resume.Irepository";

export class ResumeService {
    constructor(private resumeRepo: IResumeRepository) { }

    async uploadResume(userId: string, name: string, buffer: Buffer) {
        return await this.resumeRepo.create(userId, name, buffer);
    }

    async deleteResume(id: string) {
        return await this.resumeRepo.delete(id)
    }

    async getResumesByUserId(userId: string): Promise<Resume[]> {
        if (!userId) throw new AppError("User ID is required", 400);

        const resumes = await this.resumeRepo.findByUserId(userId)

        return resumes.map(resume => {
            const { data } = supabase.storage
                .from('resumes')
                .getPublicUrl(resume.filePath);

            return {
                ...resume,
                filePath: data.publicUrl
            };
        });
    }
}