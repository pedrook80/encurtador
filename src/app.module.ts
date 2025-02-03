import { Module } from '@nestjs/common';
import { ShortUrlModule } from './short/short.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ShortUrlModule,
    AuthModule,
    UsersModule,
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
