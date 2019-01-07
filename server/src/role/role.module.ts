import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import {Db} from "../db/db";

@Module({
  providers: [RoleService, Db],
  exports: [RoleService]
})
export class RoleModule {}
