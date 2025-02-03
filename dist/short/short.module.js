"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortUrlModule = void 0;
const common_1 = require("@nestjs/common");
const short_service_1 = require("./short.service");
const short_controller_1 = require("./short.controller");
const typeorm_1 = require("@nestjs/typeorm");
const short_entity_1 = require("../db/entities/short.entity");
let ShortUrlModule = class ShortUrlModule {
};
exports.ShortUrlModule = ShortUrlModule;
exports.ShortUrlModule = ShortUrlModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([short_entity_1.ShortUrlEntity])],
        controllers: [short_controller_1.ShortUrlController],
        providers: [short_service_1.ShortUrlService],
    })
], ShortUrlModule);
//# sourceMappingURL=short.module.js.map