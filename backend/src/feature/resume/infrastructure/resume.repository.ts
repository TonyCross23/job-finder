import { SupabaseClient } from "@supabase/supabase-js/dist/index.cjs";
import { PrismaClient } from "../../../generated/prisma/client";
import { Resume } from "../dto/create.resume";
import { IResumeRepository } from "./resume.Irepository";


export class ResumeRepository implements IResumeRepository {

    constructor(private prisma: PrismaClient, private storage: SupabaseClient) { }

    async create(userId: string, fileName: string, fileBuffer: Buffer): Promise<Resume> {
        const uniquePath = `resumes/${userId}/${Date.now()}-${fileName}`;

        // supabasefile storage
        const { data: storageData, error: storageError } = await this.storage.storage
            .from('resumes')
            .upload(uniquePath, fileBuffer);

        if (storageError) throw new Error(`Supabase Error: ${storageError.message}`);

        // master db for store file url
        return await this.prisma.resume.create({
            data: {
                userId: userId,
                filePath: storageData.path,
            },
        });
    }
    async delete(resumeId: string): Promise<void> {
        const resume = await this.prisma.resume.findUnique({
            where: { id: resumeId }
        })

        if (!resume) throw new Error("Not found");

        await this.storage.storage.from('resumes').remove([resume.filePath]);
        await this.prisma.resume.delete({ where: { id: resumeId } });
    }

    async findByUserId(userId: string): Promise<Resume[]> {
        return await this.prisma.resume.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' }
        }) as Resume[]
    }

}