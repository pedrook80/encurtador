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
exports.ShortUrlController = void 0;
const common_1 = require("@nestjs/common");
const short_service_1 = require("./short.service");
const auth_guard_1 = require("../auth/auth.guard");
const user_decorator_1 = require("../users/user.decorator");
let ShortUrlController = class ShortUrlController {
    constructor(shortUrlService) {
        this.shortUrlService = shortUrlService;
    }
    async shorten(originalUrl, user) {
        const shortUrl = await this.shortUrlService.create(originalUrl, user?.sub);
        return {
            code: shortUrl.code,
            shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${shortUrl.code}`,
            originalUrl: shortUrl.originalUrl,
        };
    }
    async redirect(code, res) {
        const originalUrl = await this.shortUrlService.findOriginalUrl(code);
        return res.redirect(originalUrl);
    }
    async list(user) {
        delete user.iat;
        delete user.exp;
        const urls = await this.shortUrlService.listByUser(user);
        return urls;
    }
    async update(code, originalUrl, user) {
        const updatedUrl = await this.shortUrlService.update(code, originalUrl, user);
        return updatedUrl;
    }
    async remove(code, user) {
        await this.shortUrlService.remove(code, user);
        return { message: 'URL removed successfully' };
    }
};
exports.ShortUrlController = ShortUrlController;
__decorate([
    (0, common_1.Post)('shorten'),
    __param(0, (0, common_1.Body)('originalUrl')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShortUrlController.prototype, "shorten", null);
__decorate([
    (0, common_1.Get)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShortUrlController.prototype, "redirect", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('code/list'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShortUrlController.prototype, "list", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Body)('originalUrl')),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ShortUrlController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShortUrlController.prototype, "remove", null);
exports.ShortUrlController = ShortUrlController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [short_service_1.ShortUrlService])
], ShortUrlController);
//# sourceMappingURL=short.controller.js.map