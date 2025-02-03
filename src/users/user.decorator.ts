import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Criação do decorador com suporte ao JWT
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
        const decoded = jwtService.verify(token);
        return decoded; // Retorna o payload do token
      } catch (error) {
        return null; // Token inválido ou expirado
      }
    }

    return null; // Não há token
  },
);
