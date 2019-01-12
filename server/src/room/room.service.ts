import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Room} from "./room";
import {CryptoHelper} from "../helper/cryptoHelper";
import {CreateRoomDto} from "../dto/create-room-dto";

@Injectable()
export class RoomService extends BaseService<Room> {

  tableName(): string {
    return "room";
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    return super.create({
      id: CryptoHelper.randomUuid(),
      name: dto.name,
      width: dto.width,
      height: dto.height
    });
  }
}
