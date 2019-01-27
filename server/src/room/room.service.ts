import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Room} from "./room";
import {CryptoHelper} from "../helper/cryptoHelper";
import {CreateRoomDto} from "../dto/create-room-dto";
import {RoomDto} from "../dto/room-dto";

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
      length: dto.length
    });
  }

  async listForTable(): Promise<Array<RoomDto>> {
    //TODO: raw to guery builder
    const {rows} = await this.db.do().raw(
      'SELECT\n' +
      '  room.*,\n' +
      '  count(furniture.id) as "numberOfTables",\n' +
      '  sum(furniture."numberSeats") as "numberOfSeats"\n' +
      'FROM room\n' +
      '  JOIN furniture ON room.id = furniture."roomId"\n' +
      'GROUP BY room.id'
    );
    return rows;
  }
}
