import { PrismaClient } from "../../../generated/prisma/client";
import { ISocialMediaRepository } from "./social.Irepository";

export class SocialMediaRepository implements ISocialMediaRepository {

    constructor(private prisma: PrismaClient) { }

    async transaction<T>(action: (tx: any) => Promise<T>): Promise<T> {
        return await this.prisma.$transaction(action);
    }

    async deleteByUserId(userId: string, tx?: any): Promise<any> {
        const client = tx || this.prisma
        return await client.socialMedia.deleteMany({
            where: { userId }
        })
    }

    async createMany(userId: string, links: { link: string; }[], tx?: any): Promise<any> {
        const client = tx || this.prisma
        return await client.socialMedia.createMany({
            data: links.map((item) => ({
                userId: userId,
                link: item.link
            }))
        })
    }

    async findByUserId(userId: string): Promise<any[]> {
        return await this.prisma.socialMedia.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' } 
        });
    }

}