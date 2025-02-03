import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortUrlEntity } from '../db/entities/short.entity';
import { UserEntity } from '../db/entities/user.entity';

@Injectable()
export class ShortUrlService {
  constructor(
    @InjectRepository(ShortUrlEntity)
    private shortUrlRepository: Repository<ShortUrlEntity>,
  ) {}

  // Função para gerar um código aleatório de 6 caracteres
  private generateCode(length = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // Gera um código único, verificando colisões
  private async generateUniqueCode(): Promise<string> {
    let code: string;
    let exists = true;
    do {
      code = this.generateCode();
      const record = await this.shortUrlRepository.findOne({ where: { code } });
      exists = !!record;
    } while (exists);
    return code;
  }

  // Cria um novo link encurtado
  async create(originalUrl: string, user?: UserEntity): Promise<ShortUrlEntity> {
    const code = await this.generateUniqueCode();

    const shortUrl = this.shortUrlRepository.create({
      code,
      originalUrl,
      user: user ? user : null,
    });

    return await this.shortUrlRepository.save(shortUrl);
  }

  // Busca o link original pelo código encurtado
  async findOriginalUrl(code: string): Promise<string> {
    const shortUrl = await this.shortUrlRepository.findOne({ where: { code } });
    if (!shortUrl) {
      throw new HttpException('Short URL not found', HttpStatus.NOT_FOUND);
    }
    return shortUrl.originalUrl;
  }

  // Lista os links encurtados do usuário autenticado
  async listByUser(user: UserEntity): Promise<ShortUrlEntity[]> {
    return await this.shortUrlRepository.find({ where: { user } });
  }

  // Atualiza o endereço de destino de um link (somente pelo dono)
  async update(code: string, originalUrl: string, user: UserEntity): Promise<ShortUrlEntity> {
    const shortUrl = await this.shortUrlRepository.findOne({ where: { code } });
    if (!shortUrl) {
      throw new HttpException('Short URL not found', HttpStatus.NOT_FOUND);
    }
    // Verifica se o link pertence ao usuário
    if (!shortUrl.user || shortUrl.user.id !== user.id) {
      throw new HttpException('Not authorized to update this URL', HttpStatus.FORBIDDEN);
    }

    shortUrl.originalUrl = originalUrl;
    return await this.shortUrlRepository.save(shortUrl);
  }

  // Exclui o link encurtado (somente pelo dono)
  async remove(code: string, user: UserEntity): Promise<void> {
    const shortUrl = await this.shortUrlRepository.findOne({ where: { code } });
    if (!shortUrl) {
      throw new HttpException('Short URL not found', HttpStatus.NOT_FOUND);
    }
    if (!shortUrl.user || shortUrl.user.id !== user.id) {
      throw new HttpException('Not authorized to delete this URL', HttpStatus.FORBIDDEN);
    }
    await this.shortUrlRepository.delete(code);
  }
}
