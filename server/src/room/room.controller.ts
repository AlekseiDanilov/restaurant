import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {RoomService} from "./room.service";
import {Room} from "./room";
import Identifiable from "../base/identifiable";
import {AuthGuard} from "@nestjs/passport";
import {CreateRoomDto} from "../dto/create-room-dto";

@Controller('api/room')
@UseGuards(new (AuthGuard('jwt')))
export class RoomController {
  constructor(private readonly roomService: RoomService) {
  }

  @Post()
  async create(@Body() room: CreateRoomDto): Promise<Room> {
    return this.roomService.create(room);
  }

  @Get()
  async list(): Promise<Array<Room>> {
    return this.roomService.list();
  }

  @Get(':id')
  async find(@Param() params): Promise<Room> {
    return this.roomService.findById(params.id);
  }

  @Put()
  async update(@Body() room: Room): Promise<Room> {
    return this.roomService.update(room);
  }

  @Delete(':id')
  async delete(@Param() param: Identifiable<string>) {
    await this.roomService.delete(param.id);
    return HttpStatus.OK;
  }
}