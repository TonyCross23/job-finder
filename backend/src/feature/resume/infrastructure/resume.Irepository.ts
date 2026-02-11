export interface ISocialMediaRepository {
  deleteByUserId(userId: string, tx?: any): Promise<any>;
  createMany(userId: string, links: { link: string }[], tx?: any): Promise<any>;
}