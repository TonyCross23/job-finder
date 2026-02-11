import { ISocialMediaRepository } from "../infrastructure/social.Irepository";

export class SocialMediaService {
    constructor(private socialRepo: ISocialMediaRepository) { }

    async syncSocialMedia(userId: string, links: { link: string }[]) {
        return await this.socialRepo.transaction(async (tx) => {

            await this.socialRepo.deleteByUserId(userId, tx)

            if (links && links.length > 0) {
                return await this.socialRepo.createMany(userId, links, tx);
            }

            return { count: 0 };
        })
    }

    async getSocialMedia(userId: string) {
        return await this.socialRepo.findByUserId(userId);
    }
}