import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Db } from './db/db';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';
import { RoleModule } from './role/role.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [UserModule, Db, AuthModule, BaseModule, RoleModule, RoomModule],
  controllers: [AppController],
  providers: [AppService, Db, AuthModule],
})
export class AppModule {}
