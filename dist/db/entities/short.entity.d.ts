import { UserEntity } from './user.entity';
export declare class ShortUrlEntity {
    code: string;
    originalUrl: string;
    user?: UserEntity;
    createdAt: Date;
    updatedAt: Date;
}
