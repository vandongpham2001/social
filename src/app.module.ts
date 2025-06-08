import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './config/database.config';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exceptions/global-handler.exception';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOption), UserModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AuthService,
  ],
})
export class AppModule {}
