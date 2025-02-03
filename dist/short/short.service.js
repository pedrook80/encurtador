"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortUrlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const short_entity_1 = require("../db/entities/short.entity");
let ShortUrlService = class ShortUrlService {
    constructor(shortUrlRepository) {
        this.shortUrlRepository = shortUrlRepository;
    }
    generateCode(length = 6) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    async generateUniqueCode() {
        let code;
        let exists = true;
        do {
            code = this.generateCode();
            const record = await this.shortUrlRepository.findOne({ where: { code } });
            exists = !!record;
        } while (exists);
        return code;
    }
    async create(originalUrl, user) {
        const code = await this.generateUniqueCode();
        const shortUrl = this.shortUrlRepository.create({
            code,
            originalUrl,
            user: user ? user : null,
        });
        return await this.shortUrlRepository.save(shortUrl);
    }
    async findOriginalUrl(code) {
        const shortUrl = await this.shortUrlRepository.findOne({ where: { code } });
        if (!shortUrl) {
            throw new common_1.HttpException('Short URL not found', common_1.HttpStatus.NOT_FOUND);
        }
        return shortUrl.originalUrl;
    }
    async listByUser(user) {
        return await this.shortUrlRepository.find({ where: { user } });
    }
    async update(code, originalUrl, user) {
        const shortUrl = await this.shortUrlRepository.findOne({
            where: { code },
            relations: ['user'],
        });
        if (!shortUrl) {
            throw new common_1.HttpException('Short URL not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (!shortUrl.user || shortUrl.user.id !== user.id) {
            throw new common_1.HttpException('Not authorized to update this URL', common_1.HttpStatus.FORBIDDEN);
        }
        shortUrl.originalUrl = originalUrl;
        return await this.shortUrlRepository.save(shortUrl);
    }
    async remove(code, user) {
        const shortUrl = await this.shortUrlRepository.findOne({ where: { code }, relations: ['user'], });
        if (!shortUrl) {
            throw new common_1.HttpException('Short URL not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (!shortUrl.user || shortUrl.user.id !== user.id) {
            throw new common_1.HttpException('Not authorized to delete this URL', common_1.HttpStatus.FORBIDDEN);
        }
        await this.shortUrlRepository.delete(code);
    }
};
exports.ShortUrlService = ShortUrlService;
exports.ShortUrlService = ShortUrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(short_entity_1.ShortUrlEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShortUrlService);
//# sourceMappingURL=short.service.js.map