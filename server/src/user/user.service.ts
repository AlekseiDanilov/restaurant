import {Injectable} from '@nestjs/common';
import {User} from './user';
import {CreateUpdateUserDto} from '../dto/create-update-user-dto';
import {CryptoHelper} from '../helper/cryptoHelper';
import {BaseService} from "../base/base.service";
import {FindParamUser} from "./find-param-user";

@Injectable()
export class UserService extends BaseService<User, FindParamUser> {

  tableName(): string {
    return "user";
  }

  async create(dto: CreateUpdateUserDto): Promise<User> {
    const newUser: User = {
      id: CryptoHelper.randomUuid(),
      name: dto.name,
      email: dto.email,
      username: dto.username,
      passwordHash: CryptoHelper.md5(dto.password),
    };
    return super.create(newUser);
  }

  async update(dto: CreateUpdateUserDto): Promise<User> {
    const updUser: User = {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      username: dto.username,
      passwordHash: dto.password ? CryptoHelper.md5(dto.password) : undefined,
    };
    return super.update(updUser);
  }
}
