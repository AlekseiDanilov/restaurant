import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {RoomService} from "./room.service";
import {Room} from "./room";
import Identifiable from "../base/identifiable";
import {AuthGuard} from "@nestjs/passport";
import {CreateRoomDto} from "../dto/create-room-dto";
import {FurnitureService} from "./furniture.service";
import {RoomDto} from "../dto/room-dto";
import {CryptoHelper} from "../helper/cryptoHelper";

@Controller('api/room')
@UseGuards(new (AuthGuard('jwt')))
export class RoomController {
  constructor(private readonly roomService: RoomService,
              private readonly furnitureService: FurnitureService) {
  }

  @Post()
  async create(@Body() room: CreateRoomDto): Promise<Room> {
    return this.roomService.create(room);
  }

  @Get()
  async list(): Promise<Array<Room>> {
    return this.roomService.listForTable();
  }

  @Get(':id')
  async find(@Param() params): Promise<RoomDto> {
    const room = await this.roomService.findById(params.id);
    const furniture = await this.furnitureService.listBy({roomId: room.id});
    return {
      ...room,
      furniture
    }
  }

  @Put()
  async update(@Body() param: RoomDto): Promise<Room> {
    const {furniture, ...room} = param;
    await this.furnitureService.deleteBy({roomId: room.id});
    await furniture.forEach(f => {
      this.furnitureService.create({
        id: CryptoHelper.randomUuid(),
        roomId: room.id,
        ...f
      })
    });
    return this.roomService.update(room);
  }

  @Delete(':id')
  async delete(@Param() param: Identifiable<string>) {
    await this.furnitureService.deleteBy({roomId: param.id});
    await this.roomService.delete(param.id);
    return HttpStatus.OK;
  }
}