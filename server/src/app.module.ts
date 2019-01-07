import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Db } from './db/db';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, Db, AuthModule, BaseModule, RoleModule],
  controllers: [AppController],
  providers: [AppService, Db, AuthModule],
})
export class AppModule {}
