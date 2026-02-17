import { Resume } from "../dto/create.resume";

export interface IResumeRepository {
  create(userId: string, fileName: string, fileBuffer: Buffer): Promise<Resume>;
  delete(resumeId: string): Promise<void>;
}