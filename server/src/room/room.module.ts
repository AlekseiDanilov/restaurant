import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import {Db} from "../db/db";

@Module({
  providers: [RoomService, Db],
  controllers: [RoomController]
})
export class RoomModule {}
