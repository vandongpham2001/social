import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOption), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
