import { Repository } from 'typeorm';
import { ShortUrlEntity } from '../db/entities/short.entity';
import { UserEntity } from '../db/entities/user.entity';
export declare class ShortUrlService {
    private shortUrlRepository;
    constructor(shortUrlRepository: Repository<ShortUrlEntity>);
    private generateCode;
    private generateUniqueCode;
    create(originalUrl: string, user?: UserEntity): Promise<ShortUrlEntity>;
    findOriginalUrl(code: string): Promise<string>;
    listByUser(user: UserEntity): Promise<ShortUrlEntity[]>;
    update(code: string, originalUrl: string, user: UserEntity): Promise<ShortUrlEntity>;
    remove(code: string, user: UserEntity): Promise<void>;
}
