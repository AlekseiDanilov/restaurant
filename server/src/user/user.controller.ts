import {Controller, Get, Param, Post, Put, Delete, Body, HttpStatus, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './user';
import {CreateUpdateUserDto} from '../dto/create-update-user-dto';
import Identifiable from "../base/identifiable";
import {AuthGuard} from '@nestjs/passport';

@Controller('api/user')
@UseGuards(new (AuthGuard('jwt')))
export class UserController {
  constructor(readonly userService: UserService) {
  }

  @Post()
  async create(@Body() params: CreateUpdateUserDto): Promise<User> {
    return this.userService.create(params);
  }

  @Get()
  async list() {
    const list = await this.userService.list();
    return list.map(u => {
      const {passwordHash, ...withoutPassword} = u;
      return withoutPassword;
    });
  }

  @Get(':id')
  async find(@Param() params): Promise<User> {
    return this.userService.findById(params.id);
  }

  @Put()
  async update(@Body() dto: CreateUpdateUserDto): Promise<User> {
    return this.userService.update(dto);
  }

  @Delete(':id')
  async delete(@Param() param: Identifiable<string>) {
    await this.userService.delete(param.id);
    return HttpStatus.OK;
  }
}
