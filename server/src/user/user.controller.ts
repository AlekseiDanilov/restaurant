import { Controller, Get, Param, Post, Put, Delete, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user';
import { CreateUpdateUserDto } from '../dto/create-update-user-dto';

@Controller('api/user')
export class UserController {
  constructor(readonly userService: UserService){}

  @Post()
  async create(@Body() params: CreateUpdateUserDto) {
    return this.userService.create(params);
  }

  @Get(':id')
  async find(@Param() params): Promise<User> {
    return this.userService.find(params.id);
  }

  @Put()
  async update(@Body() dto: CreateUpdateUserDto): Promise<User> {
    return this.userService.update(dto);
  }

  @Delete(':id')
  async delete(@Param() param) {
    await this.userService.delete(param.id);
    return HttpStatus.OK;
  }


}
