"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const jwtService = new jwt_1.JwtService({ secret: process.env.JWT_SECRET });
            const decoded = jwtService.verify(token);
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
    return null;
});
//# sourceMappingURL=user.decorator.js.map