import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { Db } from '../db/db';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, Db],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
