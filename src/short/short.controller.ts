import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { ShortUrlService } from './short.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard'; // ajuste o caminho conforme sua implementação
import { User } from '../users/user.decorator'; // decorador para obter o usuário logado, por exemplo

@Controller()
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post('shorten')
  async shorten(@Body('originalUrl') originalUrl: string, @User() user?: any) {
    const shortUrl = await this.shortUrlService.create(originalUrl, user?.sub); 
    return {
      code: shortUrl.code,
      shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${shortUrl.code}`,
      originalUrl: shortUrl.originalUrl,
    };
  }
  

  // Redirecionamento pelo código
  @Get(':code')
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const originalUrl = await this.shortUrlService.findOriginalUrl(code);
    return res.redirect(originalUrl);
  }

  // Os endpoints abaixo requerem autenticação
  @UseGuards(AuthGuard)
  @Get('code/list')
  async list(@User() user: any) {

    delete user.iat
    delete user.exp
    
    const urls = await this.shortUrlService.listByUser(user);
    return urls;
  }

  @UseGuards(AuthGuard)
  @Put(':code')
  async update(@Param('code') code: string, @Body('originalUrl') originalUrl: string, @User() user: any) {
    const updatedUrl = await this.shortUrlService.update(code, originalUrl, user);
    return updatedUrl;
  }

  @UseGuards(AuthGuard)
  @Delete(':code')
  async remove(@Param('code') code: string, @User() user: any) {
    await this.shortUrlService.remove(code, user);
    return { message: 'URL removed successfully' };
  }
}
