import { IResumeRepository } from "../infrastructure/resume.Irepository";

export class ResumeService {
    constructor(private resumeRepo: IResumeRepository) { }

    async uploadResume(userId: string, name: string, buffer: Buffer) {
        return await this.resumeRepo.create(userId, name, buffer);
    }

    async deleteResume(id: string) {
        return await this.resumeRepo.delete(id)
    }
}