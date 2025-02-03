import { Module } from '@nestjs/common';
import { ShortUrlService } from './short.service';
import { ShortUrlController } from './short.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlEntity } from '../db/entities/short.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ShortUrlEntity])],
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
})
export class ShortUrlModule  { }
