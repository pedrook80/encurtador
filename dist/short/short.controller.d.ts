import { ShortUrlService } from './short.service';
import { Response } from 'express';
export declare class ShortUrlController {
    private readonly shortUrlService;
    constructor(shortUrlService: ShortUrlService);
    shorten(originalUrl: string, user?: any): Promise<{
        code: string;
        shortUrl: string;
        originalUrl: string;
    }>;
    redirect(code: string, res: Response): Promise<void>;
    list(user: any): Promise<import("../db/entities/short.entity").ShortUrlEntity[]>;
    update(code: string, originalUrl: string, user: any): Promise<import("../db/entities/short.entity").ShortUrlEntity>;
    remove(code: string, user: any): Promise<{
        message: string;
    }>;
}
