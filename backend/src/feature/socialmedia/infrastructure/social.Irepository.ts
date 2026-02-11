export interface ISocialMediaRepository {
    deleteByUserId(userId: string, tx?: any): Promise<any>;
    createMany(userId: string, links: { link: string }[], tx?: any): Promise<any>;
    transaction<T>(action: (tx: any) => Promise<T>): Promise<T>;
    findByUserId(userId: string): Promise<any[]>;
}